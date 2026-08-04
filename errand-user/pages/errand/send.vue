<template>
	<view class="page">
		<!-- Top App Bar -->
		<view class="top-bar">
			<view class="back-btn" @tap="goBack">
				<text class="back-icon">‹</text>
			</view>
			<text class="top-title">帮我送</text>
			<view class="help-btn">
				<text class="help-icon">🔔</text>
			</view>
		</view>

		<scroll-view scroll-y class="content" :show-scrollbar="false">
			<!-- Address Section -->
			<view class="card address-card">
				<view class="addr-accent"></view>
				<view class="addr-section">
					<view class="addr-row" @tap="openAddressModal('pickup')">
						<view class="addr-circles">
							<view class="addr-circle pickup">取</view>
						</view>
						<view class="addr-info">
							<view class="addr-header">
								<text class="addr-label">从哪里取件</text>
								<text class="addr-link">常用地址</text>
							</view>
							<text class="addr-address">{{ pickupAddress }}</text>
							<text class="addr-contact">{{ pickupContact }}</text>
						</view>
					</view>
					<view class="addr-row">
						<view class="addr-circles">
							<view class="addr-circle deliver">送</view>
						</view>
						<view class="addr-info">
							<view class="addr-header">
								<text class="addr-label">送到哪里去</text>
							</view>
							<input class="addr-input" v-model="deliveryAddress" placeholder="请输入或选择收件地址" />
						</view>
					</view>
				</view>
			</view>

			<!-- Map Snippet -->
			<view class="map-card">
				<view class="map-bg"></view>
				<view class="map-badge">
					<text class="map-icon">📍</text>
					<text class="map-text">预计 4.2 公里</text>
				</view>
			</view>

			<!-- Item Info Card -->
			<view class="card">
				<view class="card-header">
					<text class="card-icon">📦</text>
					<text class="card-title">物品信息</text>
				</view>
				<view class="item-type">
					<text class="section-label">物品类型</text>
					<view class="chip-list">
						<view
							v-for="(item, idx) in items"
							:key="idx"
							class="chip"
							:class="{ active: currentItem === idx }"
							@tap="currentItem = idx"
						>{{ item }}</view>
					</view>
				</view>
				<view class="weight-section">
					<view class="weight-header">
						<text class="section-label">重量估算</text>
						<text class="weight-value">{{ weight }}kg 及以下</text>
					</view>
					<slider class="weight-slider" :value="weight" @change="weight = $event.detail.value" :min="1" :max="20" activeColor="#0050cb" backgroundColor="#d5e3fd" block-size="20" />
					<view class="weight-ticks">
						<text>1kg</text>
						<text>5kg</text>
						<text>10kg</text>
						<text>15kg</text>
						<text>20kg+</text>
					</view>
				</view>
			</view>

			<!-- Remarks & Options Card -->
			<view class="card">
				<view class="remark-section">
					<text class="section-label">下单备注</text>
					<textarea class="remark-textarea" v-model="remark" placeholder="有什么需要嘱咐小哥的吗？（如：放门把手上、轻拿轻放）" />
				</view>
				<view class="time-row">
					<view class="time-left">
						<text class="time-icon">📅</text>
						<text class="time-label">取件时间</text>
					</view>
					<view class="time-right">
						<text class="time-value">{{ pickupTime }}</text>
						<text class="time-arrow">›</text>
					</view>
				</view>
			</view>

			<view style="height: 200rpx;"></view>
		</scroll-view>

		<!-- Address Edit Modal -->
		<view v-if="showAddressModal" class="modal-overlay" @tap="cancelAddress">
			<view class="modal-card" @tap.stop>
				<text class="modal-title">{{ editingField === 'pickup' ? '编辑取件地址' : '编辑送货地址' }}</text>
				<input class="modal-input" v-model="tempAddress" placeholder="请输入详细地址" />
				<input v-if="editingField === 'pickup'" class="modal-input" v-model="tempContact" placeholder="联系人（如：张先生 138****0000）" />
				<view class="modal-buttons">
					<view class="modal-btn cancel-btn" @tap="cancelAddress">取消</view>
					<view class="modal-btn confirm-btn" @tap="confirmAddress">确定</view>
				</view>
			</view>
		</view>

		<!-- Bottom Action Bar -->
		<view class="bottom-bar">
			<view class="bottom-left">
				<view class="price-row">
					<text class="price-label">费用预估</text>
					<text class="price-icon">ℹ️</text>
				</view>
				<view class="price-display">
					<text class="price-symbol">¥</text>
					<text class="price-value">{{ orderPrice }}</text>
					<text class="price-original">¥18.00</text>
				</view>
				<view class="price-tags">
					<view class="discount-tag">新人立减 ¥5.5</view>
					<text class="price-note">含 1.0kg 重量费</text>
				</view>
			</view>
			<view class="submit-btn" @tap="goSuccess">
				<text>立即下单</text>
				<text class="submit-icon">⚡</text>
			</view>
		</view>
	</view>
