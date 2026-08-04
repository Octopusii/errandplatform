<template>
	<view class="container">
		<!-- 顶部状态栏 -->
		<view class="header-section">
			<view class="location-info">
				<text class="icon">📍</text>
				<view class="location-text">
					<text class="label">当前位置</text>
					<text class="address">上海市黄浦区南京东路街道</text>
				</view>
			</view>
			<view class="status-toggle" @click="toggleStatus">
				<view class="toggle-blob" :class="{ 'active': isWorking }"></view>
				<text class="toggle-text" :class="{ 'active': isWorking }">开工</text>
				<text class="toggle-text" :class="{ 'active': !isWorking }">收工</text>
			</view>
		</view>

		<!-- 地图预览 -->
		<view class="map-preview">
			<image class="map-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPBmstYLHl0iIRMib_YHktk5PQvnqzZWF-NCmmUTOqVHnplNh5OhrUI4TjEFuX9q66nAUvHZygS1zV9MYC-y7wJ3OZ5jYy59oIKcN7I4fErd_H2FyZRYuZQn0PYMUJOGVzIumQbrVpT1hzQubmu-IBcPyJsPgcwDuYk9_4CTzwlRKQ3c3pAAPFUkooumvrWWwCwu6FuzHQYUeDZNRYotnPHPUBQjEOqBbdWS112zwoeM217YEZySkFfRBpDaD-GcUiQsswpuOIIl-x" mode="aspectFill"></image>
			<view class="map-overlay">
				<view class="order-count">
					<view class="pulse-dot"></view>
					<text class="count-text">附近有 12 个新订单待抢</text>
				</view>
			</view>
		</view>

		<!-- 订单列表 -->
		<view class="orders-list">
			<!-- 订单卡片1 -->
			<view class="order-card" v-if="orderList.length > 0">
				<view class="card-header">
					<view class="tags">
						<text class="tag tag-primary">帮我送</text>
						<text class="tag tag-secondary">配送费加价</text>
					</view>
					<view class="earning">
						<text class="earning-label">预计收入</text>
						<text class="earning-amount">¥ 28.50</text>
					</view>
				</view>

				<view class="route-info">
					<view class="route-icons">
						<text class="route-icon">🔵</text>
						<view class="route-line"></view>
						<text class="route-icon">🔴</text>
					</view>
					<view class="route-details">
						<view class="location-item">
							<text class="location-label">取货：南京西路 1266 号恒隆广场</text>
							<text class="location-distance">距离当前 1.2km</text>
						</view>
						<view class="location-item">
							<text class="location-label highlight">送货：陆家嘴环路 1000 号恒生银行大厦</text>
							<text class="location-distance">配送距离 4.5km</text>
						</view>
					</view>
				</view>

				<view class="order-remark">
					<text class="remark-icon">ℹ️</text>
					<text class="remark-text">备注：急件，需送货上门，请带保温袋</text>
				</view>

				<button class="grab-btn" @click="grabOrder(0)">
					<text>立即抢单</text>
					<text class="btn-icon">⚡</text>
				</button>
			</view>

			<!-- 订单卡片2 -->
			<view class="order-card" v-if="orderList.length > 1">
				<view class="card-header">
					<view class="tags">
						<text class="tag tag-tertiary">帮我买</text>
					</view>
					<view class="earning">
						<text class="earning-label">预计收入</text>
						<text class="earning-amount">¥ 15.00</text>
					</view>
				</view>

				<view class="route-info">
					<view class="route-icons">
						<text class="route-icon">🛒</text>
						<view class="route-line"></view>
						<text class="route-icon">🔴</text>
					</view>
					<view class="route-details">
						<view class="location-item">
							<text class="location-label">购买：全家便利店 (汉口路店)</text>
							<text class="location-distance">距离当前 0.5km</text>
						</view>
						<view class="location-item">
							<text class="location-label highlight">送货：外滩街道福州路 22 号</text>
							<text class="location-distance">配送距离 0.8km</text>
						</view>
					</view>
				</view>

				<view class="order-remark">
					<text class="remark-icon">📄</text>
					<text class="remark-text">商品：冰镇可乐 x2, 乐事薯片 x1</text>
				</view>

				<button class="grab-btn" @click="grabOrder(1)">
					<text>立即抢单</text>
					<text class="btn-icon">⚡</text>
				</button>
			</view>

			<!-- 空状态 -->
			<view class="empty-state" v-if="orderList.length === 0">
				<view class="empty-line"></view>
				<text class="empty-text">没有更多订单了</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isWorking: true,
			orderList: [
				{ id: 1, type: 'send' },
				{ id: 2, type: 'buy' }
			]
		}
	},
	methods: {
		toggleStatus() {
			this.isWorking = !this.isWorking;
		},
		grabOrder(index) {
			const btn = event.target;
			btn.innerHTML = '<text>抢单中...</text><text class="btn-icon">🔄</text>';
			btn.classList.add('loading');

			setTimeout(() => {
				btn.innerHTML = '<text>成功抢单!</text><text class="btn-icon">✅</text>';
				btn.classList.remove('loading');
				btn.classList.add('success');

				setTimeout(() => {
					// 跳转到抢单成功页面
					uni.navigateTo({
						url: '/pages/order-success/index'
					});
				}, 800);
			}, 1200);
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

.header-section {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	background-color: rgba(248, 249, 255, 0.9);
	backdrop-filter: blur(10px);
	position: sticky;
	top: 0;
	z-index: 10;
}

.location-info {
	display: flex;
	align-items: center;
	gap: 8px;
	max-width: 60%;
}

.icon {
	font-size: 20px;
}

.location-text {
	display: flex;
	flex-direction: column;
}

.label {
	font-size: 12px;
	color: #434654;
	line-height: 16px;
}

.address {
	font-size: 14px;
	color: #191b23;
	line-height: 20px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.status-toggle {
	position: relative;
	display: flex;
	align-items: center;
	background-color: #e7e7f2;
	padding: 4px;
	border-radius: 9999px;
	width: 112px;
	cursor: pointer;
	transition: all 0.3s;
}

.toggle-blob {
	position: absolute;
	left: 4px;
	width: 52px;
	height: 28px;
	background-color: #003b9a;
	border-radius: 9999px;
	transition: transform 0.3s;
}

.toggle-blob.active {
	transform: translateX(0);
}

.toggle-text {
	flex: 1;
	text-align: center;
	font-size: 12px;
	font-weight: 500;
	z-index: 1;
	transition: color 0.3s;
}

.toggle-text.active {
	color: #ffffff;
}

.toggle-text:not(.active) {
	color: #434654;
}

.map-preview {
	position: relative;
	width: 100%;
	height: 128px;
	border-radius: 16px;
	overflow: hidden;
	margin-bottom: 16px;
}

.map-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.map-overlay {
	position: absolute;
	inset: 0;
	background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
	display: flex;
	align-items: flex-end;
	padding: 12px;
}

.order-count {
	display: flex;
	align-items: center;
	gap: 8px;
	color: white;
}

.pulse-dot {
	width: 8px;
	height: 8px;
	background-color: #10b981;
	border-radius: 50%;
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}

.count-text {
	font-size: 12px;
	font-weight: 500;
}

.orders-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 0 16px;
}

.order-card {
	background-color: #f3f3fd;
	border-radius: 16px;
	padding: 16px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	transition: transform 0.2s;
}

.order-card:active {
	transform: scale(0.98);
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 12px;
}

.tags {
	display: flex;
	gap: 8px;
}

.tag {
	font-size: 12px;
	font-weight: 500;
	padding: 4px 8px;
	border-radius: 9999px;
}

.tag-primary {
	background-color: #0050cb;
	color: #c1cfff;
}

.tag-secondary {
	background-color: #d2e1fa;
	color: #556379;
}

.tag-tertiary {
	background-color: #e0e3e4;
	color: #434748;
}

.earning {
	text-align: right;
}

.earning-label {
	font-size: 12px;
	color: #434654;
	display: block;
}

.earning-amount {
	font-size: 22px;
	font-weight: 700;
	color: #003b9a;
	line-height: 28px;
}

.route-info {
	display: flex;
	gap: 12px;
	margin-bottom: 12px;
}

.route-icons {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	padding-top: 4px;
}

.route-icon {
	font-size: 18px;
}

.route-line {
	width: 1px;
	height: 24px;
	background-color: #c3c6d6;
	margin: 4px 0;
}

.route-details {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.location-item {
	display: flex;
	flex-direction: column;
}

.location-label {
	font-size: 12px;
	color: #434654;
	line-height: 16px;
}

.location-label.highlight {
	color: #191b23;
}

.location-distance {
	font-size: 12px;
	color: #434654;
	opacity: 0.7;
}

.order-remark {
	display: flex;
	align-items: center;
	gap: 8px;
	background-color: rgba(231, 231, 242, 0.5);
	padding: 8px;
	border-radius: 8px;
	margin-bottom: 12px;
}

.remark-icon {
	font-size: 16px;
	color: #434748;
}

.remark-text {
	font-size: 12px;
	color: #434654;
}

.grab-btn {
	width: 100%;
	background-color: #003b9a;
	color: #ffffff;
	padding: 12px;
	border-radius: 8px;
	font-size: 18px;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: none;
	transition: all 0.2s;
}

.grab-btn:active {
	background-color: #0050cb;
	transform: scale(0.95);
}

.grab-btn.loading {
	opacity: 0.8;
}

.grab-btn.success {
	background-color: #10b981;
}

.btn-icon {
	font-size: 18px;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 32px 0;
	opacity: 0.4;
}

.empty-line {
	width: 96px;
	height: 4px;
	background-color: #e1e2ec;
	border-radius: 9999px;
	margin-bottom: 16px;
}

.empty-text {
	font-size: 12px;
	color: #434654;
}
</style>