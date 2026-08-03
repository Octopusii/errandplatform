<template>
	<view class="page">
		<!-- Top App Bar -->
		<view class="top-bar">
			<text class="top-title">我的</text>
			<view class="top-actions">
				<text class="action-icon">⚙️</text>
				<text class="action-icon">🔔</text>
			</view>
		</view>

		<scroll-view scroll-y class="content" :show-scrollbar="false">
			<!-- Profile Header (Unlogged) -->
			<view class="login-card" @tap="showToast('请先登录/注册')">
				<view class="login-avatar">
					<text class="avatar-icon">👤</text>
				</view>
				<view class="login-info">
					<text class="login-title">点击登录/注册</text>
					<text class="login-desc">登录后体验更多跑腿服务</text>
				</view>
				<text class="login-arrow">›</text>
				<view class="bg-decor"></view>
			</view>

			<!-- Stats Grid -->
			<view class="stats-grid">
				<view class="stat-card" @tap="showToast()">
					<text class="stat-value">--</text>
					<text class="stat-label">优惠券</text>
				</view>
				<view class="stat-card" @tap="showToast()">
					<text class="stat-value">--</text>
					<text class="stat-label">余额</text>
				</view>
				<view class="stat-card" @tap="showToast()">
					<text class="stat-value">--</text>
					<text class="stat-label">积分</text>
				</view>
			</view>

			<!-- Order Summary Group -->
			<view class="order-group">
				<view class="order-group-header">
					<text class="group-title">我的订单</text>
					<view class="group-link" @tap="showToast()">
						<text>全部订单</text>
						<text class="link-arrow">›</text>
					</view>
				</view>
				<view class="order-tabs">
					<view class="order-tab" @tap="showToast()">
						<view class="tab-icon">📋</view>
						<text class="tab-label">待支付</text>
					</view>
					<view class="order-tab" @tap="showToast()">
						<view class="tab-icon">📦</view>
						<text class="tab-label">进行中</text>
					</view>
					<view class="order-tab" @tap="showToast()">
						<view class="tab-icon">💬</view>
						<text class="tab-label">待评价</text>
					</view>
					<view class="order-tab" @tap="showToast()">
						<view class="tab-icon">📜</view>
						<text class="tab-label">退款/售后</text>
					</view>
				</view>
			</view>

			<!-- Function List -->
			<view class="menu-card">
				<view class="menu-item" @tap="showToast()">
					<view class="menu-icon icon-box">📍</view>
					<text class="menu-label">地址管理</text>
					<text class="menu-arrow">›</text>
				</view>
				<view class="menu-item" @tap="showToast()">
					<view class="menu-icon icon-box">🎟️</view>
					<text class="menu-label">领券中心</text>
					<view class="menu-right">
						<view class="new-badge">New</view>
						<text class="menu-arrow">›</text>
					</view>
				</view>
				<view class="menu-item" @tap="showToast()">
					<view class="menu-icon icon-box">🎧</view>
					<text class="menu-label">在线客服</text>
					<text class="menu-arrow">›</text>
				</view>
				<view class="menu-item" @tap="showToast()">
					<view class="menu-icon icon-box">🛡️</view>
					<text class="menu-label">协议与隐私</text>
					<text class="menu-arrow">›</text>
				</view>
			</view>

			<!-- Become Runner Banner -->
			<view class="runner-banner" @tap="showToast()">
				<view class="banner-content">
					<text class="banner-title">成为跑腿员</text>
					<text class="banner-desc">多劳多得，灵活自由</text>
				</view>
				<view class="banner-arrow">
					<text>→</text>
				</view>
				<view class="banner-decor"></view>
			</view>

			<view style="height: 100rpx;"></view>
		</scroll-view>

		<!-- Bottom Nav -->
		<BottomNav :current="2" />

		<!-- Toast -->
		<view class="toast" :class="{ show: toastShow }">
			<text class="toast-icon">ℹ️</text>
			<text class="toast-text">{{ toastMsg }}</text>
		</view>
	</view>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'

