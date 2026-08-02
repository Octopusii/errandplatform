<template>
	<view class="page">
		<view :style="{ height: statusBarHeight + 'px' }"></view>

		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="header-left">
				<text class="material-symbols-outlined header-logo">speed</text>
				<text class="header-title">同城跑腿</text>
			</view>
			<view class="header-right">
				<view class="header-btn" @click="onSearch">
					<text class="material-symbols-outlined header-icon">search</text>
				</view>
				<view class="header-btn" @click="onNotify">
					<text class="material-symbols-outlined header-icon">notifications</text>
				</view>
			</view>
		</view>

		<!-- 状态标签栏 -->
		<view class="tabs">
			<view
				v-for="(tab, idx) in tabs"
				:key="idx"
				class="tab"
				:class="{ 'tab-active': activeTab === idx }"
				@click="switchTab(idx)"
			>
				<text class="tab-text" :class="{ 'tab-text-active': activeTab === idx }">{{ tab }}</text>
				<view v-if="activeTab === idx" class="tab-indicator"></view>
			</view>
		</view>

		<!-- 订单列表内容 -->
		<scroll-view scroll-y class="main" :show-scrollbar="false">
			<view class="main-inner">
				<!-- 订单卡 1: 进行中 -->
				<view class="order-card" @click="goDetail('progress')">
					<view class="order-header">
						<view class="order-title-block">
							<view class="order-icon-wrap order-icon-primary">
								<text class="material-symbols-outlined order-icon">shopping_bag</text>
							</view>
							<view class="order-title-text">
								<text class="order-title">代买代送</text>
								<text class="order-no">订单号: BP772910394</text>
							</view>
						</view>
						<view class="status-badge status-badge-primary">
							<text class="status-badge-text status-badge-text-light">待骑手取货</text>
						</view>
					</view>

					<view class="route-section">
						<view class="route-markers">
							<view class="route-marker route-marker-primary"></view>
							<view class="route-line"></view>
							<view class="route-marker route-marker-error"></view>
						</view>
						<view class="route-info">
							<text class="route-text">上海市徐汇区龙漕路200号...</text>
							<text class="route-text">上海市黄浦区南京东路123号...</text>
						</view>
					</view>

					<view class="order-footer">
						<text class="order-time">2023-11-24 14:30</text>
						<view class="price-block">
							<text class="price-label">实付:</text>
							<text class="price-value price-value-primary">¥28.50</text>
						</view>
					</view>

					<view class="action-row">
						<view class="action-btn action-btn-outline" @click.stop="onTrack">
							<text class="action-btn-text action-btn-text-primary">查看物流</text>
						</view>
						<view class="action-btn action-btn-primary" @click.stop="onContactRider">
							<text class="action-btn-text action-btn-text-light">联系骑手</text>
						</view>
					</view>
				</view>

				<!-- 订单卡 2: 已完成 -->
				<view class="order-card" @click="goDetail('completed')">
					<view class="order-header">
						<view class="order-title-block">
							<view class="order-icon-wrap order-icon-secondary">
								<text class="material-symbols-outlined order-icon order-icon-secondary-text">local_post_office</text>
							</view>
							<view class="order-title-text">
								<text class="order-title">帮送文件</text>
								<text class="order-no">订单号: BP772910405</text>
							</view>
						</view>
						<view class="status-badge status-badge-default">
							<text class="status-badge-text status-badge-text-default">已送达</text>
						</view>
					</view>

					<view class="route-section">
						<view class="route-markers">
							<view class="route-marker route-marker-outline"></view>
							<view class="route-line"></view>
							<view class="route-marker route-marker-outline"></view>
						</view>
						<view class="route-info">
							<text class="route-text route-text-muted">普陀区常德路1210号</text>
							<text class="route-text route-text-muted">静安区南京西路1515号</text>
						</view>
					</view>

					<view class="order-footer">
						<text class="order-time">2023-11-23 10:15</text>
						<view class="price-block">
							<text class="price-label">实付:</text>
							<text class="price-value">¥15.00</text>
						</view>
					</view>

					<view class="action-row">
						<view class="action-btn action-btn-outline-default" @click.stop="onDelete">
							<text class="action-btn-text action-btn-text-secondary">删除订单</text>
						</view>
						<view class="action-btn action-btn-outline" @click.stop="onReorder">
							<text class="action-btn-text action-btn-text-primary">再来一单</text>
						</view>
					</view>
				</view>

				<!-- 促销 Bento 卡片 -->
				<view class="promo-bento">
					<view class="promo-content">
						<text class="promo-title">新用户专享优惠</text>
						<text class="promo-desc">首单跑腿立减10元</text>
						<view class="promo-btn" @click="onClaim">
							<text class="promo-btn-text">立即领取</text>
						</view>
					</view>
					<view class="promo-icon-wrap">
						<text class="material-symbols-outlined promo-icon">redeem</text>
					</view>
				</view>

				<!-- 订单卡 3: 已取消 -->
				<view class="order-card order-card-cancelled" @click="goDetail('cancelled')">
					<view class="order-header">
						<view class="order-title-block">
							<view class="order-icon-wrap order-icon-default">
								<text class="material-symbols-outlined order-icon order-icon-default-text">pets</text>
							</view>
							<view class="order-title-text">
								<text class="order-title">代遛宠物</text>
								<text class="order-no">订单号: BP772910512</text>
							</view>
						</view>
						<view class="status-badge status-badge-error">
							<text class="status-badge-text status-badge-text-error">已取消</text>
						</view>
					</view>

					<view class="route-section">
						<text class="cancel-reason">取消理由：用户主动取消订单</text>
					</view>

					<view class="order-footer">
						<text class="order-time">2023-11-22 18:00</text>
						<view class="price-block">
							<text class="price-label">实退:</text>
							<text class="price-value price-value-muted">¥45.00</text>
						</view>
					</view>

					<view class="action-row">
						<view class="action-btn action-btn-outline" @click.stop="goDetail('cancelled')">
							<text class="action-btn-text action-btn-text-primary">查看详情</text>
						</view>
					</view>
				</view>

				<view style="height: 200rpx;"></view>
			</view>
		</scroll-view>

		<!-- 自定义 TabBar -->
		<custom-tab-bar :selected="1"></custom-tab-bar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 20,
			activeTab: 0,
			tabs: ['全部', '进行中', '已完成', '已取消']
		}
	},
	onLoad() {
		try {
			const sys = uni.getSystemInfoSync()
			this.statusBarHeight = sys.statusBarHeight || 20
		} catch (e) {}
	},
	methods: {
		switchTab(idx) {
			this.activeTab = idx
		},
		onSearch() {
			uni.showToast({ title: '搜索订单', icon: 'none' })
		},
		onNotify() {
			uni.showToast({ title: '暂无新消息', icon: 'none' })
		},
		goDetail(type) {
			if (type === 'progress') {
				uni.navigateTo({ url: '/pages/order/detail-progress' })
			} else if (type === 'completed') {
				uni.navigateTo({ url: '/pages/order/detail-completed' })
			} else {
				uni.showToast({ title: '订单已取消', icon: 'none' })
			}
		},
		onTrack() {
			uni.navigateTo({ url: '/pages/order/detail-progress' })
		},
		onContactRider() {
			uni.showToast({ title: '正在连接骑手...', icon: 'none' })
		},
		onDelete() {
			uni.showToast({ title: '订单已删除', icon: 'none' })
		},
		onReorder() {
			uni.navigateTo({ url: '/pages/order/send' })
		},
		onClaim() {
			uni.showToast({ title: '优惠券已领取', icon: 'none' })
		}
	}
}
</script>

