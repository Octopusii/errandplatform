<template>
	<view class="container">
		<!-- 加载中 -->
		<view v-if="loading" style="display:flex;justify-content:center;align-items:center;padding:40px 0;color:#434654;">
			<text>加载中...</text>
		</view>

		<block v-else>
			<!-- 状态追踪器 -->
			<view class="status-tracker">
				<view class="progress-line">
					<view class="progress-bar" :style="{ width: progressWidth }"></view>
				</view>

				<!-- 步骤1：已接单 -->
				<view class="step">
					<view class="step-circle" :class="stepClass(0)">
						<text class="step-icon">✓</text>
					</view>
					<text class="step-label" :class="stepClass(0) === 'active' ? 'active' : ''">已接单</text>
				</view>

				<!-- 步骤2：已取货 -->
				<view class="step">
					<view class="step-circle" :class="stepClass(1)">
						<text class="step-icon">📦</text>
					</view>
					<text class="step-label" :class="stepClass(1) === 'active' ? 'active' : ''">已取货</text>
				</view>

				<!-- 步骤3：配送中 -->
				<view class="step">
					<view class="step-circle" :class="stepClass(2)">
						<text class="step-icon">🚚</text>
					</view>
					<text class="step-label" :class="stepClass(2) === 'active' ? 'active' : ''">配送中</text>
				</view>

				<!-- 步骤4：待送达 -->
				<view class="step">
					<view class="step-circle" :class="stepClass(3)">
						<text class="step-icon">🚩</text>
					</view>
					<text class="step-label" :class="stepClass(3) === 'active' ? 'active' : ''">待送达</text>
				</view>
			</view>

			<!-- 地图视图 -->
			<view class="map-view">
				<image class="map-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_JzEKN-GssBGh_NIEVe_yag59_hUMViKUiJX763elGTdt32nGGsi195QiOc8EtAQ5J7DLYPS7Lm88P-tnJHpH0KyFKQ7umo25NEoKr-eHxvy0GTVrz6f4uQuribMUgByZKzo_2yLPRy7Am-a3wfm4ACh2etFPQbxWTM_25178VBFeCwHZS0w6nwNYLxNJD29jwAUHZ7A3lulcs5Y_PWtiED1YyfLZc-qzIUvblKuTamWI7zpxo3Tv8g1x35pBipfsTAvZPUrSbMo8" mode="aspectFill"></image>

				<!-- 浮动统计覆盖层 -->
				<view class="stats-overlay">
					<view class="stat-item">
						<view class="stat-icon">
							<text>🧭</text>
						</view>
						<view class="stat-content">
							<text class="stat-label">剩余距离</text>
							<text class="stat-value primary">1.2 km</text>
						</view>
					</view>
					<view class="stat-divider"></view>
					<view class="stat-item">
						<text class="stat-label">预计送达</text>
						<text class="stat-value">14:25</text>
					</view>
				</view>
			</view>

			<!-- 订单信息卡片 -->
			<view class="order-info-card">
				<!-- 取货信息 -->
				<view class="info-item">
					<view class="info-icons">
						<view class="info-dot secondary"></view>
						<view class="info-line"></view>
					</view>
					<view class="info-content">
						<view class="info-header">
							<text class="info-label secondary">取货点</text>
							<view class="contact-btn" @click="callSender">
								<text class="contact-icon">📞</text>
								<text class="contact-text">联系发货人</text>
							</view>
						</view>
						<text class="info-title" v-if="order.order_type === 'send'">{{ order.pickup_address }}</text>
						<text class="info-title" v-else>{{ order.purchase_mode === 'near' ? '就近购买' : '指定地址' }}</text>
					</view>
				</view>

				<!-- 送货信息 -->
				<view class="info-item">
					<view class="info-icons">
						<view class="info-dot primary"></view>
					</view>
					<view class="info-content">
						<view class="info-header">
							<text class="info-label primary">送货点</text>
							<view class="contact-btn" @click="callReceiver">
								<text class="contact-icon">📞</text>
								<text class="contact-text">联系收货人</text>
							</view>
						</view>
						<text class="info-title">{{ order.delivery_address }}</text>
					</view>
				</view>
			</view>

			<!-- 订单详情列表 -->
			<view class="details-section">
				<view class="details-card">
					<text class="details-title">订单详情</text>
					<view class="details-list">
						<view class="detail-row">
							<text class="detail-label">订单编号</text>
							<text class="detail-value">{{ order._id }}</text>
						</view>
						<view class="detail-row" v-if="order.order_type === 'send'">
							<text class="detail-label">物品类型</text>
							<text class="detail-value">{{ order.item_type }}{{ order.item_weight ? ' (约' + order.item_weight + 'kg)' : '' }}</text>
						</view>
						<view class="detail-row" v-else-if="order.order_type === 'buy'">
							<text class="detail-label">商品描述</text>
							<text class="detail-value">{{ order.item_description }}</text>
						</view>
						<view class="detail-row last">
							<text class="detail-label">备注信息</text>
							<text class="detail-value error">{{ order.remark }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 底部操作栏 -->
			<view class="bottom-bar" v-if="order.status !== 'completed'">
				<view class="photo-button" @click="takePhoto">
					<text class="button-icon">📷</text>
					<text class="button-text">拍照反馈</text>
				</view>
				<view v-if="order.status === 'accepted'" class="confirm-button" @click="startDelivery">
					<text class="button-text">开始配送</text>
					<text class="button-icon">🚀</text>
					<view class="button-flash"></view>
				</view>
				<view v-else-if="order.status === 'in_progress'" class="confirm-button" @click="confirmDelivery">
					<text class="button-text">确认送达</text>
					<text class="button-icon">✅</text>
					<view class="button-flash"></view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
import { getRiderId } from '@/common/uid.js'

export default {
	data() {
		return {
			orderId: '',
			order: {},
			loading: true
		}
	},
	computed: {
		progressWidth() {
			const map = { accepted: '33%', in_progress: '66%', completed: '100%' }
			return map[this.order.status] || '0%'
		}
	},
	onLoad(options) {
		this.orderId = options.id
		this.loadOrderDetail()
	},
	methods: {
		async loadOrderDetail() {
			this.loading = true
			uni.showLoading({ title: '加载中...' })
			try {
				const getOrder = uniCloud.importObject('get-order')
				const res = await getOrder.getOrderDetail({ orderId: this.orderId })
				if (res.errCode === 0) {
					this.order = res.order || {}
				} else {
					uni.showToast({ title: res.errMsg || '加载失败', icon: 'none' })
				}
			} catch (e) {
				uni.showToast({ title: '加载失败', icon: 'none' })
			} finally {
				uni.hideLoading()
				this.loading = false
			}
		},
		stepClass(index) {
			const s = this.order.status
			if (s === 'completed') return 'completed'
			if (s === 'accepted') {
				return index === 0 ? 'completed' : ''
			}
			if (s === 'in_progress') {
				if (index <= 1) return 'completed'
				if (index === 2) return 'active'
				return ''
			}
			return ''
		},
		callSender() {
			uni.makePhoneCall({
				phoneNumber: '1234567890'
			})
		},
		callReceiver() {
			uni.makePhoneCall({
				phoneNumber: '0987654321'
			})
		},
		takePhoto() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['camera'],
				success: (res) => {
					uni.showToast({
						title: '照片已保存',
						icon: 'success'
					})
				}
			})
		},
		async startDelivery() {
			uni.showLoading({ title: '提交中...' })
			try {
				const getOrder = uniCloud.importObject('get-order')
				const res = await getOrder.updateStatus({
					orderId: this.order._id,
					status: 'in_progress',
					riderId: getRiderId()
				})
				if (res.errCode === 0) {
					this.order.status = 'in_progress'
					uni.showToast({ title: '状态更新成功', icon: 'success' })
				} else {
					uni.showToast({ title: res.errMsg || '操作失败', icon: 'none' })
				}
			} catch (e) {
				uni.showToast({ title: '操作失败', icon: 'none' })
			} finally {
				uni.hideLoading()
			}
		},
		async confirmDelivery() {
			uni.showLoading({ title: '正在提交...' })
			try {
				const getOrder = uniCloud.importObject('get-order')
				const res = await getOrder.updateStatus({
					orderId: this.order._id,
					status: 'completed',
					riderId: getRiderId()
				})
				if (res.errCode === 0) {
					this.order.status = 'completed'
					uni.showToast({ title: '送达成功', icon: 'success' })
				} else {
					uni.showToast({ title: res.errMsg || '操作失败', icon: 'none' })
				}
			} catch (e) {
				uni.showToast({ title: '操作失败', icon: 'none' })
			} finally {
				uni.hideLoading()
			}
		}
	}
}
</script>

