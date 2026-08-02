<template>
	<view class="page">
		<view :style="{ height: statusBarHeight + 'px' }"></view>

		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="header-left">
				<text v-if="!isLoggedIn" class="header-title-simple">我的</text>
				<template v-else>
					<text class="material-symbols-outlined material-symbols-fill header-logo">speed</text>
					<text class="header-title">同城跑腿</text>
				</template>
			</view>
			<view class="header-right">
				<view class="header-btn" @click="onSettings">
					<text class="material-symbols-outlined header-icon-secondary">settings</text>
				</view>
				<view v-if="!isLoggedIn" class="header-btn" @click="onNotify">
					<text class="material-symbols-outlined header-icon-secondary">notifications</text>
				</view>
			</view>
		</view>

		<!-- 主内容 -->
		<scroll-view scroll-y class="main" :show-scrollbar="false">
			<view class="main-inner">
				<!-- ============ 未登录态 ============ -->
				<template v-if="!isLoggedIn">
					<!-- 未登录 用户卡 -->
					<view class="profile-card" @click="onLogin">
						<view class="profile-bg-deco"></view>
						<view class="profile-row">
							<view class="avatar-wrap avatar-wrap-default">
								<text class="material-symbols-outlined material-symbols-fill avatar-icon-default">account_circle</text>
							</view>
							<view class="profile-text">
								<text class="profile-name">点击登录/注册</text>
								<text class="profile-desc">登录后体验更多跑腿服务</text>
							</view>
							<text class="material-symbols-outlined profile-chevron">chevron_right</text>
						</view>
					</view>

					<!-- 未登录 数据统计 -->
					<view class="stats-grid">
						<view class="stats-item" @click="onRequireLogin('优惠券')">
							<text class="stats-value">--</text>
							<text class="stats-label">优惠券</text>
						</view>
						<view class="stats-item" @click="onRequireLogin('余额')">
							<text class="stats-value">--</text>
							<text class="stats-label">余额</text>
						</view>
						<view class="stats-item" @click="onRequireLogin('积分')">
							<text class="stats-value">--</text>
							<text class="stats-label">积分</text>
						</view>
					</view>

					<!-- 未登录 我的订单 -->
					<view class="order-section">
						<view class="section-header">
							<text class="section-title">我的订单</text>
							<view class="section-link" @click="onRequireLogin('全部订单')">
								<text class="section-link-text">全部订单</text>
								<text class="material-symbols-outlined section-link-icon">chevron_right</text>
							</view>
						</view>
						<view class="order-tabs">
							<view class="order-tab" @click="onRequireLogin('待支付订单')">
								<view class="order-tab-icon-wrap">
									<text class="material-symbols-outlined order-tab-icon">pending_actions</text>
								</view>
								<text class="order-tab-text">待支付</text>
							</view>
							<view class="order-tab" @click="onRequireLogin('进行中订单')">
								<view class="order-tab-icon-wrap">
									<text class="material-symbols-outlined order-tab-icon">package_2</text>
								</view>
								<text class="order-tab-text">进行中</text>
							</view>
							<view class="order-tab" @click="onRequireLogin('待评价订单')">
								<view class="order-tab-icon-wrap">
									<text class="material-symbols-outlined order-tab-icon">chat_bubble</text>
								</view>
								<text class="order-tab-text">待评价</text>
							</view>
							<view class="order-tab" @click="onRequireLogin('退款/售后')">
								<view class="order-tab-icon-wrap">
									<text class="material-symbols-outlined order-tab-icon">history</text>
								</view>
								<text class="order-tab-text">退款/售后</text>
							</view>
						</view>
					</view>

					<!-- 未登录 功能列表 -->
					<view class="menu-list">
						<view class="menu-item" @click="onRequireLogin('地址管理')">
							<text class="material-symbols-outlined menu-icon">location_on</text>
							<text class="menu-text">地址管理</text>
							<text class="material-symbols-outlined menu-chevron">chevron_right</text>
						</view>
						<view class="menu-item" @click="onRequireLogin('领券中心')">
							<text class="material-symbols-outlined menu-icon">confirmation_number</text>
							<text class="menu-text">领券中心</text>
							<view class="menu-right">
								<view class="menu-badge">
									<text class="menu-badge-text">New</text>
								</view>
								<text class="material-symbols-outlined menu-chevron">chevron_right</text>
							</view>
						</view>
						<view class="menu-item" @click="onRequireLogin('在线客服')">
							<text class="material-symbols-outlined menu-icon">headset_mic</text>
							<text class="menu-text">在线客服</text>
							<text class="material-symbols-outlined menu-chevron">chevron_right</text>
						</view>
						<view class="menu-item menu-item-last" @click="onRequireLogin('协议与隐私')">
							<text class="material-symbols-outlined menu-icon">verified_user</text>
							<text class="menu-text">协议与隐私</text>
							<text class="material-symbols-outlined menu-chevron">chevron_right</text>
						</view>
					</view>

					<!-- 未登录 帮助 Banner -->
					<view class="help-banner" @click="onBecomeRider">
						<view class="help-banner-content">
							<text class="help-banner-title">成为跑腿员</text>
							<text class="help-banner-desc">多劳多得，灵活自由</text>
						</view>
						<view class="help-banner-icon-wrap">
							<text class="material-symbols-outlined help-banner-icon">arrow_forward</text>
						</view>
						<view class="help-banner-deco"></view>
					</view>
				</template>

				<!-- ============ 已登录态 ============ -->
				<template v-else>
					<!-- 已登录 用户信息卡 -->
					<view class="profile-card" @click="onProfileDetail">
						<view class="profile-bg-deco"></view>
						<view class="profile-row">
							<view class="avatar-wrap avatar-wrap-image">
								<image class="avatar-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCQe2BMwGGm1_yjqUl0y0DPuT8Hi1nUCtkeVschYPGFT4f0XvAJ4CrzqV-tp2fgNvfa5y98M5bGMw9d2SA_rF0F1US5OxXbTB-CyEvYaXqUJIFmCevwO1KAjNWCxEysfY4tf0CCU5N4CexuAW1nwHQeDf5QD2nluq-ZVln78kijJrcnXGH9Q7EX-DglTw-4ITlDUlZP7dwWCIoYfD_6DaLtd4JgHSQFlwOrGbwClxRQpz8XHpv-_O1__ej4NkKIdSFCAcbIMVm" mode="aspectFill" />
							</view>
							<view class="profile-text">
								<text class="profile-name">张大伟</text>
								<text class="profile-desc">138 **** 8888</text>
								<view class="profile-tag">
									<text class="profile-tag-text">黄金会员</text>
								</view>
							</view>
							<text class="material-symbols-outlined profile-chevron">chevron_right</text>
						</view>
					</view>

					<!-- 已登录 数据 Bento -->
					<view class="stats-grid">
						<view class="stats-item" @click="onBalance">
							<text class="stats-value">¥248.50</text>
							<text class="stats-label">余额</text>
						</view>
						<view class="stats-item" @click="onCoupons">
							<text class="stats-value">6</text>
							<text class="stats-label">优惠券</text>
						</view>
						<view class="stats-item" @click="onPoints">
							<text class="stats-value">1,240</text>
							<text class="stats-label">积分</text>
						</view>
					</view>

					<!-- 已登录 促销 Banner -->
					<view class="promo-banner" @click="onPromo">
						<image class="promo-banner-bg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Add-06Sj7wPl6aERjCTN8OyaBaGCUv7NYd-WKRsJEsO9l71iQd2Y6vJ9tGiKytUdkgFdsJ5kRW4UcFq0jrB0MkTpWK5IEKb01uQ-2ke70opQkOYADIt-UHhJqEa7LTo74c7K504EWqVoD7QSvYyfxUJ5_b1fLTsRTrQsOf6o_Jf9aeBt3SGUqoPQ2LR8XxZ0FmizXE2aLhO94QygnTY4iRItYw_OmvsFYFFcUKt63PhdHG1p5RQBaurqRuQnQCZ5G4dP3wML" mode="aspectFill" />
						<view class="promo-banner-overlay"></view>
						<view class="promo-banner-content">
							<text class="promo-banner-title">新客专享礼</text>
							<text class="promo-banner-desc">分享立得5元跑腿红包</text>
						</view>
					</view>

					<!-- 已登录 菜单列表 -->
					<view class="menu-list">
						<view class="menu-item menu-item-icon-bg" @click="onAddress">
							<view class="menu-icon-wrap">
								<text class="material-symbols-outlined menu-icon">location_on</text>
							</view>
							<text class="menu-text">地址管理</text>
							<text class="material-symbols-outlined menu-chevron">chevron_right</text>
						</view>
						<view class="menu-item menu-item-icon-bg" @click="onCoupons">
							<view class="menu-icon-wrap">
								<text class="material-symbols-outlined menu-icon">confirmation_number</text>
							</view>
							<text class="menu-text">优惠券</text>
							<view class="menu-right">
								<text class="menu-warning">2张即将过期</text>
								<text class="material-symbols-outlined menu-chevron">chevron_right</text>
							</view>
						</view>
						<view class="menu-item menu-item-icon-bg" @click="onCustomerService">
							<view class="menu-icon-wrap">
								<text class="material-symbols-outlined menu-icon">support_agent</text>
							</view>
							<text class="menu-text">客服中心</text>
							<text class="material-symbols-outlined menu-chevron">chevron_right</text>
						</view>
						<view class="menu-item menu-item-icon-bg menu-item-last" @click="onAbout">
							<view class="menu-icon-wrap">
								<text class="material-symbols-outlined menu-icon">info</text>
							</view>
							<text class="menu-text">关于我们</text>
							<text class="material-symbols-outlined menu-chevron">chevron_right</text>
						</view>
					</view>

					<!-- 已登录 退出按钮 -->
					<view class="logout-btn" @click="onLogout">
						<text class="logout-text">退出登录</text>
					</view>

					<!-- 已登录 版本信息 -->
					<view class="version-info">
						<text class="version-text">版本号 v2.4.0</text>
					</view>
				</template>

				<view style="height: 200rpx;"></view>
			</view>
		</scroll-view>

		<!-- 自定义 TabBar -->
		<custom-tab-bar :selected="2"></custom-tab-bar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 20,
			isLoggedIn: false
		}
	},
	onLoad() {
		try {
			const sys = uni.getSystemInfoSync()
			this.statusBarHeight = sys.statusBarHeight || 20
		} catch (e) {}
		// 读取本地登录状态
		try {
			const login = uni.getStorageSync('isLoggedIn')
			if (login) this.isLoggedIn = true
		} catch (e) {}
	},
	methods: {
		onSettings() {
			uni.showToast({ title: '设置', icon: 'none' })
		},
		onNotify() {
			uni.showToast({ title: '暂无新消息', icon: 'none' })
		},
		onLogin() {
			this.isLoggedIn = true
			try {
				uni.setStorageSync('isLoggedIn', true)
			} catch (e) {}
			uni.showToast({ title: '登录成功', icon: 'success' })
		},
		onLogout() {
			uni.showModal({
				title: '退出登录',
				content: '确定要退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						this.isLoggedIn = false
						try {
							uni.removeStorageSync('isLoggedIn')
						} catch (e) {}
						uni.showToast({ title: '已退出登录', icon: 'none' })
					}
				}
			})
		},
		onRequireLogin(name) {
			uni.showToast({ title: '请先登录后操作', icon: 'none' })
		},
		onProfileDetail() {
			uni.showToast({ title: '个人资料', icon: 'none' })
		},
		onBalance() {
			uni.showToast({ title: '余额明细', icon: 'none' })
		},
		onCoupons() {
			uni.showToast({ title: '我的优惠券', icon: 'none' })
		},
		onPoints() {
			uni.showToast({ title: '积分商城', icon: 'none' })
		},
		onPromo() {
			uni.showToast({ title: '分享领红包', icon: 'none' })
		},
		onAddress() {
			uni.showToast({ title: '地址管理', icon: 'none' })
		},
		onCustomerService() {
			uni.showToast({ title: '客服中心', icon: 'none' })
		},
		onAbout() {
			uni.showToast({ title: '关于我们', icon: 'none' })
		},
		onBecomeRider() {
			uni.showToast({ title: '加入跑腿员', icon: 'none' })
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
	gap: 16rpx;
}

