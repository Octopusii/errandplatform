<template>
	<view class="page">
		<view :style="{ height: statusBarHeight + 'px' }"></view>

		<!-- 顶部导航 -->
		<view class="header">
			<text class="header-title">跑腿代办</text>
			<view class="header-btn" @click="onNotify">
				<text class="material-symbols-outlined header-icon">notifications</text>
			</view>
		</view>

		<!-- 主内容 -->
		<view class="main">
			<!-- 成功视觉 -->
			<view class="success-visual">
				<view class="success-circle">
					<text class="material-symbols-outlined success-check">check</text>
				</view>
				<text class="success-title">下单成功</text>
				<text class="success-desc">您的订单已提交，跑腿员正飞奔而来</text>
			</view>

			<!-- 订单信息卡片 -->
			<view class="info-card">
				<view class="info-row info-row-border">
					<text class="info-label">订单编号</text>
					<text class="info-value info-value-bold">PA202310248892</text>
				</view>
				<view class="info-row info-row-border">
					<text class="info-label">支付方式</text>
					<text class="info-value">微信支付</text>
				</view>
				<view class="info-row info-row-border">
					<text class="info-label">支付金额</text>
					<text class="info-value info-value-primary">¥ 15.00</text>
				</view>
				<view class="eta-box">
					<view class="eta-icon-wrap">
						<text class="material-symbols-outlined eta-icon">schedule</text>
					</view>
					<view class="eta-text-block">
						<text class="eta-label">预计接单时间</text>
						<text class="eta-value">3分钟内</text>
					</view>
				</view>
			</view>

			<!-- 促销 Banner -->
			<view class="promo-banner">
				<image class="promo-bg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSzrTDkzMUgf3w3vHNbr7-odYT6KTipq8Np2syLtQUiUT8flX8K-XJ8_XIsmkkhKNoPNUTHnElxUXv2aRUmdiONB3XA5lWvyIFak8VY-_v9CDb1Uo22yhn_ZEKFwJ9ih2Sez2uhRWWJLmTZ8DJLiejWoSmVwAgbxUs4jRM_K0Urgz1jM4r-eajeLKFqsmE-7Cz8OFoM7KpFws3mVyYc0jKZWl6xEZQM-dHYaAzUz2JSe1dm3XCFYxO8YDS0LH2GVwdNGZ9P0Ka" mode="aspectFill" />
				<view class="promo-content">
					<text class="promo-title">新人首单免运费</text>
					<text class="promo-desc">邀请好友，再得5元券</text>
				</view>
			</view>

			<!-- 操作按钮 -->
			<view class="action-block">
				<view class="primary-btn" @click="onViewOrder">
					<text class="material-symbols-outlined primary-btn-icon">receipt_long</text>
					<text class="primary-btn-text">查看订单</text>
				</view>
				<view class="outline-btn" @click="onBackHome">
					<text class="outline-btn-text">返回首页</text>
				</view>
			</view>
		</view>

		<!-- 五彩纸屑动画 -->
		<view class="confetti-layer">
			<view
				v-for="(c, i) in confetti"
				:key="i"
				class="confetti-piece"
				:style="{
					left: c.left + '%',
					backgroundColor: c.color,
					animationDelay: c.delay + 's',
					animationDuration: c.duration + 's',
					width: c.size + 'rpx',
					height: c.size + 'rpx'
				}"
			></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 20,
			confetti: []
		}
	},
	onLoad() {
		try {
			const sys = uni.getSystemInfoSync()
			this.statusBarHeight = sys.statusBarHeight || 20
		} catch (e) {}
		this.initConfetti()
	},
	methods: {
		initConfetti() {
			const colors = ['#0066ff', '#dae1ff', '#b3c5ff', '#515f74']
			const list = []
			for (let i = 0; i < 50; i++) {
				list.push({
					left: Math.random() * 100,
					color: colors[Math.floor(Math.random() * colors.length)],
					delay: (i * 0.05).toFixed(2),
					duration: (2 + Math.random() * 2).toFixed(2),
					size: 8 + Math.random() * 12
				})
			}
			this.confetti = list
		},
		onNotify() {
			uni.showToast({ title: '暂无新消息', icon: 'none' })
		},
		onViewOrder() {
			uni.redirectTo({ url: '/pages/order/detail-progress' })
		},
		onBackHome() {
			uni.switchTab({ url: '/pages/home/index' })
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

.header-title {
	font-size: 44rpx;
	font-weight: 700;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.header-btn {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 9999rpx;
}

.header-icon {
	font-size: 44rpx;
	color: #0050cb;
}

/* 主内容 */
.main {
	flex: 1;
	padding: 96rpx 32rpx 48rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

/* 成功视觉 */
.success-visual {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 48rpx;
	width: 100%;
}

.success-circle {
	width: 192rpx;
	height: 192rpx;
	background-color: #0066ff;
	border-radius: 9999rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 48rpx;
	box-shadow: 0 16rpx 32rpx rgba(0, 102, 255, 0.2);
	animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

.success-check {
	font-size: 96rpx;
	color: #ffffff;
	font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;
}

@keyframes scaleIn {
	0% { transform: scale(0); opacity: 0; }
	100% { transform: scale(1); opacity: 1; }
}

.success-title {
	font-size: 44rpx;
	font-weight: 700;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	margin-bottom: 16rpx;
	line-height: 56rpx;
}

.success-desc {
	font-size: 28rpx;
	color: #424656;
	text-align: center;
	line-height: 40rpx;
}

/* 订单信息卡片 */
.info-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 24rpx;
	padding: 32rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	border: 2rpx solid rgba(194, 198, 216, 0.3);
	margin-bottom: 48rpx;
}

.info-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16rpx 0;
}

.info-row-border {
	border-bottom: 2rpx solid rgba(194, 198, 216, 0.2);
}

.info-label {
	font-size: 24rpx;
	color: #424656;
}

.info-value {
	font-size: 28rpx;
	color: #0b1c30;
}

.info-value-bold {
	font-weight: 600;
}

.info-value-primary {
	font-size: 36rpx;
	font-weight: 600;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.eta-box {
	background-color: #eff4ff;
	border-radius: 16rpx;
	padding: 32rpx;
	margin-top: 32rpx;
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.eta-icon-wrap {
	background-color: rgba(0, 80, 203, 0.1);
	padding: 16rpx;
	border-radius: 9999rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.eta-icon {
	font-size: 40rpx;
	color: #0050cb;
}

.eta-text-block {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.eta-label {
	font-size: 24rpx;
	color: #424656;
}

.eta-value {
	font-size: 28rpx;
	font-weight: 600;
	color: #0050cb;
}

/* 促销 Banner */
.promo-banner {
	width: 100%;
	height: 256rpx;
	border-radius: 24rpx;
	overflow: hidden;
	background-color: #0066ff;
	position: relative;
	margin-bottom: 80rpx;
}

.promo-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	opacity: 0.4;
	mix-blend-mode: overlay;
}

.promo-content {
	position: absolute;
	bottom: 32rpx;
	left: 32rpx;
	z-index: 2;
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.promo-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.promo-desc {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.9);
}

/* 操作按钮 */
.action-block {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.primary-btn {
	width: 100%;
	height: 96rpx;
	background-color: #0050cb;
	border-radius: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 80, 203, 0.2);
	transition: transform 0.15s;
}

.primary-btn:active {
	transform: scale(0.95);
}

.primary-btn-icon {
	font-size: 36rpx;
	color: #ffffff;
}

.primary-btn-text {
	font-size: 36rpx;
	font-weight: 600;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.outline-btn {
	width: 100%;
	height: 96rpx;
	border: 4rpx solid #0050cb;
	border-radius: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	transition: transform 0.15s;
}

.outline-btn:active {
	transform: scale(0.95);
}

.outline-btn-text {
	font-size: 36rpx;
	font-weight: 600;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

/* 五彩纸屑 */
.confetti-layer {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	z-index: 10;
	overflow: hidden;
}

.confetti-piece {
	position: absolute;
	top: -40rpx;
	animation: fall linear infinite;
}

@keyframes fall {
	0% {
		transform: translateY(0) rotate(0deg);
		opacity: 1;
	}
	100% {
		transform: translateY(120vh) rotate(720deg);
		opacity: 0;
	}
}
</style>
