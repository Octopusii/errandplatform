<template>
	<view class="page">
		<!-- 状态栏占位 -->
		<view :style="{ height: statusBarHeight + 'px' }"></view>

		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="header-left">
				<text class="material-symbols-outlined header-logo">speed</text>
				<text class="header-title">同城跑腿</text>
			</view>
			<view class="header-btn" @click="onNotify">
				<text class="material-symbols-outlined header-icon">notifications</text>
			</view>
		</view>

		<!-- 主内容 -->
		<scroll-view scroll-y class="main" :enhanced="true" :show-scrollbar="false">
			<view class="main-inner">
				<!-- 搜索栏 -->
				<view class="search-wrap">
					<view class="search-icon">
						<text class="material-symbols-outlined search-icon-text">search</text>
					</view>
					<input class="search-input" placeholder="搜服务、查订单、问客服..." placeholder-class="search-placeholder" />
				</view>

				<!-- 促销轮播 -->
				<view class="promo">
					<view class="promo-bg"></view>
					<view class="promo-content">
						<text class="promo-tag">新人首单立减</text>
						<text class="promo-title">跑腿特惠日</text>
						<text class="promo-desc">全城配送 30 分钟必达</text>
					</view>
					<view class="promo-img-wrap">
						<image class="promo-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnGPw_GXKNtkeYe3omiiC1nbiC5sUVTFvFUHS4UO8nWROhWKhP1y6Yafy7e82rZKUbkjct-vxS3LMAEVAyfbWaNfwJZoyQqliOzkGxmaHIygQh3vrvAFGFHihBUJRYZKr89MeC6JV1KioLlsTjK3iSufJd0JjodpE3IypyNzGVc63sWX8isWWi-HQJ6XoF-ThKQXKedv7zgJqJukyTt7lplgQXM67MqERsfTAxass2uT-UecEz9GsJFxP1OxD1PfCFborML2zd" mode="aspectFill" />
					</view>
				</view>

				<!-- 核心服务 -->
				<view class="section">
					<view class="section-header">
						<text class="section-title">核心服务</text>
						<text class="section-more" @click="onViewAll">查看全部</text>
					</view>
					<view class="service-grid">
						<!-- 帮我送 -->
						<view class="bento-item" @click="goService('send')">
							<view class="service-icon-wrap service-icon-primary">
								<text class="material-symbols-outlined material-symbols-fill service-icon">local_shipping</text>
							</view>
							<text class="service-title">帮我送</text>
							<text class="service-desc">文件/鲜花/数码</text>
						</view>
						<!-- 帮我买 -->
						<view class="bento-item" @click="goService('buy')">
							<view class="service-icon-wrap service-icon-secondary">
								<text class="material-symbols-outlined material-symbols-fill service-icon service-icon-dark">shopping_cart</text>
							</view>
							<text class="service-title">帮我买</text>
							<text class="service-desc">代购咖啡/药品</text>
						</view>
						<!-- 帮我取 -->
						<view class="bento-item" @click="goService('pickup')">
							<view class="service-icon-wrap service-icon-tertiary">
								<text class="material-symbols-outlined material-symbols-fill service-icon service-icon-dark">luggage</text>
							</view>
							<text class="service-title">帮我取</text>
							<text class="service-desc">快递/外卖/干洗</text>
						</view>
						<!-- 跑腿 -->
						<view class="bento-item" @click="goService('errand')">
							<view class="service-icon-wrap service-icon-tertiary2">
								<text class="material-symbols-outlined material-symbols-fill service-icon service-icon-dark">task_alt</text>
							</view>
							<text class="service-title">跑腿</text>
							<text class="service-desc">排队/挂号/代办</text>
						</view>
					</view>
				</view>

				<!-- 常用地址 -->
				<view class="section">
					<text class="section-title section-title-block">常用地址</text>
					<view class="address-card">
						<view class="address-item" v-for="(addr, idx) in addresses" :key="idx" @click="onAddress(addr)">
							<view class="address-avatar" :class="addr.type === 'home' ? 'avatar-primary' : 'avatar-secondary'">
								<text class="material-symbols-outlined" :class="addr.type === 'home' ? 'icon-primary' : 'icon-secondary'">{{ addr.icon }}</text>
							</view>
							<view class="address-content">
								<view class="address-name-row">
									<text class="address-name">{{ addr.name }}</text>
									<text class="address-contact">{{ addr.contact }}</text>
								</view>
								<text class="address-detail">{{ addr.detail }}</text>
							</view>
							<text class="material-symbols-outlined chevron">chevron_right</text>
						</view>
					</view>
				</view>

				<!-- 地图速览 -->
				<view class="section">
					<view class="map-look">
						<image class="map-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU8XMmRlBbCI0mHYrw1_gSweLD9RHHnOaeCTabPgPlhVnxVcS4MyEuPOdXwNqaXECtbavPFBtjBrFyOOdbTTVU7k0D054TR58z3r1_IsDnN3gC6JL8n-6MG8QypeMWZvIIYasTVKY3nzhlSs36ALe47UbmQDOx8Ea4TyYCxLWFOpTIxgqpDHv8uutrAarq1yKxRhTZ3tS0uamknB9G1gptIncwhKofyhqB2vewX2VZFOITjw03d-JHjvZU6-hX9nlfjPJprwx6" mode="aspectFill" />
						<view class="map-overlay"></view>
						<view class="map-badge">
							<view class="map-dot"></view>
							<text class="map-badge-text">2,410 名跑腿员在线</text>
						</view>
					</view>
				</view>

				<!-- 底部留白 -->
				<view style="height: 200rpx;"></view>
			</view>
		</scroll-view>

		<!-- 快捷下单 FAB -->
		<view class="fab" @click="onQuickStart">
			<text class="material-symbols-outlined fab-icon">add</text>
		</view>

		<!-- 自定义 TabBar -->
		<custom-tab-bar :selected="0"></custom-tab-bar>
	</view>
