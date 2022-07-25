<template>
	<view class="content">
		{{userInfo}}
		<view class="zh-cn">
			<button @click="uploadFile()" type="primary">文件上传</button>
			<view style="font-size: 40rpx">
				重庆万佳
			</view>
		</view>
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
			let strs = 'sasal'
			let str = strs.replace(/\r|\n/ig,"")
			console.log(str)
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
