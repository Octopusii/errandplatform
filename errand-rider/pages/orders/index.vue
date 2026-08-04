<template>
	<view class="container">
		<!-- 顶部标签页 -->
		<view class="tabs-container">
			<view class="tabs">
				<view
					class="tab"
					:class="{ 'active': currentTab === 'ongoing' }"
					@click="switchTab('ongoing')"
				>
					进行中
				</view>
				<view
					class="tab"
					:class="{ 'active': currentTab === 'completed' }"
					@click="switchTab('completed')"
				>
					已完成
				</view>
				<view
					class="tab"
					:class="{ 'active': currentTab === 'cancelled' }"
					@click="switchTab('cancelled')"
				>
					已取消
				</view>
			</view>
		</view>

		<!-- 统计横幅 -->
		<view class="summary-banner">
			<view class="summary-item">
				<text class="summary-label">已完成订单</text>
				<view class="summary-value">
					<text class="summary-number">{{ completedCount }}</text>
					<text class="summary-unit">单</text>
				</view>
			</view>
			<view class="summary-item">
				<text class="summary-label">进行中订单</text>
				<view class="summary-value">
					<text class="summary-number">{{ ongoingCount }}</text>
					<text class="summary-unit">单</text>
				</view>
			</view>
		</view>

		<!-- 加载中 -->
		<view class="empty-state" v-if="loading">
			<text class="empty-title">加载中...</text>
		</view>

		<!-- 订单列表 -->
		<view class="orders-list" v-else-if="filteredOrders.length > 0">
			<view
				class="order-card"
				v-for="order in filteredOrders"
				:key="order._id"
				@click="navigateToDetail(order)"
			>
				<view class="card-header">
					<view class="header-left">
						<text class="order-id">订单号: {{ getOrderNo(order._id) }}</text>
						<view class="status-badge" :class="getStatusClass(order.status)">
							<view class="status-dot" v-if="order.status === 'accepted' || order.status === 'in_progress'"></view>
							<text>{{ getStatusText(order.status) }}</text>
						</view>
					</view>
					<view class="header-right">
						<text class="order-type-tag" :class="order.order_type === 'send' ? 'type-send' : 'type-buy'">
							{{ order.order_type === 'send' ? '帮我送' : '帮我买' }}
						</text>
					</view>
				</view>

				<view class="route-section">
					<view class="route-icons">
						<view class="icon-circle" :class="order.order_type === 'send' ? 'icon-secondary' : 'icon-buy'">
							<text>{{ order.order_type === 'send' ? '📦' : '🛒' }}</text>
						</view>
						<view class="route-line"></view>
						<view class="icon-circle icon-primary">
							<text>📍</text>
						</view>
					</view>
					<view class="route-details">
						<view class="route-item">
							<text class="route-title">{{ getRouteStart(order) }}</text>
						</view>
						<view class="route-item">
							<text class="route-title">{{ order.delivery_address || '—' }}</text>
						</view>
					</view>
				</view>

				<view class="order-footer">
					<text class="order-time">{{ formatTime(order.create_time) }}</text>
					<view class="order-price">
						<text class="price-label">配送费</text>
						<text class="price-value">¥{{ order.price || 0 }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view class="empty-state" v-else>
			<view class="empty-icon">📥</view>
			<view class="empty-content">
				<text class="empty-title">暂无相关订单</text>
				<text class="empty-desc">去抢单页面看看有没有新任务吧</text>
			</view>
		</view>

		<!-- 服务时长监控 -->
		<view class="stats-card" v-if="!loading && filteredOrders.length > 0">
			<view class="stats-header">
				<text class="stats-title">服务时长监控</text>
				<text class="stats-period">今日</text>
			</view>
			<view class="chart">
				<view class="chart-bar" style="height: 40%;" title="8am"></view>
				<view class="chart-bar" style="height: 60%;" title="10am"></view>
				<view class="chart-bar active" style="height: 90%;" title="12pm"></view>
				<view class="chart-bar" style="height: 70%;" title="2pm"></view>
				<view class="chart-bar" style="height: 50%;" title="4pm"></view>
				<view class="chart-bar" style="height: 20%;" title="6pm"></view>
			</view>
			<view class="chart-labels">
				<text class="chart-label">08:00</text>
				<text class="chart-label">12:00</text>
				<text class="chart-label">18:00</text>
			</view>
		</view>
	</view>
</template>

<script>
import { getRiderId } from '@/common/uid.js'

export default {
	data() {
		return {
			currentTab: 'ongoing',
			orders: [],
			loading: false
		}
	},
	computed: {
		filteredOrders() {
			const statusMap = {
				ongoing: ['accepted', 'in_progress'],
				completed: ['completed'],
				cancelled: ['cancelled']
			}
			const filter = statusMap[this.currentTab]
			return this.orders.filter(o => filter.includes(o.status))
		},
		ongoingCount() {
			return this.orders.filter(o => ['accepted', 'in_progress'].includes(o.status)).length
		},
		completedCount() {
			return this.orders.filter(o => o.status === 'completed').length
		}
	},
	onShow() {
		this.loadOrders()
	},
	methods: {
		async loadOrders() {
			this.loading = true
			uni.showLoading({ title: '加载中...' })
			try {
				const getOrder = uniCloud.importObject('get-order')
				const res = await getOrder.getRiderOrders({ riderId: getRiderId() })
				if (res.errCode === 0) {
					this.orders = res.list || []
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
		switchTab(tab) {
			this.currentTab = tab
		},
		navigateToDetail(order) {
			if (order.status === 'accepted' || order.status === 'in_progress') {
				uni.navigateTo({
					url: '/pages/order-executing/index?id=' + order._id
				})
			} else {
				const url = order.order_type === 'send'
					? '/pages/order-detail/send?id=' + order._id
					: '/pages/order-detail/buy?id=' + order._id
				uni.navigateTo({ url })
			}
		},
		getOrderNo(id) {
			if (!id) return ''
			return 'RD' + id.slice(-9)
		},
		getRouteStart(order) {
			if (order.order_type === 'send') {
				return order.pickup_address || '—'
			}
			return order.item_description || '—'
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
				accepted: 'status-picking',
				in_progress: 'status-delivering',
				completed: 'status-done',
				cancelled: 'status-cancelled'
			}
			return map[status] || ''
		},
		formatTime(ts) {
			if (!ts) return ''
			const d = new Date(ts)
			const m = String(d.getMonth() + 1).padStart(2, '0')
			const day = String(d.getDate()).padStart(2, '0')
			const h = String(d.getHours()).padStart(2, '0')
			const min = String(d.getMinutes()).padStart(2, '0')
			return `${m}-${day} ${h}:${min}`
		}
	}
}
</script>

<style scoped>
.container {
	background-color: #f8f9ff;
	min-height: 100vh;
	padding: 0 16px 80px;
}

.tabs-container {
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: rgba(248, 249, 255, 0.95);
	backdrop-filter: blur(10px);
	margin: 0 -16px;
	padding: 4px 16px;
}

.tabs {
	display: flex;
	background-color: #e7e7f2;
	border-radius: 8px;
	padding: 4px;
}

.tab {
	flex: 1;
	text-align: center;
	padding: 8px;
	font-size: 12px;
	font-weight: 500;
	color: #434654;
	border-radius: 8px;
	transition: all 0.3s;
}

.tab.active {
	background-color: #ffffff;
	color: #003b9a;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.summary-banner {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgba(0, 80, 203, 0.2);
	border-radius: 16px;
	padding: 16px;
	margin-top: 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	position: relative;
	overflow: hidden;
}

.summary-banner::after {
	content: '';
	position: absolute;
	right: -16px;
	bottom: -16px;
	width: 96px;
	height: 96px;
	background-color: rgba(0, 60, 154, 0.1);
	border-radius: 50%;
	filter: blur(20px);
}

.summary-item {
	position: relative;
	z-index: 1;
}

.summary-label {
	font-size: 12px;
	color: #c1cfff;
	opacity: 0.8;
	display: block;
	margin-bottom: 4px;
}

.summary-value {
	display: flex;
	align-items: baseline;
	gap: 4px;
}

.summary-number {
	font-size: 22px;
	font-weight: 700;
	color: #c1cfff;
	line-height: 28px;
}

.summary-unit {
	font-size: 12px;
	color: #c1cfff;
}

.orders-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-top: 16px;
}

.order-card {
	background-color: #f3f3fd;
	border-radius: 16px;
	padding: 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	transition: transform 0.2s;
}

.order-card:active {
	transform: scale(0.98);
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 8px;
}

.header-left {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.order-id {
	font-size: 12px;
	color: #434654;
}

.status-badge {
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 12px;
	font-weight: 500;
}

.status-badge.status-picking {
	color: #ba1a1a;
}

.status-badge.status-delivering {
	color: #003b9a;
}

.status-badge.status-done {
	color: #10b981;
}

.status-badge.status-cancelled {
	color: #727687;
}

.status-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	animation: pulse 2s infinite;
}

.status-picking .status-dot {
	background-color: #ba1a1a;
}

.status-delivering .status-dot {
	background-color: #003b9a;
	animation: bounce 1s infinite;
}

@keyframes pulse {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}

@keyframes bounce {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-4px);
	}
}

