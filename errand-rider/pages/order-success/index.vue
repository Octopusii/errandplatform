<template>
	<view class="container">
		<!-- 成功动画部分 -->
		<view class="success-section">
			<view class="success-icon-wrapper">
				<view class="pulse-ring"></view>
				<view class="success-icon">
					<text class="icon-emoji">✅</text>
				</view>
			</view>
			<text class="success-title">抢单成功！</text>
			<text class="success-desc">请尽快前往取货，以免订单超时</text>
		</view>

		<!-- 加载中 -->
		<view class="loading-state" v-if="loading">
			<text class="loading-text">加载订单信息...</text>
		</view>

		<!-- 订单预览卡片 -->
		<view class="order-card" v-else-if="order._id">
			<view class="card-header">
				<view class="card-left">
					<view class="status-badge">{{ getStatusText(order.status) }}</view>
					<text class="merchant-name">{{ getOrderTitle(order) }}</text>
				</view>
				<view class="card-right">
					<text class="earning-label">预计配送收入</text>
					<text class="earning-amount">¥{{ order.price || 0 }}</text>
				</view>
			</view>

			<view class="card-details">
				<!-- 取货地址(send) / 采购商品(buy) -->
				<view class="detail-item">
					<text class="detail-icon">{{ order.order_type === 'send' ? '📦' : '🛒' }}</text>
					<view class="detail-content">
						<text class="detail-text">
							{{ order.order_type === 'send' ? (order.pickup_address || '—') : (order.item_description || '—') }}
						</text>
						<text class="detail-subtext" v-if="order.order_type === 'send' && order.item_type">
							{{ order.item_type }}<text v-if="order.item_weight"> · {{ order.item_weight }}kg</text>
						</text>
						<text class="detail-subtext" v-if="order.order_type === 'buy' && order.estimated_price">
							预估金额 ¥{{ order.estimated_price }}
						</text>
					</view>
				</view>

				<!-- 送货地址 -->
				<view class="detail-item">
					<text class="detail-icon">📍</text>
					<view class="detail-content">
						<text class="detail-text">{{ order.delivery_address || '—' }}</text>
					</view>
				</view>

				<!-- 取件时间(send) -->
				<view class="detail-item" v-if="order.order_type === 'send' && order.pickup_time">
					<text class="detail-icon">⏰</text>
					<text class="detail-text">请在 <text class="highlight">{{ order.pickup_time }}</text> 前完成取货</text>
				</view>

				<!-- 备注 -->
				<view class="detail-item" v-if="order.remark">
					<text class="detail-icon">ℹ️</text>
					<text class="detail-text">备注：{{ order.remark }}</text>
				</view>
			</view>

			<!-- 进度条 -->
			<view class="progress-bar">
				<view class="progress-fill" :class="{ 'active': isStepActive(1) }"></view>
				<view class="progress-fill" :class="{ 'active': isStepActive(2) }"></view>
				<view class="progress-fill" :class="{ 'active': isStepActive(3) }"></view>
			</view>
		</view>

		<!-- 操作按钮 -->
		<view class="action-buttons" v-if="order._id">
			<view class="primary-button" @click="navigateToPickup">
				<text class="button-icon">🧭</text>
				<text class="button-text">立即前往取货</text>
			</view>
			<view class="secondary-button" @click="viewOrderDetail">
				<text class="button-text">查看订单详情</text>
			</view>
		</view>

		<!-- 提示信息 -->
		<view class="tip-info" v-if="order._id">
			<text class="tip-icon">ℹ️</text>
			<text class="tip-text">取货时请核对订单号：{{ getOrderNo(order._id) }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderId: '',
			order: {},
			loading: false
		}
	},
	onLoad(options) {
		this.orderId = options.id || ''
		this.loadOrderDetail()
	},
	methods: {
		async loadOrderDetail() {
			if (!this.orderId) {
				uni.showToast({ title: '订单ID不能为空', icon: 'none' })
				return
			}
			this.loading = true
			uni.showLoading({ title: '加载中...' })
			try {
				const getOrder = uniCloud.importObject('get-order')
				const res = await getOrder.getOrderDetail({ orderId: this.orderId })
				if (res.errCode === 0) {
					this.order = res.order || {}
				} else {
					uni.showToast({ title: res.errMsg || '加载失败', icon: 'none' })
				}
			} catch (e) {
				uni.showToast({ title: '加载失败', icon: 'none' })
			} finally {
				uni.hideLoading()
				this.loading = false
			}
		},
		navigateToPickup() {
			uni.navigateTo({
				url: '/pages/order-executing/index?id=' + this.orderId
			})
		},
		viewOrderDetail() {
			uni.navigateTo({
				url: '/pages/order-executing/index?id=' + this.orderId
			})
		},
		getStatusText(status) {
			const map = {
				pending: '待接单',
				accepted: '已接单',
				in_progress: '配送中',
				completed: '已完成',
				cancelled: '已取消'
			}
			return map[status] || '已接单'
		},
		getOrderTitle(order) {
			if (order.order_type === 'send') {
				return order.pickup_address || '帮我送订单'
			}
			return order.item_description || '帮我买订单'
		},
		getOrderNo(id) {
			if (!id) return ''
			return 'RD' + id.slice(-9)
		},
		isStepActive(step) {
			const status = this.order.status
			if (step === 1) return ['accepted', 'in_progress', 'completed'].includes(status)
			if (step === 2) return ['in_progress', 'completed'].includes(status)
			if (step === 3) return status === 'completed'
			return false
		}
	}
}
</script>

