<template>
	<view class="page">
		<view :style="{ height: statusBarHeight + 'px' }"></view>

		<!-- 顶部导航 -->
		<view class="header">
			<view class="header-btn" @click="onBack">
				<text class="material-symbols-outlined header-icon">arrow_back</text>
			</view>
			<text class="header-title">等待接单</text>
			<view style="width: 80rpx;"></view>
		</view>

		<!-- 地图背景 -->
		<view class="map-bg-wrap">
			<image class="map-bg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtNPw9gFzHMjic6BVC4hVOsZ1RfnEa5Ykpg7Nlylu_iVkJ0ZEnAq0Txb4Tx_mf-gkbNP9qBtOZYALrG3Nl_p636uN_vTZjSgy510dZ-xZ7JbGra0wbmKYCcz0t-RffziVGAp9iWav5v4nm0CRcOUVzUTQ67WhSUmB-farA746UvC7AotItwCLWeGSAGogfNfDoUb-kyxwAT7DX6nQ8py9UX9WW9uglECNLh-AipQ3BZKvF9qn6YNOIKdV3pfT9Sr59ZJAb1EV8" mode="aspectFill" />
			<view class="map-gradient"></view>

			<!-- 雷达动画 -->
			<view class="radar-wrap">
				<view class="radar-ping"></view>
				<view class="radar-pulse"></view>
				<view class="radar-core">
					<text class="material-symbols-outlined material-symbols-fill radar-icon">person_pin_circle</text>
				</view>
			</view>

			<!-- 静态附近骑手 -->
			<view class="rider rider-1">
				<text class="material-symbols-outlined material-symbols-fill rider-icon">electric_moped</text>
			</view>
			<view class="rider rider-2">
				<text class="material-symbols-outlined material-symbols-fill rider-icon">electric_moped</text>
			</view>
			<view class="rider rider-3">
				<text class="material-symbols-outlined material-symbols-fill rider-icon">electric_moped</text>
			</view>
		</view>

		<!-- 底部内容 -->
		<view class="bottom-content">
			<!-- 浮动状态卡片 -->
			<view class="status-card">
				<view class="dots-row">
					<view class="dot dot-1"></view>
					<view class="dot dot-2"></view>
					<view class="dot dot-3"></view>
				</view>
				<text class="status-title">正在为您匹配骑手...</text>
				<text class="status-desc">周边共有 12 位骑手，预计 2 分钟内接单</text>
				<view class="progress-track">
					<view class="progress-bar"></view>
				</view>
			</view>

			<!-- 订单摘要卡片 -->
			<view class="summary-card">
				<view class="summary-header">
					<view class="summary-title-block">
						<text class="summary-label">订单摘要</text>
						<text class="summary-title">帮我买：冰美式咖啡 (大杯)</text>
					</view>
					<view class="summary-tag">
						<text class="summary-tag-text">跑腿代购</text>
					</view>
				</view>

				<view class="route-block">
					<view class="route-markers">
						<view class="route-marker route-marker-primary"></view>
						<view class="route-line"></view>
						<view class="route-marker route-marker-error"></view>
					</view>
					<view class="route-info">
						<view class="route-item">
							<text class="route-label">取货地点</text>
							<text class="route-text">瑞幸咖啡 (南京西路店)</text>
						</view>
						<view class="route-item">
							<text class="route-label">收货地点</text>
							<text class="route-text">静安区恒隆广场 1 期 28 楼</text>
						</view>
					</view>
				</view>

				<view class="summary-footer">
					<view class="price-row">
						<text class="material-symbols-outlined price-icon">payments</text>
						<text class="price-label">预计支付: </text>
						<text class="price-value">¥ 25.00</text>
					</view>
					<text class="detail-link" @click="onViewDetail">查看详情</text>
				</view>
			</view>

			<!-- 操作按钮 -->
			<view class="action-block">
				<view class="cancel-btn" @click="onCancel">
					<text class="material-symbols-outlined cancel-icon">cancel</text>
					<text class="cancel-text">取消订单</text>
				</view>
				<view class="service-btn" @click="onContactService">
					<text class="material-symbols-outlined service-icon">support_agent</text>
					<text class="service-text">联系客服</text>
				</view>
			</view>

			<view style="height: 48rpx;"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 20
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
		onViewDetail() {
			uni.navigateTo({ url: '/pages/order/detail-progress' })
		},
		onCancel() {
			uni.showModal({
				title: '取消订单',
				content: '确定要取消该订单吗？',
				success: (res) => {
					if (res.confirm) {
						uni.navigateBack()
					}
				}
			})
		},
		onContactService() {
			uni.showToast({ title: '正在连接客服...', icon: 'none' })
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
	position: relative;
}