<style scoped>
.page {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-color: #f8f9ff;
}

/* 顶部导航 */
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 32rpx;
	height: 112rpx;
	background-color: #f8f9ff;
}

.header-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.header-logo {
	font-size: 48rpx;
	color: #0050cb;
}

.header-title {
	font-size: 44rpx;
	font-weight: 700;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.header-right {
	display: flex;
	align-items: center;
	gap: 32rpx;
}

.header-btn {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 9999rpx;
}

.header-btn:active {
	background-color: rgba(0, 102, 255, 0.1);
}

.header-icon {
	font-size: 44rpx;
	color: #424656;
}

/* 状态标签栏 */
.tabs {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 96rpx;
	padding: 0 32rpx;
	background-color: #f8f9ff;
	border-bottom: 2rpx solid #c2c6d8;
}

.tab {
	position: relative;
	height: 100%;
	padding: 0 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tab-text {
	font-size: 24rpx;
	color: #424656;
	letter-spacing: 2rpx;
}

.tab-text-active {
	color: #0050cb;
	font-weight: 700;
}

.tab-indicator {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 40rpx;
	height: 6rpx;
	border-radius: 9999rpx;
	background-color: #0050cb;
}

/* 主内容 */
.main {
	flex: 1;
}

.main-inner {
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

/* 订单卡片 */
.order-card {
	background-color: #ffffff;
	border-radius: 24rpx;
	padding: 32rpx;
	border: 2rpx solid #c2c6d8;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	transition: transform 0.2s;
}

.order-card:active {
	transform: scale(0.98);
}

.order-card-cancelled {
	opacity: 0.75;
}

.order-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 24rpx;
}

.order-title-block {
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.order-icon-wrap {
	width: 80rpx;
	height: 80rpx;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.order-icon-primary {
	background-color: #dae1ff;
}

.order-icon-secondary {
	background-color: #d5e3fd;
}

.order-icon-default {
	background-color: #e5eeff;
}

.order-icon {
	font-size: 40rpx;
	color: #0050cb;
}

.order-icon-secondary-text {
	color: #515f74;
}

.order-icon-default-text {
	color: #424656;
}

.order-title-text {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.order-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 48rpx;
}

.order-no {
	font-size: 24rpx;
	color: #424656;
}

.status-badge {
	padding: 8rpx 16rpx;
	border-radius: 8rpx;
}

.status-badge-primary {
	background-color: #0066ff;
}

.status-badge-default {
	background-color: #d3e4fe;
}

.status-badge-error {
	background-color: #ffdad6;
}

.status-badge-text {
	font-size: 22rpx;
	font-weight: 700;
}

.status-badge-text-light {
	color: #ffffff;
}

.status-badge-text-default {
	color: #424656;
}

.status-badge-text-error {
	color: #ba1a1a;
}

/* 路由信息 */
.route-section {
	padding: 24rpx 0;
	border-top: 2rpx solid rgba(194, 198, 216, 0.3);
	border-bottom: 2rpx solid rgba(194, 198, 216, 0.3);
	display: flex;
	gap: 24rpx;
}

.route-markers {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
	margin-top: 8rpx;
}

.route-marker {
	width: 16rpx;
	height: 16rpx;
	border-radius: 9999rpx;
}

.route-marker-primary {
	background-color: #0050cb;
}

.route-marker-error {
	background-color: #ba1a1a;
}

.route-marker-outline {
	background-color: #727687;
}

.route-line {
	width: 0;
	height: 32rpx;
	border-left: 2rpx solid #c2c6d8;
}

.route-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.route-text {
	font-size: 24rpx;
	color: #0b1c30;
}

.route-text-muted {
	color: #424656;
}

.cancel-reason {
	font-size: 26rpx;
	color: #424656;
}

/* 订单底部 */
.order-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 24rpx;
}

.order-time {
	font-size: 24rpx;
	color: #424656;
}

.price-block {
	display: flex;
	align-items: baseline;
	gap: 8rpx;
}

.price-label {
	font-size: 24rpx;
	color: #0b1c30;
}

.price-value {
	font-size: 40rpx;
	font-weight: 700;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 56rpx;
}

.price-value-primary {
	color: #0050cb;
}

.price-value-muted {
	color: #424656;
}

/* 操作按钮 */
.action-row {
	display: flex;
	justify-content: flex-end;
	gap: 16rpx;
	margin-top: 24rpx;
}

.action-btn {
	padding: 16rpx 32rpx;
	border-radius: 9999rpx;
	transition: transform 0.15s;
}

.action-btn:active {
	transform: scale(0.95);
}

.action-btn-outline {
	border: 2rpx solid #0050cb;
}

.action-btn-primary {
	background-color: #0050cb;
}

.action-btn-outline-default {
	border: 2rpx solid #727687;
}

.action-btn-text {
	font-size: 26rpx;
	font-weight: 500;
}

.action-btn-text-primary {
	color: #0050cb;
}

.action-btn-text-light {
	color: #ffffff;
}

.action-btn-text-secondary {
	color: #515f74;
}

/* 促销 Bento */
.promo-bento {
	position: relative;
	overflow: hidden;
	border-radius: 24rpx;
	background-color: #0050cb;
	height: 256rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 48rpx;
	box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
}

.promo-content {
	position: relative;
	z-index: 10;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.promo-title {
	font-size: 36rpx;
	font-weight: 700;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.promo-desc {
	font-size: 28rpx;
	color: #b3c5ff;
}

.promo-btn {
	margin-top: 16rpx;
	background-color: #ffffff;
	padding: 8rpx 24rpx;
	border-radius: 9999rpx;
	align-self: flex-start;
}

.promo-btn-text {
	font-size: 24rpx;
	font-weight: 700;
	color: #0050cb;
}

.promo-icon-wrap {
	position: relative;
	z-index: 10;
	width: 160rpx;
	height: 160rpx;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 9999rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.promo-icon {
	font-size: 80rpx;
	color: #ffffff;
}
</style>
