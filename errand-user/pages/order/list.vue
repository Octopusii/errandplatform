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
				@tap="currentTab = index"
			>
				<text class="tab-label">{{ tab }}</text>
				<view v-if="currentTab === index" class="tab-indicator"></view>
			</view>
		</view>

		<scroll-view scroll-y class="content" :show-scrollbar="false">
			<!-- Order Card 1: In Progress -->
			<view class="order-card">
				<view class="order-header">
					<view class="order-type">
						<view class="type-icon type-blue">
							<text>🛒</text>
						</view>
						<view>
							<text class="order-title">代买代送</text>
							<text class="order-no">订单号: BP772910394</text>
						</view>
					</view>
					<view class="order-status status-progress">
						<text>待骑手取货</text>
					</view>
				</view>
				<view class="order-route">
					<view class="route-dots">
						<view class="dot dot-start"></view>
						<view class="dot-line"></view>
						<view class="dot dot-end"></view>
					</view>
					<view class="route-addresses">
						<text class="route-addr">上海市徐汇区龙漕路200号...</text>
						<text class="route-addr">上海市黄浦区南京东路123号...</text>
					</view>
				</view>
				<view class="order-footer">
					<text class="order-time">2023-11-24 14:30</text>
					<view class="order-price">
						<text class="price-label">实付:</text>
						<text class="price-value">¥28.50</text>
					</view>
				</view>
				<view class="order-actions">
					<view class="btn btn-outline" @tap="viewDetail('progress')">查看物流</view>
					<view class="btn btn-primary">联系骑手</view>
				</view>
			</view>

			<!-- Order Card 2: Completed -->
			<view class="order-card">
				<view class="order-header">
					<view class="order-type">
						<view class="type-icon type-gray">
							<text>📮</text>
						</view>
						<view>
							<text class="order-title">帮送文件</text>
							<text class="order-no">订单号: BP772910405</text>
						</view>
					</view>
					<view class="order-status status-done">
						<text>已送达</text>
					</view>
				</view>
				<view class="order-route">
					<view class="route-dots">
						<view class="dot dot-gray"></view>
						<view class="dot-line"></view>
						<view class="dot dot-gray"></view>
					</view>
					<view class="route-addresses">
						<text class="route-addr muted">普陀区常德路1210号</text>
						<text class="route-addr muted">静安区南京西路1515号</text>
					</view>
				</view>
				<view class="order-footer">
					<text class="order-time">2023-11-23 10:15</text>
					<view class="order-price">
						<text class="price-label">实付:</text>
						<text class="price-value">¥15.00</text>
					</view>
				</view>
				<view class="order-actions">
					<view class="btn btn-outline-gray">删除订单</view>
					<view class="btn btn-outline" @tap="goBuy">再来一单</view>
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

			<!-- Order Card 3: Cancelled -->
			<view class="order-card opacity-75">
				<view class="order-header">
					<view class="order-type">
						<view class="type-icon type-light">
							<text>🐾</text>
						</view>
						<view>
							<text class="order-title">代遛宠物</text>
							<text class="order-no">订单号: BP772910512</text>
						</view>
					</view>
					<view class="order-status status-error">
						<text>已取消</text>
					</view>
				</view>
				<view class="order-cancel-reason">
					<text>取消理由：用户主动取消订单</text>
				</view>
				<view class="order-footer">
					<text class="order-time">2023-11-22 18:00</text>
					<view class="order-price">
						<text class="price-label">实退:</text>
						<text class="price-value muted">¥45.00</text>
					</view>
				</view>
				<view class="order-actions">
					<view class="btn btn-outline">查看详情</view>
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

export default {
	components: { BottomNav },
	data() {
		return {
			currentTab: 0,
			tabs: ['全部', '进行中', '已完成', '已取消']
		}
	},
	methods: {
		viewDetail(status) {
			const url = status === 'progress' ? '/pages/order/detail-progress' : '/pages/order/detail-completed'
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
