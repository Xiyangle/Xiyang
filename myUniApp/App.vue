<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			this.updateApp()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			updateApp(){
				const updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate(function (res) {
				  // 请求完新版本信息的回调
				  if (res.hasUpdate) {
				  	updateManager.onUpdateReady(function (res) {
				  	  uni.showModal({
				  	    title: '更新提示',
				  	    content: '新版本已经准备好，是否重启应用？',
				  	    success(res) {
				  	      if (res.confirm) {
				  	        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
				  	        updateManager.applyUpdate()
				  	      }
				  	    }
				  	  })
				  	})
				  	updateManager.onUpdateFailed(function (res) {
				  	  // 新的版本下载失败
					  uni.showModal({
					  	title: '提示',
						content: '检查到有新版本，但是下载失败，请检查网络设置'
					  })
				  	})
				  }
				})
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