.header {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 50;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 32rpx;
	padding-top: 0;
	height: 112rpx;
	background-color: rgba(248, 249, 255, 0.8);
	backdrop-filter: blur(12px);
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
	font-weight: 600;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

/* 地图背景 */
.map-bg-wrap {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
}

.map-bg {
	width: 100%;
	height: 100%;
}

.map-gradient {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(to bottom,
		rgba(248, 249, 255, 0.8) 0%,
		rgba(248, 249, 255, 0) 20%,
		rgba(248, 249, 255, 0) 80%,
		rgba(248, 249, 255, 1) 100%);
}

/* 雷达动画 */
.radar-wrap {
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	align-items: center;
	justify-content: center;
}

.radar-ping {
	position: absolute;
	width: 192rpx;
	height: 192rpx;
	background-color: rgba(0, 80, 203, 0.2);
	border-radius: 9999rpx;
	animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.radar-pulse {
	position: absolute;
	width: 96rpx;
	height: 96rpx;
	background-color: rgba(0, 80, 203, 0.4);
	border-radius: 9999rpx;
	animation: pulse 2s infinite;
}

.radar-core {
	position: relative;
	z-index: 10;
	width: 112rpx;
	height: 112rpx;
	background-color: #0050cb;
	border-radius: 9999rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 4rpx solid #ffffff;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
}

.radar-icon {
	font-size: 56rpx;
	color: #ffffff;
}

@keyframes ping {
	0% { transform: scale(1); opacity: 1; }
	75%, 100% { transform: scale(2.5); opacity: 0; }
}

@keyframes pulse {
	0%, 100% { transform: scale(1); opacity: 1; }
	50% { transform: scale(1.1); opacity: 0.7; }
}

/* 静态骑手图标 */
.rider {
	position: absolute;
	background-color: #d3e4fe;
	padding: 16rpx;
	border-radius: 9999rpx;
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.8;
}

.rider-1 {
	top: 30%;
	left: 25%;
	transform: scale(0.9);
}

.rider-2 {
	top: 60%;
	right: 20%;
	transform: scale(0.9);
}

.rider-3 {
	bottom: 40%;
	left: 15%;
	transform: scale(0.75);
}

.rider-icon {
	font-size: 32rpx;
	color: #0050cb;
}

/* 底部内容 */
.bottom-content {
	position: relative;
	z-index: 10;
	margin-top: auto;
	padding: 0 32rpx 48rpx;
	padding-top: 600rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

/* 状态卡片 */
.status-card {
	background-color: #f8f9ff;
	border: 2rpx solid #c2c6d8;
	border-radius: 24rpx;
	padding: 32rpx;
	box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
}

.dots-row {
	display: flex;
	gap: 8rpx;
	margin-bottom: 16rpx;
}

.dot {
	width: 16rpx;
	height: 16rpx;
	background-color: #0050cb;
	border-radius: 9999rpx;
	animation: bounce 1.4s infinite ease-in-out both;
}

.dot-1 { animation-delay: 0s; }
.dot-2 { animation-delay: 0.2s; }
.dot-3 { animation-delay: 0.4s; }

@keyframes bounce {
	0%, 80%, 100% { transform: scale(0); }
	40% { transform: scale(1); }
}

.status-title {
	font-size: 40rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 56rpx;
}

.status-desc {
	font-size: 28rpx;
	color: #424656;
	line-height: 40rpx;
	text-align: center;
}

.progress-track {
	width: 100%;
	height: 8rpx;
	background-color: #e5eeff;
	border-radius: 9999rpx;
	overflow: hidden;
	margin-top: 16rpx;
}

.progress-bar {
	height: 100%;
	width: 33%;
	background-color: #0066ff;
	border-radius: 9999rpx;
	animation: loading 2s infinite linear;
}

@keyframes loading {
	0% { transform: translateX(-100%); }
	100% { transform: translateX(300%); }
}

/* 订单摘要 */
.summary-card {
	background-color: #ffffff;
	border: 2rpx solid #c2c6d8;
	border-radius: 24rpx;
	padding: 32rpx;
	box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.summary-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 16rpx;
}

.summary-title-block {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	flex: 1;
}

.summary-label {
	font-size: 24rpx;
	color: #424656;
}

.summary-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 48rpx;
}

.summary-tag {
	background-color: #d5e3fd;
	padding: 8rpx 24rpx;
	border-radius: 9999rpx;
}

.summary-tag-text {
	font-size: 24rpx;
	color: #57657b;
}

.route-block {
	display: flex;
	gap: 16rpx;
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

.route-line {
	width: 0;
	height: 48rpx;
	border-left: 2rpx dashed #727687;
}

.route-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.route-item {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
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

.summary-footer {
	padding-top: 24rpx;
	border-top: 2rpx solid #c2c6d8;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.price-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.price-icon {
	font-size: 40rpx;
	color: #424656;
}

.price-label {
	font-size: 28rpx;
	color: #0b1c30;
}

.price-value {
	font-size: 28rpx;
	font-weight: 700;
	color: #0050cb;
}

.detail-link {
	font-size: 24rpx;
	color: #0050cb;
}

/* 操作按钮 */
.action-block {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.cancel-btn {
	width: 100%;
	height: 112rpx;
	background-color: #ba1a1a;
	border-radius: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16rpx;
	box-shadow: 0 8rpx 24rpx rgba(186, 26, 26, 0.3);
	transition: transform 0.15s;
}

.cancel-btn:active {
	transform: scale(0.95);
}

.cancel-icon {
	font-size: 40rpx;
	color: #ffffff;
}

.cancel-text {
	font-size: 36rpx;
	font-weight: 600;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.service-btn {
	width: 100%;
	height: 96rpx;
	background-color: #f8f9ff;
	border: 2rpx solid #c2c6d8;
	border-radius: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	transition: all 0.15s;
}

.service-btn:active {
	background-color: #eff4ff;
}

.service-icon {
	font-size: 36rpx;
	color: #424656;
}

.service-text {
	font-size: 24rpx;
	color: #424656;
}
</style>