</template>

<script>
import CustomTabBar from '@/components/custom-tab-bar/custom-tab-bar.vue'

export default {
	components: { CustomTabBar },
	data() {
		return {
			statusBarHeight: 20,
			addresses: [
				{
					type: 'home',
					icon: 'home',
					name: '家',
					contact: '李先生 138****0001',
					detail: '上海市静安区南京西路1266号恒隆广场'
				},
				{
					type: 'work',
					icon: 'work',
					name: '公司',
					contact: '李先生 138****0001',
					detail: '上海市浦东新区陆家嘴世纪大道8号'
				}
			]
		}
	},
	onLoad() {
		try {
			const sys = uni.getSystemInfoSync()
			this.statusBarHeight = sys.statusBarHeight || 20
		} catch (e) {}
	},
	methods: {
		onNotify() {
			uni.showToast({ title: '暂无新消息', icon: 'none' })
		},
		onViewAll() {
			uni.showToast({ title: '查看全部服务', icon: 'none' })
		},
		goService(type) {
			if (type === 'send') {
				uni.navigateTo({ url: '/pages/order/send' })
			} else if (type === 'buy') {
				uni.navigateTo({ url: '/pages/order/buy' })
			} else {
				uni.showToast({ title: '即将上线', icon: 'none' })
			}
		},
		onAddress(addr) {
			uni.showToast({ title: '选择地址：' + addr.name, icon: 'none' })
		},
		onQuickStart() {
			uni.navigateTo({ url: '/pages/order/send' })
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
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
	position: relative;
	z-index: 10;
}

.header-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.header-logo {
	font-size: 56rpx;
	color: #0050cb;
}

.header-title {
	font-size: 44rpx;
	font-weight: 700;
	color: #0050cb;
	letter-spacing: -1rpx;
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
	font-size: 48rpx;
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
	gap: 48rpx;
}

/* 搜索栏 */
.search-wrap {
	position: relative;
	height: 96rpx;
	background-color: #eff4ff;
	border-radius: 24rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
	display: flex;
	align-items: center;
	padding: 0 32rpx;
}

.search-icon {
	position: absolute;
	left: 32rpx;
	display: flex;
	align-items: center;
}

.search-icon-text {
	font-size: 44rpx;
	color: #727687;
}

.search-input {
	flex: 1;
	padding-left: 64rpx;
	font-size: 28rpx;
	color: #0b1c30;
	background: transparent;
}

.search-placeholder {
	color: #727687;
}

/* 促销轮播 */
.promo {
	position: relative;
	overflow: hidden;
	border-radius: 24rpx;
	height: 320rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
}

.promo-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(to right, #0050cb 0%, #0066ff 100%);
}

.promo-content {
	position: relative;
	z-index: 2;
	height: 100%;
	padding: 48rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.promo-tag {
	align-self: flex-start;
	font-size: 24rpx;
	color: #ffffff;
	background-color: rgba(255, 255, 255, 0.2);
	padding: 4rpx 16rpx;
	border-radius: 9999rpx;
	margin-bottom: 16rpx;
	line-height: 32rpx;
}

.promo-title {
	font-size: 40rpx;
	font-weight: 600;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
	margin-bottom: 8rpx;
	line-height: 56rpx;
}

.promo-desc {
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.9);
	line-height: 40rpx;
}

.promo-img-wrap {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 50%;
	overflow: hidden;
}

.promo-img {
	width: 100%;
	height: 100%;
	opacity: 0.4;
	mix-blend-mode: overlay;
}

/* 区块通用 */
.section {
	display: flex;
	flex-direction: column;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 16rpx;
}

.section-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 48rpx;
}

.section-title-block {
	margin-bottom: 16rpx;
}

.section-more {
	font-size: 24rpx;
	color: #0050cb;
	font-weight: 700;
}

/* 服务网格 */
.service-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 24rpx;
}

