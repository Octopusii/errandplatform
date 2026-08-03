<template>
	<view class="page">
		<!-- Top App Bar -->
		<view class="top-bar">
			<view class="back-btn" @tap="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="top-title">订单详情</text>
			<view class="top-empty"></view>
		</view>

		<scroll-view scroll-y class="content" :show-scrollbar="false">
			<!-- Status Header -->
			<view class="status-header">
				<view class="status-bg"></view>
				<view class="status-content">
					<view class="status-icon">🛵</view>
					<text class="status-title">跑腿员取件中</text>
					<text class="status-desc">王师傅正在赶往取件地址</text>
					<view class="progress-steps">
						<view class="step done">
							<view class="step-line"></view>
							<view class="step-dot"></view>
							<text class="step-label">已接单</text>
						</view>
						<view class="step active">
							<view class="step-line"></view>
							<view class="step-dot"></view>
							<text class="step-label">取件中</text>
						</view>
						<view class="step">
							<view class="step-line"></view>
							<view class="step-dot"></view>
							<text class="step-label">配送中</text>
						</view>
						<view class="step">
							<view class="step-dot"></view>
							<text class="step-label">已送达</text>
						</view>
					</view>
				</view>
			</view>

			<!-- Rider Info Card -->
			<view class="card rider-card">
				<view class="rider-avatar">
					<text class="avatar-text">王</text>
				</view>
				<view class="rider-info">
					<text class="rider-name">王师傅</text>
					<view class="rider-stats">
						<text class="stat-item">⭐ 4.9分</text>
						<text class="stat-item">🚵 已跑 1268 单</text>
					</view>
					<text class="rider-plate">京A·P2389</text>
				</view>
				<view class="rider-actions">
					<view class="action-btn" @tap="callRider">
						<text class="action-icon">📞</text>
						<text>电话</text>
					</view>
					<view class="action-btn" @tap="msgRider">
						<text class="action-icon">💬</text>
						<text>消息</text>
					</view>
				</view>
			</view>

			<!-- Route Map Card -->
			<view class="card route-card">
				<view class="map-placeholder">
					<view class="map-bg"></view>
					<view class="route-line"></view>
				</view>
				<view class="route-info">
					<view class="route-point">
						<view class="point-dot pickup"></view>
						<text class="point-text">取件地址：北京市朝阳区万达广场 A 座 1201 室</text>
					</view>
					<view class="route-point">
						<view class="point-dot delivery"></view>
						<text class="point-text">收件地址：北京市海淀区中关村软件园 5 号楼 B 座</text>
					</view>
				</view>
			</view>

			<!-- Order Detail Card -->
			<view class="card detail-card">
				<view class="section-title">订单信息</view>
				<view class="detail-row">
					<text class="detail-label">订单类型</text>
					<text class="detail-value">帮我送</text>
				</view>
				<view class="detail-row">
					<text class="detail-label">物品类型</text>
					<text class="detail-value">文件</text>
				</view>
				<view class="detail-row">
					<text class="detail-label">重量</text>
					<text class="detail-value">1.0kg</text>
				</view>
				<view class="detail-row">
					<text class="detail-label">备注</text>
					<text class="detail-value">重要文件，请轻拿轻放，送达后致电</text>
				</view>
				<view class="detail-row">
					<text class="detail-label">下单时间</text>
					<text class="detail-value">2023-10-24 15:32:48</text>
				</view>
				<view class="detail-row">
					<text class="detail-label">订单编号</text>
					<text class="detail-value mono">PA202310248892</text>
				</view>
			</view>

			<!-- Price Card -->
			<view class="card price-card">
				<view class="section-title">费用明细</view>
				<view class="price-row">
					<text class="price-label">基础配送费</text>
					<text class="price-value">¥5.00</text>
				</view>
				<view class="price-row">
					<text class="price-label">距离附加费 (4.2km)</text>
					<text class="price-value">¥6.00</text>
				</view>
				<view class="price-row">
					<text class="price-label">重量附加费</text>
					<text class="price-value">¥2.00</text>
				</view>
				<view class="price-row discount">
					<text class="price-label discount-label">新人立减</text>
					<text class="price-value discount-value">-¥3.00</text>
				</view>
				<view class="price-divider"></view>
				<view class="price-row total">
					<text class="price-label total-label">实付金额</text>
					<text class="price-value total-value">¥10.00</text>
				</view>
			</view>

			<view style="height: 180rpx;"></view>
		</scroll-view>

		<!-- Bottom Action Bar -->
		<view class="bottom-bar">
			<view class="btn btn-outline" @tap="cancelOrder">取消订单</view>
			<view class="btn btn-primary" @tap="confirmDelivered">确认送达</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		goBack() {
			uni.navigateBack()
		},
		callRider() {
			uni.makePhoneCall({ phoneNumber: '13800000000' })
		},
		msgRider() {
			uni.showToast({ title: '正在打开聊天...', icon: 'none' })
		},
		cancelOrder() {
			uni.showModal({
				title: '确认取消订单？',
				content: '订单将不会产生费用',
				success: (res) => {
					if (res.confirm) uni.navigateBack()
				}
			})
		},
		confirmDelivered() {
			uni.navigateTo({ url: '/pages/order/detail-completed' })
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

.top-empty {
	width: 40px;
}

.content {
	flex: 1;
	padding-top: 72px;
	padding-bottom: 100px;
}

.status-header {
	position: relative;
	padding: 24px 16px;
	text-align: center;
	overflow: hidden;
}

.status-bg {
	position: absolute;
	inset: 0;
	background: linear-gradient(180deg, #0066ff 0%, #0050cb 100%);
	opacity: 0.1;
}

.status-content {
	position: relative;
	z-index: 2;
}

.status-icon {
	font-size: 48px;
	margin-bottom: 8px;
}

.status-title {
	font-size: 22px;
	font-weight: 700;
	color: #0b1c30;
	display: block;
}

.status-desc {
	font-size: 14px;
	color: #424656;
}

.progress-steps {
	display: flex;
	justify-content: space-between;
	margin-top: 24px;
	padding: 0 16px;
}

.step {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	position: relative;
}

.step-line {
	position: absolute;
	top: 5px;
	left: 50%;
	width: 100%;
	height: 2px;
	background: #c2c6d8;
	z-index: 1;
}

.step:last-child .step-line {
	display: none;
}

.step.done .step-line {
	background: #0050cb;
}

.step-dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #c2c6d8;
	z-index: 2;
	position: relative;
}

.step.done .step-dot {
	background: #0050cb;
}

.step.active .step-dot {
	background: #0066ff;
	box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.2);
}

