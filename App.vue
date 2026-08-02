<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
/* Material Symbols Outlined 字体 */
@font-face {
	font-family: 'Material Symbols Outlined';
	font-style: normal;
	font-weight: 100 700;
	src: url('https://fonts.gstatic.com/s/materialsymbolsoutlined/v218/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsLjBuVY.woff2') format('woff2');
}

/* 全局设计令牌 - Material Design 3 调色板 */
page {
	--primary: #0050cb;
	--primary-container: #0066ff;
	--on-primary: #ffffff;
	--on-primary-container: #f8f7ff;
	--primary-fixed: #dae1ff;
	--primary-fixed-dim: #b3c5ff;
	--secondary: #515f74;
	--secondary-container: #d5e3fd;
	--on-secondary: #ffffff;
	--on-secondary-container: #57657b;
	--secondary-fixed: #d5e3fd;
	--secondary-fixed-dim: #b9c7e0;
	--tertiary: #565a5b;
	--tertiary-container: #6f7274;
	--error: #ba1a1a;
	--error-container: #ffdad6;
	--on-error: #ffffff;
	--on-error-container: #93000a;
	--background: #f8f9ff;
	--on-background: #0b1c30;
	--surface: #f8f9ff;
	--on-surface: #0b1c30;
	--surface-dim: #cbdbf5;
	--surface-bright: #f8f9ff;
	--surface-variant: #d3e4fe;
	--surface-container-lowest: #ffffff;
	--surface-container-low: #eff4ff;
	--surface-container: #e5eeff;
	--surface-container-high: #dce9ff;
	--surface-container-highest: #d3e4fe;
	--outline: #727687;
	--outline-variant: #c2c6d8;
	--on-surface-variant: #424656;
	--inverse-surface: #213145;
	--inverse-on-surface: #eaf1ff;
	--inverse-primary: #b3c5ff;

	/* 间距 */
	--margin-page: 32rpx;
	--stack-sm: 16rpx;
	--stack-md: 32rpx;
	--stack-lg: 48rpx;
	--gutter-grid: 24rpx;
	--base: 8rpx;

	/* 字体 */
	--font-body-md: 28rpx;
	--font-body-lg: 32rpx;
	--font-label-md: 24rpx;
	--font-headline-sm: 36rpx;
	--font-headline-md: 40rpx;
	--font-headline-lg: 48rpx;
	--font-headline-lg-mobile: 44rpx;

	background-color: #f8f9ff;
	color: #0b1c30;
	font-family: 'Inter', 'Plus Jakarta Sans', -apple-system, sans-serif;
	font-size: 28rpx;
	-webkit-tap-highlight-color: transparent;
}

/* 通用工具类 */
.material-symbols-outlined {
	font-family: 'Material Symbols Outlined';
	font-weight: normal;
	font-style: normal;
	line-height: 1;
	letter-spacing: normal;
	text-transform: none;
	display: inline-block;
	white-space: nowrap;
	word-wrap: normal;
	direction: ltr;
	font-feature-settings: 'liga';
	-webkit-font-feature-settings: 'liga';
	-webkit-font-smoothing: antialiased;
	font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	vertical-align: middle;
}

.material-symbols-fill {
	font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.card-shadow {
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
}

.hide-scrollbar::-webkit-scrollbar {
	display: none;
}

view, text, button, input, textarea, image, scroll-view {
	box-sizing: border-box;
}

/* 移除按钮默认样式 */
button {
	padding: 0;
	margin: 0;
	background: transparent;
	border: none;
	line-height: normal;
}

button::after {
	border: none;
}
</style>
