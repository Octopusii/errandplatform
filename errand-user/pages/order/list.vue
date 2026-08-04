<template>
	<view class="page">
		<!-- Top App Bar -->
		<view class="top-bar">
			<view class="logo-area">
				<text class="logo-icon">⚡</text>
				<text class="logo-text">同城跑腿</text>
			</view>
			<view class="top-actions">
				<text class="action-icon">🔍</text>
				<text class="action-icon">🔔</text>
			</view>
		</view>

		<!-- Status Tabs -->
		<view class="tab-bar">
			<view
				v-for="(tab, index) in tabs"
				:key="index"
				class="tab-item"
				:class="{ active: currentTab === index }"
				@tap="switchTab(index)"
			>
				<text class="tab-label">{{ tab }}</text>
				<view v-if="currentTab === index" class="tab-indicator"></view>
			</view>
		</view>

		<scroll-view scroll-y class="content" :show-scrollbar="false">
			<!-- Loading -->
			<view v-if="loading" class="empty-state">
				<text class="empty-text">加载中...</text>
			</view>

			<!-- Empty -->
			<view v-else-if="filteredOrders.length === 0" class="empty-state">
				<text class="empty-icon">📭</text>
				<text class="empty-text">暂无订单</text>
				<text class="empty-hint">快去首页下单吧</text>
			</view>

			<!-- Order Cards -->
			<view v-for="order in filteredOrders" :key="order._id" class="order-card" :class="{ 'opacity-75': order.status === 'cancelled' }">
				<view class="order-header">
					<view class="order-type">
						<view class="type-icon" :class="order.order_type === 'send' ? 'type-blue' : 'type-gray'">
							<text>{{ order.order_type === 'send' ? '📦' : '🛒' }}</text>
						</view>
						<view>
							<text class="order-title">{{ getOrderTitle(order) }}</text>
							<text class="order-no">订单号: {{ getOrderNo(order._id) }}</text>
						</view>
					</view>
					<view class="order-status" :class="getStatusClass(order.status)">
						<text>{{ getStatusText(order.status) }}</text>
					</view>
				</view>

				<!-- Route for send orders -->
				<view v-if="order.order_type === 'send'" class="order-route">
					<view class="route-dots">
						<view class="dot" :class="order.status === 'cancelled' ? 'dot-gray' : 'dot-start'"></view>
						<view class="dot-line"></view>
						<view class="dot" :class="order.status === 'cancelled' ? 'dot-gray' : 'dot-end'"></view>
					</view>
					<view class="route-addresses">
						<text class="route-addr">{{ order.pickup_address || '—' }}</text>
						<text class="route-addr">{{ order.delivery_address || '—' }}</text>
					</view>
				</view>

				<!-- Info for buy orders -->
				<view v-else class="order-route">
					<view class="route-dots">
						<view class="dot dot-start"></view>
						<view class="dot-line"></view>
						<view class="dot" :class="order.status === 'cancelled' ? 'dot-gray' : 'dot-end'"></view>
					</view>
					<view class="route-addresses">
						<text class="route-addr">🛍️ {{ order.item_description || '—' }}</text>
						<text class="route-addr">📍 {{ order.delivery_address || '—' }}</text>
					</view>
				</view>

				<!-- Cancel reason -->
				<view v-if="order.status === 'cancelled'" class="order-cancel-reason">
					<text>订单已取消</text>
				</view>

				<view class="order-footer">
					<text class="order-time">{{ formatTime(order.create_time) }}</text>
					<view class="order-price">
						<text class="price-label">{{ order.status === 'cancelled' ? '实退:' : '实付:' }}</text>
						<text class="price-value" :class="{ muted: order.status === 'cancelled' }">¥{{ order.price || 0 }}</text>
					</view>
				</view>

				<view class="order-actions">
					<view v-if="order.status === 'pending' || order.status === 'accepted' || order.status === 'in_progress'"
						class="btn btn-outline" @tap="viewDetail('progress', order._id)">查看物流</view>
					<view v-if="order.status === 'completed'"
						class="btn btn-outline" @tap="goBuy">再来一单</view>
					<view v-if="order.status === 'completed'"
						class="btn btn-outline-gray">删除订单</view>
					<view v-if="order.status === 'cancelled'"
						class="btn btn-outline">查看详情</view>
				</view>
			</view>

			<!-- Promotion Card -->
			<view class="promo-card">
				<view class="promo-left">
					<text class="promo-title">新用户专享优惠</text>
					<text class="promo-desc">首单跑腿立减10元</text>
					<view class="promo-btn">立即领取</view>
				</view>
				<view class="promo-gift">
					<text class="gift-icon">🎁</text>
				</view>
			</view>

			<view style="height: 100rpx;"></view>
		</scroll-view>

		<!-- Bottom Nav -->
		<BottomNav :current="1" />
	</view>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'
