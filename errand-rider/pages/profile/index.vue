<template>
	<view class="container">
		<!-- 未登录状态 -->
		<view v-if="!isLoggedIn" class="unlogged-state">
			<!-- 头部卡片 -->
			<view class="header-card">
				<view class="avatar-placeholder">
					<text class="avatar-icon">👤</text>
				</view>
				<view class="welcome-text">
					<text class="welcome-title">Welcome to City Express</text>
					<text class="welcome-desc">登录开启您的高效配送之旅</text>
				</view>
				<view class="login-btn" @click="login">
					<text>登录 / 注册</text>
				</view>
			</view>

			<!-- 快速统计占位 -->
			<view class="stats-placeholder">
				<view class="stat-item">
					<text class="stat-value">--</text>
					<text class="stat-label">今日单数</text>
				</view>
				<view class="divider"></view>
				<view class="stat-item">
					<text class="stat-value">--</text>
					<text class="stat-label">预计收益</text>
				</view>
			</view>

			<!-- 工具菜单 -->
			<view class="utilities-section">
				<view class="utility-card">
					<view class="utility-item" @click="navigateTo('/pages/help/index')">
						<view class="utility-icon">
							<text>❓</text>
						</view>
						<text class="utility-text">帮助中心</text>
						<text class="utility-arrow">→</text>
					</view>
					<view class="utility-divider"></view>
					<view class="utility-item" @click="navigateTo('/pages/feedback/index')">
						<view class="utility-icon">
							<text>💬</text>
						</view>
						<text class="utility-text">意见反馈</text>
						<text class="utility-arrow">→</text>
					</view>
					<view class="utility-divider"></view>
					<view class="utility-item" @click="navigateTo('/pages/about/index')">
						<view class="utility-icon">
							<text>ℹ️</text>
						</view>
						<text class="utility-text">关于我们</text>
						<text class="utility-arrow">→</text>
					</view>
					<view class="utility-divider"></view>
					<view class="utility-item" @click="navigateTo('/pages/settings/index')">
						<view class="utility-icon">
							<text>⚙️</text>
						</view>
						<text class="utility-text">系统设置</text>
						<text class="utility-arrow">→</text>
					</view>
				</view>
			</view>

			<!-- 页脚 -->
			<view class="footer">
				<image class="footer-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHf2UasUaNgQA4KdU5XPIyGS2i0OZPjYuEeHSEP-EggiX_8FyJ7DuS8ISNXBKIV7KEQ3spbyY8cwrx6oNtaCXbXZ2V3BGg5T4e263VbkHWz7dINNeeStkfTaFt7-yW4T0Klo1LDDKAWRVaqbUpj8W0SERAzoWen2jrufJMkPG1ZzRRUWYh3OgWebhUh0_UWa0p2ETQ-EXaQDGnzyx1T9WSiGF4qPM8OsTh0HEV0mzbzI_M1-EcZA157TaDlpIH2LgYgXFZ4beO9iUT" mode="aspectFit"></image>
				<text class="footer-version">骑士配送端 v4.2.0</text>
				<text class="footer-copyright">© 2024 CITY EXPRESS LOGISTICS INC.</text>
			</view>
		</view>

		<!-- 已登录状态 -->
		<view v-else class="logged-state">
			<!-- 个人信息卡片 -->
			<view class="profile-header">
				<view class="profile-card">
					<view class="avatar-container">
						<image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk7CP8FHfHb4JyisMCqoMjzGvQKlbl0UD7DyWdI5mdFOAkCXnyjBDdsRi8s1MpH-ykukLxAULlW22uJ05rDkpvkKp8sx15FLHKE1-Bs9gO1ZMMvfYW3ujj950m-RdWF-M4Uc_K4KXkY7s8EH8QW9Z1ZNWDay9rW2xbfV56fvuavUxUptsxSGP7H5kMSFOHD_7En6DiiU5goG_RmHae2rLQG4dv2shoo4ER-zbJ0sKqLf4gF9jQUVi3mdkW3gYc4tHpuUFrhS3Ifld2" mode="aspectFill"></image>
						<view class="verified-badge">✓</view>
					</view>
					<view class="profile-info">
						<view class="name-row">
							<text class="profile-name">王大锤</text>
							<view class="level-badge">钻级骑士</view>
						</view>
						<text class="profile-id">ID: 88293410</text>
						<view class="rating-row">
							<view class="stars">
								<text class="star">⭐</text>
								<text class="star">⭐</text>
								<text class="star">⭐</text>
								<text class="star">⭐</text>
								<text class="star half">⭐</text>
							</view>
							<text class="rating-score">4.9</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 统计数据 -->
			<view class="stats-grid">
				<view class="stat-box">
					<text class="stat-label">今日预估</text>
					<view class="stat-value-row">
						<text class="currency">¥</text>
						<text class="stat-number">128.50</text>
					</view>
				</view>
				<view class="stat-box">
					<text class="stat-label">今日完单</text>
					<text class="stat-number">15</text>
				</view>
				<view class="stat-box">
					<text class="stat-label">准时率</text>
					<text class="stat-number">99%</text>
				</view>
			</view>

			<!-- 状态切换 -->
			<view class="status-card">
				<view class="status-info">
					<view class="status-indicator" :class="{ 'online': isOnline }"></view>
					<text class="status-text" :class="{ 'online': isOnline }">{{ isOnline ? '正在接单' : '当前离线' }}</text>
				</view>
				<view class="toggle-switch" @click="toggleOnline">
					<view class="toggle-thumb" :class="{ 'active': isOnline }"></view>
				</view>
			</view>

			<!-- 菜单列表 -->
			<view class="menu-list">
				<view class="menu-group">
					<view class="menu-item" @click="navigateTo('/pages/wallet/index')">
						<view class="menu-icon primary">
							<text>💳</text>
						</view>
						<text class="menu-text">我的钱包</text>
						<view class="menu-right">
							<text class="menu-value">¥2,450.00</text>
							<text class="menu-arrow">→</text>
						</view>
					</view>
					<view class="menu-item" @click="navigateTo('/pages/statistics/index')">
						<view class="menu-icon secondary">
							<text>📊</text>
						</view>
						<text class="menu-text">跑单统计</text>
						<text class="menu-arrow">→</text>
					</view>
				</view>

				<view class="menu-group">
					<view class="menu-item" @click="navigateTo('/pages/mall/index')">
						<view class="menu-icon tertiary">
							<text>🛍️</text>
						</view>
						<text class="menu-text">装备商城</text>
						<text class="menu-arrow">→</text>
					</view>
					<view class="menu-item" @click="navigateTo('/pages/training/index')">
						<view class="menu-icon primary">
							<text>🎓</text>
						</view>
						<text class="menu-text">骑士培训</text>
						<view class="menu-right">
							<view class="notification-dot"></view>
							<text class="menu-arrow">→</text>
						</view>
					</view>
				</view>

				<view class="menu-group">
					<view class="menu-item" @click="navigateTo('/pages/help/index')">
						<view class="menu-icon">
							<text>❓</text>
						</view>
						<text class="menu-text">帮助中心</text>
						<text class="menu-arrow">→</text>
					</view>
					<view class="menu-item" @click="navigateTo('/pages/settings/index')">
						<view class="menu-icon">
							<text>⚙️</text>
						</view>
						<text class="menu-text">设置</text>
						<text class="menu-arrow">→</text>
					</view>
				</view>
			</view>

			<!-- 退出登录按钮 -->
			<view class="logout-btn" @click="logout">
				<text>退出登录</text>
			</view>

			<!-- 本周收益趋势 -->
			<view class="earnings-chart">
				<text class="chart-title">本周收益趋势</text>
				<view class="chart-bars">
					<view class="chart-bar" style="height: 40%;"></view>
					<view class="chart-bar" style="height: 65%;"></view>
					<view class="chart-bar" style="height: 50%;"></view>
					<view class="chart-bar" style="height: 85%;"></view>
					<view class="chart-bar" style="height: 35%;"></view>
					<view class="chart-bar" style="height: 70%;"></view>
					<view class="chart-bar active" style="height: 95%;"></view>
				</view>
				<view class="chart-labels">
					<text class="chart-label">周一</text>
					<text class="chart-label">今天</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isLoggedIn: true,
			isOnline: false
		}
	},
	methods: {
		login() {
			this.isLoggedIn = true;
		},
		logout() {
			this.isLoggedIn = false;
		},
		toggleOnline() {
			this.isOnline = !this.isOnline;
		},
		navigateTo(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
}
</script>

<style scoped>
.container {
	background-color: #f8f9ff;
	min-height: 100vh;
	padding-bottom: 80px;
}

/* 未登录状态样式 */
.unlogged-state {
	padding-top: 48px;
}

.header-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 48px 16px 24px;
	background-color: #ffffff;
}