<style scoped>
.container {
	background-color: #f8f9ff;
	min-height: 100vh;
	padding-bottom: 128px;
}

.status-tracker {
	padding: 16px;
	background-color: #ffffff;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	position: relative;
}

.progress-line {
	position: absolute;
	top: 24px;
	left: 0;
	width: 100%;
	height: 2px;
	background-color: #c3c6d6;
	z-index: 0;
}

.progress-bar {
	position: absolute;
	top: 24px;
	left: 0;
	height: 2px;
	background-color: #003b9a;
	z-index: 1;
	transition: width 1s;
}

.step {
	position: relative;
	z-index: 10;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
}

.status-tracker {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.step-circle {
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #e1e2ec;
	color: #434654;
	border: 4px solid #ffffff;
}

.step-circle.completed {
	background-color: #003b9a;
	color: #ffffff;
}

.step-circle.active {
	background-color: #003b9a;
	color: #ffffff;
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.8;
	}
}

.step-icon {
	font-size: 18px;
}

.step-label {
	font-size: 12px;
	color: #434654;
}

.step-label.active {
	color: #003b9a;
	font-weight: 700;
}

.map-view {
	position: relative;
	width: 100%;
	height: 320px;
}

.map-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.stats-overlay {
	position: absolute;
	bottom: 16px;
	left: 16px;
	right: 16px;
	background-color: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(10px);
	padding: 16px;
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.stat-item {
	display: flex;
	align-items: center;
	gap: 12px;
}

.stat-icon {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #0050cb;
	color: #c1cfff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
}

.stat-content {
	display: flex;
	flex-direction: column;
}

.stat-label {
	font-size: 12px;
	color: #434654;
}

.stat-value {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
}

.stat-value.primary {
	color: #003b9a;
}

.stat-divider {
	width: 1px;
	height: 32px;
	background-color: #c3c6d6;
}

.order-info-card {
	background-color: #ffffff;
	border-radius: 16px;
	padding: 16px;
	margin: -16px 16px 16px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	position: relative;
	z-index: 20;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.info-item {
	display: flex;
	gap: 12px;
}

.info-icons {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	margin-top: 4px;
}

.info-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
}

.info-dot.secondary {
	background-color: #515f74;
}

.info-dot.primary {
	background-color: #003b9a;
}

.info-line {
	width: 1px;
	height: 100%;
	background-color: #c3c6d6;
	border-left: 1px dashed #c3c6d6;
}

.info-content {
	flex: 1;
}

.info-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 4px;
}

