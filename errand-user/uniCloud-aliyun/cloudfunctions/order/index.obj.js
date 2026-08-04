// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database()
const orderCollection = db.collection('order')

module.exports = {
	_before: function () {
		// 通用预处理器：获取客户端信息
		this.clientInfo = this.getClientInfo()
	},

	/**
	 * 帮我送 - 创建配送订单
	 * @param {string} uid 用户唯一标识
	 * @param {string} pickup_address 取货地址
	 * @param {string} delivery_address 送货地址
	 * @param {string} item_type 物品种类
	 * @param {number} item_weight 物品重量(kg)
	 * @param {string} remark 备注信息
	 * @param {string} pickup_time 取件时间
	 * @param {number} price 订单价格
	 * @returns {object} { errCode: 0, orderId: '...' }
	 */
	async sendOrder(data) {
		const { uid, pickup_address, delivery_address, item_type, item_weight, remark, pickup_time, price } = data

		// 参数校验
		if (!uid) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '用户ID不能为空' }
		}
		if (!pickup_address) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '取货地址不能为空' }
		}
		if (!delivery_address) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '送货地址不能为空' }
		}
		if (!item_type) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '物品种类不能为空' }
		}

		try {
			const res = await orderCollection.add({
				uid,
				order_type: 'send',
				status: 'pending',
				create_time: Date.now(),
				price: price || 0,
				pickup_address,
				delivery_address,
				item_type,
				item_weight: item_weight || 1,
				remark: remark || '',
				pickup_time: pickup_time || '立即取件'
			})

			return {
				errCode: 0,
				errMsg: '下单成功',
				orderId: res.id
			}
		} catch (e) {
			return {
				errCode: 'DB_ERROR',
				errMsg: '订单创建失败: ' + e.message
			}
		}
	},

	/**
	 * 帮我买 - 创建代购订单
	 * @param {string} uid 用户唯一标识
	 * @param {string} item_description 想买什么
	 * @param {string} delivery_address 收货地址
	 * @param {number} estimated_price 预估商品价格
	 * @param {string} remark 下单备注
	 * @param {number} delivery_fee 预计配送费
	 * @param {string} purchase_mode 购买模式 near|fixed
	 * @returns {object} { errCode: 0, orderId: '...' }
	 */
	async buyOrder(data) {
		const { uid, item_description, delivery_address, estimated_price, remark, delivery_fee, purchase_mode } = data

		// 参数校验
		if (!uid) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '用户ID不能为空' }
		}
		if (!item_description) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '想买什么不能为空' }
		}
		if (!delivery_address) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '收货地址不能为空' }
		}

		try {
			const res = await orderCollection.add({
				uid,
				order_type: 'buy',
				status: 'pending',
				create_time: Date.now(),
				price: delivery_fee || 0,
				item_description,
				delivery_address,
				estimated_price: estimated_price || 0,
				remark: remark || '',
				delivery_fee: delivery_fee || 0,
				purchase_mode: purchase_mode || 'near'
			})

			return {
				errCode: 0,
				errMsg: '下单成功',
				orderId: res.id
			}
		} catch (e) {
			return {
				errCode: 'DB_ERROR',
				errMsg: '订单创建失败: ' + e.message
			}
		}
	},

	/**
	 * 查询用户订单列表
	 * @param {string} uid 用户唯一标识
	 * @param {string} status 订单状态筛选（可选）
	 * @returns {object} { errCode: 0, list: [...] }
	 */
	async getOrders(data) {
		const { uid, status } = data || {}

		if (!uid) {
			return { errCode: 'PARAM_IS_NULL', errMsg: '用户ID不能为空' }
		}

		try {
			const whereCondition = { uid }
			if (status) {
				whereCondition.status = status
			}

			const res = await orderCollection
				.where(whereCondition)
				.orderBy('create_time', 'desc')
				.limit(50)
				.get()

			return {
				errCode: 0,
				list: res.data || []
			}
		} catch (e) {
			return {
				errCode: 'DB_ERROR',
				errMsg: '订单查询失败: ' + e.message
			}
		}
	}
}
