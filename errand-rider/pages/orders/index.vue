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
				<text class="summary-label">今日已配送</text>
				<view class="summary-value">
					<text class="summary-number">12</text>
					<text class="summary-unit">单</text>
				</view>
			</view>
			<view class="summary-item">
				<text class="summary-label">当前准时率</text>
				<text class="summary-rate">99.8%</text>
			</view>
		</view>

		<!-- 订单列表 -->
		<view class="orders-list" v-if="currentTab === 'ongoing'">
			<!-- 进行中的订单1：待取货 -->
			<view class="order-card" @click="navigateToDetail('ORD-2023082401')">
				<view class="card-header">
					<view class="header-left">
						<text class="order-id">订单号: ORD-2023082401</text>
						<view class="status-badge status-picking">
							<view class="status-dot"></view>
							<text>待取货</text>
						</view>
					</view>
					<view class="header-right">
						<text class="delivery-time">12:45</text>
						<text class="delivery-label">预计送达</text>
					</view>
				</view>

				<view class="route-section">
					<view class="route-icons">
						<view class="icon-circle icon-secondary">
							<text>🏪</text>
						</view>
						<view class="route-line"></view>
						<view class="icon-circle icon-primary">
							<text>📍</text>
						</view>
					</view>
					<view class="route-details">
						<view class="route-item">
							<text class="route-title">王记手工牛肉面 (万象城店)</text>
							<text class="route-desc">距离您 800m</text>
						</view>
						<view class="route-item">
							<text class="route-title">翡翠天御 7栋 2单元 1402</text>
							<text class="route-desc">配送距离 2.4km</text>
						</view>
					</view>
				</view>

				<view class="action-section">
					<view class="contact-buttons">
						<view class="contact-btn" @click.stop="callMerchant">
							<text class="contact-icon">📞</text>
							<text class="contact-text">商家</text>
						</view>
						<view class="contact-btn" @click.stop="callCustomer">
							<text class="contact-icon">💬</text>
							<text class="contact-text">客户</text>
						</view>
					</view>
					<view class="action-btn">到店取货</view>
				</view>
			</view>

			<!-- 进行中的订单2：配送中 -->
			<view class="order-card" @click="navigateToDetail('ORD-2023082402')">
				<view class="card-header">
					<view class="header-left">
						<text class="order-id">订单号: ORD-2023082402</text>
						<view class="status-badge status-delivering">
							<view class="status-dot"></view>
							<text>配送中</text>
						</view>
					</view>
					<view class="header-right">
						<text class="delivery-time urgent">08:20</text>
						<text class="delivery-label">预计送达</text>
					</view>
				</view>

				<view class="route-section">
					<view class="route-icons">
						<view class="icon-circle icon-secondary completed">
							<text>✅</text>
						</view>
						<view class="route-line"></view>
						<view class="icon-circle icon-primary">
							<text>📍</text>
						</view>
					</view>
					<view class="route-details">
						<view class="route-item completed">
							<text class="route-title">星巴克咖啡 (嘉里中心店)</text>
							<text class="route-desc">已取货</text>
						</view>
						<view class="route-item">
							<text class="route-title">高新科技园 T3 栋 12层 1205</text>
							<text class="route-desc">距离终点 1.2km</text>
						</view>
					</view>
				</view>

				<view class="action-section">
					<view class="contact-buttons">
						<view class="contact-btn" @click.stop="callCustomer">
							<text class="contact-icon">💬</text>
							<text class="contact-text">联系客户</text>
						</view>
					</view>
					<view class="action-btn secondary">确认送达</view>
				</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view class="empty-state" v-if="currentTab !== 'ongoing'">
			<view class="empty-icon">📥</view>
			<view class="empty-content">
				<text class="empty-title">暂无相关订单</text>
				<text class="empty-desc">去抢单页面看看有没有新任务吧</text>
			</view>
		</view>

		<!-- 服务时长监控 -->
		<view class="stats-card">
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
export default {
	data() {
		return {
			currentTab: 'ongoing'
		}
	},
	methods: {
		switchTab(tab) {
			this.currentTab = tab;
		},
		navigateToDetail(orderId) {
			uni.navigateTo({
				url: `/pages/order-executing/index?id=${orderId}`
			});
		},
		callMerchant() {
			uni.makePhoneCall({
				phoneNumber: '123'
			});
		},
		callCustomer() {
			uni.makePhoneCall({
				phoneNumber: '456'
			});
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

.summary-rate {
	font-size: 18px;
	font-weight: 600;
	color: #c1cfff;
	line-height: 24px;
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

.delivery-time {
	font-size: 18px;
	font-weight: 600;
	color: #003b9a;
}

.delivery-time.urgent {
	color: #ba1a1a;
}

.delivery-label {
	font-size: 12px;
	color: #434654;
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

.icon-primary {
	background-color: #dae1ff;
}

.icon-circle.completed {
	opacity: 0.4;
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

.route-item.completed {
	opacity: 0.4;
}

.route-title {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
	line-height: 24px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.route-desc {
	font-size: 14px;
	color: #434654;
	line-height: 20px;
}

.action-section {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 8px;
	padding-top: 16px;
	border-top: 1px solid rgba(195, 198, 214, 0.3);
}

.contact-buttons {
	display: flex;
	gap: 16px;
}

.contact-btn {
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 6px 12px;
	border-radius: 9999px;
	background-color: #e7e7f2;
	color: #434654;
	font-size: 12px;
	transition: all 0.2s;
}

.contact-btn:active {
	background-color: #d2e1fa;
	color: #556379;
}

.contact-icon {
	font-size: 18px;
}

.contact-text {
	font-size: 12px;
}

.action-btn {
	background-color: #003b9a;
	color: #ffffff;
	padding: 8px 16px;
	border-radius: 8px;
	font-size: 12px;
	font-weight: 500;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.action-btn.secondary {
	background-color: #0050cb;
	color: #c1cfff;
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