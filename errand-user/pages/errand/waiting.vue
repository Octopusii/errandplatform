<template>
	<view class="page">
		<!-- Top App Bar -->
		<view class="top-bar">
			<view class="back-btn" @tap="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="top-title">待接单</text>
			<view class="help-btn">
				<text class="help-icon">?</text>
			</view>
		</view>

		<scroll-view scroll-y class="content" :show-scrollbar="false">
			<!-- Pulsing Status Section -->
			<view class="status-section">
				<view class="pulse-ring">
					<view class="pulse-inner"></view>
					<view class="pulse-core">
						<text class="pulse-icon">👤</text>
					</view>
				</view>
				<text class="status-title">正在为您匹配附近跑腿员...</text>
				<text class="status-desc">平均等待时间约 3-5 分钟</text>
				<view class="countdown">
					<text class="countdown-time">{{ countdown }}s</text>
					<text class="countdown-label">已等待</text>
				</view>
			</view>

			<!-- Order Summary Card -->
			<view class="summary-card">
				<view class="card-header">
					<text class="card-icon">📋</text>
					<text class="card-title">订单信息</text>
				</view>
				<view class="order-type">帮我送</view>
				<view class="summary-addr">
					<view class="addr-dot pick"></view>
					<text class="addr-text">北京市朝阳区万达广场 A 座</text>
				</view>
				<view class="summary-line"></view>
				<view class="summary-addr">
					<view class="addr-dot delivery"></view>
					<text class="addr-text">北京市海淀区中关村软件园 5 号楼</text>
				</view>
				<view class="summary-meta">
					<text class="meta-item">📦 文件</text>
					<text class="meta-item">⏱ 约 25 分钟</text>
					<text class="meta-item">💴 预估 ¥18.00</text>
				</view>
			</view>

			<!-- Tips Section -->
			<view class="tips-card">
				<view class="tip-item">
					<text class="tip-icon">💡</text>
					<text class="tip-text">等待期间您可以取消订单，不会产生费用</text>
				</view>
				<view class="tip-item">
					<text class="tip-icon">📱</text>
					<text class="tip-text">接单后会立即通知您，请保持电话畅通</text>
				</view>
			</view>

			<!-- Fake Riders Nearby -->
			<view class="riders-section">
				<text class="riders-title">附近正在营业的跑腿员</text>
				<view class="riders-list">
					<view
						v-for="(rider, idx) in riders"
						:key="idx"
						class="rider-card"
					>
						<view class="rider-avatar">
							<text>{{ rider.avatar }}</text>
						</view>
						<view class="rider-info">
							<text class="rider-name">{{ rider.name }}</text>
							<view class="rider-meta">
								<text class="rider-rating">{{ rider.rating }}</text>
								<text class="rider-distance">{{ rider.distance }}</text>
							</view>
						</view>
						<view class="rider-status" :class="{ online: rider.online }">
							{{ rider.online ? '接单中' : '忙碌' }}
						</view>
					</view>
				</view>
			</view>

			<view style="height: 120rpx;"></view>
		</scroll-view>

		<!-- Bottom Action Bar -->
		<view class="bottom-bar">
			<view class="cancel-btn" @tap="cancelOrder">
				<text class="cancel-icon">✕</text>
				<text>取消订单</text>
			</view>
			<view class="share-btn" @tap="shareOrder">
				<text class="share-icon">📤</text>
				<text>催单</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			countdown: 47,
			riders: [
				{ avatar: '王', name: '王师傅', rating: '⭐ 4.9', distance: '320m', online: true },
				{ avatar: '李', name: '李师傅', rating: '⭐ 4.8', distance: '580m', online: true },
				{ avatar: '张', name: '张师傅', rating: '⭐ 5.0', distance: '890m', online: false },
				{ avatar: '赵', name: '赵师傅', rating: '⭐ 4.7', distance: '1.2km', online: true }
			]
		}
	},
	onLoad() {
		this.timer = setInterval(() => {
			this.countdown++
		}, 1000)
	},
	onUnload() {
		if (this.timer) clearInterval(this.timer)
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		cancelOrder() {
			uni.showModal({
				title: '确认取消？',
				content: '取消后订单将不会产生费用',
				success: (res) => {
					if (res.confirm) {
						uni.navigateBack()
					}
				}
			})
		},
		shareOrder() {
			uni.showToast({
				title: '已为您催单',
				icon: 'none'
			})
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

.back-btn {
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	font-size: 28px;
	color: #0050cb;
}

.top-title {
	font-size: 20px;
	font-weight: 600;
	color: #0b1c30;
}

.help-btn {
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.help-icon {
	font-size: 20px;
	color: #0050cb;
}

.content {
	flex: 1;
	padding-top: 72px;
	padding-bottom: 120px;
}

.status-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 32px 16px 24px;
}

.pulse-ring {
	position: relative;
	width: 128px;
	height: 128px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 24px;
}

.pulse-inner {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background: rgba(0, 102, 255, 0.1);
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0% { transform: scale(1); opacity: 0.8; }
	100% { transform: scale(1.5); opacity: 0; }
}

.pulse-core {
	width: 80px;
	height: 80px;
	background: #0066ff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 16px 32px rgba(0, 102, 255, 0.3);
	z-index: 2;
}

.pulse-icon {
	font-size: 40px;
}

.status-title {
	font-size: 18px;
	font-weight: 600;
	color: #0b1c30;
	margin-bottom: 8px;
}

.status-desc {
	font-size: 14px;
	color: #424656;
	text-align: center;
}

.countdown {
	margin-top: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.countdown-time {
	font-size: 32px;
	font-weight: 700;
	color: #0050cb;
	font-variant-numeric: tabular-nums;
}

.countdown-label {
	font-size: 12px;
	color: #727687;
}

.summary-card {
	margin: 0 16px 16px;
	background: #ffffff;
	border-radius: 12px;
	padding: 16px;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card-header {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 12px;
}

.card-icon {
	font-size: 20px;
}

.card-title {
	font-size: 18px;
	font-weight: 600;
	color: #0b1c30;
}

.order-type {
	display: inline-block;
	font-size: 12px;
	font-weight: 600;
	color: #0050cb;
	background: rgba(0, 80, 203, 0.1);
	padding: 4px 10px;
	border-radius: 99px;
	margin-bottom: 12px;
}

.summary-addr {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 6px 0;
}

.addr-dot {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	flex-shrink: 0;
}

.addr-dot.pick {
	background: #0066ff;
}

.addr-dot.delivery {
	background: #515f74;
}

.addr-text {
	font-size: 14px;
	color: #0b1c30;
}

.summary-line {
	width: 1px;
	height: 16px;
	background: #c2c6d8;
	margin-left: 5px;
}

.summary-meta {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	margin-top: 12px;
	padding-top: 12px;
	border-top: 1px solid rgba(194, 198, 216, 0.3);
}

.meta-item {
	font-size: 12px;
	color: #424656;
}

.tips-card {
	margin: 0 16px 16px;
	background: #ffffff;
	border-radius: 12px;
	padding: 16px;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.tip-item {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 4px 0;
}

.tip-icon {
	font-size: 16px;
}

.tip-text {
	font-size: 12px;
	color: #424656;
}

.riders-section {
	margin: 0 16px;
}

.riders-title {
	font-size: 16px;
	font-weight: 600;
	color: #0b1c30;
	display: block;
	margin-bottom: 12px;
}

.riders-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.rider-card {
	background: #ffffff;
	border-radius: 12px;
	padding: 12px;
	display: flex;
	align-items: center;
	gap: 12px;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.rider-avatar {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: #d5e3fd;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	font-weight: 600;
	color: #0050cb;
}

.rider-info {
	flex: 1;
}

.rider-name {
	font-size: 14px;
	font-weight: 600;
	color: #0b1c30;
	display: block;
}

.rider-meta {
	display: flex;
	gap: 12px;
}

.rider-rating {
	font-size: 12px;
	color: #424656;
}

.rider-distance {
	font-size: 12px;
	color: #727687;
}

.rider-status {
	font-size: 10px;
	padding: 2px 8px;
	border-radius: 99px;
	background: #f1f5f9;
	color: #727687;
}

.rider-status.online {
	background: rgba(16, 137, 62, 0.1);
	color: #0f8a3c;
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 96px;
	background: #ffffff;
	border-top: 1px solid #c2c6d8;
	padding: 16px;
	display: flex;
	gap: 12px;
	padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
	z-index: 999;
}

.cancel-btn {
	flex: 1;
	height: 48px;
	border-radius: 12px;
	border: 2px solid #ba1a1a;
	color: #ba1a1a;
	font-size: 16px;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
}

.cancel-icon {
	font-size: 18px;
}

.share-btn {
	flex: 1;
	height: 48px;
	border-radius: 12px;
	background: #0050cb;
	color: #ffffff;
	font-size: 16px;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	box-shadow: 0 8px 24px rgba(0, 80, 203, 0.3);
}

.share-icon {
	font-size: 18px;
}
</style>