.header-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.order-type-tag {
	font-size: 11px;
	font-weight: 500;
	padding: 2px 8px;
	border-radius: 9999px;
}

.type-send {
	background-color: #0050cb;
	color: #c1cfff;
}

.type-buy {
	background-color: #e0e3e4;
	color: #434748;
}

.route-section {
	display: flex;
	gap: 12px;
	margin: 8px 0;
}

.route-icons {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	padding-top: 4px;
}

.icon-circle {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
}

.icon-secondary {
	background-color: #d2e1fa;
}

.icon-buy {
	background-color: #e0e3e4;
}

.icon-primary {
	background-color: #dae1ff;
}

.route-line {
	width: 1px;
	height: 32px;
	background-color: #c3c6d6;
}

.route-details {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 2px 0;
}

.route-item {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.route-title {
	font-size: 14px;
	font-weight: 500;
	color: #191b23;
	line-height: 20px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.order-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 8px;
	padding-top: 12px;
	border-top: 1px solid rgba(195, 198, 214, 0.3);
}

.order-time {
	font-size: 12px;
	color: #434654;
}

.order-price {
	display: flex;
	align-items: baseline;
	gap: 4px;
}

.price-label {
	font-size: 12px;
	color: #434654;
}

.price-value {
	font-size: 18px;
	font-weight: 700;
	color: #003b9a;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 80px 0;
	gap: 16px;
}

.empty-icon {
	width: 128px;
	height: 128px;
	background-color: #ededf8;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 64px;
}

.empty-content {
	text-align: center;
}

.empty-title {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
	display: block;
	margin-bottom: 8px;
}

.empty-desc {
	font-size: 14px;
	color: #434654;
}

.stats-card {
	background-color: #ffffff;
	border-radius: 16px;
	padding: 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	margin-top: 16px;
}

.stats-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
}

.stats-title {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
}

.stats-period {
	font-size: 12px;
	color: #434654;
}

.chart {
	display: flex;
	align-items: flex-end;
	gap: 8px;
	height: 80px;
	padding: 0 8px;
}

.chart-bar {
	flex: 1;
	background-color: rgba(0, 59, 154, 0.2);
	border-radius: 4px 4px 0 0;
	transition: height 0.7s;
}

.chart-bar.active {
	background-color: #003b9a;
}

.chart-labels {
	display: flex;
	justify-content: space-between;
	margin-top: 8px;
	padding: 0 4px;
}

.chart-label {
	font-size: 10px;
	color: #434654;
}
</style>
