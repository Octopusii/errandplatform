<template>
	<view class="page">
		<!-- Top App Bar -->
		<view class="top-bar">
			<text class="top-brand">跑腿代办</text>
			<view class="notif-btn">
				<text class="notif-icon">🔔</text>
			</view>
		</view>

		<scroll-view scroll-y class="content" :show-scrollbar="false">
			<!-- Success Visual Section -->
			<view class="success-section">
				<view class="success-icon">
					<text class="icon-check">✓</text>
				</view>
				<text class="success-title">下单成功</text>
				<text class="success-desc">您的订单已提交，跑腿员正飞奔而来</text>
			</view>

			<!-- Order Information Card -->
			<view class="info-card">
				<view class="info-row">
					<text class="info-label">订单编号</text>
					<text class="info-value">PA202310248892</text>
				</view>
				<view class="info-row">
					<text class="info-label">支付方式</text>
					<text class="info-value">微信支付</text>
				</view>
				<view class="info-row">
					<text class="info-label">支付金额</text>
					<text class="info-value amount">¥ 15.00</text>
				</view>
				<view class="eta-box">
					<view class="eta-icon">📅</view>
					<view>
						<text class="eta-label">预计接单时间</text>
						<text class="eta-value">3分钟内</text>
					</view>
				</view>
			</view>

			<!-- Promotional Banner -->
			<view class="promo-banner">
				<view class="promo-bg"></view>
				<view class="promo-content">
					<text class="promo-title">新人首单免运费</text>
					<text class="promo-desc">邀请好友，再得5元券</text>
				</view>
			</view>

			<!-- Action Buttons -->
			<view class="action-buttons">
				<view class="btn btn-primary" @tap="goOrder">
					<text class="btn-icon">📋</text>
					<text>查看订单</text>
				</view>
				<view class="btn btn-outline" @tap="goHome">返回首页</view>
			</view>

			<view style="height: 100rpx;"></view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	methods: {
		goOrder() {
			uni.reLaunch({ url: '/pages/order/list' })
		},
		goHome() {
			uni.reLaunch({ url: '/pages/index/index' })
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
	border-bottom: 1px solid #c2c6d8;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
}

.top-brand {
	font-size: 18px;
	font-weight: 700;
	color: #0b1c30;
}

.notif-btn {
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.notif-icon {
	font-size: 20px;
	color: #0050cb;
}

.content {
	flex: 1;
	padding-top: 96px;
	padding-bottom: 32px;
}

.success-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 32px;
	padding: 0 16px;
}

.success-icon {
	width: 96px;
	height: 96px;
	background: #0066ff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 16px;
	box-shadow: 0 8px 24px rgba(0, 102, 255, 0.2);
	animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes scaleIn {
	0% { transform: scale(0); opacity: 0; }
	100% { transform: scale(1); opacity: 1; }
}

.icon-check {
	font-size: 48px;
	font-weight: 700;
	color: #ffffff;
}

.success-title {
	font-size: 22px;
	font-weight: 700;
	color: #0b1c30;
	margin-bottom: 8px;
}

.success-desc {
	font-size: 14px;
	color: #424656;
	text-align: center;
}

.info-card {
	margin: 0 16px 16px;
	background: #ffffff;
	border-radius: 12px;
	padding: 16px;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.info-row {
	display: flex;
	justify-content: space-between;
	padding: 8px 0;
	border-bottom: 1px solid rgba(194, 198, 216, 0.2);
}

.info-row:last-of-type {
	border-bottom: none;
}

.info-label {
	font-size: 12px;
	color: #424656;
}

.info-value {
	font-size: 14px;
	color: #0b1c30;
	font-weight: 500;
}

.info-value.amount {
	color: #0050cb;
	font-size: 18px;
	font-weight: 600;
}

.eta-box {
	background: #eff4ff;
	border-radius: 8px;
	padding: 16px;
	margin-top: 16px;
	display: flex;
	align-items: center;
	gap: 12px;
}

.eta-icon {
	width: 36px;
	height: 36px;
	background: rgba(0, 80, 203, 0.1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
}

.eta-label {
	font-size: 12px;
	color: #424656;
	display: block;
}

.eta-value {
	font-size: 14px;
	font-weight: 600;
	color: #0050cb;
}

.promo-banner {
	margin: 0 16px 16px;
	height: 128px;
	border-radius: 12px;
	overflow: hidden;
	background: #0066ff;
	position: relative;
}

.promo-bg {
	position: absolute;
	inset: 0;
	background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
	opacity: 0.4;
}

.promo-content {
	position: relative;
	z-index: 2;
	bottom: 16px;
	left: 16px;
	color: #ffffff;
}

.promo-title {
	font-size: 18px;
	font-weight: 600;
	display: block;
}

.promo-desc {
	font-size: 12px;
	opacity: 0.9;
}

.action-buttons {
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 0 16px;
}

.btn {
	height: 48px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	font-size: 18px;
	font-weight: 600;
}

.btn-primary {
	background: #0050cb;
	color: #ffffff;
	box-shadow: 0 8px 24px rgba(0, 80, 203, 0.2);
}

.btn-outline {
	border: 2px solid #0050cb;
	color: #0050cb;
	background: transparent;
}

.btn-icon {
	font-size: 18px;
}
</style>