.avatar-placeholder {
	width: 96px;
	height: 96px;
	border-radius: 50%;
	background-color: #e1e2ec;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.avatar-icon {
	font-size: 48px;
	color: #727687;
}

.welcome-text {
	text-align: center;
	margin-bottom: 24px;
}

.welcome-title {
	font-size: 22px;
	font-weight: 700;
	color: #191b23;
	line-height: 28px;
	display: block;
}

.welcome-desc {
	font-size: 14px;
	color: #434654;
	line-height: 20px;
	margin-top: 4px;
}

.login-btn {
	width: 100%;
	max-width: 280px;
	background-color: #003b9a;
	color: #ffffff;
	padding: 14px;
	border-radius: 9999px;
	font-size: 18px;
	font-weight: 600;
	text-align: center;
	box-shadow: 0 4px 12px rgba(0, 59, 154, 0.2);
	transition: all 0.2s;
}

.login-btn:active {
	transform: scale(0.97);
	opacity: 0.9;
}

.stats-placeholder {
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #ffffff;
	border-radius: 16px;
	padding: 16px;
	margin: -16px 16px 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	border: 1px solid rgba(195, 198, 214, 0.3);
}

.stat-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	opacity: 0.4;
}

.stat-value {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
}

.stat-label {
	font-size: 12px;
	color: #434654;
}

