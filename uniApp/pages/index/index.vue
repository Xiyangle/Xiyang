<template>
	<view class="content">
		{{userInfo.account}}
		<view style="padding-bottom: 30rpx;">
			<button @click="uploadFile()" type="primary">文件上传</button>
		</view>
		<button type="warn">相机</button>
	</view>
</template>

<script>
	import $Https from '@/utils/request.js';
	export default {
		data() {
			return {
				user: '18581293073',
				pwd: '123456',
				userInfo: {}
			}
		},
		onLoad() {
			this.login()
		},
		methods: {
			// 文件上传
			uploadFile(){
				uni.chooseImage({
					success: (res) => {
						console.log(res)
						return new Promise((result,reject)=>{
							uni.uploadFile({
								url: $Https.common.baseUrl + '/admin/upload/image',
								filePath: res.tempFilePaths[0],
								name: 'multipart',
								header:{
									'Authori-zation': uni.getStorageSync('token')
								},
								formData: {
									model: 'user',
									pid: '1'
								},
								success: (sudo) => {
									let data = JSON.parse(sudo.data)
									console.log(data)
								}
							})	
						})
					}
				})
			},
			
			login(){
				$Https.post('/front/login',{
					account: this.user,
					pwd: this.pwd,
					wxCode: ''
				},{token:false}).then(res =>{
					this.userInfo = res.data
					uni.setStorageSync('token',res.data.token)
				})
			}
		}
	}
</script>

<style>
	
</style>
