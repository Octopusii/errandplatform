<template>
	<view class="container">
		<!-- 地图区域 -->
		<view class="map-section">
			<image class="map-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_JzEKN-GssBGh_NIEVe_yag59_hUMViKUiJX763elGTdt32nGGsi195QiOc8EtAQ5J7DLYPS7Lm88P-tnJHpH0KyFKQ7umo25NEoKr-eHxvy0GTVrz6f4uQuribMUgByZKzo_2yLPRy7Am-a3wfm4ACh2etFPQbxWTM_25178VBFeCwHZS0w6nwNYLxNJD29jwAUHZ7A3lulcs5Y_PWtiED1YyfLZc-qzIUvblKuTamWI7zpxo3Tv8g1x35pBipfsTAvZPUrSbMo8" mode="aspectFill"></image>
			<view class="map-overlay">
				<view class="earning-display">
					<text class="earning-label">预计收入</text>
					<view class="earning-amount">
						<text class="currency">¥</text>
						<text class="amount">28.50</text>
					</view>
				</view>
				<view class="distance-display">
					<text class="distance-label">配送总里程</text>
					<text class="distance-value">5.2km</text>
				</view>
			</view>
		</view>

		<!-- 路线详情卡片 -->
		<view class="route-card">
			<!-- 取货点 -->
			<view class="route-item">
				<view class="route-icons">
					<view class="icon-circle primary">
						<text>🌿</text>
					</view>
					<view class="route-line"></view>
				</view>
				<view class="route-content">
					<view class="route-header">
						<view class="route-badge primary">取货</view>
						<text class="route-distance">距你 800m</text>
					</view>
					<text class="route-title">愚园路 108 号绿地商务大厦</text>
					<text class="route-desc">15楼 1502室 (前台取件)</text>
				</view>
			</view>

			<!-- 送货点 -->
			<view class="route-item">
				<view class="route-icons">
					<view class="icon-circle secondary">
						<text>📍</text>
					</view>
				</view>
				<view class="route-content">
					<view class="route-header">
						<view class="route-badge secondary">送货</view>
						<text class="route-distance">距取货点 4.4km</text>
					</view>
					<text class="route-title">南京西路 1618 号久光百货</text>
					<text class="route-desc">B1层 停车场出口旁</text>
				</view>
			</view>
		</view>

		<!-- 订单要求 -->
		<view class="requirements-grid">
			<view class="requirement-card">
				<view class="requirement-header">
					<text class="requirement-icon">📦</text>
					<text class="requirement-label">物品信息</text>
				</view>
				<text class="requirement-value">鲜花 / 3kg</text>
			</view>
			<view class="requirement-card">
				<view class="requirement-header">
					<text class="requirement-icon">⏰</text>
					<text class="requirement-label">送达要求</text>
				</view>
				<text class="requirement-value">14:30 前</text>
			</view>
		</view>

		<!-- 订单备注 -->
		<view class="remarks-section">
			<view class="remarks-card">
				<view class="remarks-header">
					<text class="remarks-icon">📝</text>
					<text class="remarks-label">订单备注</text>
				</view>
				<text class="remarks-text">"请小心拿放，是易碎礼品。由于写字楼电梯较慢，建议走货梯。到达前请先电话联系收货人。"</text>
			</view>
		</view>

		<!-- 奖励提示 -->
		<view class="incentive-banner">
			<view class="incentive-content">
				<text class="incentive-title">准时必达奖</text>
				<text class="incentive-desc">准时送达可额外获得 ¥2.00 奖励</text>
			</view>
			<view class="incentive-icon">
				<view class="clock-animation">
					<text class="clock-emoji">🕐</text>
				</view>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="grab-button" @click="grabOrder">
				<text class="grab-icon">⚡</text>
				<text class="grab-text">立即抢单</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		grabOrder() {
			uni.showLoading({
				title: '抢单中...'
			});

			setTimeout(() => {
				uni.hideLoading();
				uni.navigateTo({
					url: '/pages/order-success/index'
				});
			}, 1200);
		}
	}
}
</script>

<style scoped>
.container {
	background-color: #f8f9ff;
	min-height: 100vh;
	padding-bottom: 100px;
}

.map-section {
	position: relative;
	width: 100%;
	height: 288px;
}

