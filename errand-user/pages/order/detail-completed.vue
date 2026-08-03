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
					<view class="success-circle">
						<text class="success-check">✓</text>
					</view>
					<text class="status-title">订单已完成</text>
					<text class="status-desc">感谢您的使用，期待下次合作</text>
				</view>
			</view>

			<!-- Address Card -->
			<view class="card address-card">
				<view class="addr-row">
					<view class="addr-circles">
						<view class="addr-circle pickup">取</view>
					</view>
					<view class="addr-info">
						<text class="addr-address">北京市朝阳区万达广场 A 座 1201 室</text>
						<text class="addr-contact">张先生 138****0000</text>
					</view>
				</view>
				<view class="addr-row">
					<view class="addr-circles">
						<view class="addr-circle delivery">送</view>
					</view>
					<view class="addr-info">
						<text class="addr-address">北京市海淀区中关村软件园 5 号楼 B 座</text>
						<text class="addr-contact">李女士 139****1111</text>
					</view>
				</view>
				<view class="time-info">
					<view class="time-item">
						<text class="time-label">下单时间</text>
						<text class="time-value">15:32:48</text>
					</view>
					<view class="time-item">
						<text class="time-label">送达时间</text>
						<text class="time-value">15:58:23</text>
					</view>
					<view class="time-item">
						<text class="time-label">总耗时</text>
						<text class="time-value">25 分 35 秒</text>
					</view>
				</view>
			</view>

			<!-- Rider Rating Card -->
			<view class="card rating-card">
				<view class="rating-header">
					<view class="rider-avatar">
						<text class="avatar-text">王</text>
					</view>
					<view class="rider-info">
						<text class="rider-name">王师傅</text>
						<text class="rider-plate">京A·P2389</text>
					</view>
					<view class="rating-badge">
						<text class="rating-stars">⭐⭐⭐⭐⭐</text>
					</view>
				</view>
				<view class="rating-stats">
					<view class="stat-item">
						<text class="stat-value">4.9</text>
						<text class="stat-label">服务评分</text>
					</view>
					<view class="stat-divider"></view>
					<view class="stat-item">
						<text class="stat-value">26min</text>
						<text class="stat-label">配送时间</text>
					</view>
					<view class="stat-divider"></view>
					<view class="stat-item">
						<text class="stat-value">4.2km</text>
						<text class="stat-label">行驶里程</text>
					</view>
				</view>
			</view>

			<!-- Service Rating Card -->
			<view class="card service-card">
				<text class="service-title">给本次服务打个分吧</text>
				<view class="star-row">
					<view
						v-for="i in 5"
						:key="i"
						class="star-item"
						@tap="rate = i"
					>
						<text class="star-icon" :class="{ active: i <= rate }">★</text>
					</view>
				</view>
				<view class="tag-row">
					<view
						v-for="(tag, idx) in tags"
						:key="idx"
						class="tag-item"
						:class="{ active: selectedTags.includes(idx) }"
						@tap="toggleTag(idx)"
					>{{ tag }}</view>
				</view>
				<textarea class="comment-input" placeholder="留下您的评价（选填）" />
			</view>

			<!-- Order Info Card -->
			<view class="card info-card">
				<view class="section-title">订单信息</view>
				<view class="info-row">
					<text class="info-label">订单类型</text>
					<text class="info-value">帮我送</text>
				</view>
				<view class="info-row">
					<text class="info-label">物品类型</text>
					<text class="info-value">文件</text>
				</view>
				<view class="info-row">
					<text class="info-label">重量</text>
					<text class="info-value">1.0kg</text>
				</view>
				<view class="info-row">
					<text class="info-label">订单编号</text>
					<text class="info-value mono">PA202310248892</text>
				</view>
				<view class="info-row">
					<text class="info-label">支付方式</text>
					<text class="info-value">微信支付</text>
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
					<text class="price-label">距离附加费</text>
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

			<!-- Promotions -->
			<view class="promo-card">
				<view class="promo-item">
					<text class="promo-icon">🎁</text>
					<text class="promo-text">再下一单立减 ¥5</text>
					<text class="promo-btn" @tap="showToast('优惠券已领取')">领取</text>
				</view>
			</view>

			<view style="height: 180rpx;"></view>
		</scroll-view>

		<!-- Bottom Action Bar -->
		<view class="bottom-bar">
			<view class="btn btn-outline" @tap="showToast('已开发票')">申请发票</view>
			<view class="btn btn-primary" @tap="showToast('评价已提交')">提交评价</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			rate: 5,
			tags: ['服务迅速', '态度友好', '准时送达', '专业可靠', '安全可靠'],
			selectedTags: [0, 1, 2]
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		toggleTag(idx) {
			const pos = this.selectedTags.indexOf(idx)
			if (pos > -1) {
				this.selectedTags.splice(pos, 1)
			} else {
				this.selectedTags.push(idx)
			}
		},
		showToast(msg) {
			uni.showToast({ title: msg, icon: 'none' })
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
	background: linear-gradient(180deg, rgba(0, 102, 255, 0.1) 0%, rgba(0, 102, 255, 0) 100%);
}

