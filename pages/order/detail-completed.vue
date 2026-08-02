<template>
	<view class="page">
		<view :style="{ height: statusBarHeight + 'px' }"></view>

		<!-- 顶部导航 -->
		<view class="header">
			<view class="header-left">
				<view class="header-btn" @click="onBack">
					<text class="material-symbols-outlined header-icon">arrow_back</text>
				</view>
				<text class="header-title">订单详情</text>
			</view>
			<view class="header-right">
				<view class="header-btn" @click="onHelp">
					<text class="material-symbols-outlined header-icon">help_outline</text>
				</view>
				<view class="header-btn" @click="onShare">
					<text class="material-symbols-outlined header-icon">share</text>
				</view>
			</view>
		</view>

		<!-- 主内容 -->
		<scroll-view scroll-y class="main" :show-scrollbar="false">
			<view class="main-inner">
				<!-- 状态头部卡片 -->
				<view class="status-card">
					<view class="status-content">
						<text class="status-title">已送达</text>
						<text class="status-desc">感谢您使用跑腿服务，期待再次为您服务</text>
					</view>
					<view class="status-icon-wrap">
						<text class="material-symbols-outlined material-symbols-fill status-icon">task_alt</text>
					</view>
				</view>

				<!-- 送达拍照 -->
				<view class="photo-section">
					<view class="section-title-row">
						<text class="material-symbols-outlined section-title-icon">photo_camera</text>
						<text class="section-title">送达拍照</text>
					</view>
					<view class="photo-wrap" @click="onViewPhoto">
						<image class="photo-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdl14BsThV-dTdEwoYFUvH1uudQv9qhHvujM6SkVHpSjJ_dYaOaEcgvGPJan5FpCFQSMiwass2ssdoW6jr49sXBazWOm8dr_8nB2s_D4ZvNXycRubeMrIA7qFUfDUvfQIpPa1J9Hi_BGeZBSzBymCtb_g2a9W9W-xayFziAwBN4TGxtCLV1MX5v1Bq_No-uJx_x26pvo3yTio_J8dWPEecFDMKZ0Ok50ap0TiXAKGET520Y3etJVD9CJ-h4LM0QgL92lDWFT5H" mode="aspectFill" />
						<view class="photo-overlay"></view>
						<view class="photo-zoom-badge">
							<text class="material-symbols-outlined photo-zoom-icon">zoom_in</text>
							<text class="photo-zoom-text">查看原图</text>
						</view>
					</view>
				</view>

				<!-- 服务明细卡片 -->
				<view class="card">
					<view class="card-header">
						<text class="card-title">服务明细</text>
						<view class="service-tag">
							<text class="service-tag-text">代买代办</text>
						</view>
					</view>

					<view class="route-block">
						<view class="route-row">
							<view class="route-marker-col">
								<view class="route-marker route-marker-primary"></view>
								<view class="route-line-dashed"></view>
							</view>
							<view class="route-text-block">
								<text class="route-label">取货点</text>
								<text class="route-text">朝阳区三里屯路 19 号院 1 号楼</text>
							</view>
						</view>
						<view class="route-row">
							<view class="route-marker-col">
								<view class="route-marker route-marker-error"></view>
							</view>
							<view class="route-text-block">
								<text class="route-label">送达点</text>
								<text class="route-text">海淀区中关村大街 27 号</text>
							</view>
						</view>
					</view>

					<view class="order-info-grid">
						<view class="order-info-item">
							<text class="order-info-label">订单编号</text>
							<text class="order-info-value">RT202310240982</text>
						</view>
						<view class="order-info-item">
							<text class="order-info-label">下单时间</text>
							<text class="order-info-value">2023-10-24 14:30</text>
						</view>
					</view>
				</view>

				<!-- 费用明细卡片 -->
				<view class="card">
					<text class="card-title">费用明细</text>
					<view class="fee-list">
						<view class="fee-row" v-for="(fee, idx) in fees" :key="idx">
							<text class="fee-label" :class="fee.labelClass">{{ fee.label }}</text>
							<text class="fee-value" :class="fee.valueClass">{{ fee.value }}</text>
						</view>
						<view class="fee-divider"></view>
						<view class="fee-row fee-total-row">
							<text class="fee-total-label">实付款</text>
							<text class="fee-total-value">¥ 23.50</text>
						</view>
					</view>
				</view>

				<!-- 骑手信息 -->
				<view class="rider-card">
					<view class="rider-info">
						<view class="rider-avatar-wrap">
							<image class="rider-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV-96Lil83-jNgg4zpuOqkOfQHISX3WQoLH_VOMCVyFoxNu-H3ljyE3uqwq6hfJgkre7RNFAp2TbwCqEyyep8zhsLVQ7xirqD3M9adCZWgm30sCQ3Wsjm7zGi0cbob-qk-pX9MzKF5pIlHvYQ-6YL6bztDIDzivSM3tLRrii4mzyX3m-lQMozRliMmry55Sj0OWt9kdwB5_uhZnzM3-qbN1UzRJVZIm0gRplpiGpeScCjg2o-4DMVGJhTaMjcOh85pHYoGY30A" mode="aspectFill" />
						</view>
						<view class="rider-text">
							<view class="rider-name-row">
								<text class="rider-name">王师傅</text>
								<view class="rider-tag">
									<text class="rider-tag-text">金牌骑手</text>
								</view>
							</view>
							<view class="rider-stat-row">
								<text class="material-symbols-outlined material-symbols-fill rider-star">star</text>
								<text class="rider-stat">4.9 (已服务 2k+)</text>
							</view>
						</view>
					</view>
					<view class="rider-actions">
						<view class="rider-action-btn" @click="onCallRider">
							<text class="material-symbols-outlined rider-action-icon">call</text>
						</view>
						<view class="rider-action-btn" @click="onChatRider">
							<text class="material-symbols-outlined rider-action-icon">chat</text>
						</view>
					</view>
				</view>

				<view style="height: 240rpx;"></view>
			</view>
		</scroll-view>

		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="bottom-btn bottom-btn-outline" @click="onReorder">
				<text class="bottom-btn-text bottom-btn-text-primary">再来一单</text>
			</view>
			<view class="bottom-btn bottom-btn-primary" @click="onRate">
				<text class="material-symbols-outlined bottom-btn-icon">star_rate</text>
				<text class="bottom-btn-text bottom-btn-text-light">去评价</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 20,
			fees: [
				{ label: '基础配送费', value: '¥ 12.00' },
				{ label: '距离附加费 (8.5km)', value: '¥ 8.50' },
				{ label: '夜间附加费', value: '¥ 5.00' },
				{ label: '优惠券减免', value: '- ¥ 2.00', labelClass: 'fee-label-primary', valueClass: 'fee-value-primary' }
			]
		}
	},
	onLoad() {
		try {
			const sys = uni.getSystemInfoSync()
			this.statusBarHeight = sys.statusBarHeight || 20
		} catch (e) {}
	},
	methods: {
		onBack() {
			uni.navigateBack()
		},
		onHelp() {
			uni.showToast({ title: '如需帮助请联系客服', icon: 'none' })
		},
		onShare() {
			uni.showToast({ title: '分享订单', icon: 'none' })
		},
		onViewPhoto() {
			uni.previewImage({
				urls: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCdl14BsThV-dTdEwoYFUvH1uudQv9qhHvujM6SkVHpSjJ_dYaOaEcgvGPJan5FpCFQSMiwass2ssdoW6jr49sXBazWOm8dr_8nB2s_D4ZvNXycRubeMrIA7qFUfDUvfQIpPa1J9Hi_BGeZBSzBymCtb_g2a9W9W-xayFziAwBN4TGxtCLV1MX5v1Bq_No-uJx_x26pvo3yTio_J8dWPEecFDMKZ0Ok50ap0TiXAKGET520Y3etJVD9CJ-h4LM0QgL92lDWFT5H']
			})
		},
		onCallRider() {
			uni.makePhoneCall({ phoneNumber: '123456789' })
		},
		onChatRider() {
			uni.showToast({ title: '打开聊天', icon: 'none' })
		},
		onReorder() {
			uni.navigateTo({ url: '/pages/order/send' })
		},
		onRate() {
			uni.showToast({ title: '跳转至评价页面', icon: 'none' })
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
	border-bottom: 2rpx solid #c2c6d8;
}

.header-left {
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.header-right {
	display: flex;
	gap: 16rpx;
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
	color: #0050cb;
}

.header-title {
	font-size: 40rpx;
	font-weight: 700;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

/* 主内容 */
.main {
	flex: 1;
}

.main-inner {
	padding: 32rpx;
	max-width: 768rpx;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

/* 状态头部卡片 */
.status-card {
	background-color: #0066ff;
	color: #f8f7ff;
	padding: 48rpx;
	border-radius: 24rpx;
	box-shadow: 0 16rpx 32rpx rgba(0, 102, 255, 0.2);
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.status-content {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	flex: 1;
}

.status-title {
	font-size: 44rpx;
	font-weight: 700;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 56rpx;
}

.status-desc {
	font-size: 28rpx;
	color: rgba(248, 247, 255, 0.8);
}

.status-icon-wrap {
	width: 128rpx;
	height: 128rpx;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 9999rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.status-icon {
	font-size: 80rpx;
	color: #ffffff;
}

/* 送达拍照 */
.photo-section {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.section-title-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.section-title-icon {
	font-size: 36rpx;
	color: #0050cb;
}

.section-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 48rpx;
}

.photo-wrap {
	position: relative;
	width: 100%;
	height: 384rpx;
	border-radius: 24rpx;
	overflow: hidden;
	border: 2rpx solid #c2c6d8;
	background-color: #ffffff;
}

.photo-img {
	width: 100%;
	height: 100%;
}

.photo-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.1);
}

.photo-zoom-badge {
	position: absolute;
	bottom: 24rpx;
	right: 24rpx;
	background-color: rgba(0, 0, 0, 0.6);
	padding: 8rpx 24rpx;
	border-radius: 9999rpx;
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.photo-zoom-icon {
	font-size: 28rpx;
	color: #ffffff;
}

.photo-zoom-text {
	font-size: 24rpx;
	color: #ffffff;
}

/* 卡片通用 */
.card {
	background-color: #ffffff;
	padding: 40rpx;
	border-radius: 24rpx;
	border: 2rpx solid #c2c6d8;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.card-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 48rpx;
}

.service-tag {
	background-color: #d5e3fd;
	padding: 8rpx 16rpx;
	border-radius: 16rpx;
}

.service-tag-text {
	font-size: 24rpx;
	color: #57657b;
}

/* 路由 */
.route-block {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.route-row {
	display: flex;
	gap: 24rpx;
}

.route-marker-col {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.route-marker {
	width: 16rpx;
	height: 16rpx;
	border-radius: 9999rpx;
	margin-top: 8rpx;
}

.route-marker-primary {
	background-color: #0050cb;
}

.route-marker-error {
	background-color: #ba1a1a;
}

.route-line-dashed {
	width: 0;
	flex: 1;
	min-height: 64rpx;
	border-left: 2rpx dashed #c2c6d8;
	margin: 8rpx 0;
}

.route-text-block {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
	flex: 1;
	padding-bottom: 16rpx;
}

.route-label {
	font-size: 24rpx;
	color: #727687;
}

.route-text {
	font-size: 28rpx;
	color: #0b1c30;
	line-height: 40rpx;
}

/* 订单信息 */
.order-info-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 32rpx;
	padding-top: 32rpx;
	border-top: 2rpx solid #c2c6d8;
}

.order-info-item {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.order-info-label {
	font-size: 24rpx;
	color: #727687;
}

.order-info-value {
	font-size: 28rpx;
	color: #0b1c30;
}

/* 费用明细 */
.fee-list {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.fee-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.fee-label {
	font-size: 28rpx;
	color: #424656;
}

.fee-label-primary {
	color: #0050cb;
}

.fee-value {
	font-size: 28rpx;
	color: #0b1c30;
	font-weight: 500;
}

.fee-value-primary {
	color: #0050cb;
}

.fee-divider {
	height: 2rpx;
	background-color: #c2c6d8;
	margin: 8rpx 0;
}

.fee-total-row {
	margin-bottom: 0;
}

.fee-total-label {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.fee-total-value {
	font-size: 48rpx;
	font-weight: 700;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

/* 骑手卡 */
.rider-card {
	background-color: #eff4ff;
	padding: 32rpx;
	border-radius: 24rpx;
	border: 2rpx solid rgba(194, 198, 216, 0.3);
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.rider-info {
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.rider-avatar-wrap {
	width: 96rpx;
	height: 96rpx;
	border-radius: 9999rpx;
	overflow: hidden;
	border: 4rpx solid #ffffff;
}

.rider-avatar {
	width: 100%;
	height: 100%;
}

.rider-text {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.rider-name-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.rider-name {
	font-size: 32rpx;
	font-weight: 700;
	color: #0b1c30;
}

.rider-tag {
	background-color: #0066ff;
	padding: 4rpx 12rpx;
	border-radius: 8rpx;
}

.rider-tag-text {
	font-size: 20rpx;
	color: #ffffff;
}

.rider-stat-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.rider-star {
	font-size: 28rpx;
	color: #0050cb;
}

.rider-stat {
	font-size: 24rpx;
	color: #0050cb;
}

.rider-actions {
	display: flex;
	gap: 16rpx;
}

.rider-action-btn {
	width: 80rpx;
	height: 80rpx;
	border-radius: 9999rpx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
	transition: transform 0.15s;
}

.rider-action-btn:active {
	transform: scale(0.9);
}

.rider-action-icon {
	font-size: 36rpx;
	color: #0050cb;
}

/* 底部操作栏 */
.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 50;
	background-color: #ffffff;
	border-top: 2rpx solid #c2c6d8;
	padding: 24rpx 32rpx;
	padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
	display: flex;
	gap: 24rpx;
	box-shadow: 0 -8rpx 24rpx rgba(0, 0, 0, 0.05);
}

.bottom-btn {
	flex: 1;
	height: 96rpx;
	border-radius: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16rpx;
	transition: transform 0.15s;
}

.bottom-btn:active {
	transform: scale(0.95);
}

.bottom-btn-outline {
	border: 2rpx solid #0050cb;
}

.bottom-btn-primary {
	background-color: #0050cb;
	box-shadow: 0 8rpx 16rpx rgba(0, 80, 203, 0.2);
}

.bottom-btn-icon {
	font-size: 36rpx;
	color: #ffffff;
}

.bottom-btn-text {
	font-size: 32rpx;
	font-weight: 700;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.bottom-btn-text-primary {
	color: #0050cb;
}

.bottom-btn-text-light {
	color: #ffffff;
}
</style>
