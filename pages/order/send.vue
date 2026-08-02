<template>
	<view class="page">
		<view :style="{ height: statusBarHeight + 'px' }"></view>

		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="header-left">
				<view class="header-btn" @click="onBack">
					<text class="material-symbols-outlined header-icon">arrow_back</text>
				</view>
				<text class="header-title">帮我送</text>
			</view>
			<view class="header-btn" @click="onNotify">
				<text class="material-symbols-outlined header-icon">notifications</text>
			</view>
		</view>

		<scroll-view scroll-y class="main" :show-scrollbar="false">
			<view class="main-inner">
				<!-- 地址区块 -->
				<view class="address-section">
					<view class="address-bar"></view>
					<view class="address-content">
						<!-- 取件 -->
						<view class="address-row">
							<view class="address-marker-col">
								<view class="marker marker-pickup">
									<text class="marker-text">取</text>
								</view>
								<view class="marker-line"></view>
							</view>
							<view class="address-info">
								<view class="address-label-row">
									<text class="address-label">从哪里取件</text>
									<text class="address-link" @click="onChoosePickup">常用地址</text>
								</view>
								<text class="address-text">上海市浦东新区陆家嘴金融中心</text>
								<text class="address-subtext">张先生 138****0000</text>
							</view>
						</view>
						<!-- 送件 -->
						<view class="address-row">
							<view class="address-marker-col">
								<view class="marker marker-delivery">
									<text class="marker-text">送</text>
								</view>
							</view>
							<view class="address-info">
								<view class="address-label-row">
									<text class="address-label">送到哪里去</text>
								</view>
								<text class="address-text address-text-placeholder">请输入或选择收件地址</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 地图快照 -->
				<view class="map-snippet">
					<image class="map-bg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD34hE0tRRJ863nUz-mvqQJKr7lYOw2C3eGErQELYki0x5HBVN2uLThEKuOwp5QuqFNLJseO8xNFGkaCH-BtVlibzwmGGsWM26GEjZP7OEdF_Gkond5gkK0MIwnLaykxoQ2nrsYkz_Mw-l1ZApPR7jAhxljJTBypTGFtiw8ejM3A33wOA0Imeal13Y_IznUOjYKySZ5LTz4reOr3NVAXW6XP4_x5b77eVyB3F8jklLqsHgpaqRM104Zc1cpfqeAAJ9brd0RaQRn" mode="aspectFill" />
					<view class="map-overlay-tint"></view>
					<view class="map-distance-badge">
						<text class="material-symbols-outlined distance-icon">distance</text>
						<text class="distance-text">预计 4.2 公里</text>
					</view>
				</view>

				<!-- 物品信息 -->
				<view class="card">
					<view class="card-header">
						<text class="material-symbols-outlined card-icon">package_2</text>
						<text class="card-title">物品信息</text>
					</view>

					<view class="sub-section">
						<text class="sub-label">物品类型</text>
						<view class="chip-row">
							<view
								v-for="(chip, idx) in chips"
								:key="idx"
								class="chip"
								:class="{ 'chip-active': activeChip === idx, 'chip-inactive': activeChip !== idx }"
								@click="selectChip(idx)"
							>
								<text>{{ chip }}</text>
							</view>
						</view>
					</view>

					<view class="sub-section">
						<view class="weight-header">
							<text class="sub-label">重量估算</text>
							<text class="weight-value">{{ weightLabel }}</text>
						</view>
						<slider
							class="weight-slider"
							:min="1"
							:max="20"
							:value="weight"
							:step="1"
							activeColor="#0050cb"
							backgroundColor="#d5e3fd"
							block-size="24"
							@change="onWeightChange"
						/>
						<view class="weight-scale">
							<text class="scale-text">1kg</text>
							<text class="scale-text">5kg</text>
							<text class="scale-text">10kg</text>
							<text class="scale-text">15kg</text>
							<text class="scale-text">20kg+</text>
						</view>
					</view>
				</view>

				<!-- 备注与选项 -->
				<view class="card">
					<view class="sub-section">
						<text class="sub-label">下单备注</text>
						<textarea
							class="remark-textarea"
							placeholder="有什么需要嘱咐小哥的吗？（如：放门把手上、轻拿轻放）"
							placeholder-class="remark-placeholder"
							v-model="remark"
							:maxlength="-1"
						/>
					</view>
					<view class="time-row" @click="onPickTime">
						<view class="time-left">
							<text class="material-symbols-outlined time-icon">schedule</text>
							<text class="time-label">取件时间</text>
						</view>
						<view class="time-right">
							<text class="time-value">立即取件</text>
							<text class="material-symbols-outlined time-chevron">chevron_right</text>
						</view>
					</view>
				</view>

				<view style="height: 280rpx;"></view>
			</view>
		</scroll-view>

		<!-- 底部操作栏 -->
		<view class="footer">
			<view class="footer-top">
				<view class="footer-price-block">
					<view class="footer-price-label-row">
						<text class="footer-price-label">费用预估</text>
						<text class="material-symbols-outlined footer-info">info</text>
					</view>
					<view class="footer-price-value-row">
						<text class="footer-price-symbol">¥</text>
						<text class="footer-price-value">12.50</text>
						<text class="footer-price-original">¥18.00</text>
					</view>
				</view>
				<view class="footer-discount-block">
					<text class="discount-tag">新人立减 ¥5.5</text>
					<text class="discount-desc">含 1.0kg 重量费</text>
				</view>
			</view>
			<view class="footer-btn" @click="onSubmit">
				<text class="footer-btn-text">立即下单</text>
				<text class="material-symbols-outlined footer-btn-icon">bolt</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 20,
			activeChip: 0,
			chips: ['文件', '鲜花', '蛋糕', '数码', '其他'],
			weight: 1,
			weightLabel: '1kg 及以下',
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
		onNotify() {
			uni.showToast({ title: '暂无新消息', icon: 'none' })
		},
		onChoosePickup() {
			uni.showToast({ title: '选择常用取件地址', icon: 'none' })
		},
		selectChip(idx) {
			this.activeChip = idx
		},
		onWeightChange(e) {
			const val = e.detail.value
			this.weight = val
			if (val <= 1) this.weightLabel = '1kg 及以下'
			else if (val >= 20) this.weightLabel = '20kg 以上'
			else this.weightLabel = val + 'kg'
		},
		onPickTime() {
			uni.showToast({ title: '选择取件时间', icon: 'none' })
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

.main {
	flex: 1;
}

.main-inner {
	padding: 40rpx 32rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

/* 地址区块 */
.address-section {
	background-color: #ffffff;
	border-radius: 24rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	border: 2rpx solid rgba(194, 198, 216, 0.3);
	position: relative;
	overflow: hidden;
}

.address-bar {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 8rpx;
	background-color: #0050cb;
}

.address-content {
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	gap: 48rpx;
}

.address-row {
	display: flex;
	gap: 32rpx;
	align-items: flex-start;
}

.address-marker-col {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 8rpx;
}

.marker {
	width: 48rpx;
	height: 48rpx;
	border-radius: 9999rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.marker-pickup {
	background-color: #0066ff;
}

.marker-delivery {
	background-color: #515f74;
}

.marker-text {
	font-size: 20rpx;
	color: #ffffff;
	font-weight: 700;
}

.marker-line {
	width: 0;
	height: 80rpx;
	border-left: 4rpx dashed #c2c6d8;
	margin: 8rpx 0;
}

.address-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.address-label-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8rpx;
}

.address-label {
	font-size: 24rpx;
	color: #727687;
	letter-spacing: 2rpx;
}

.address-link {
	font-size: 24rpx;
	color: #0050cb;
}

.address-text {
	font-size: 32rpx;
	font-weight: 600;
	color: #0b1c30;
	line-height: 48rpx;
}

.address-text-placeholder {
	color: #c2c6d8;
	font-style: italic;
	font-weight: 400;
}

.address-subtext {
	font-size: 24rpx;
	color: #c2c6d8;
}

/* 地图快照 */
.map-snippet {
	width: 100%;
	height: 256rpx;
	border-radius: 24rpx;
	overflow: hidden;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	border: 2rpx solid rgba(194, 198, 216, 0.3);
	position: relative;
}

.map-bg {
	width: 100%;
	height: 100%;
}

.map-overlay-tint {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 80, 203, 0.05);
}

.map-distance-badge {
	position: absolute;
	bottom: 16rpx;
	right: 16rpx;
	background-color: rgba(255, 255, 255, 0.9);
	padding: 12rpx 24rpx;
	border-radius: 9999rpx;
	border: 2rpx solid rgba(0, 80, 203, 0.2);
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.distance-icon {
	font-size: 32rpx;
	color: #0050cb;
}

.distance-text {
	font-size: 24rpx;
	color: #0050cb;
	font-weight: 500;
}

/* 卡片 */
.card {
	background-color: #ffffff;
	padding: 32rpx;
	border-radius: 24rpx;
	border: 2rpx solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.card-header {
	display: flex;
	align-items: center;
	gap: 16rpx;
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

.sub-section {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.sub-label {
	font-size: 24rpx;
	color: #424656;
}

.chip-row {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
}

.chip {
	padding: 16rpx 32rpx;
	border-radius: 24rpx;
	font-size: 24rpx;
	transition: all 0.15s;
}

.chip-active {
	background-color: #0066ff;
	color: #ffffff;
}

.chip-inactive {
	background-color: #f1f5f9;
	color: #424656;
}

.chip:active {
	transform: scale(0.95);
}

.weight-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.weight-value {
	font-size: 28rpx;
	font-weight: 700;
	color: #0050cb;
}

.weight-slider {
	width: 100%;
	margin: 8rpx 0;
}

.weight-scale {
	display: flex;
	justify-content: space-between;
}

.scale-text {
	font-size: 20rpx;
	color: #727687;
}

.remark-textarea {
	width: 100%;
	height: 160rpx;
	padding: 24rpx;
	background-color: #eff4ff;
	border: none;
	border-radius: 24rpx;
	font-size: 28rpx;
	color: #0b1c30;
}

.remark-placeholder {
	color: #c2c6d8;
}

.time-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx;
	background-color: #eff4ff;
	border-radius: 24rpx;
}

.time-left {
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.time-icon {
	font-size: 40rpx;
	color: #0050cb;
}

.time-label {
	font-size: 28rpx;
	color: #0b1c30;
}

.time-right {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.time-value {
	font-size: 28rpx;
	font-weight: 600;
	color: #0050cb;
}

.time-chevron {
	font-size: 40rpx;
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
	border-top: 2rpx solid rgba(194, 198, 216, 0.3);
	padding: 32rpx 32rpx;
	padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
	box-shadow: 0 -8rpx 24rpx rgba(0, 0, 0, 0.05);
}

.footer-top {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 32rpx;
}

.footer-price-block {
	display: flex;
	flex-direction: column;
}

.footer-price-label-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.footer-price-label {
	font-size: 24rpx;
	color: #727687;
}

.footer-info {
	font-size: 28rpx;
	color: #727687;
}

.footer-price-value-row {
	display: flex;
	align-items: baseline;
	gap: 8rpx;
	margin-top: 8rpx;
}

.footer-price-symbol {
	font-size: 36rpx;
	font-weight: 600;
	color: #0050cb;
}

.footer-price-value {
	font-size: 48rpx;
	font-weight: 700;
	color: #0050cb;
	font-family: 'Plus Jakarta Sans', sans-serif;
	line-height: 56rpx;
}

.footer-price-original {
	font-size: 24rpx;
	color: #727687;
	text-decoration: line-through;
	margin-left: 16rpx;
}

.footer-discount-block {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 8rpx;
}

.discount-tag {
	font-size: 20rpx;
	color: #ba1a1a;
	background-color: rgba(255, 218, 214, 0.5);
	padding: 4rpx 16rpx;
	border-radius: 9999rpx;
	font-weight: 500;
}

.discount-desc {
	font-size: 24rpx;
	color: #424656;
}

.footer-btn {
	width: 100%;
	height: 112rpx;
	background-color: #0050cb;
	border-radius: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 80, 203, 0.3);
	transition: transform 0.15s;
}

.footer-btn:active {
	transform: scale(0.98);
}

.footer-btn-text {
	font-size: 36rpx;
	font-weight: 600;
	color: #ffffff;
	font-family: 'Plus Jakarta Sans', sans-serif;
}

.footer-btn-icon {
	font-size: 40rpx;
	color: #ffffff;
}
</style>