.status-content {
	position: relative;
	z-index: 2;
}

.success-circle {
	width: 80px;
	height: 80px;
	background: linear-gradient(135deg, #10893e, #0b7a37);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 12px;
	box-shadow: 0 12px 24px rgba(16, 137, 62, 0.2);
}

.success-check {
	font-size: 40px;
	font-weight: 700;
	color: #ffffff;
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

.card {
	margin: 0 16px 16px;
	background: #ffffff;
	border-radius: 12px;
	padding: 16px;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.addr-row {
	display: flex;
	gap: 12px;
	padding: 10px 0;
}

.addr-circles {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.addr-circle {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	font-weight: 700;
	color: #ffffff;
}

.addr-circle.pickup {
	background: #0066ff;
}

.addr-circle.delivery {
	background: #515f74;
}

.addr-info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.addr-address {
	font-size: 14px;
	font-weight: 600;
	color: #0b1c30;
}

.addr-contact {
	font-size: 12px;
	color: #727687;
}

.time-info {
	display: flex;
	justify-content: space-around;
	margin-top: 16px;
	padding-top: 16px;
	border-top: 1px solid rgba(194, 198, 216, 0.3);
}

.time-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.time-label {
	font-size: 10px;
	color: #727687;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.time-value {
	font-size: 14px;
	font-weight: 600;
	color: #0b1c30;
}

.rating-header {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 16px;
}

.rider-avatar {
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background: linear-gradient(135deg, #0066ff, #0050cb);
	display: flex;
	align-items: center;
	justify-content: center;
}

.avatar-text {
	font-size: 18px;
	font-weight: 600;
	color: #ffffff;
}

.rider-info {
	flex: 1;
}

.rider-name {
	font-size: 16px;
	font-weight: 600;
	color: #0b1c30;
	display: block;
}

.rider-plate {
	font-size: 12px;
	color: #727687;
}

.rating-badge {
	background: rgba(0, 80, 203, 0.1);
	padding: 4px 10px;
	border-radius: 99px;
}

.rating-stars {
	font-size: 12px;
}

.rating-stats {
	display: flex;
	align-items: center;
	justify-content: space-around;
	background: #f8f9ff;
	border-radius: 12px;
	padding: 12px;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.stat-value {
	font-size: 16px;
	font-weight: 700;
	color: #0050cb;
}

.stat-label {
	font-size: 10px;
	color: #727687;
}

.stat-divider {
	width: 1px;
	height: 32px;
	background: #c2c6d8;
}

.service-title {
	font-size: 16px;
	font-weight: 600;
	color: #0b1c30;
	display: block;
	margin-bottom: 12px;
}

.star-row {
	display: flex;
	justify-content: center;
	gap: 16px;
	margin-bottom: 16px;
}

.star-item {
	padding: 4px;
}

.star-icon {
	font-size: 32px;
	color: #c2c6d8;
}

.star-icon.active {
	color: #ffb400;
}

.tag-row {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 12px;
}

.tag-item {
	padding: 8px 16px;
	border-radius: 8px;
	background: #eff4ff;
	color: #424656;
	font-size: 12px;
	font-weight: 500;
}

.tag-item.active {
	background: rgba(0, 80, 203, 0.1);
	color: #0050cb;
}

.comment-input {
	width: 100%;
	height: 64px;
	background: #eff4ff;
	border-radius: 12px;
	padding: 12px;
	font-size: 14px;
	color: #0b1c30;
}

.section-title {
	font-size: 16px;
	font-weight: 600;
	color: #0b1c30;
	margin-bottom: 12px;
	display: block;
}

.info-row {
	display: flex;
	justify-content: space-between;
	padding: 8px 0;
	border-bottom: 1px solid rgba(194, 198, 216, 0.2);
}

.info-row:last-child {
	border-bottom: none;
}

.info-label {
	font-size: 14px;
	color: #424656;
}

.info-value {
	font-size: 14px;
	color: #0b1c30;
	text-align: right;
}

.info-value.mono {
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

.promo-card {
	margin: 0 16px;
	background: #ffffff;
	border-radius: 12px;
	padding: 16px;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.promo-item {
	display: flex;
	align-items: center;
	gap: 8px;
	background: linear-gradient(135deg, rgba(255, 180, 0, 0.1), rgba(255, 180, 0, 0.05));
	padding: 12px;
	border-radius: 12px;
}

.promo-icon {
	font-size: 20px;
}

.promo-text {
	flex: 1;
	font-size: 14px;
	color: #0b1c30;
	font-weight: 500;
}

.promo-btn {
	font-size: 14px;
	font-weight: 600;
	color: #0050cb;
	background: rgba(0, 80, 203, 0.1);
	padding: 6px 16px;
	border-radius: 99px;
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
	border: 2px solid #424656;
	color: #424656;
	background: #ffffff;
}

.btn-primary {
	background: #0050cb;
	color: #ffffff;
	box-shadow: 0 8px 24px rgba(0, 80, 203, 0.2);
}
</style>
