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
	/* 全局样式 */
	page {
		background-color: #f8f9ff;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
		min-height: 100vh;
	}

	/* 颜色变量 */
	:root {
		--primary: #003b9a;
		--on-primary: #ffffff;
		--primary-container: #0050cb;
		--on-primary-container: #c1cfff;
		--secondary: #515f74;
		--on-secondary: #ffffff;
		--secondary-container: #d2e1fa;
		--on-secondary-container: #556379;
		--tertiary: #3f4344;
		--on-tertiary: #ffffff;
		--tertiary-container: #565a5b;
		--on-tertiary-container: #ced1d2;
		--error: #ba1a1a;
		--on-error: #ffffff;
		--error-container: #ffdad6;
		--on-error-container: #93000a;
		--background: #faf8ff;
		--on-background: #191b23;
		--surface: #f8f9ff;
		--on-surface: #191b23;
		--surface-variant: #e1e2ec;
		--on-surface-variant: #434654;
		--outline: #727687;
		--outline-variant: #c3c6d6;
		--surface-dim: #d9d9e4;
		--surface-bright: #faf8ff;
		--surface-container-lowest: #ffffff;
		--surface-container-low: #f3f3fd;
		--surface-container: #ededf8;
		--surface-container-high: #e7e7f2;
		--surface-container-highest: #e1e2ec;
		--inverse-surface: #2e3038;
		--inverse-on-surface: #f0f0fb;
		--inverse-primary: #b3c5ff;
	}

	/* 间距变量 */
	.stack-sm { margin-bottom: 8px; }
	.stack-md { margin-bottom: 16px; }
	.stack-lg { margin-bottom: 24px; }
	.margin-page { padding-left: 16px; padding-right: 16px; }
	.gutter-grid { gap: 12px; }

	/* 圆角 */
	.rounded-sm { border-radius: 4px; }
	.rounded-md { border-radius: 8px; }
	.rounded-lg { border-radius: 12px; }
	.rounded-xl { border-radius: 16px; }
	.rounded-full { border-radius: 9999px; }

	/* 阴影 */
	.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
	.shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
	.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

	/* 文字样式 */
	.font-headline-sm {
		font-size: 18px;
		line-height: 24px;
		font-weight: 600;
	}

	.font-headline-md {
		font-size: 20px;
		line-height: 28px;
		font-weight: 600;
	}

	.font-headline-lg {
		font-size: 24px;
		line-height: 32px;
		font-weight: 700;
	}

	.font-body-md {
		font-size: 14px;
		line-height: 20px;
		font-weight: 400;
	}

	.font-body-lg {
		font-size: 16px;
		line-height: 24px;
		font-weight: 400;
	}

	.font-label-md {
		font-size: 12px;
		line-height: 16px;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	/* 安全区域 */
	.pt-safe { padding-top: env(safe-area-inset-top); }
	.pb-safe { padding-bottom: env(safe-area-inset-bottom); }
</style>