import { getUid } from '@/common/uid.js'

export default {
	components: { BottomNav },
	data() {
		return {
			currentTab: 0,
			tabs: ['全部', '进行中', '已完成', '已取消'],
			orders: [],
			loading: true
		}
	},
	computed: {
		filteredOrders() {
			const statusMap = {
				0: null,           // 全部
				1: ['pending', 'accepted', 'in_progress'],  // 进行中
				2: ['completed'],  // 已完成
				3: ['cancelled']   // 已取消
			}
			const filter = statusMap[this.currentTab]
			if (!filter) return this.orders
			return this.orders.filter(o => filter.includes(o.status))
		}
	},
	onShow() {
		this.loadOrders()
	},
	methods: {
		async loadOrders() {
			this.loading = true
			try {
				const order = uniCloud.importObject('order')
				const res = await order.getOrders({ uid: getUid() })
				if (res.errCode === 0) {
					this.orders = res.list || []
				} else {
					uni.showToast({ title: res.errMsg || '订单加载失败', icon: 'none' })
				}
			} catch (e) {
				console.error('loadOrders error:', e)
				uni.showToast({ title: '网络错误，请检查云对象是否已部署', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		switchTab(index) {
			this.currentTab = index
		},
		getOrderTitle(order) {
			if (order.order_type === 'send') {
				return order.item_type ? '帮送' + order.item_type : '帮我送'
			}
			return order.item_description || '帮我买'
		},
		getOrderNo(id) {
			if (!id) return ''
			return 'BP' + id.slice(-9)
		},
		getStatusText(status) {
			const map = {
				pending: '待接单',
				accepted: '已接单',
				in_progress: '配送中',
				completed: '已完成',
				cancelled: '已取消'
			}
			return map[status] || status
		},
		getStatusClass(status) {
			const map = {
				pending: 'status-progress',
				accepted: 'status-progress',
				in_progress: 'status-progress',
				completed: 'status-done',
				cancelled: 'status-error'
			}
			return map[status] || ''
		},
		formatTime(ts) {
			if (!ts) return ''
			const d = new Date(ts)
			const y = d.getFullYear()
			const m = String(d.getMonth() + 1).padStart(2, '0')
			const day = String(d.getDate()).padStart(2, '0')
			const h = String(d.getHours()).padStart(2, '0')
			const min = String(d.getMinutes()).padStart(2, '0')
			return `${y}-${m}-${day} ${h}:${min}`
		},
		viewDetail(status, id) {
			const url = status === 'progress'
				? '/pages/order/detail-progress?id=' + id
				: '/pages/order/detail-completed?id=' + id
			uni.navigateTo({ url })
		},
		goBuy() {
			uni.navigateTo({ url: '/pages/errand/buy' })
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: #f8f9ff;
	display: flex;
	flex-direction: column;
}

.top-bar {
	width: 100%;
	height: 56px;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
}

.logo-area {
	display: flex;
	align-items: center;
	gap: 8px;
}

.logo-icon {
	font-size: 24px;
	color: #0050cb;
}

.logo-text {
	font-size: 22px;
	font-weight: 700;
	color: #0050cb;
}

.top-actions {
	display: flex;
	gap: 16px;
}

.action-icon {
	font-size: 20px;
	color: #424656;
}

.tab-bar {
	display: flex;
	background: #ffffff;
	padding: 0 16px;
	border-bottom: 1px solid #c2c6d8;
	position: fixed;
	top: 56px;
	left: 0;
	right: 0;
	z-index: 99;
}

.tab-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 48px;
	justify-content: center;
	position: relative;
}

.tab-label {
	font-size: 12px;
	color: #424656;
}

.tab-item.active .tab-label {
	color: #0050cb;
	font-weight: 700;
}

.tab-indicator {
	position: absolute;
	bottom: 0;
	width: 20px;
	height: 3px;
	background: #0050cb;
	border-radius: 99px;
}

.content {
	flex: 1;
	padding-top: 104px;
	padding-bottom: 100px;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 80px 16px;
}

.empty-icon {
	font-size: 48px;
	margin-bottom: 16px;
}

.empty-text {
	font-size: 16px;
	color: #424656;
	font-weight: 600;
}

.empty-hint {
	font-size: 12px;
	color: #727687;
	margin-top: 8px;
}

.order-card {
	background: #ffffff;
	border-radius: 12px;
	margin: 16px;
	padding: 16px;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.order-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 12px;
}

.order-type {
	display: flex;
	align-items: center;
	gap: 12px;
}

.type-icon {
	width: 40px;
	height: 40px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
}

.type-blue {
	background: #dae1ff;
	color: #0050cb;
}

.type-gray {
	background: #d5e3fd;
	color: #515f74;
}

.type-light {
	background: #e5eeff;
	color: #424656;
}

.order-title {
	font-size: 18px;
	font-weight: 600;
	color: #0b1c30;
	display: block;
}

.order-no {
	font-size: 12px;
	color: #424656;
}

.order-status {
	padding: 4px 8px;
	border-radius: 6px;
	font-size: 11px;
	font-weight: 700;
}

.status-progress {
	background: #0066ff;
	color: #ffffff;
}

.status-done {
	background: #d3e4fe;
	color: #424656;
}

.status-error {
	background: #ffdad6;
	color: #ba1a1a;
}

.order-route {
	display: flex;
	gap: 12px;
	padding: 12px 0;
	border-top: 1px solid rgba(194, 198, 216, 0.3);
	border-bottom: 1px solid rgba(194, 198, 216, 0.3);
}

.route-dots {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 4px;
}

.dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
}

.dot-start {
	background: #0050cb;
}

.dot-end {
	background: #ba1a1a;
}

.dot-gray {
	background: #727687;
}

.dot-line {
	width: 1px;
	height: 16px;
	background: #c2c6d8;
	margin: 4px 0;
	border-left: 1px dashed #727687;
}

.route-addresses {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.route-addr {
	font-size: 12px;
	color: #0b1c30;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.route-addr.muted {
	color: #424656;
}

.order-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 12px;
}

.order-time {
	font-size: 12px;
	color: #424656;
}

.order-price {
	display: flex;
	align-items: baseline;
	gap: 4px;
}

.price-label {
	font-size: 12px;
	color: #424656;
}

.price-value {
	font-size: 20px;
	font-weight: 700;
	color: #0050cb;
}

.price-value.muted {
	color: #424656;
}

.order-actions {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	margin-top: 12px;
}

.btn {
	padding: 8px 16px;
	border-radius: 99px;
	font-size: 13px;
	font-weight: 500;
}

.btn-outline {
	border: 1px solid #0050cb;
	color: #0050cb;
}

.btn-outline-gray {
	border: 1px solid #727687;
	color: #515f74;
}

.btn-primary {
	background: #0050cb;
	color: #ffffff;
}

.order-cancel-reason {
	padding: 12px 0;
	border-top: 1px solid rgba(194, 198, 216, 0.3);
	border-bottom: 1px solid rgba(194, 198, 216, 0.3);
	font-size: 13px;
	color: #424656;
}

.opacity-75 {
	opacity: 0.75;
}

.promo-card {
	margin: 16px;
	background: #0050cb;
	border-radius: 12px;
	padding: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 8px 24px rgba(0, 80, 203, 0.2);
}

.promo-left {
	display: flex;
	flex-direction: column;
}

.promo-title {
	font-size: 18px;
	font-weight: 700;
	color: #ffffff;
}

.promo-desc {
	font-size: 14px;
	color: #b3c5ff;
	margin-top: 4px;
}

.promo-btn {
	align-self: flex-start;
	margin-top: 8px;
	background: #ffffff;
	color: #0050cb;
	padding: 4px 12px;
	border-radius: 99px;
	font-size: 12px;
	font-weight: 700;
}

.promo-gift {
	width: 80px;
	height: 80px;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.gift-icon {
	font-size: 36px;
}
</style>