</template>

<script>
import { getUid } from '@/common/uid.js'

export default {
	data() {
		return {
			items: ['文件', '鲜花', '蛋糕', '数码', '其他'],
			currentItem: 0,
			weight: 1,
			pickupAddress: '上海市浦东新区陆家嘴金融中心',
			pickupContact: '张先生 138****0000',
			deliveryAddress: '',
			remark: '',
			pickupTime: '立即取件',
			orderPrice: 12.50,
			submitting: false,
			showAddressModal: false,
			editingField: '',
			tempAddress: '',
			tempContact: ''
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		openAddressModal(field) {
			this.editingField = field
			if (field === 'pickup') {
				this.tempAddress = this.pickupAddress
				this.tempContact = this.pickupContact
			} else {
				this.tempAddress = this.deliveryAddress
				this.tempContact = ''
			}
			this.showAddressModal = true
		},
		confirmAddress() {
			if (this.editingField === 'pickup') {
				this.pickupAddress = this.tempAddress
				this.pickupContact = this.tempContact
			} else {
				this.deliveryAddress = this.tempAddress
			}
			this.showAddressModal = false
		},
		cancelAddress() {
			this.showAddressModal = false
		},
		async goSuccess() {
			if (this.submitting) return

			// 必填校验
			if (!this.pickupAddress) {
				uni.showToast({ title: '请填写取货地址', icon: 'none' })
				return
			}
			if (!this.deliveryAddress) {
				uni.showToast({ title: '请填写送货地址', icon: 'none' })
				return
			}

			this.submitting = true
			uni.showLoading({ title: '提交中...', mask: true })

			try {
				const order = uniCloud.importObject('order')
				const res = await order.sendOrder({
					uid: getUid(),
					pickup_address: this.pickupAddress + ' ' + this.pickupContact,
					delivery_address: this.deliveryAddress,
					item_type: this.items[this.currentItem],
					item_weight: this.weight,
					remark: this.remark,
					pickup_time: this.pickupTime,
					price: this.orderPrice
				})

				uni.hideLoading()

				if (res.errCode === 0) {
					uni.navigateTo({ url: '/pages/errand/success?orderId=' + res.orderId })
				} else {
					uni.showToast({ title: res.errMsg || '下单失败', icon: 'none' })
				}
			} catch (e) {
				uni.hideLoading()
				uni.showToast({ title: '网络错误，请重试', icon: 'none' })
				console.error('sendOrder error:', e)
			} finally {
				this.submitting = false
			}
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

.address-card {
	position: relative;
	overflow: hidden;
}

.addr-accent {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 4px;
	background: #0050cb;
}

.addr-section {
	padding-left: 16px;
}

.addr-row {
	display: flex;
	gap: 16px;
	padding: 12px 0;
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

.addr-circle.deliver {
	background: #515f74;
}

.addr-info {
	flex: 1;
}

.addr-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 4px;
}

.addr-label {
	font-size: 12px;
	color: #727687;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.addr-link {
	font-size: 12px;
	color: #0050cb;
	font-weight: 500;
}

.addr-address {
	font-size: 16px;
	font-weight: 600;
	color: #0b1c30;
	display: block;
}

.addr-contact {
	font-size: 12px;
	color: #727687;
}

.addr-address-placeholder {
	font-size: 16px;
	color: #727687;
	font-style: italic;
}

.addr-input {
	font-size: 16px;
	color: #0b1c30;
	background: transparent;
	width: 100%;
	padding: 0;
	height: 24px;
	line-height: 24px;
}

.map-card {
	margin: 0 16px 16px;
	height: 128px;
	border-radius: 12px;
	overflow: hidden;
	position: relative;
	border: 1px solid rgba(194, 198, 216, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.map-bg {
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #e5eeff 0%, #d3e4fe 50%, #e5eeff 100%);
}

.map-badge {
	position: absolute;
	bottom: 8px;
	right: 8px;
	background: rgba(255, 255, 255, 0.9);
	padding: 4px 12px;
	border-radius: 99px;
	display: flex;
	align-items: center;
	gap: 4px;
	border: 1px solid rgba(0, 80, 203, 0.2);
}

.map-icon {
	font-size: 14px;
}

.map-text {
	font-size: 12px;
	font-weight: 500;
	color: #0050cb;
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

.item-type {
	margin-bottom: 16px;
}

.section-label {
	font-size: 12px;
	color: #424656;
	display: block;
	margin-bottom: 8px;
}

.chip-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.chip {
	padding: 8px 16px;
	border-radius: 12px;
	font-size: 12px;
	font-weight: 500;
	background: #f1f5f9;
	color: #424656;
}

.chip.active {
	background: #0066ff;
	color: #ffffff;
}

.weight-section {
	padding-top: 8px;
}

.weight-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8px;
}

.weight-value {
	font-size: 14px;
	font-weight: 700;
	color: #0050cb;
}

.weight-slider {
	width: 100%;
}

.weight-ticks {
	display: flex;
	justify-content: space-between;
	font-size: 10px;
	color: #727687;
	margin-top: 4px;
}

.remark-section {
	margin-bottom: 16px;
}

.remark-textarea {
	width: 100%;
	height: 80px;
	background: #eff4ff;
	border-radius: 12px;
	padding: 12px;
	font-size: 14px;
	color: #0b1c30;
}

.time-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #eff4ff;
	padding: 12px;
	border-radius: 12px;
}

.time-left {
	display: flex;
	align-items: center;
	gap: 8px;
}

.time-icon {
	font-size: 18px;
}

.time-label {
	font-size: 14px;
	color: #0b1c30;
}

.time-right {
	display: flex;
	align-items: center;
	gap: 4px;
}

.time-value {
	font-size: 14px;
	font-weight: 600;
	color: #0050cb;
}

.time-arrow {
	font-size: 16px;
	color: #0050cb;
}

// Address Edit Modal
.modal-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.4);
	z-index: 2000;
	display: flex;
	align-items: flex-end;
	justify-content: center;
}

.modal-card {
	width: 100%;
	background: #ffffff;
	border-radius: 16px 16px 0 0;
	padding: 24px 16px;
	padding-bottom: calc(env(safe-area-inset-bottom) + 24px);
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.modal-title {
	font-size: 18px;
	font-weight: 600;
	color: #0b1c30;
	text-align: center;
}

.modal-input {
	width: 100%;
	height: 48px;
	background: #eff4ff;
	border-radius: 12px;
	padding: 0 16px;
	font-size: 14px;
	color: #0b1c30;
	box-sizing: border-box;
}

.modal-buttons {
	display: flex;
	gap: 12px;
	margin-top: 8px;
}

.modal-btn {
	flex: 1;
	height: 48px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-weight: 600;
}

.cancel-btn {
	background: #f1f5f9;
	color: #424656;
}

.confirm-btn {
	background: #0050cb;
	color: #ffffff;
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #ffffff;
	border-top: 1px solid #c2c6d8;
	padding: 16px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
	z-index: 999;
}

.bottom-left {
	display: flex;
	flex-direction: column;
}

.price-row {
	display: flex;
	align-items: center;
	gap: 4px;
}

.price-label {
	font-size: 12px;
	color: #727687;
}

.price-icon {
	font-size: 14px;
	color: #727687;
}

.price-display {
	display: flex;
	align-items: baseline;
	gap: 2px;
}

.price-symbol {
	font-size: 18px;
	font-weight: 700;
	color: #0050cb;
}

.price-value {
	font-size: 24px;
	font-weight: 700;
	color: #0050cb;
}

.price-original {
	font-size: 12px;
	color: #727687;
	text-decoration: line-through;
	margin-left: 8px;
}

.price-tags {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 4px;
}

.discount-tag {
	font-size: 10px;
	color: #ba1a1a;
	background: rgba(255, 218, 214, 0.5);
	padding: 2px 8px;
	border-radius: 99px;
	font-weight: 500;
}

.price-note {
	font-size: 12px;
	color: #424656;
}

.submit-btn {
	background: #0050cb;
	color: #ffffff;
	font-size: 18px;
	font-weight: 600;
	padding: 14px 32px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	gap: 8px;
	box-shadow: 0 8px 24px rgba(0, 80, 203, 0.3);
}

.submit-icon {
	font-size: 18px;
}
</style>
