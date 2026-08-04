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
			<!-- User Info Card -->
			<view class="user-card">
				<view class="user-avatar">
					<text class="avatar-icon">👤</text>
				</view>
				<view class="user-info">
					<text class="user-name">张大伟</text>
					<text class="user-phone">138 **** 8888</text>
					<view class="user-badge">黄金会员</view>
				</view>
				<text class="user-arrow">›</text>
				<view class="bg-decor"></view>
			</view>

			<!-- Bento Grid: Balance / Coupon / Points -->
			<view class="stats-grid">
				<view class="stat-card">
					<text class="stat-value">¥248.50</text>
					<text class="stat-label">余额</text>
				</view>
				<view class="stat-card">
					<text class="stat-value">6</text>
					<text class="stat-label">优惠券</text>
				</view>
				<view class="stat-card">
					<text class="stat-value">1,240</text>
					<text class="stat-label">积分</text>
				</view>
			</view>

			<!-- Promotion Banner -->
			<view class="promo-card">
				<view class="promo-overlay"></view>
				<view class="promo-text">
					<text class="promo-title">新客专享礼</text>
					<text class="promo-desc">分享立得5元跑腿红包</text>
				</view>
			</view>

			<!-- Menu List -->
			<view class="menu-card">
				<view class="menu-item">
					<view class="menu-icon icon-box">
						<text>📍</text>
					</view>
					<text class="menu-label">地址管理</text>
					<text class="menu-arrow">›</text>
				</view>
				<view class="menu-item">
					<view class="menu-icon icon-box">
						<text>🎟️</text>
					</view>
					<text class="menu-label">优惠券</text>
					<view class="menu-right">
						<text class="menu-tag">2张即将过期</text>
						<text class="menu-arrow">›</text>
					</view>
				</view>
				<view class="menu-item">
					<view class="menu-icon icon-box">
						<text>🎧</text>
					</view>
					<text class="menu-label">客服中心</text>
					<text class="menu-arrow">›</text>
				</view>
				<view class="menu-item">
					<view class="menu-icon icon-box">
						<text>ℹ️</text>
					</view>
					<text class="menu-label">关于我们</text>
					<text class="menu-arrow">›</text>
				</view>
			</view>

			<!-- Logout Button -->
			<view class="logout-btn">退出登录</view>

			<!-- Version Info -->
			<view class="version-info">版本号 v2.4.0</view>

			<view style="height: 100rpx;"></view>
		</scroll-view>

		<!-- Bottom Nav -->
		<BottomNav :current="2" />
	</view>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'

export default {
	components: { BottomNav }
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

.user-card {
	margin: 16px;
	background: #ffffff;
	border-radius: 12px;
	padding: 20px;
	display: flex;
	align-items: center;
	gap: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	border: 1px solid #e2e8f0;
	position: relative;
	overflow: hidden;
}

.user-avatar {
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
}

.user-info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.user-name {
	font-size: 20px;
	font-weight: 600;
	color: #0b1c30;
}

.user-phone {
	font-size: 14px;
	color: #424656;
	margin-top: 2px;
}

.user-badge {
	align-self: flex-start;
	margin-top: 4px;
	background: rgba(0, 80, 203, 0.1);
	color: #0050cb;
	font-size: 10px;
	font-weight: 700;
	padding: 2px 8px;
	border-radius: 4px;
}

.user-arrow {
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
	border: 1px solid rgba(194, 198, 216, 0.3);
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

.promo-card {
	margin: 0 16px 16px;
	height: 96px;
	border-radius: 12px;
	background: linear-gradient(135deg, #0050cb, #0066ff);
	position: relative;
	overflow: hidden;
	box-shadow: 0 8px 24px rgba(0, 80, 203, 0.2);
}

.promo-overlay {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 50%;
	background: linear-gradient(to left, rgba(255, 255, 255, 0.15), transparent);
}

.promo-text {
	position: relative;
	z-index: 2;
	padding: 16px;
	display: flex;
	flex-direction: column;
	color: #ffffff;
}

.promo-title {
	font-size: 18px;
	font-weight: 600;
}

.promo-desc {
	font-size: 12px;
	opacity: 0.9;
}

.menu-card {
	margin: 0 16px 16px;
	background: #ffffff;
	border-radius: 12px;
	border: 1px solid rgba(194, 198, 216, 0.3);
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

.menu-tag {
	font-size: 12px;
	color: #ba1a1a;
	font-weight: 500;
}

.logout-btn {
	margin: 0 16px;
	background: #ffffff;
	border: 1px solid #c2c6d8;
	border-radius: 12px;
	padding: 16px;
	text-align: center;
	font-size: 18px;
	font-weight: 600;
	color: #ba1a1a;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.version-info {
	text-align: center;
	padding: 16px;
	font-size: 12px;
	color: #727687;
}
</style>
