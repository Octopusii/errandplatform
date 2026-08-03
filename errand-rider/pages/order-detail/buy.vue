<template>
	<view class="container">
		<!-- 状态横幅 -->
		<view class="status-banner">
			<view class="banner-content">
				<view class="earning-section">
					<text class="earning-label">预计收入</text>
					<view class="earning-display">
						<text class="currency">¥</text>
						<text class="amount">28.50</text>
					</view>
				</view>
				<view class="info-section">
					<view class="priority-badge">
						<text class="priority-icon">⚡</text>
						<text class="priority-text">高优派送</text>
					</view>
					<text class="distance-text">距离 3.2km</text>
				</view>
			</view>
			<!-- 装饰元素 -->
			<view class="decoration-top"></view>
			<view class="decoration-bottom"></view>
		</view>

		<!-- 主要内容 -->
		<view class="main-content">
			<!-- 采购清单卡片 -->
			<view class="checklist-card">
				<view class="checklist-header">
					<text class="checklist-icon">🛒</text>
					<text class="checklist-title">采购清单</text>
				</view>

				<!-- 清单项1 -->
				<view class="checklist-item">
					<view class="item-icon">
						<text>☕</text>
					</view>
					<view class="item-details">
						<text class="item-name">冰美式 (大杯)</text>
						<text class="item-note">备注：去冰，不加糖</text>
					</view>
					<text class="item-quantity">x2</text>
				</view>

				<!-- 清单项2 -->
				<view class="checklist-item">
					<view class="item-icon">
						<text>🍞</text>
					</view>
					<view class="item-details">
						<text class="item-name">全麦吐司</text>
						<text class="item-note">备注：选日期最新的</text>
					</view>
					<text class="item-quantity">x1</text>
				</view>

				<view class="checklist-divider"></view>

				<view class="checklist-footer">
					<text class="footer-label">预估商品金额</text>
					<text class="footer-amount">约 ¥52.00</text>
				</view>
			</view>

			<!-- 物流信息网格 -->
			<view class="logistics-grid">
				<!-- 采购地址 -->
				<view class="logistics-card">
					<view class="logistics-header">
						<view class="logistics-icon secondary">
							<text>🏪</text>
						</view>
						<text class="logistics-label">采购地址</text>
					</view>
					<view class="logistics-content">
						<text class="logistics-title">就近购买</text>
						<text class="logistics-desc">建议前往：星巴克(长宁来福士店) 或 附近便利店</text>
					</view>
					<view class="logistics-map">
						<image class="map-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA99ceP0B_yjYO0CLQLXY8MA2flcTPFJsHfpWMbvV36AaijyL7lQhx9YhJsnbehU-tSgw5WPCky1LN6K96r-JgGCJyxuINWrS2keTJmhd8_aRDVFn3luxUNy3pXNT4KVLQ5u4vdEAff1Rw_JGRQ1Xrty7fPUAf9D7wmhtk25Ozs3EA51PbK-AQgEkKq6u3l7zpyprt_ecQAJc4EIwq5Kb6p4CSaLe0cn3br6ebTxVIde2OHE7iml1uq1u8wR8m672dZIFl-YJy8wa6V" mode="aspectFill"></image>
					</view>
				</view>

				<!-- 送货地址 -->
				<view class="logistics-card">
					<view class="logistics-header">
						<view class="logistics-icon primary">
							<text>📍</text>
						</view>
						<text class="logistics-label">送货地址</text>
					</view>
					<view class="logistics-content">
						<text class="logistics-title">中山万博广场 B座 1602室</text>
						<text class="logistics-desc">张先生 · 138****8888</text>
					</view>
				</view>
			</view>

			<!-- 附加信息标签 -->
			<view class="info-chips">
				<view class="info-chip">
					<text class="chip-icon">⏰</text>
					<text class="chip-text">要求 45分钟内送达</text>
				</view>
				<view class="info-chip">
					<text class="chip-icon">📏</text>
					<text class="chip-text">全程 4.5km</text>
				</view>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="grab-button" @click="grabOrder">
				<text class="grab-icon">👆</text>
				<text class="grab-text">立即抢单</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		grabOrder() {
			uni.showLoading({
				title: '正在抢单...'
			});

			setTimeout(() => {
				uni.hideLoading();
				uni.navigateTo({
					url: '/pages/order-success/index'
				});

				// 震动反馈
				uni.vibrateShort({
					success: () => {}
				});
			}, 1200);
		}
	}
}
</script>

