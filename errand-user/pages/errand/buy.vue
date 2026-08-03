<template>
	<view class="page">
		<!-- Top App Bar -->
		<view class="top-bar">
			<view class="back-btn" @tap="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="top-title">帮我买</text>
			<view class="help-btn">
				<text class="help-icon">?</text>
			</view>
		</view>

		<scroll-view scroll-y class="content" :show-scrollbar="false">
			<!-- Item Description Card -->
			<view class="card">
				<view class="card-header">
					<text class="card-icon">🛍️</text>
					<text class="card-title">想买什么？</text>
				</view>
				<textarea class="item-textarea" placeholder="描述一下您想买的物品，如：一份双拼炸鸡、一盒感冒药等..." />
				<view class="tag-list">
					<view class="tag">🍔 快餐</view>
					<view class="tag">💊 药品</view>
					<view class="tag">☕ 咖啡</view>
					<view class="tag">🧴 日用</view>
				</view>
			</view>

			<!-- Price & Buy Location Row -->
			<view class="price-row">
				<view class="card price-card">
					<text class="price-label">预估商品价格</text>
					<view class="price-input-row">
						<text class="price-symbol">¥</text>
						<input class="price-input" placeholder="0.00" type="digit" />
					</view>
				</view>
				<view class="card tip-card">
					<text class="tip-desc">商品费用多退少补</text>
					<text class="tip-bold">请保留小票</text>
				</view>
			</view>

			<!-- Address Selection Section -->
			<view class="card address-card">
				<view class="card-header">
					<text class="card-icon">📍</text>
					<text class="card-title">购买地址</text>
				</view>
				<view class="tab-group">
					<view
						class="tab-btn"
						:class="{ active: addressMode === 'near' }"
						@tap="addressMode = 'near'"
					>就近购买</view>
					<view
						class="tab-btn"
						:class="{ active: addressMode === 'fixed' }"
						@tap="addressMode = 'fixed'"
					>指定地址</view>
				</view>
				<view v-if="addressMode === 'near'" class="address-content">
					<view class="near-icon">
						<text>🧭</text>
					</view>
					<view>
						<text class="near-title">系统自动匹配最近商圈</text>
						<text class="near-desc">省时省事，骑手将就近为您选购</text>
					</view>
				</view>
				<view v-else class="address-content">
					<view class="fixed-input">
						<text class="fixed-placeholder">去哪儿买？</text>
						<text class="fixed-arrow">›</text>
					</view>
				</view>
			</view>

			<!-- Delivery Address -->
			<view class="card delivery-card">
				<view class="delivery-left">
					<view class="delivery-icon">🏠</view>
					<view>
						<text class="delivery-title">送到哪里？</text>
						<text class="delivery-hint">点击选择收货地址</text>
					</view>
				</view>
				<text class="delivery-link">选择</text>
			</view>

			<!-- Remarks -->
			<view class="card">
				<view class="card-header">
					<text class="card-icon">📝</text>
					<text class="card-title">下单备注</text>
				</view>
				<input class="remark-input" placeholder="给骑手带句话..." />
			</view>

			<!-- Fee Details Breakdown -->
			<view class="fee-card">
				<view class="fee-row">
					<text class="fee-label">基础配送费</text>
					<text class="fee-value">¥5.00</text>
				</view>
				<view class="fee-row">
					<text class="fee-label">距离附加 (1.2km)</text>
					<text class="fee-value">¥2.00</text>
				</view>
				<view class="fee-row">
					<text class="fee-label">夜间服务费</text>
					<text class="fee-value">¥0.00</text>
				</view>
				<view class="fee-divider"></view>
				<view class="fee-row total-row">
					<text class="fee-label total-label">预计配送费</text>
					<text class="fee-value total-value">¥7.00</text>
				</view>
			</view>

			<view style="height: 200rpx;"></view>
		</scroll-view>

		<!-- Bottom Action Bar -->
		<view class="bottom-bar">
			<view class="bottom-left">
				<text class="bottom-label">待支付</text>
				<text class="bottom-price">¥7.00</text>
				<text class="bottom-hint">不含商品费用，由骑手垫付</text>
			</view>
			<view class="submit-btn" @tap="goSuccess">立即下单</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addressMode: 'near'
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		goSuccess() {
			uni.navigateTo({ url: '/pages/errand/success' })
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

.card {
	background: #ffffff;
	border-radius: 12px;
	margin: 0 16px 16px;
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

.item-textarea {
	width: 100%;
	height: 96px;
	background: #eff4ff;
	border-radius: 12px;
	padding: 12px;
	font-size: 14px;
	color: #0b1c30;
}

.tag-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 16px;
}

.tag {
	background: #d5e3fd;
	color: #57657b;
	font-size: 12px;
	padding: 6px 12px;
	border-radius: 99px;
}

.price-row {
	display: flex;
	gap: 12px;
	margin: 0 16px 16px;
}

.price-card {
	flex: 1;
	margin: 0;
}

.tip-card {
	flex: 1;
	margin: 0;
	background: #0066ff;
	border: none;
	color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.tip-desc {
	font-size: 14px;
	opacity: 0.9;
}

.tip-bold {
	font-size: 14px;
	font-weight: 700;
}

.price-label {
	font-size: 12px;
	color: #727687;
	margin-bottom: 8px;
	display: block;
}

.price-input-row {
	display: flex;
	align-items: center;
	gap: 4px;
}

.price-symbol {
	font-size: 18px;
	font-weight: 700;
	color: #0b1c30;
}

.price-input {
	flex: 1;
	font-size: 18px;
	font-weight: 700;
	color: #0b1c30;
}

.tab-group {
	display: flex;
	background: #eff4ff;
	border-radius: 8px;
	padding: 4px;
	margin: 8px;
}

.tab-btn {
	flex: 1;
	text-align: center;
	padding: 8px;
	border-radius: 6px;
	font-size: 12px;
	font-weight: 500;
	color: #727687;
}

.tab-btn.active {
	background: #ffffff;
	color: #0050cb;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.address-content {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 16px 0;
}

.near-icon {
	width: 40px;
	height: 40px;
	background: rgba(0, 80, 203, 0.1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
}

.near-title {
	font-size: 14px;
	font-weight: 700;
	color: #0b1c30;
	display: block;
}

.near-desc {
	font-size: 12px;
	color: #727687;
}

.fixed-input {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #eff4ff;
	padding: 12px;
	border-radius: 12px;
}

.fixed-placeholder {
	font-size: 14px;
	color: #727687;
}

.fixed-arrow {
	font-size: 18px;
	color: #0050cb;
}

.delivery-card {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.delivery-left {
	display: flex;
	gap: 12px;
}

.delivery-icon {
	width: 40px;
	height: 40px;
	background: rgba(213, 227, 253, 0.5);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
}

.delivery-title {
	font-size: 14px;
	font-weight: 700;
	color: #0b1c30;
	display: block;
}

.delivery-hint {
	font-size: 12px;
	color: #727687;
}

.delivery-link {
	font-size: 14px;
	font-weight: 500;
	color: #0050cb;
}

.remark-input {
	width: 100%;
	background: #eff4ff;
	border-radius: 12px;
	padding: 12px;
	font-size: 14px;
	color: #0b1c30;
}

.fee-card {
	margin: 0 16px 16px;
	background: rgba(229, 238, 255, 0.5);
	border: 1px dashed #c2c6d8;
	border-radius: 12px;
	padding: 16px;
}

.fee-row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
}

.fee-label {
	font-size: 12px;
	color: #424656;
}

.fee-value {
	font-size: 12px;
	font-weight: 700;
}

.fee-divider {
	height: 1px;
	background: #c2c6d8;
	margin: 12px 0;
}

.total-row {
	margin-bottom: 0;
}

.total-label {
	font-size: 14px;
	font-weight: 700;
	color: #0b1c30;
}

.total-value {
	font-size: 18px;
	font-weight: 700;
	color: #0050cb;
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 80px;
	background: #ffffff;
	border-top: 1px solid #c2c6d8;
	padding: 0 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: env(safe-area-inset-bottom);
	z-index: 999;
}

.bottom-left {
	display: flex;
	flex-direction: column;
}

.bottom-label {
	font-size: 12px;
	color: #727687;
}

.bottom-price {
	font-size: 22px;
	font-weight: 700;
	color: #0050cb;
}

.bottom-hint {
	font-size: 10px;
	color: #727687;
}

.submit-btn {
	background: #0050cb;
	color: #ffffff;
	font-size: 18px;
	font-weight: 600;
	padding: 14px 32px;
	border-radius: 99px;
	box-shadow: 0 8px 24px rgba(0, 80, 203, 0.3);
}
</style>
