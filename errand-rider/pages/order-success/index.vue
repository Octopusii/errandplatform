<template>
	<view class="container">
		<!-- 成功动画部分 -->
		<view class="success-section">
			<view class="success-icon-wrapper">
				<!-- 动画脉冲圈 -->
				<view class="pulse-ring"></view>
				<!-- 成功图标 -->
				<view class="success-icon">
					<text class="icon-emoji">✅</text>
				</view>
			</view>
			<text class="success-title">抢单成功！</text>
			<text class="success-desc">请尽快前往取货，以免订单超时</text>
		</view>

		<!-- 订单预览卡片 -->
		<view class="order-card">
			<view class="card-header">
				<view class="card-left">
					<view class="status-badge">待取货</view>
					<text class="merchant-name">星巴克 (南山科技园店)</text>
				</view>
				<view class="card-right">
					<text class="earning-label">预计配送收入</text>
					<text class="earning-amount">¥18.50</text>
				</view>
			</view>

			<view class="card-details">
				<view class="detail-item">
					<text class="detail-icon">📍</text>
					<view class="detail-content">
						<text class="detail-text">广东省深圳市南山区科苑路15号</text>
						<text class="detail-subtext">距离您 850m</text>
					</view>
				</view>

				<view class="detail-item">
					<text class="detail-icon">⏰</text>
					<text class="detail-text">请在 <text class="highlight">15:30</text> 前完成取货</text>
				</view>
			</view>

			<!-- 进度条 -->
			<view class="progress-bar">
				<view class="progress-fill active"></view>
				<view class="progress-fill"></view>
				<view class="progress-fill"></view>
			</view>
		</view>

		<!-- 操作按钮 -->
		<view class="action-buttons">
			<view class="primary-button" @click="navigateToPickup">
				<text class="button-icon">🧭</text>
				<text class="button-text">立即前往取货</text>
			</view>
			<view class="secondary-button" @click="viewOrderDetail">
				<text class="button-text">查看订单详情</text>
			</view>
		</view>

		<!-- 提示信息 -->
		<view class="tip-info">
			<text class="tip-icon">ℹ️</text>
			<text class="tip-text">取货时请核对订单号：#8829</text>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		navigateToPickup() {
			// 这里应该打开地图导航
			uni.showLoading({
				title: '正在开启地图...'
			});

			setTimeout(() => {
				uni.hideLoading();
				// 实际应该跳转到地图页面
				uni.navigateTo({
					url: '/pages/order-executing/index'
				});
			}, 2000);
		},
		viewOrderDetail() {
			uni.navigateTo({
				url: '/pages/order-executing/index'
			});
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