.header-logo {
	font-size: 48rpx;
	color: #0050cb;
}

.header-title {
	font-size: 44rpx;
	font-weight: 700;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.header-title-simple {
	font-size: 44rpx;
	font-weight: 700;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.header-right {
	display: flex;
	gap: 8rpx;
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

.header-icon-secondary {
	font-size: 44rpx;
	color: #424656;
}

/* 主内容 */
.main {
	flex: 1;
}

.main-inner {
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

/* 用户信息卡 */
.profile-card {
	background-color: #ffffff;
	border-radius: 24rpx;
	padding: 48rpx;
	border: 2rpx solid #c2c6d8;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	position: relative;
	overflow: hidden;
	transition: transform 0.15s;
}

.profile-card:active {
	transform: scale(0.98);
}

.profile-bg-deco {
	position: absolute;
	right: -80rpx;
	top: -80rpx;
	width: 256rpx;
	height: 256rpx;
	background-color: rgba(0, 80, 203, 0.05);
	border-radius: 9999rpx;
	filter: blur(80rpx);
}

.profile-row {
	position: relative;
	z-index: 10;
	display: flex;
	align-items: center;
	gap: 32rpx;
}

.avatar-wrap {
	width: 128rpx;
	height: 128rpx;
	border-radius: 9999rpx;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.avatar-wrap-default {
	background-color: #e5eeff;
	border: 4rpx solid #ffffff;
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
}

.avatar-wrap-image {
	border: 4rpx solid rgba(0, 80, 203, 0.1);
}

.avatar-icon-default {
	font-size: 80rpx;
	color: #727687;
}

.avatar-img {
	width: 100%;
	height: 100%;
}

.profile-text {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	flex: 1;
}

.profile-name {
	font-size: 40rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 56rpx;
}

.profile-desc {
	font-size: 28rpx;
	color: #424656;
}

.profile-tag {
	align-self: flex-start;
	background-color: rgba(0, 80, 203, 0.1);
	padding: 4rpx 16rpx;
	border-radius: 9999rpx;
	margin-top: 4rpx;
}

.profile-tag-text {
	font-size: 20rpx;
	font-weight: 700;
	color: #0050cb;
}

.profile-chevron {
	font-size: 40rpx;
	color: #727687;
}

/* 数据统计 */
.stats-grid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 24rpx;
}

.stats-item {
	background-color: #ffffff;
	padding: 32rpx 16rpx;
	border-radius: 24rpx;
	border: 2rpx solid #c2c6d8;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	transition: transform 0.15s;
}

.stats-item:active {
	transform: scale(0.95);
	background-color: #eff4ff;
}

.stats-value {
	font-size: 36rpx;
	font-weight: 600;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 48rpx;
}

.stats-label {
	font-size: 24rpx;
	color: #424656;
}

/* 订单区 */
.order-section {
	background-color: #ffffff;
	border-radius: 24rpx;
	border: 2rpx solid #c2c6d8;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	overflow: hidden;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 32rpx;
	border-bottom: 2rpx solid rgba(194, 198, 216, 0.3);
}

.section-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.section-link {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.section-link-text {
	font-size: 24rpx;
	color: #0050cb;
}

.section-link-icon {
	font-size: 32rpx;
	color: #0050cb;
}

.order-tabs {
	display: flex;
	justify-content: space-around;
	padding: 32rpx 16rpx;
}

.order-tab {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
	transition: transform 0.15s;
}

.order-tab:active {
	transform: scale(0.9);
}

.order-tab-icon-wrap {
	width: 80rpx;
	height: 80rpx;
	border-radius: 9999rpx;
	background-color: #e5eeff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.order-tab-icon {
	font-size: 40rpx;
	color: #424656;
}

.order-tab-text {
	font-size: 24rpx;
	color: #0b1c30;
}

/* 菜单列表 */
.menu-list {
	background-color: #ffffff;
	border-radius: 24rpx;
	border: 2rpx solid #c2c6d8;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	overflow: hidden;
}

.menu-item {
	display: flex;
	align-items: center;
	gap: 32rpx;
	padding: 32rpx;
	border-bottom: 2rpx solid rgba(194, 198, 216, 0.3);
	transition: background-color 0.15s;
}

.menu-item:active {
	background-color: #eff4ff;
}

.menu-item-last {
	border-bottom: none;
}

.menu-icon {
	font-size: 40rpx;
	color: #0050cb;
}

.menu-icon-wrap {
	background-color: rgba(0, 80, 203, 0.05);
	padding: 16rpx;
	border-radius: 16rpx;
}

.menu-item-icon-bg .menu-icon {
	font-size: 36rpx;
}

.menu-text {
	flex: 1;
	font-size: 32rpx;
	color: #0b1c30;
}

.menu-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.menu-badge {
	background-color: #ba1a1a;
	padding: 4rpx 12rpx;
	border-radius: 9999rpx;
}

.menu-badge-text {
	font-size: 20rpx;
	color: #ffffff;
	font-weight: 700;
}

.menu-warning {
	font-size: 24rpx;
	color: #ba1a1a;
}

.menu-chevron {
	font-size: 40rpx;
	color: #727687;
}

/* 帮助 Banner (未登录) */
.help-banner {
	position: relative;
	width: 100%;
	height: 192rpx;
	border-radius: 24rpx;
	overflow: hidden;
	background-color: #0066ff;
	padding: 32rpx 40rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 16rpx 24rpx rgba(0, 102, 255, 0.2);
}

.help-banner-content {
	position: relative;
	z-index: 10;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.help-banner-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.help-banner-desc {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.8);
}

.help-banner-icon-wrap {
	position: relative;
	z-index: 10;
	background-color: rgba(255, 255, 255, 0.2);
	padding: 16rpx;
	border-radius: 9999rpx;
}

.help-banner-icon {
	font-size: 40rpx;
	color: #ffffff;
}

.help-banner-deco {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 50%;
	background: linear-gradient(to left, rgba(255, 255, 255, 0.1), transparent);
}

/* 促销 Banner (已登录) */
.promo-banner {
	position: relative;
	width: 100%;
	height: 192rpx;
	border-radius: 24rpx;
	overflow: hidden;
	border: 2rpx solid #c2c6d8;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
}

.promo-banner-bg {
	width: 100%;
	height: 100%;
}

.promo-banner-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(to right, rgba(0, 80, 203, 0.6), transparent);
}

.promo-banner-content {
	position: absolute;
	left: 48rpx;
	top: 50%;
	transform: translateY(-50%);
	z-index: 10;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.promo-banner-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.promo-banner-desc {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.9);
}

/* 退出按钮 */
.logout-btn {
	width: 100%;
	height: 112rpx;
	background-color: #ffffff;
	border: 2rpx solid #c2c6d8;
	border-radius: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	transition: all 0.15s;
}

.logout-btn:active {
	transform: scale(0.98);
	background-color: rgba(186, 26, 26, 0.05);
}

.logout-text {
	font-size: 36rpx;
	font-weight: 600;
	color: #ba1a1a;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

/* 版本信息 */
.version-info {
	display: flex;
	justify-content: center;
	padding: 32rpx 0;
}

.version-text {
	font-size: 24rpx;
	color: #727687;
}
</style>
