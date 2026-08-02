<template>
	<view class="page">
		<view :style="{ height: statusBarHeight + 'px' }"></view>

		<!-- 顶部导航 -->
		<view class="header">
			<view class="header-left">
				<view class="header-btn" @click="onBack">
					<text class="material-symbols-outlined header-icon">arrow_back</text>
				</view>
				<text class="header-title">订单详情</text>
			</view>
			<view class="header-right">
				<view class="header-btn" @click="onShare">
					<text class="material-symbols-outlined header-icon-secondary">share</text>
				</view>
				<view class="header-btn" @click="onMore">
					<text class="material-symbols-outlined header-icon-secondary">more_vert</text>
				</view>
			</view>
		</view>

		<!-- 主内容 -->
		<scroll-view scroll-y class="main" :show-scrollbar="false">
			<view class="main-inner">
				<!-- 状态卡 -->
				<view class="status-card">
					<view class="status-bg-deco"></view>
					<view class="status-content">
						<view class="status-label-row">
							<text class="material-symbols-outlined status-label-icon">directions_run</text>
							<text class="status-label">订单配送中</text>
						</view>
						<text class="status-title">预计 14:35 送达</text>
						<text class="status-desc">骑手正在全速赶往目的地</text>
					</view>
				</view>

				<!-- 实时地图 -->
				<view class="map-card">
					<image class="map-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp6-Aoqpvrl0vMAzdHGeb6LL0BLZ0Dz9RZeX0DAbsCMSahGSHugcyMNl2AiP-p_wcaVFbnxcaHCHNbAGc4qdYh3dN-_cJxIdk9PB5BixNLRkUEfYzYNRixsxiQtej0BAGYE3vwfNiL9FFFKs5r7X7Y5c7EiwRTwGEzVfWZsJQGRG1yb5gkYku5uZaVDvzi8JLXRes_ibv_AKIDz5N2ZuyjCTaShmX5wieGgMFwaAyDXN-54YzCB9PAXrJLNdWMP9g2NUFOPaQ4" mode="aspectFill" />
					<view class="map-rider">
						<text class="material-symbols-outlined material-symbols-fill map-rider-icon">delivery_dining</text>
					</view>
					<view class="map-badge">
						<text class="material-symbols-outlined map-badge-icon">navigation</text>
						<text class="map-badge-text">实时位置</text>
					</view>
				</view>

				<!-- 骑手信息 -->
				<view class="rider-card">
					<view class="rider-info">
						<view class="rider-avatar-wrap">
							<image class="rider-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzxo5LiWZTuDg5ucorm3Jfxr-gWaAba8nIOcGMBEBlXqytoh8VQtanvEjqBF_MJyK5yWMdxRAIywForGeDXn5eZx29HV-KY7mb9ux1WnX5RImmymcx1ejh6QKPnb16_c8mq7IfIdQPq-lShQr_o6UrJnn8pOKJ5Pt7VVXGchrkIbx4CrThgJPBWk_XbkHzKTeg3uV9xN3p1H-qcW8WSMAm7UP-pNxiyT2alMH5mMWwl3X_9gNyP-TgPZVdtLAWzzxTAyQ4hBg6" mode="aspectFill" />
						</view>
						<view class="rider-text">
							<view class="rider-name-row">
								<text class="rider-name">张大伟</text>
								<view class="rider-tag">
									<text class="rider-tag-text">金牌骑手</text>
								</view>
							</view>
							<view class="rider-stat-row">
								<text class="material-symbols-outlined material-symbols-fill rider-star">star</text>
								<text class="rider-stat">4.9 分</text>
								<text class="rider-divider">|</text>
								<text class="rider-stat">配送 2541 单</text>
							</view>
						</view>
					</view>
					<view class="rider-actions">
						<view class="rider-action-btn" @click="onCallRider">
							<text class="material-symbols-outlined rider-action-icon">call</text>
						</view>
						<view class="rider-action-btn" @click="onChatRider">
							<text class="material-symbols-outlined rider-action-icon">chat</text>
						</view>
					</view>
				</view>

				<!-- 订单进度 -->
				<view class="card">
					<text class="card-title">订单进度</text>
					<view class="timeline">
						<view class="timeline-step" v-for="(step, idx) in steps" :key="idx" :class="{ 'step-last': idx === steps.length - 1 }">
							<view class="step-marker-col">
								<view class="step-marker" :class="step.markerClass">
									<text v-if="step.done" class="material-symbols-outlined step-marker-icon">check</text>
									<view v-else-if="step.current" class="step-marker-dot"></view>
								</view>
								<view v-if="idx < steps.length - 1" class="step-line" :class="{ 'step-line-active': step.lineActive }"></view>
							</view>
							<view class="step-content">
								<text class="step-title" :class="step.titleClass">{{ step.title }}</text>
								<text class="step-time" :class="step.timeClass">{{ step.time }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 物品 & 地址 -->
				<view class="card">
					<view class="item-section">
						<view class="item-row">
							<text class="material-symbols-outlined item-icon">inventory_2</text>
							<view class="item-text">
								<text class="item-title">物品信息</text>
								<text class="item-desc">办公文档 × 1 (约0.5kg)</text>
								<text class="item-remark">备注：请务必本人签收，急件。</text>
							</view>
						</view>
					</view>
					<view class="address-section">
						<view class="address-row">
							<text class="material-symbols-outlined address-icon address-icon-secondary">location_on</text>
							<view class="address-text-block">
								<text class="address-label">取货地址</text>
								<text class="address-text">静安区南京西路 1266 号恒隆广场</text>
							</view>
						</view>
						<view class="address-row">
							<text class="material-symbols-outlined address-icon address-icon-primary">trip_origin</text>
							<view class="address-text-block">
								<text class="address-label">送货地址</text>
								<text class="address-text address-text-bold">徐汇区斜土路 2899 号光启城写字楼 15 层</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 费用明细 -->
				<view class="card">
					<text class="card-title">费用明细</text>
					<view class="fee-list">
						<view class="fee-row" v-for="(fee, idx) in fees" :key="idx">
							<text class="fee-label">{{ fee.label }}</text>
							<text class="fee-value" :class="fee.valueClass">{{ fee.value }}</text>
						</view>
						<view class="fee-divider"></view>
						<view class="fee-row fee-total-row">
							<text class="fee-total-label">实付款</text>
							<text class="fee-total-value">¥18.50</text>
						</view>
					</view>
				</view>

				<!-- 订单 ID & Footer -->
				<view class="footer-info">
					<text class="footer-info-text">订单编号: 2024052045928102</text>
					<text class="footer-info-text">下单时间: 2024-05-20 14:02:15</text>
				</view>

				<view style="height: 240rpx;"></view>
			</view>
		</scroll-view>

		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="bottom-btn bottom-btn-outline" @click="onContactService">
				<text class="material-symbols-outlined bottom-btn-icon">help_center</text>
				<text class="bottom-btn-text bottom-btn-text-secondary">客服帮助</text>
			</view>
			<view class="bottom-btn bottom-btn-primary" @click="onCallRider">
				<text class="material-symbols-outlined material-symbols-fill bottom-btn-icon bottom-btn-icon-light">phone_in_talk</text>
				<text class="bottom-btn-text bottom-btn-text-light">联系骑手</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 20,
			steps: [
				{ title: '商家已接单', time: '14:05', done: true, markerClass: 'step-marker-done', titleClass: 'step-title-default', timeClass: 'step-time-default', lineActive: true },
				{ title: '骑手已取货', time: '14:18', done: true, markerClass: 'step-marker-done', titleClass: 'step-title-default', timeClass: 'step-time-default', lineActive: true },
				{ title: '配送中', time: '骑手距离您 1.2 km', done: false, current: true, markerClass: 'step-marker-current', titleClass: 'step-title-active', timeClass: 'step-time-active', lineActive: false },
				{ title: '已送达', time: '预计 14:35', done: false, markerClass: 'step-marker-pending', titleClass: 'step-title-pending', timeClass: 'step-time-pending', lineActive: false }
			],
			fees: [
				{ label: '基础配送费', value: '¥15.00', valueClass: '' },
				{ label: '里程溢价 (5.2km)', value: '¥6.50', valueClass: '' },
				{ label: '重量补贴', value: '¥2.00', valueClass: '' },
				{ label: '优惠券减免', value: '-¥5.00', valueClass: 'fee-value-error' }
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
		onBack() {
			uni.navigateBack()
		},
		onShare() {
			uni.showToast({ title: '分享订单', icon: 'none' })
		},
		onMore() {
			uni.showActionSheet({ itemList: ['复制订单号', '举报订单'], success: () => {} })
		},
		onCallRider() {
			uni.makePhoneCall({ phoneNumber: '123456789' })
		},
		onChatRider() {
			uni.showToast({ title: '打开聊天', icon: 'none' })
		},
		onContactService() {
			uni.showToast({ title: '正在连接客服...', icon: 'none' })
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
	gap: 24rpx;
}

.header-right {
	display: flex;
	gap: 16rpx;
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

.header-icon {
	font-size: 44rpx;
	color: #0050cb;
}

.header-icon-secondary {
	font-size: 44rpx;
	color: #424656;
}

.header-title {
	font-size: 40rpx;
	font-weight: 700;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

/* 主内容 */
.main {
	flex: 1;
}

.main-inner {
	padding: 32rpx;
	max-width: 768rpx;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

/* 状态卡 */
.status-card {
	background-color: #0066ff;
	color: #f8f7ff;
	padding: 48rpx;
	border-radius: 24rpx;
	box-shadow: 0 16rpx 32rpx rgba(0, 102, 255, 0.2);
	position: relative;
	overflow: hidden;
}

.status-bg-deco {
	position: absolute;
	right: -64rpx;
	top: -64rpx;
	width: 256rpx;
	height: 256rpx;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 9999rpx;
	filter: blur(80rpx);
}

.status-content {
	position: relative;
	z-index: 10;
	display: flex;
	flex-direction: column;
}

.status-label-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-bottom: 16rpx;
}

.status-label-icon {
	font-size: 40rpx;
	color: #ffffff;
	animation: pulseSoft 2s infinite ease-in-out;
}

@keyframes pulseSoft {
	0%, 100% { transform: scale(1); opacity: 1; }
	50% { transform: scale(1.05); opacity: 0.8; }
}

.status-label {
	font-size: 24rpx;
	color: rgba(248, 247, 255, 0.9);
}

.status-title {
	font-size: 44rpx;
	font-weight: 700;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
	margin-bottom: 16rpx;
	line-height: 56rpx;
}

.status-desc {
	font-size: 28rpx;
	color: rgba(248, 247, 255, 0.8);
}

/* 地图卡 */
.map-card {
	background-color: #ffffff;
	border-radius: 24rpx;
	overflow: hidden;
	border: 2rpx solid #e2e8f0;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	position: relative;
	height: 384rpx;
}

.map-img {
	width: 100%;
	height: 100%;
}

.map-rider {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #0050cb;
	padding: 16rpx;
	border-radius: 9999rpx;
	box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.2);
	animation: bounce 1.5s infinite;
}

@keyframes bounce {
	0%, 100% { transform: translate(-50%, -50%); }
	50% { transform: translate(-50%, -60%); }
}

.map-rider-icon {
	font-size: 40rpx;
	color: #ffffff;
}

.map-badge {
	position: absolute;
	bottom: 24rpx;
	right: 24rpx;
	background-color: #ffffff;
	padding: 12rpx 24rpx;
	border-radius: 9999rpx;
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
	border: 2rpx solid #c2c6d8;
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.map-badge-icon {
	font-size: 32rpx;
	color: #0050cb;
}

.map-badge-text {
	font-size: 24rpx;
	color: #0b1c30;
}

/* 骑手卡 */
.rider-card {
	background-color: #ffffff;
	border-radius: 24rpx;
	padding: 32rpx;
	border: 2rpx solid #e2e8f0;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.rider-info {
	display: flex;
	align-items: center;
	gap: 32rpx;
}

.rider-avatar-wrap {
	width: 112rpx;
	height: 112rpx;
	border-radius: 9999rpx;
	overflow: hidden;
	border: 4rpx solid #0066ff;
}

.rider-avatar {
	width: 100%;
	height: 100%;
}

.rider-text {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.rider-name-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.rider-name {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.rider-tag {
	background-color: #d5e3fd;
	padding: 4rpx 16rpx;
	border-radius: 9999rpx;
}

.rider-tag-text {
	font-size: 20rpx;
	font-weight: 700;
	color: #57657b;
}

.rider-stat-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.rider-star {
	font-size: 32rpx;
	color: #f59e0b;
}

.rider-stat {
	font-size: 24rpx;
	color: #424656;
}

.rider-divider {
	font-size: 24rpx;
	color: rgba(114, 118, 135, 0.3);
	margin: 0 8rpx;
}

.rider-actions {
	display: flex;
	gap: 16rpx;
}

.rider-action-btn {
	width: 80rpx;
	height: 80rpx;
	border-radius: 9999rpx;
	background-color: #dce9ff;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.15s;
}

.rider-action-btn:active {
	transform: scale(0.9);
	background-color: rgba(0, 80, 203, 0.1);
}

.rider-action-icon {
	font-size: 36rpx;
	color: #0050cb;
}

/* 卡片通用 */
.card {
	background-color: #ffffff;
	border-radius: 24rpx;
	padding: 32rpx;
	border: 2rpx solid #e2e8f0;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.card-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 48rpx;
}

/* 时间线 */
.timeline {
	display: flex;
	flex-direction: column;
	gap: 48rpx;
}

.timeline-step {
	position: relative;
	display: flex;
	gap: 32rpx;
}

.step-marker-col {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.step-marker {
	width: 48rpx;
	height: 48rpx;
	border-radius: 9999rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.step-marker-done {
	background-color: #0050cb;
}

.step-marker-current {
	background-color: #0050cb;
	box-shadow: 0 0 0 8rpx rgba(0, 102, 255, 0.3);
}

.step-marker-pending {
	background-color: #d3e4fe;
	border: 2rpx solid #c2c6d8;
}

.step-marker-icon {
	font-size: 32rpx;
	color: #ffffff;
}

.step-marker-dot {
	width: 20rpx;
	height: 20rpx;
	background-color: #ffffff;
	border-radius: 9999rpx;
	animation: pulseDot 1.5s infinite;
}

@keyframes pulseDot {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.5; }
}

.step-line {
	width: 0;
	flex: 1;
	min-height: 48rpx;
	border-left: 4rpx solid #e2e8f0;
	margin-top: 8rpx;
}

.step-line-active {
	border-left-color: #0066ff;
}

.step-content {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
	padding-bottom: 8rpx;
}

.step-title {
	font-size: 28rpx;
	font-weight: 600;
}

.step-title-default {
	color: #0b1c30;
}

.step-title-active {
	color: #0050cb;
	font-weight: 700;
}

.step-title-pending {
	color: #727687;
}

.step-time {
	font-size: 24rpx;
}

.step-time-default {
	color: #727687;
}

.step-time-active {
	color: rgba(0, 80, 203, 0.7);
}

.step-time-pending {
	color: #727687;
}

/* 物品与地址 */
.item-section {
	padding-bottom: 32rpx;
	border-bottom: 2rpx solid #c2c6d8;
}

.item-row {
	display: flex;
	gap: 24rpx;
	align-items: flex-start;
}

.item-icon {
	font-size: 40rpx;
	color: #0050cb;
	margin-top: 8rpx;
}

.item-text {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	flex: 1;
}

.item-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.item-desc {
	font-size: 28rpx;
	color: #424656;
}

.item-remark {
	font-size: 24rpx;
	color: #727687;
}

.address-section {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.address-row {
	display: flex;
	gap: 24rpx;
	align-items: flex-start;
}

.address-icon {
	font-size: 40rpx;
	margin-top: 8rpx;
}

.address-icon-secondary {
	color: #515f74;
}

.address-icon-primary {
	color: #0050cb;
}

.address-text-block {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
	flex: 1;
}

.address-label {
	font-size: 24rpx;
	color: #727687;
}

.address-text {
	font-size: 28rpx;
	color: #0b1c30;
	line-height: 40rpx;
}

.address-text-bold {
	font-weight: 600;
}

/* 费用明细 */
.fee-list {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.fee-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.fee-label {
	font-size: 28rpx;
	color: #424656;
}

.fee-value {
	font-size: 28rpx;
	color: #0b1c30;
}

.fee-value-error {
	color: #ba1a1a;
}

.fee-divider {
	height: 2rpx;
	background-color: #c2c6d8;
	margin: 8rpx 0;
}

.fee-total-row {
	margin-bottom: 0;
}

.fee-total-label {
	font-size: 28rpx;
	font-weight: 700;
	color: #0b1c30;
}

.fee-total-value {
	font-size: 40rpx;
	font-weight: 700;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

/* 订单 ID & Footer */
.footer-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
	padding: 32rpx 0;
}

.footer-info-text {
	font-size: 24rpx;
	color: #727687;
}

/* 底部操作栏 */
.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 50;
	background-color: #ffffff;
	border-top: 2rpx solid #c2c6d8;
	padding: 24rpx 32rpx;
	padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
	display: flex;
	gap: 24rpx;
	box-shadow: 0 -8rpx 24rpx rgba(0, 0, 0, 0.05);
}

.bottom-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16rpx;
	border-radius: 24rpx;
	transition: transform 0.15s;
}

.bottom-btn:active {
	transform: scale(0.95);
}

.bottom-btn-outline {
	flex: 1;
	height: 96rpx;
	border: 2rpx solid #727687;
}

.bottom-btn-primary {
	flex: 1.5;
	height: 96rpx;
	background-color: #0050cb;
	box-shadow: 0 8rpx 16rpx rgba(0, 80, 203, 0.2);
}

.bottom-btn-icon {
	font-size: 40rpx;
}

.bottom-btn-icon-light {
	color: #ffffff;
}

.bottom-btn-text {
	font-size: 32rpx;
	font-weight: 700;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.bottom-btn-text-secondary {
	color: #424656;
}

.bottom-btn-text-light {
	color: #ffffff;
}
</style>