.divider {
	width: 1px;
	height: 32px;
	background-color: rgba(195, 198, 214, 0.2);
}

.utilities-section {
	padding: 0 16px;
}

.utility-card {
	background-color: #ffffff;
	border-radius: 16px;
	overflow: hidden;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	border: 1px solid rgba(195, 198, 214, 0.3);
}

.utility-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
	transition: background-color 0.2s;
}

.utility-item:active {
	background-color: #ededf8;
}

.utility-icon {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: rgba(0, 59, 154, 0.05);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 22px;
}

.utility-text {
	flex: 1;
	margin-left: 16px;
	font-size: 16px;
	font-weight: 500;
	color: #191b23;
}

.utility-arrow {
	color: #c3c6d6;
	transition: transform 0.2s;
}

.utility-item:active .utility-arrow {
	transform: translateX(4px);
}

.utility-divider {
	height: 1px;
	background-color: rgba(195, 198, 214, 0.2);
	margin: 0 16px;
}

.footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 24px 16px;
	margin-top: auto;
}

.footer-image {
	width: 80px;
	height: 80px;
	opacity: 0.2;
	filter: grayscale(100%);
	margin-bottom: 8px;
}

.footer-version {
	font-size: 12px;
	color: #727687;
	opacity: 0.6;
	margin-bottom: 4px;
}

.footer-copyright {
	font-size: 10px;
	color: #c3c6d6;
	letter-spacing: 0.1em;
	opacity: 0.4;
}

/* 已登录状态样式 */
.logged-state {
	padding-top: 16px;
}

.profile-header {
	padding: 0 16px;
}