.map-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.map-overlay {
	position: absolute;
	bottom: 16px;
	left: 16px;
	right: 16px;
	background-color: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(10px);
	padding: 16px;
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.earning-display {
	display: flex;
	flex-direction: column;
}

.earning-label {
	font-size: 12px;
	color: #434654;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.earning-amount {
	display: flex;
	align-items: baseline;
	gap: 2px;
	margin-top: 4px;
}

.currency {
	font-size: 22px;
	font-weight: 700;
	color: #003b9a;
}

.amount {
	font-size: 22px;
	font-weight: 700;
	color: #003b9a;
}

.distance-display {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.distance-label {
	font-size: 12px;
	color: #434654;
}

.distance-value {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
	margin-top: 4px;
}

.route-card {
	background-color: #ffffff;
	border-radius: 16px;
	padding: 16px;
	margin: -16px 16px 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	position: relative;
	z-index: 10;
}

.route-item {
	display: flex;
	gap: 16px;
	margin-bottom: 24px;
}

.route-item:last-child {
	margin-bottom: 0;
}

.route-icons {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	margin-top: 4px;
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

.icon-circle.primary {
	background-color: #003b9a;
	color: #ffffff;
}

.icon-circle.secondary {
	background-color: #515f74;
	color: #ffffff;
}

.route-line {
	width: 1px;
	height: 48px;
	background: linear-gradient(to bottom, rgba(0, 59, 154, 0.3), transparent);
}

.route-content {
	flex: 1;
}

.route-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 8px;
}

.route-badge {
	font-size: 12px;
	font-weight: 500;
	padding: 4px 8px;
	border-radius: 9999px;
}

.route-badge.primary {
	background-color: #0050cb;
	color: #c1cfff;
}

.route-badge.secondary {
	background-color: #d2e1fa;
	color: #556379;
}

.route-distance {
	font-size: 12px;
	color: #434654;
}

.route-title {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
	display: block;
	margin-bottom: 4px;
}

.route-desc {
	font-size: 14px;
	color: #434654;
}

.requirements-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 12px;
	padding: 0 16px;
	margin-bottom: 16px;
}

.requirement-card {
	background-color: #f3f3fd;
	padding: 16px;
	border-radius: 16px;
}

.requirement-header {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 8px;
	color: #556379;
}

.requirement-icon {
	font-size: 20px;
}

.requirement-label {
	font-size: 12px;
	font-weight: 500;
}

.requirement-value {
	font-size: 16px;
	font-weight: 400;
	color: #191b23;
}

.remarks-section {
	padding: 0 16px;
	margin-bottom: 16px;
}

.remarks-card {
	background-color: #f3f3fd;
	padding: 16px;
	border-radius: 16px;
}

.remarks-header {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 8px;
	color: #556379;
}

.remarks-icon {
	font-size: 20px;
}

.remarks-label {
	font-size: 12px;
	font-weight: 500;
}

.remarks-text {
	font-size: 14px;
	color: #434654;
	line-height: 24px;
}

.incentive-banner {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px;
	margin: 0 16px;
	background: linear-gradient(90deg, rgba(0, 80, 203, 0.2), rgba(0, 80, 203, 0.1));
	border-radius: 16px;
	padding: 16px;
}

.incentive-content {
	flex: 1;
}

.incentive-title {
	font-size: 18px;
	font-weight: 600;
	color: #003b9a;
	display: block;
	margin-bottom: 4px;
}

.incentive-desc {
	font-size: 12px;
	color: #556379;
}

.incentive-icon {
	width: 64px;
	height: 64px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.clock-animation {
	animation: rotate 10s linear infinite;
}

.clock-emoji {
	font-size: 48px;
	color: #003b9a;
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(248, 249, 255, 0.9);
	backdrop-filter: blur(10px);
	padding: 16px;
	box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
	border-top: 1px solid #c3c6d6;
}

.grab-button {
	background-color: #003b9a;
	color: #ffffff;
	padding: 14px;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	font-size: 18px;
	font-weight: 600;
	transition: transform 0.2s;
}

.grab-button:active {
	transform: scale(0.95);
}

.grab-icon {
	font-size: 18px;
}

.grab-text {
	font-size: 18px;
	font-weight: 600;
}
</style>