<template>
	<view class="tab-bar">
		<view
			v-for="(item, index) in list"
			:key="index"
			class="tab-item"
			:class="{ active: selected === index }"
			@click="switchTab(index)"
		>
			<text class="material-symbols-outlined tab-icon" :class="{ 'material-symbols-fill': selected === index }">{{ item.icon }}</text>
			<text class="tab-text">{{ item.text }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CustomTabBar',
	props: {
		selected: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			list: [
				{ icon: 'home', text: '首页', path: '/pages/home/index' },
				{ icon: 'assignment', text: '订单', path: '/pages/order/list' },
				{ icon: 'person', text: '我的', path: '/pages/profile/index' }
			]
		}
	},
	methods: {
		switchTab(index) {
			if (index === this.selected) return
			uni.switchTab({ url: this.list[index].path })
		}
	}
}
</script>

<style scoped>
.tab-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 128rpx;
	padding-bottom: env(safe-area-inset-bottom);
	background-color: #f8f9ff;
	border-top: 2rpx solid #c2c6d8;
	box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	height: 100%;
	color: #515f74;
	transition: all 0.2s;
}

.tab-item.active {
	color: #0050cb;
}

.tab-icon {
	font-size: 48rpx;
	line-height: 1;
	margin-bottom: 4rpx;
}

.tab-text {
	font-size: 24rpx;
	line-height: 32rpx;
	font-weight: 500;
}

.tab-item.active .tab-text {
	font-weight: 700;
}
</style>