export default {
	components: { BottomNav },
	data() {
		return {
			toastShow: false,
			toastMsg: '请先登录后操作'
		}
	},
	methods: {
		showToast(msg) {
			this.toastMsg = msg || '请先登录后操作'
			this.toastShow = true
			setTimeout(() => {
				this.toastShow = false
			}, 2500)
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

.top-title {
	font-size: 22px;
	font-weight: 700;
	color: #0b1c30;
}

.top-actions {
	display: flex;
	gap: 16px;
}

.action-icon {
	font-size: 20px;
	color: #424656;
}

.content {
	flex: 1;
	padding-top: 72px;
	padding-bottom: 100px;
}

.login-card {
	margin: 16px;
	background: #ffffff;
	border-radius: 12px;
	padding: 20px;
	display: flex;
	align-items: center;
	gap: 16px;
	border: 1px solid #e2e8f0;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	position: relative;
	overflow: hidden;
}

.login-avatar {
	width: 64px;
	height: 64px;
	border-radius: 50%;
	background: #e5eeff;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid #ffffff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.avatar-icon {
	font-size: 36px;
	color: #727687;
}

.login-info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.login-title {
	font-size: 20px;
	font-weight: 600;
	color: #0b1c30;
}

.login-desc {
	font-size: 14px;
	color: #424656;
	margin-top: 4px;
}

.login-arrow {
	font-size: 24px;
	color: #727687;
}

.bg-decor {
	position: absolute;
	right: -40px;
	top: -40px;
	width: 100px;
	height: 100px;
	background: rgba(0, 80, 203, 0.05);
	border-radius: 50%;
}

.stats-grid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 12px;
	padding: 0 16px;
	margin-bottom: 16px;
}

.stat-card {
	background: #ffffff;
	border-radius: 12px;
	padding: 16px;
	text-align: center;
	border: 1px solid #e2e8f0;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.stat-value {
	font-size: 18px;
	font-weight: 600;
	color: #0050cb;
	display: block;
}

.stat-label {
	font-size: 12px;
	color: #424656;
	margin-top: 4px;
	display: block;
}

.order-group {
	margin: 0 16px 16px;
	background: #ffffff;
	border-radius: 12px;
	border: 1px solid #e2e8f0;
	overflow: hidden;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.order-group-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 16px;
	border-bottom: 1px solid rgba(194, 198, 216, 0.3);
}

.group-title {
	font-size: 18px;
	font-weight: 600;
	color: #0b1c30;
}

.group-link {
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 12px;
	color: #0050cb;
	font-weight: 500;
}

.link-arrow {
	font-size: 14px;
}

.order-tabs {
	display: flex;
	justify-content: space-around;
	padding: 16px 0;
}

.order-tab {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
}

.tab-icon {
	width: 40px;
	height: 40px;
	background: #e5eeff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
}

.tab-label {
	font-size: 12px;
	color: #0b1c30;
	font-weight: 500;
}

.menu-card {
	margin: 0 16px 16px;
	background: #ffffff;
	border-radius: 12px;
	border: 1px solid #e2e8f0;
	overflow: hidden;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 16px;
	gap: 12px;
	border-bottom: 1px solid rgba(194, 198, 216, 0.3);
}

.menu-item:last-child {
	border-bottom: none;
}

.icon-box {
	width: 40px;
	height: 40px;
	background: rgba(0, 80, 203, 0.05);
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
}

.menu-label {
	flex: 1;
	font-size: 16px;
	color: #0b1c30;
}

.menu-arrow {
	font-size: 18px;
	color: #727687;
}

.menu-right {
	display: flex;
	align-items: center;
	gap: 8px;
}

.new-badge {
	background: #ba1a1a;
	color: #ffffff;
	font-size: 10px;
	padding: 2px 6px;
	border-radius: 4px;
}

.runner-banner {
	margin: 0 16px;
	height: 96px;
	border-radius: 12px;
	background: #0066ff;
	padding: 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 8px 24px rgba(0, 102, 255, 0.2);
	position: relative;
	overflow: hidden;
}

.banner-content {
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
}

.banner-title {
	font-size: 18px;
	font-weight: 600;
	color: #ffffff;
}

.banner-desc {
	font-size: 12px;
	color: rgba(255, 255, 255, 0.8);
}

.banner-arrow {
	position: relative;
	z-index: 2;
	width: 32px;
	height: 32px;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
}

.banner-decor {
	position: absolute;
	right: -16px;
	bottom: -16px;
	width: 80px;
	height: 80px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 50%;
}

.toast {
	position: fixed;
	bottom: 200px;
	left: 50%;
	transform: translateX(-50%) scale(0.9);
	background: #213145;
	color: #eaf1ff;
	padding: 12px 24px;
	border-radius: 99px;
	display: flex;
	align-items: center;
	gap: 12px;
	box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
	opacity: 0;
	transition: all 0.3s ease;
	z-index: 1000;
	pointer-events: none;
}

.toast.show {
	opacity: 1;
	transform: translateX(-50%) scale(1);
}

.toast-icon {
	font-size: 16px;
	color: #dae1ff;
}

.toast-text {
	font-size: 14px;
}
</style>
