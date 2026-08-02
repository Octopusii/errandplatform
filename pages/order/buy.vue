<template>
	<view class="page">
		<!-- 状态栏占位 -->
		<view :style="{ height: statusBarHeight + 'px' }"></view>

		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="header-btn" @click="onBack">
				<text class="material-symbols-outlined header-icon">arrow_back</text>
			</view>
			<text class="header-title">帮我买</text>
			<view class="header-btn" @click="onHelp">
				<text class="material-symbols-outlined header-icon">help_outline</text>
			</view>
		</view>

		<!-- 主内容 -->
		<scroll-view scroll-y class="main" :show-scrollbar="false">
			<view class="main-inner">
				<!-- 物品描述 -->
				<view class="card">
					<view class="card-header">
						<text class="material-symbols-outlined material-symbols-fill card-icon">shopping_bag</text>
						<text class="card-title">想买什么？</text>
					</view>
					<textarea
						class="item-textarea"
						v-model="itemDesc"
						placeholder="描述一下您想买的物品，如：一份双拼炸鸡、一盒感冒药等..."
						placeholder-class="textarea-placeholder"
						:maxlength="-1"
					/>
					<view class="tag-row">
						<view
							v-for="(tag, idx) in tags"
							:key="idx"
							class="tag"
							:class="{ 'tag-active': activeTag === idx }"
							@click="selectTag(idx)"
						>
							<text>{{ tag.label }}</text>
						</view>
					</view>
				</view>

				<!-- 价格 & 购买地址 -->
				<view class="row-2col">
					<view class="card price-card">
						<text class="price-label">预估商品价格</text>
						<view class="price-input-row">
							<text class="price-symbol">¥</text>
							<input class="price-input" type="digit" placeholder="0.00" placeholder-class="price-placeholder" v-model="estimatedPrice" />
						</view>
					</view>
					<view class="card price-tip-card">
						<text class="tip-text-1">商品费用多退少补</text>
						<text class="tip-text-2">请保留小票</text>
					</view>
				</view>

				<!-- 地址选择 -->
				<view class="card address-card">
					<view class="address-card-header">
						<view class="address-card-title-row">
							<text class="material-symbols-outlined card-icon">location_on</text>
							<text class="card-title">购买地址</text>
						</view>
					</view>
					<view class="tabs">
						<view
							class="tab"
							:class="{ 'tab-active': addressMode === 'near' }"
							@click="toggleAddressMode('near')"
						>
							<text>就近购买</text>
						</view>
						<view
							class="tab"
							:class="{ 'tab-active': addressMode === 'fixed' }"
							@click="toggleAddressMode('fixed')"
						>
							<text>指定地址</text>
						</view>
					</view>
					<!-- 就近购买 -->
					<view v-if="addressMode === 'near'" class="address-mode-content">
						<view class="near-row">
							<view class="near-icon">
								<text class="material-symbols-outlined near-icon-text">explore</text>
							</view>
							<view class="near-text">
								<text class="near-title">系统自动匹配最近商圈</text>
								<text class="near-desc">省时省事，骑手将就近为您选购</text>
							</view>
						</view>
					</view>
					<!-- 指定地址 -->
					<view v-else class="address-mode-content">
						<view class="fixed-row" @click="onChooseShop">
							<text class="fixed-text">去哪儿买？</text>
							<text class="material-symbols-outlined fixed-chevron">chevron_right</text>
						</view>
					</view>
				</view>

				<!-- 收货地址 -->
				<view class="card delivery-card" @click="onChooseAddress">
					<view class="delivery-row">
						<view class="delivery-icon-wrap">
							<text class="material-symbols-outlined delivery-icon">home</text>
						</view>
						<view class="delivery-text">
							<text class="delivery-title">送到哪里？</text>
							<text class="delivery-desc">点击选择收货地址</text>
						</view>
					</view>
					<text class="delivery-action">选择</text>
				</view>

				<!-- 备注 -->
				<view class="card">
					<view class="card-header">
						<text class="material-symbols-outlined card-icon">edit_note</text>
						<text class="card-title">下单备注</text>
					</view>
					<input class="remark-input" placeholder="给骑手带句话..." placeholder-class="remark-placeholder" v-model="remark" />
				</view>

				<!-- 费用明细 -->
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
					<view class="fee-row fee-total-row">
						<text class="fee-total-label">预计配送费</text>
						<text class="fee-total-value">¥7.00</text>
					</view>
				</view>

				<!-- 底部留白 -->
				<view style="height: 240rpx;"></view>
			</view>
		</scroll-view>

		<!-- 底部操作栏 -->
		<view class="footer">
			<view class="footer-left">
				<view class="footer-price-row">
					<text class="footer-price-label">待支付</text>
					<text class="footer-price">¥7.00</text>
				</view>
				<text class="footer-tip">不含商品费用，由骑手垫付</text>
			</view>
			<view class="footer-btn" @click="onSubmit">
				<text class="footer-btn-text">立即下单</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 20,
			itemDesc: '',
			activeTag: -1,
			tags: [
				{ label: '🍔 快餐' },
				{ label: '💊 药品' },
				{ label: '☕ 咖啡' },
				{ label: '🧴 日用' }
			],
			estimatedPrice: '',
			addressMode: 'near',
			remark: ''
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
		onHelp() {
			uni.showToast({ title: '如需帮助请联系客服', icon: 'none' })
		},
		selectTag(idx) {
			this.activeTag = this.activeTag === idx ? -1 : idx
		},
		toggleAddressMode(mode) {
			this.addressMode = mode
		},
		onChooseShop() {
			uni.showToast({ title: '选择购买地址', icon: 'none' })
		},
		onChooseAddress() {
			uni.showToast({ title: '选择收货地址', icon: 'none' })
		},
		onSubmit() {
			uni.navigateTo({ url: '/pages/order/waiting' })
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
	padding: 40rpx 32rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

/* 卡片 */
.card {
	background-color: #ffffff;
	padding: 32rpx;
	border-radius: 24rpx;
	border: 2rpx solid #c2c6d8;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
}

.card-header {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-bottom: 24rpx;
}

.card-icon {
	font-size: 40rpx;
	color: #0050cb;
}

.card-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #0b1c30;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 48rpx;
}

