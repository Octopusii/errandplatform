// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database()
const orderCollection = db.collection('order')

// 合法的状态流转：当前状态 -> 可跳转的下一状态
const STATUS_TRANSITION = {
	pending: ['accepted'],
	accepted: ['in_progress', 'cancelled'],
	in_progress: ['completed', 'cancelled'],
	completed: [],
	cancelled: []
}

module.exports = {
	_before: function () {
		// 通用预处理器：获取客户端信息
		this.clientInfo = this.getClientInfo()
	},

	/**
	 * 获取待抢订单列表（status=pending）
	 * @param {object} data
	 * @param {number} [data.page=1] 页码
	 * @param {number} [data.pageSize=20] 每页条数
	 * @param {string} [data.order_type] 订单类型筛选 send|buy（可选）
	 * @returns {object} { errCode: 0, list: [], total: N }
	 */
	async getPendingOrders(data) {
		const { page = 1, pageSize = 20, order_type } = data || {}

		try {
			const whereCondition = { status: 'pending' }
			if (order_type) {
				whereCondition.order_type = order_type
			}

			// 统计总数
			const countRes = await orderCollection.where(whereCondition).count()
			// 分页查询
			const res = await orderCollection
				.where(whereCondition)
				.orderBy('create_time', 'desc')
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.get()

			return {
				errCode: 0,
				errMsg: 'success',
				list: res.data || [],
				total: countRes.total
			}
		} catch (e) {
			return {
				errCode: 'DB_ERROR',
				errMsg: '待抢订单查询失败: ' + e.message
			}
		}
	},

	/**
	 * 骑手抢单（原子操作）
	 * 利用 where(status=pending) 条件更新，并发时仅一人能成功
	 * @param {object} data
	 * @param {string} data.orderId 订单ID
	 * @param {string} data.riderId 骑手ID
	 * @param {string} [data.riderName] 骑手姓名
	 * @returns {object} { errCode: 0, errMsg: '抢单成功' }
	 */
	async grabOrder(data) {
		const { orderId, riderId, riderName } = data || {}

		// 参数校验
		if (!orderId) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '订单ID不能为空' }
		}
		if (!riderId) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '骑手ID不能为空' }
		}

		try {
			// 原子操作：仅当 status=pending 时才能更新，避免并发抢单冲突
			const res = await orderCollection
				.where({ _id: orderId, status: 'pending' })
				.update({
					rider_id: riderId,
					rider_name: riderName || '',
					status: 'accepted'
				})

			if (res.updated === 0) {
				return {
					errCode: 'ORDER_TAKEN',
					errMsg: '订单已被抢或不存在'
				}
			}

			return {
				errCode: 0,
				errMsg: '抢单成功'
			}
		} catch (e) {
			return {
				errCode: 'DB_ERROR',
				errMsg: '抢单失败: ' + e.message
			}
		}
	},

	/**
	 * 更新订单状态（已接单→取货中→已送达）
	 * 状态流转：accepted -> in_progress -> completed
	 * @param {object} data
	 * @param {string} data.orderId 订单ID
	 * @param {string} data.status 目标状态 in_progress|completed|cancelled
	 * @param {string} data.riderId 骑手ID（用于校验操作权限）
	 * @returns {object} { errCode: 0, errMsg: '状态更新成功' }
	 */
	async updateStatus(data) {
		const { orderId, status, riderId } = data || {}

		// 参数校验
		if (!orderId) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '订单ID不能为空' }
		}
		if (!status) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '目标状态不能为空' }
		}
		if (!riderId) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '骑手ID不能为空' }
		}

		try {
			// 查询当前订单
			const orderRes = await orderCollection.doc(orderId).get()
			if (!orderRes.data || orderRes.data.length === 0) {
				return { errCode: 'ORDER_NOT_FOUND', errMsg: '订单不存在' }
			}

			const order = orderRes.data[0]

			// 校验骑手权限：只有接单骑手才能操作
			if (order.rider_id !== riderId) {
				return { errCode: 'NO_PERMISSION', errMsg: '无权操作此订单' }
			}

			// 校验状态流转是否合法
			const allowedNext = STATUS_TRANSITION[order.status] || []
			if (!allowedNext.includes(status)) {
				return {
					errCode: 'INVALID_STATUS',
					errMsg: `不允许从 ${order.status} 跳转到 ${status}`
				}
			}

			// 执行更新
			await orderCollection.doc(orderId).update({ status })

			return {
				errCode: 0,
				errMsg: '状态更新成功',
				status
			}
		} catch (e) {
			return {
				errCode: 'DB_ERROR',
				errMsg: '状态更新失败: ' + e.message
			}
		}
	},

	/**
	 * 查询骑手自己的订单列表
	 * @param {object} data
	 * @param {string} data.riderId 骑手ID
	 * @param {string} [data.status] 订单状态筛选（可选）
	 * @param {number} [data.page=1] 页码
	 * @param {number} [data.pageSize=20] 每页条数
	 * @returns {object} { errCode: 0, list: [], total: N }
	 */
	async getRiderOrders(data) {
		const { riderId, status, page = 1, pageSize = 20 } = data || {}

		if (!riderId) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '骑手ID不能为空' }
		}

		try {
			const whereCondition = { rider_id: riderId }
			if (status) {
				whereCondition.status = status
			}

			const countRes = await orderCollection.where(whereCondition).count()
			const res = await orderCollection
				.where(whereCondition)
				.orderBy('create_time', 'desc')
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.get()

			return {
				errCode: 0,
				errMsg: 'success',
				list: res.data || [],
				total: countRes.total
			}
		} catch (e) {
			return {
				errCode: 'DB_ERROR',
				errMsg: '骑手订单查询失败: ' + e.message
			}
		}
	},

	/**
	 * 获取订单详情
	 * @param {object} data
	 * @param {string} data.orderId 订单ID
	 * @returns {object} { errCode: 0, order: {} }
	 */
	async getOrderDetail(data) {
		const { orderId } = data || {}

		if (!orderId) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '订单ID不能为空' }
		}

		try {
			const res = await orderCollection.doc(orderId).get()

			if (!res.data || res.data.length === 0) {
				return { errCode: 'ORDER_NOT_FOUND', errMsg: '订单不存在' }
			}

			return {
				errCode: 0,
				errMsg: 'success',
				order: res.data[0]
			}
		} catch (e) {
			return {
				errCode: 'DB_ERROR',
				errMsg: '订单详情查询失败: ' + e.message
			}
		}
	}
}