.profile-card {
	position: relative;
	overflow: hidden;
	background-color: #003b9a;
	border-radius: 16px;
	padding: 16px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-card::before {
	content: '';
	position: absolute;
	right: -16px;
	top: -16px;
	width: 128px;
	height: 128px;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 50%;
	filter: blur(20px);
}

.avatar-container {
	position: relative;
	width: 80px;
	height: 80px;
	border-radius: 50%;
	overflow: hidden;
	border: 2px solid rgba(255, 255, 255, 0.2);
}

.avatar {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.verified-badge {
	position: absolute;
	bottom: -4px;
	right: -4px;
	width: 24px;
	height: 24px;
	background-color: #ffffff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	color: #003b9a;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.profile-info {
	margin-top: 16px;
}

.name-row {
	display: flex;
	align-items: center;
	gap: 8px;
}

.profile-name {
	font-size: 22px;
	font-weight: 700;
	color: #ffffff;
	line-height: 28px;
}

.level-badge {
	background-color: rgba(255, 255, 255, 0.2);
	color: #ffffff;
	font-size: 10px;
	padding: 2px 8px;
	border-radius: 9999px;
	font-weight: 500;
}

.profile-id {
	font-size: 14px;
	color: rgba(255, 255, 255, 0.8);
	margin-top: 4px;
	display: block;
}

.rating-row {
	display: flex;
	align-items: center;
	gap: 4px;
	margin-top: 8px;
}

.stars {
	display: flex;
}

.star {
	font-size: 16px;
	color: #b9c7e0;
}

.rating-score {
	font-size: 12px;
	color: #ffffff;
	margin-left: 4px;
}

.stats-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 12px;
	padding: 16px;
	background-color: #f3f3fd;
	border-radius: 16px;
	margin: 16px;
}

.stat-box {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.stat-label {
	font-size: 12px;
	color: #434654;
	margin-bottom: 4px;
}

.stat-value-row {
	display: flex;
	align-items: baseline;
	gap: 2px;
	color: #003b9a;
}

.currency {
	font-size: 12px;
	font-weight: 700;
}

.stat-number {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
}

.status-card {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	background-color: #e1e2ec;
	border-radius: 16px;
	margin: 0 16px;
	transition: all 0.3s;
}

.status-card.online {
	background-color: rgba(210, 225, 250, 0.5);
}

.status-info {
	display: flex;
	align-items: center;
	gap: 8px;
}

.status-indicator {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: #727687;
	animation: pulse 2s infinite;
}

.status-indicator.online {
	background-color: #10b981;
}

.status-text {
	font-size: 18px;
	font-weight: 600;
	color: #434654;
}

.status-text.online {
	color: #003b9a;
}

.toggle-switch {
	position: relative;
	width: 56px;
	height: 32px;
	background-color: #c3c6d6;
	border-radius: 9999px;
	transition: background-color 0.3s;
	cursor: pointer;
}

.toggle-switch.active {
	background-color: #003b9a;
}

.toggle-thumb {
	position: absolute;
	top: 4px;
	left: 4px;
	width: 24px;
	height: 24px;
	background-color: #ffffff;
	border-radius: 50%;
	transition: transform 0.2s;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.toggle-thumb.active {
	transform: translateX(24px);
}

.menu-list {
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-top: 24px;
	padding: 0 16px;
}

.menu-group {
	background-color: #f3f3fd;
	border-radius: 16px;
	overflow: hidden;
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 16px;
	transition: background-color 0.2s;
}

.menu-item:active {
	background-color: #e7e7f2;
}

.menu-icon {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	margin-right: 16px;
}

.menu-icon.primary {
	background-color: rgba(0, 80, 203, 0.1);
	color: #003b9a;
}

.menu-icon.secondary {
	background-color: rgba(210, 225, 250, 0.3);
	color: #515f74;
}

.menu-icon.tertiary {
	background-color: rgba(86, 90, 91, 0.1);
	color: #3f4344;
}

.menu-icon:not(.primary):not(.secondary):not(.tertiary) {
	background-color: #e1e2ec;
	color: #434654;
}

.menu-text {
	flex: 1;
	font-size: 16px;
	font-weight: 500;
	color: #191b23;
}

.menu-right {
	display: flex;
	align-items: center;
	gap: 8px;
}

.menu-value {
	font-size: 12px;
	color: #434654;
}

.menu-arrow {
	color: #727687;
}

.notification-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: #ba1a1a;
}

.logout-btn {
	width: calc(100% - 32px);
	margin: 24px 16px;
	padding: 16px;
	background-color: rgba(255, 218, 214, 0.2);
	color: #ba1a1a;
	font-size: 18px;
	font-weight: 600;
	border-radius: 16px;
	text-align: center;
	transition: background-color 0.2s;
}

.logout-btn:active {
	background-color: rgba(255, 218, 214, 0.4);
}

.earnings-chart {
	margin: 24px 16px;
	padding: 16px;
	background-color: #f3f3fd;
	border-radius: 16px;
}

.chart-title {
	font-size: 12px;
	color: #434654;
	letter-spacing: 0.05em;
	margin-bottom: 16px;
	display: block;
}

.chart-bars {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 4px;
	height: 80px;
}

.chart-bar {
	flex: 1;
	background-color: rgba(0, 59, 154, 0.2);
	border-radius: 4px 4px 0 0;
	transition: height 0.7s;
}

.chart-bar.active {
	background-color: #003b9a;
}

.chart-labels {
	display: flex;
	justify-content: space-between;
	margin-top: 8px;
	padding: 0 4px;
}

.chart-label {
	font-size: 10px;
	color: #434654;
}
</style>