<style scoped>
.container {
	background-color: #f8f9ff;
	min-height: 100vh;
	padding: 24px 16px;
	display: flex;
	flex-direction: column;
}

.success-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 32px 0 16px;
	text-align: center;
}

.success-icon-wrapper {
	position: relative;
	margin-bottom: 16px;
}

.pulse-ring {
	position: absolute;
	inset: 0;
	border-radius: 50%;
	background-color: rgba(0, 59, 154, 0.2);
	animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
	75%, 100% {
		transform: scale(2);
		opacity: 0;
	}
}

.success-icon {
	position: relative;
	width: 96px;
	height: 96px;
	background-color: #003b9a;
	color: #ffffff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 10px 15px rgba(0, 59, 154, 0.3);
	transform: scale(1.1);
	animation: bounce-short 0.6s ease-out;
}

@keyframes bounce-short {
	0%, 100% {
		transform: scale(1.1);
	}
	50% {
		transform: scale(1.2);
	}
}

.icon-emoji {
	font-size: 48px;
}

.success-title {
	font-size: 22px;
	font-weight: 700;
	color: #191b23;
	margin-bottom: 4px;
}

.success-desc {
	font-size: 16px;
	color: #434654;
}

.loading-state {
	display: flex;
	justify-content: center;
	padding: 40px 0;
}

.loading-text {
	font-size: 14px;
	color: #434654;
}

.order-card {
	background-color: #f3f3fd;
	border-radius: 16px;
	padding: 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-bottom: 24px;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.card-left {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.status-badge {
	font-size: 12px;
	font-weight: 500;
	background-color: #dae1ff;
	color: #003fa4;
	padding: 4px 8px;
	border-radius: 9999px;
	width: fit-content;
}

.merchant-name {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
}

.card-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.earning-label {
	font-size: 12px;
	color: #434654;
}

.earning-amount {
	font-size: 20px;
	font-weight: 600;
	color: #003b9a;
}

.card-details {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.detail-item {
	display: flex;
	align-items: flex-start;
	gap: 8px;
}

.detail-icon {
	font-size: 20px;
	color: #434654;
}

.detail-content {
	display: flex;
	flex-direction: column;
}

.detail-text {
	font-size: 14px;
	color: #191b23;
}

.detail-subtext {
	font-size: 12px;
	color: #434654;
}

.highlight {
	color: #ba1a1a;
	font-weight: 500;
}

.progress-bar {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 8px;
}

.progress-fill {
	flex: 1;
	height: 6px;
	background-color: #c3c6d6;
	border-radius: 9999px;
	transition: all 0.7s;
}

.progress-fill.active {
	background-color: #003b9a;
}

.action-buttons {
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-top: auto;
}

.primary-button {
	background-color: #003b9a;
	color: #ffffff;
	padding: 14px;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	box-shadow: 0 4px 12px rgba(0, 59, 154, 0.2);
	transition: transform 0.2s;
}

.primary-button:active {
	transform: scale(0.95);
}

.button-icon {
	font-size: 18px;
}

.button-text {
	font-size: 18px;
	font-weight: 600;
}

.secondary-button {
	background-color: #e1e2ec;
	color: #434654;
	padding: 14px;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.2s;
}

.secondary-button:active {
	transform: scale(0.95);
}

.tip-info {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	opacity: 0.6;
	margin-top: 16px;
}

.tip-icon {
	font-size: 16px;
}

.tip-text {
	font-size: 12px;
	color: #434654;
}
</style>
