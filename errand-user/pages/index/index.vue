<template>
	<view class="page">
		<!-- Top App Bar -->
		<view class="top-bar">
			<view class="logo-area">
				<text class="logo-icon">⚡</text>
				<text class="logo-text">同城跑腿</text>
			</view>
			<view class="notif-btn">
				<text class="notif-icon">🔔</text>
			</view>
		</view>

		<scroll-view scroll-y class="content" :show-scrollbar="false">
			<!-- Search Bar -->
			<view class="section search-section">
				<view class="search-bar">
					<text class="search-icon">🔍</text>
					<input class="search-input" placeholder="搜服务、查订单、问客服..." />
				</view>
			</view>

			<!-- Promotion Banner -->
			<view class="section promo-section">
				<view class="promo-banner">
					<view class="promo-content">
						<view class="promo-tag">新人首单立减</view>
						<text class="promo-title">跑腿特惠日</text>
						<text class="promo-desc">全城配送 30 分钟必达</text>
					</view>
					<view class="promo-img"></view>
				</view>
			</view>

			<!-- Service Categories -->
			<view class="section">
				<view class="section-header">
					<text class="section-title">核心服务</text>
					<text class="section-link">查看全部</text>
				</view>
				<view class="service-grid">
					<view class="service-card" @tap="goBuy">
						<view class="service-icon icon-primary">
							<text>📦</text>
						</view>
						<text class="service-name">帮我送</text>
						<text class="service-desc">文件/鲜花/数码</text>
					</view>
					<view class="service-card" @tap="goSend">
						<view class="service-icon icon-secondary">
							<text>🛒</text>
						</view>
						<text class="service-name">帮我买</text>
						<text class="service-desc">代购咖啡/药品</text>
					</view>
				</view>
			</view>

			<!-- Recent Addresses -->
			<view class="section">
				<text class="section-title">常用地址</text>
				<view class="address-card">
					<view class="address-item">
						<view class="addr-icon addr-home">
							<text>🏠</text>
						</view>
						<view class="addr-info">
							<view class="addr-name-row">
								<text class="addr-name">家</text>
								<text class="addr-phone">李先生 138****0001</text>
							</view>
							<text class="addr-detail">上海市静安区南京西路1266号恒隆广场</text>
						</view>
						<text class="addr-arrow">›</text>
					</view>
					<view class="address-item">
						<view class="addr-icon addr-work">
							<text>💼</text>
						</view>
						<view class="addr-info">
							<view class="addr-name-row">
								<text class="addr-name">公司</text>
								<text class="addr-phone">李先生 138****0001</text>
							</view>
							<text class="addr-detail">上海市浦东新区陆家嘴世纪大道8号</text>
						</view>
						<text class="addr-arrow">›</text>
					</view>
				</view>
			</view>

			<!-- Map Quick Look -->
			<view class="section">
				<view class="map-card">
					<view class="map-bg"></view>
					<view class="map-badge">
						<view class="pulse-dot"></view>
						<text class="map-text">2,410 名跑腿员在线</text>
					</view>
				</view>
			</view>

			<view style="height: 100rpx;"></view>
		</scroll-view>

		<!-- FAB -->
		<view class="fab" @tap="goBuy">
			<text class="fab-icon">+</text>
		</view>

		<!-- Bottom Nav -->
		<BottomNav :current="0" />
	</view>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'