/* 物品描述 */
.item-textarea {
	width: 100%;
	height: 192rpx;
	padding: 24rpx;
	background-color: #eff4ff;
	border: none;
	border-radius: 24rpx;
	font-size: 28rpx;
	color: #0b1c30;
}

.textarea-placeholder {
	color: #727687;
}

.tag-row {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
	margin-top: 32rpx;
}

.tag {
	padding: 12rpx 24rpx;
	background-color: #d5e3fd;
	border-radius: 9999rpx;
	font-size: 24rpx;
	color: #57657b;
	transition: transform 0.15s;
}

.tag:active {
	transform: scale(0.95);
}

.tag-active {
	background-color: #0050cb;
	color: #ffffff;
}

/* 两列布局 */
.row-2col {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 24rpx;
}

.price-card {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.price-label {
	font-size: 24rpx;
	color: #727687;
	margin-bottom: 16rpx;
	line-height: 32rpx;
}

.price-input-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.price-symbol {
	font-size: 36rpx;
	font-weight: 700;
	color: #0b1c30;
}

.price-input {
	flex: 1;
	font-size: 36rpx;
	font-weight: 700;
	color: #0b1c30;
	background: transparent;
}

.price-placeholder {
	color: #c2c6d8;
}

.price-tip-card {
	background-color: #0066ff;
	color: #f8f7ff;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.tip-text-1 {
	font-size: 24rpx;
	color: rgba(248, 247, 255, 0.9);
	line-height: 32rpx;
	margin-bottom: 8rpx;
}

.tip-text-2 {
	font-size: 28rpx;
	font-weight: 700;
	color: #f8f7ff;
	line-height: 40rpx;
}

/* 地址选择卡片 */
.address-card {
	padding: 0;
	overflow: hidden;
}

.address-card-header {
	padding: 32rpx;
	border-bottom: 2rpx solid #c2c6d8;
	background-color: rgba(239, 244, 255, 0.5);
}

.address-card-title-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.tabs {
	display: flex;
	padding: 8rpx;
	background-color: #eff4ff;
	border-radius: 16rpx;
	margin: 16rpx;
}

.tab {
	flex: 1;
	padding: 16rpx 0;
	border-radius: 12rpx;
	font-size: 24rpx;
	color: #727687;
	text-align: center;
	transition: all 0.2s;
}

.tab-active {
	background-color: #ffffff;
	color: #0050cb;
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
}

.address-mode-content {
	padding: 32rpx;
}

.near-row {
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.near-icon {
	width: 80rpx;
	height: 80rpx;
	border-radius: 9999rpx;
	background-color: rgba(0, 80, 203, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
}

.near-icon-text {
	font-size: 40rpx;
	color: #0050cb;
}

.near-text {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.near-title {
	font-size: 28rpx;
	font-weight: 700;
	color: #0b1c30;
}

.near-desc {
	font-size: 24rpx;
	color: #727687;
}

.fixed-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx;
	background-color: #eff4ff;
	border-radius: 24rpx;
}

.fixed-text {
	font-size: 28rpx;
	color: #727687;
}

.fixed-chevron {
	font-size: 40rpx;
	color: #0050cb;
}

/* 收货地址 */
.delivery-card {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.delivery-row {
	display: flex;
	gap: 24rpx;
	align-items: center;
}

.delivery-icon-wrap {
	width: 80rpx;
	height: 80rpx;
	border-radius: 9999rpx;
	background-color: rgba(213, 227, 253, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
}

.delivery-icon {
	font-size: 40rpx;
	color: #515f74;
}

.delivery-text {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.delivery-title {
	font-size: 28rpx;
	font-weight: 700;
	color: #0b1c30;
}

.delivery-desc {
	font-size: 24rpx;
	color: #727687;
}

.delivery-action {
	font-size: 24rpx;
	color: #0050cb;
}

/* 备注 */
.remark-input {
	width: 100%;
	padding: 24rpx;
	background-color: #eff4ff;
	border: none;
	border-radius: 24rpx;
	font-size: 28rpx;
	color: #0b1c30;
}

.remark-placeholder {
	color: #727687;
}

/* 费用明细 */
.fee-card {
	background-color: rgba(239, 244, 255, 0.5);
	padding: 32rpx;
	border-radius: 24rpx;
	border: 2rpx dashed #c2c6d8;
}

.fee-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16rpx;
}

.fee-label {
	font-size: 24rpx;
	color: #424656;
}

.fee-value {
	font-size: 24rpx;
	font-weight: 700;
	color: #0b1c30;
}

.fee-divider {
	height: 2rpx;
	background-color: #c2c6d8;
	margin: 24rpx 0;
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
	font-size: 36rpx;
	font-weight: 700;
	color: #0050cb;
}

/* 底部操作栏 */
.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 50;
	background-color: #ffffff;
	border-top: 2rpx solid #c2c6d8;
	box-shadow: 0 -8rpx 24rpx rgba(0, 0, 0, 0.05);
	padding-bottom: env(safe-area-inset-bottom);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 32rpx;
	height: 160rpx;
}

.footer-left {
	display: flex;
	flex-direction: column;
}

.footer-price-row {
	display: flex;
	align-items: baseline;
	gap: 8rpx;
}

.footer-price-label {
	font-size: 24rpx;
	color: #727687;
}

.footer-price {
	font-size: 44rpx;
	font-weight: 700;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.footer-tip {
	font-size: 20rpx;
	color: #727687;
	margin-top: 4rpx;
}

.footer-btn {
	background-color: #0050cb;
	padding: 28rpx 64rpx;
	border-radius: 9999rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 80, 203, 0.3);
	transition: transform 0.15s;
}

.footer-btn:active {
	transform: scale(0.95);
}

.footer-btn-text {
	font-size: 36rpx;
	font-weight: 600;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