.info-label {
	font-size: 12px;
	font-weight: 500;
	margin-bottom: 4px;
}

.info-label.secondary {
	color: #515f74;
}

.info-label.primary {
	color: #003b9a;
}

.contact-btn {
	display: flex;
	align-items: center;
	gap: 4px;
	color: #003b9a;
}

.contact-icon {
	font-size: 18px;
}

.contact-text {
	font-size: 12px;
}

.info-title {
	font-size: 18px;
	font-weight: 600;
	color: #191b23;
	display: block;
	margin-bottom: 4px;
}

.info-desc {
	font-size: 14px;
	color: #434654;
}

.details-section {
	padding: 0 16px;
}

.details-card {
	background-color: #f3f3fd;
	border-radius: 16px;
	padding: 16px;
}

.details-title {
	font-size: 12px;
	color: #434654;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin-bottom: 16px;
	display: block;
}

.details-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.detail-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
	border-bottom: 1px solid rgba(195, 198, 214, 0.3);
}

.detail-row.last {
	border-bottom: none;
}

.detail-label {
	font-size: 14px;
	color: #434654;
}

.detail-value {
	font-size: 14px;
	color: #191b23;
}

.detail-value.error {
	color: #ba1a1a;
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(10px);
	padding: 16px;
	border-top: 1px solid #c3c6d6;
	display: flex;
	gap: 12px;
	box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
}

.photo-button {
	flex: 1;
	background-color: #d2e1fa;
	color: #556379;
	padding: 14px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	font-size: 18px;
	font-weight: 600;
	transition: transform 0.2s;
}

.photo-button:active {
	transform: scale(0.95);
}

.confirm-button {
	flex: 2;
	background-color: #003b9a;
	color: #ffffff;
	padding: 14px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	font-size: 18px;
	font-weight: 600;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;
	position: relative;
	overflow: hidden;
}

.confirm-button:active {
	transform: scale(0.95);
}

.button-flash {
	position: absolute;
	inset: 0;
	background-color: rgba(255, 255, 255, 0.2);
	transform: translateX(-100%);
}

.button-icon {
	font-size: 18px;
}

.button-text {
	font-size: 18px;
	font-weight: 600;
}
</style>