<style scoped>
.container {
	background-color: #f8f9ff;
	min-height: 100vh;
	padding-bottom: 100px;
}

.status-banner {
	position: relative;
	overflow: hidden;
	background-color: #003b9a;
	padding: 24px 16px;
	color: #ffffff;
}

.banner-content {
	position: relative;
	z-index: 1;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}

.earning-section {
	display: flex;
	flex-direction: column;
}

.earning-label {
	font-size: 12px;
	opacity: 0.8;
	margin-bottom: 4px;
}

.earning-display {
	display: flex;
	align-items: baseline;
	gap: 2px;
}

.currency {
	font-size: 22px;
	font-weight: 700;
}

.amount {
	font-size: 36px;
	font-weight: 700;
	line-height: 1;
}

.info-section {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.priority-badge {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	background-color: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	padding: 4px 12px;
	border-radius: 9999px;
	margin-bottom: 8px;
}

.priority-icon {
	font-size: 14px;
}

.priority-text {
	font-size: 12px;
	font-weight: 500;
}

.distance-text {
	font-size: 12px;
	opacity: 0.8;
}

.decoration-top {
	position: absolute;
	top: 0;
	right: 0;
	width: 128px;
	height: 128px;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 50%;
	filter: blur(30px);
	margin-right: -32px;
	margin-top: -32px;
}

.decoration-bottom {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 96px;
	height: 96px;
	background-color: rgba(0, 80, 203, 0.3);
	border-radius: 50%;
	filter: blur(20px);
	margin-left: 48px;
	margin-bottom: -16px;
}

.main-content {
	position: relative;
	z-index: 10;
	margin: -16px 16px 16px;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.checklist-card {
	background-color: #ffffff;
	border-radius: 16px;
	padding: 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.checklist-header {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 16px;
}

.checklist-icon {
	font-size: 20px;
	color: #003b9a;
}

.checklist-title {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
}

.checklist-item {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 16px;
}

.checklist-item:last-of-type {
	margin-bottom: 0;
}

.item-icon {
	width: 48px;
	height: 48px;
	border-radius: 8px;
	background-color: #e7e7f2;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	color: #515f74;
	margin-right: 12px;
}

.item-details {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.item-name {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
}

.item-note {
	font-size: 14px;
	color: #434654;
	margin-top: 4px;
}

.item-quantity {
	font-size: 12px;
	color: #434654;
}

.checklist-divider {
	height: 1px;
	background-color: #c3c6d6;
	margin: 16px 0;
}

.checklist-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.footer-label {
	font-size: 14px;
	color: #434654;
}

.footer-amount {
	font-size: 18px;
	font-weight: 600;
	color: #ba1a1a;
}

.logistics-grid {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.logistics-card {
	background-color: #f3f3fd;
	border-radius: 16px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.logistics-header {
	display: flex;
	align-items: center;
	gap: 8px;
}

.logistics-icon {
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
}

.logistics-icon.primary {
	background-color: #0050cb;
	color: #c1cfff;
}

.logistics-icon.secondary {
	background-color: #d2e1fa;
	color: #556379;
}

.logistics-label {
	font-size: 12px;
	font-weight: 500;
}

.logistics-content {
	display: flex;
	flex-direction: column;
}

.logistics-title {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
	margin-bottom: 4px;
}

.logistics-desc {
	font-size: 14px;
	color: #434654;
}

.logistics-map {
	width: 100%;
	height: 128px;
	border-radius: 8px;
	overflow: hidden;
}

.map-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.info-chips {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.info-chip {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 12px;
	background-color: #e1e2ec;
	border-radius: 9999px;
}

.chip-icon {
	font-size: 16px;
	color: #515f74;
}

.chip-text {
	font-size: 12px;
	color: #434654;
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(248, 249, 255, 0.9);
	backdrop-filter: blur(10px);
	padding: 16px;
	box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
	z-index: 50;
}

.grab-button {
	background-color: #003b9a;
	color: #ffffff;
	padding: 14px;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	font-size: 20px;
	font-weight: 600;
	transition: transform 0.2s;
}

.grab-button:active {
	transform: scale(0.98);
}

.grab-icon {
	font-size: 20px;
}

.grab-text {
	font-size: 20px;
	font-weight: 600;
}
</style>