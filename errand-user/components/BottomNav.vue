<template>
	<view class="bottom-nav">
		<view
			v-for="(item, index) in tabs"
			:key="index"
			class="nav-item"
			:class="{ active: current === index }"
			@tap="switchTab(index)"
		>
			<view class="icon-wrapper">
				<text class="iconfont" :class="item.icon">{{ item.iconText }}</text>
			</view>
			<text class="nav-label">{{ item.label }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'BottomNav',
	props: {
		current: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			tabs: [
				{ label: '首页', icon: 'icon-home', iconText: '⌂', path: '/pages/index/index' },
				{ label: '订单', icon: 'icon-order', iconText: '☰', path: '/pages/order/list' },
				{ label: '我的', icon: 'icon-mine', iconText: '○', path: '/pages/mine/profile' }
			]
		}
	},
	methods: {
		switchTab(index) {
			if (index === this.current) return
			const path = this.tabs[index].path
			uni.reLaunch({
				url: path,
				fail: (err) => {
					console.error('Navigation failed:', err)
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.bottom-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 64px;
	background: #ffffff;
	border-top: 1px solid #c2c6d8;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding-bottom: env(safe-area-inset-bottom);
	z-index: 999;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.nav-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	transition: all 0.2s ease;
}

.nav-item.active {
	color: #0050cb;
}

.icon-wrapper {
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 2px;
}

.iconfont {
	font-size: 22px;
	color: #727687;
}

.nav-item.active .iconfont {
	color: #0050cb;
	font-weight: 700;
}

.nav-label {
	font-size: 12px;
	font-weight: 500;
	color: #727687;
	letter-spacing: 0.02em;
}

.nav-item.active .nav-label {
	color: #0050cb;
	font-weight: 700;
}
</style>