.step-label {
	font-size: 12px;
	color: #727687;
	margin-top: 4px;
}

.step.done .step-label,
.step.active .step-label {
	color: #0b1c30;
	font-weight: 600;
}

.card {
	margin: 0 16px 16px;
	background: #ffffff;
	border-radius: 12px;
	padding: 16px;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.rider-card {
	display: flex;
	align-items: center;
	gap: 12px;
}

.rider-avatar {
	width: 56px;
	height: 56px;
	border-radius: 50%;
	background: linear-gradient(135deg, #0066ff, #0050cb);
	display: flex;
	align-items: center;
	justify-content: center;
}

.avatar-text {
	font-size: 20px;
	font-weight: 600;
	color: #ffffff;
}

.rider-info {
	flex: 1;
}

.rider-name {
	font-size: 18px;
	font-weight: 600;
	color: #0b1c30;
	display: block;
}

.rider-stats {
	display: flex;
	gap: 12px;
}

.stat-item {
	font-size: 12px;
	color: #424656;
}

.rider-plate {
	font-size: 12px;
	color: #727687;
}

.rider-actions {
	display: flex;
	gap: 8px;
}

.action-btn {
	width: 48px;
	height: 48px;
	border-radius: 12px;
	background: #eff4ff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2px;
}

.action-icon {
	font-size: 16px;
}

.action-btn text:last-child {
	font-size: 10px;
	color: #0050cb;
}

.route-card {
	padding: 0;
	overflow: hidden;
}

.map-placeholder {
	height: 128px;
	position: relative;
	overflow: hidden;
}

.map-bg {
	position: absolute;
	inset: 0;
	background: linear-gradient(135deg, #e5eeff 0%, #d3e4fe 50%, #e5eeff 100%);
}

.route-line {
	position: absolute;
	top: 30%;
	left: 20%;
	width: 60%;
	height: 40%;
	background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50'%3E%3Cpath d='M0 25 Q 25 0 50 25 T 100 25' stroke='%230066ff' stroke-width='3' fill='none'/%3E%3C/svg%3E") no-repeat center;
	background-size: 100% 100%;
}

.route-info {
	padding: 16px;
}

.route-point {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 0;
}

.point-dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	flex-shrink: 0;
}

.point-dot.pickup {
	background: #0066ff;
}

.point-dot.delivery {
	background: #515f74;
}

.point-text {
	font-size: 14px;
	color: #0b1c30;
}

.section-title {
	font-size: 16px;
	font-weight: 600;
	color: #0b1c30;
	margin-bottom: 12px;
}

.detail-row {
	display: flex;
	justify-content: space-between;
	padding: 8px 0;
	border-bottom: 1px solid rgba(194, 198, 216, 0.2);
}

.detail-row:last-child {
	border-bottom: none;
}

.detail-label {
	font-size: 14px;
	color: #424656;
}

.detail-value {
	font-size: 14px;
	color: #0b1c30;
	text-align: right;
}

.detail-value.mono {
	font-family: monospace;
}

.price-row {
	display: flex;
	justify-content: space-between;
	padding: 6px 0;
}

.price-label {
	font-size: 14px;
	color: #424656;
}

.price-value {
	font-size: 14px;
	color: #0b1c30;
	font-weight: 500;
}

.price-row.discount .price-label {
	color: #ba1a1a;
}

.discount-value {
	color: #ba1a1a;
}

.price-divider {
	height: 1px;
	background: #c2c6d8;
	margin: 12px 0;
}

.total-row .total-label {
	font-size: 16px;
	font-weight: 700;
	color: #0b1c30;
}

.total-row .total-value {
	font-size: 20px;
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
	padding: 16px;
	display: flex;
	gap: 12px;
	padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
	z-index: 999;
}

.btn {
	flex: 1;
	height: 48px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-weight: 600;
}

.btn-outline {
	border: 2px solid #ba1a1a;
	color: #ba1a1a;
	background: #ffffff;
}

.btn-primary {
	background: #0050cb;
	color: #ffffff;
	box-shadow: 0 8px 24px rgba(0, 80, 203, 0.2);
}
</style>