.bento-item {
	background-color: #ffffff;
	padding: 40rpx;
	border-radius: 24rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	border: 2rpx solid rgba(194, 198, 216, 0.3);
	height: 288rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	transition: transform 0.15s;
}

.bento-item:active {
	transform: scale(0.98);
}

.service-icon-wrap {
	width: 80rpx;
	height: 80rpx;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 24rpx;
}

.service-icon-primary {
	background-color: rgba(0, 80, 203, 0.1);
}

.service-icon-secondary {
	background-color: rgba(213, 227, 253, 0.5);
}

.service-icon-tertiary {
	background-color: rgba(213, 227, 253, 0.5);
}

.service-icon-tertiary2 {
	background-color: rgba(213, 227, 253, 0.5);
}

.service-icon {
	font-size: 44rpx;
	color: #0050cb;
}

.service-icon-dark {
	color: #515f74;
}

.service-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 48rpx;
}

.service-desc {
	font-size: 24rpx;
	color: #424656;
	line-height: 32rpx;
	margin-top: 4rpx;
}

/* 常用地址 */
.address-card {
	background-color: #ffffff;
	border-radius: 24rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	border: 2rpx solid rgba(194, 198, 216, 0.2);
	overflow: hidden;
}

.address-item {
	display: flex;
	align-items: center;
	gap: 32rpx;
	padding: 32rpx;
	border-bottom: 2rpx solid rgba(194, 198, 216, 0.2);
}

.address-item:last-child {
	border-bottom: none;
}

.address-avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 9999rpx;
	background-color: #eff4ff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.avatar-primary {
	background-color: #eff4ff;
}

.avatar-secondary {
	background-color: #eff4ff;
}

.icon-primary {
	color: #0050cb;
	font-size: 40rpx;
}

.icon-secondary {
	color: #515f74;
	font-size: 40rpx;
}

.address-content {
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.address-name-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.address-name {
	font-size: 28rpx;
	font-weight: 700;
	color: #0b1c30;
}

.address-contact {
	font-size: 24rpx;
	color: #727687;
}

.address-detail {
	font-size: 28rpx;
	color: #424656;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.chevron {
	font-size: 40rpx;
	color: #727687;
}

/* 地图速览 */
.map-look {
	position: relative;
	height: 256rpx;
	border-radius: 24rpx;
	overflow: hidden;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	border: 2rpx solid rgba(194, 198, 216, 0.3);
}

.map-img {
	width: 100%;
	height: 100%;
}

.map-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(255, 255, 255, 0.1);
}

.map-badge {
	position: absolute;
	bottom: 24rpx;
	left: 32rpx;
	background-color: rgba(255, 255, 255, 0.9);
	padding: 12rpx 24rpx;
	border-radius: 16rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	border: 2rpx solid rgba(194, 198, 216, 0.3);
	display: flex;
	align-items: center;
	gap: 16rpx;
	backdrop-filter: blur(8px);
}

.map-dot {
	width: 16rpx;
	height: 16rpx;
	border-radius: 9999rpx;
	background-color: #22c55e;
}

.map-badge-text {
	font-size: 24rpx;
	font-weight: 700;
	color: #0b1c30;
}

/* FAB */
.fab {
	position: fixed;
	right: 48rpx;
	bottom: 192rpx;
	width: 112rpx;
	height: 112rpx;
	background-color: #0050cb;
	border-radius: 9999rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 80, 203, 0.4);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 40;
}

.fab:active {
	transform: scale(0.95);
}

.fab-icon {
	font-size: 64rpx;
	color: #ffffff;
}
</style>