export default {
	components: { BottomNav },
	methods: {
		goBuy() {
			uni.navigateTo({ url: '/pages/errand/buy' })
		},
		goSend() {
			uni.navigateTo({ url: '/pages/errand/send' })
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
	font-size: 28px;
	color: #0050cb;
}

.logo-text {
	font-size: 22px;
	font-weight: 700;
	color: #0050cb;
}

.notif-btn {
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
}

.notif-icon {
	font-size: 20px;
	color: #424656;
}

.content {
	flex: 1;
	padding-top: 72px;
	padding-bottom: 100px;
}

.section {
	padding: 0 16px;
	margin-bottom: 24px;
}

.search-section {
	margin-bottom: 16px;
}

.search-bar {
	display: flex;
	align-items: center;
	height: 48px;
	background: #eff4ff;
	border-radius: 12px;
	padding: 0 16px;
	gap: 12px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
}

.search-icon {
	font-size: 18px;
	color: #727687;
}

.search-input {
	flex: 1;
	background: transparent;
	font-size: 14px;
	color: #0b1c30;
}

.promo-section {
	margin-bottom: 24px;
}

.promo-banner {
	position: relative;
	width: 100%;
	height: 160px;
	border-radius: 12px;
	overflow: hidden;
	background: linear-gradient(to right, #0050cb, #0066ff);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.promo-content {
	position: relative;
	z-index: 2;
	padding: 24px;
	display: flex;
	flex-direction: column;
	color: #ffffff;
}

.promo-tag {
	align-self: flex-start;
	background: rgba(255, 255, 255, 0.2);
	padding: 4px 8px;
	border-radius: 8px;
	font-size: 12px;
	margin-bottom: 8px;
}

.promo-title {
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 4px;
}

.promo-desc {
	font-size: 14px;
	opacity: 0.9;
}

.promo-img {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 50%;
	background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
	opacity: 0.4;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 8px;
}

.section-title {
	font-size: 18px;
	font-weight: 600;
	color: #0b1c30;
}

.section-link {
	font-size: 12px;
	font-weight: 700;
	color: #0050cb;
}

.service-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px;
}

.service-card {
	background: #ffffff;
	border-radius: 12px;
	padding: 20px;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	gap: 4px;
	height: 144px;
	transition: transform 0.2s ease;
}

.service-card:active {
	transform: scale(0.98);
}

.service-icon {
	width: 40px;
	height: 40px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 8px;
}

.icon-primary {
	background: rgba(0, 80, 203, 0.1);
	color: #0050cb;
}

.icon-secondary {
	background: rgba(213, 227, 253, 0.5);
	color: #515f74;
}

.service-name {
	font-size: 18px;
	font-weight: 600;
	color: #0b1c30;
}

.service-desc {
	font-size: 12px;
	color: #424656;
}

.address-card {
	background: #ffffff;
	border-radius: 12px;
	border: 1px solid rgba(194, 198, 216, 0.2);
	overflow: hidden;
}

.address-item {
	display: flex;
	align-items: center;
	padding: 16px;
	gap: 16px;
	border-bottom: 1px solid rgba(194, 198, 216, 0.2);
}

.address-item:last-child {
	border-bottom: none;
}

.addr-icon {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	font-size: 18px;
}

.addr-home {
	background: #eff4ff;
	color: #0050cb;
}

.addr-work {
	background: #eff4ff;
	color: #515f74;
}

.addr-info {
	flex: 1;
	min-width: 0;
}

.addr-name-row {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 4px;
}

.addr-name {
	font-size: 14px;
	font-weight: 700;
	color: #0b1c30;
}

.addr-phone {
	font-size: 12px;
	color: #727687;
}

.addr-detail {
	font-size: 14px;
	color: #424656;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.addr-arrow {
	font-size: 18px;
	color: #727687;
}

.map-card {
	border-radius: 12px;
	overflow: hidden;
	height: 128px;
	position: relative;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.map-bg {
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #e5eeff 0%, #d3e4fe 50%, #e5eeff 100%);
	position: relative;
}

.map-bg::before {
	content: '';
	position: absolute;
	top: 20%;
	left: 10%;
	width: 30%;
	height: 40%;
	background: rgba(0, 80, 203, 0.1);
	border-radius: 20px;
}

.map-bg::after {
	content: '';
	position: absolute;
	top: 40%;
	right: 15%;
	width: 25%;
	height: 30%;
	background: rgba(0, 80, 203, 0.08);
	border-radius: 20px;
}

.map-badge {
	position: absolute;
	bottom: 12px;
	left: 16px;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(8px);
	padding: 6px 12px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
	border: 1px solid rgba(194, 198, 216, 0.3);
}

.pulse-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #22c55e;
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.6; }
}

.map-text {
	font-size: 12px;
	font-weight: 700;
	color: #0b1c30;
}

.fab {
	position: fixed;
	right: 24px;
	bottom: 88px;
	width: 56px;
	height: 56px;
	background: #0050cb;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8px 24px rgba(0, 80, 203, 0.3);
	z-index: 998;
}

.fab-icon {
	font-size: 32px;
	color: #ffffff;
	font-weight: 300;
}
</style>
