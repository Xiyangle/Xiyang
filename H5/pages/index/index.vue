<template>
	<view class="customicons">
		<view v-if="pageShow">
			<uni-transition :show="transitionHome" mode-class="zoom-in" :duration="500">
				<!-- 轮播图 -->
				<swiper indicator-dots autoplay circular>
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<view style="height: 300rpx;width: 100%;">
							<image :src="item.url" mode="aspectFill" style="width: 100%;height: 100%;" @click="previewImage(item)"></image>
						</view>
					</swiper-item>
				</swiper>
				<!-- 商品 -->
				<view class="mt-3 p-2">
					<block v-for="(item,index) in priceList" :key="index">
						<view class="flex align-center my-3 border rounded p-2">
							<view class="flex align-center justify-center" style="width: 33%;">
								<image :src="item.url" mode="aspectFill" style="width: 200rpx;height: 200rpx;"></image>
							</view>
							<view class="ml-2" style="width: 66%;">
								<view class="font-md">{{item.name}}</view>
								<view class="font-sm text-muted text-ellipsis-2">
									RELX Technology 雾芯科技是一家创建于中国的公司，
									目前主营业务是RELX 悦刻品牌产品的研发、设计、和销售。
								</view>
								<view class="flex align-center justify-between">
									<view class="font-weight-bolder text-danger">
										<text class="font-sm">￥</text>
										<text class="font-lg">
											{{item.price}}
										</text>
									</view>
									<view class="flex">
										<view @click="priceClick(item)" hover-class="bg-hover-primary" style="padding: 4rpx 16rpx;border-radius: 10rpx;" class="text-white font-sm border main-bg-color">选规格</view>
										<view v-if="item.num>0" class="position-relative text-danger font-weight-bolder" style="top: -20rpx;">{{item.num}}</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</uni-transition>
			<!-- 底部结算 -->
			<view v-if="chekList.length>0">
				<view style="height: 13vh;width: 100%;"></view>
				<view class="position-fixed left-0 right-0 bottom-0 border shadow bg-white"
				style="height: 13vh;width: 100%;z-index: 9999;">
					<view @click="getCarList" class="flex align-center mx-3" style="height: 100%;">
						<view class="mr-5 flex">
							<image src="https://www.aaao.eu.org/images/icon/shoppingCart.png" mode="scaleToFill" style="width: 100rpx;height: 100rpx;"></image>
							<view class="text-danger font-weight-bolder">
								{{sumNum}}
							</view>
						</view>
						<view class="font-weight-bolder">
							<text class="h2">￥</text>
							<text class="h1">{{sumPrice}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 详情页面 -->
		<view v-else class="position-relative top-0 left-0 right-0 bottom-0">
			<view class="position-fixed bg-transparent flex align-center justify-center shadow" 
			style="top: 88rpx;left: 10rpx;border-radius: 50%;height: 70rpx;width: 70rpx;z-index: 999;">
				<uni-icons type="back" size="30" @click="backHome"></uni-icons>
			</view>
			<view>
				<image :src="chekInfo.url" @click="previewImage(chekInfo)" mode="aspectFill" style="width: 100%;height: 30vh;"></image>
			</view>
			<view class="p-5">
				<view class="font-lg font-weight-bolder">
					{{chekInfo.name}}
				</view>
				<view class="font-sm mt-3">
					RELX Technology 雾芯科技是一家创建于中国的公司，
					目前主营业务是RELX 悦刻品牌产品的研发、设计、和销售。
				</view>
			</view>
			<view style="height: 18vh;"></view>
			<!-- 底部区域 -->
			<view class="border shadow position-fixed bottom-0" 
				style="height: 18vh;width: 100%;">
				<view class="px-5">
					<view class="flex justify-between my-3">
						<view class="">
							<text>￥</text>
							<text class="font-lg font-weight-bolder">{{chekInfo.price}}</text>
						</view>
						<view class="flex justify-between">
							<view>
								<uni-icons type="minus" size="30" color="#003E7B" @click="minusClick(num)"></uni-icons>
							</view>
							<view class="main-text-color font-lg px-3">
								{{num}}
							</view>
							<view class="">
								<uni-icons type="plus-filled" size="30" color="#003E7B" @click="plusClick(num)"></uni-icons>
							</view>
						</view>
					</view>
					<view 
					 class="main-bg-color text-white p-2 text-center font-md"
					 hover-class="bg-hover-primary"
					 style="border-radius: 50rpx;"
					 @click="toHome">
						添加
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="popupShow" 
			class="bg-touming position-fixed left-0 right-0" 
			style="height: 100vh;width: 100%;bottom: 13vh;"
			@click="popupShow=false">
			<view class="bg-white position-fixed left-0 right-0" 
			style="height: 70vh;bottom: 13vh;z-index: 999;"
			@click.stop="">
				<view class="main-text-color text-right m-2" @click="claerChekList">
					清空
				</view>
				<scroll-view scroll-y style="height: 60vh;width: 100%;">
					<view v-for="(item,index) in chekList" :key="index" class="flex align-center m-2 border-bottom">
						<view style="width: 30%;">
							<image :src="item.url" mode="aspectFill" style="width: 200rpx;height: 200rpx;"></image>
						</view>
						<view style="width: 70%;">
							<view class="font-lg">
								{{item.name}}
							</view>
							<view class="flex justify-between">
								<view class="font-md">
									<text>￥</text>
									<text class="font-weight-bolder">{{item.price}}</text>
								</view>
								<view class="flex">
									<view>
										<uni-icons type="minus" size="30" color="#003E7B" @click="del(item,index)"></uni-icons>
									</view>
									<view class="main-text-color font-lg px-3">
										{{item.num}}
									</view>
									<view class="">
										<uni-icons type="plus-filled" size="30" color="#003E7B" @click="add(item,index)"></uni-icons>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				transitionHome: true,
				transitionInfo: true,
				pageShow: true,
				popupShow: false,
				swiperList: [{
					url: 'https://www.aaao.eu.org/images/swiper/1.jpg'
				},{
					url: 'https://www.aaao.eu.org/images/swiper/2.jpg'
				},{
					url: 'https://www.aaao.eu.org/images/swiper/3.jpg'
				},{
					url: 'https://www.aaao.eu.org/images/swiper/4.jpg'
				},{
					url: 'https://www.aaao.eu.org/images/swiper/5.jpg'
				}],
				// 商品
				priceList: [{
					id: 1,
					name: '青羽烟蛋',
					price: 99,
					url: 'https://www.aaao.eu.org/images/goods/99.jpg'
				},{
					id: 2,
					name: '幻影烟蛋',
					price: 110,
					url: 'https://www.aaao.eu.org/images/goods/110.jpg'
				},{
					id: 3,
					name: '幻影pro烟蛋',
					price: 119,
					url: 'https://www.aaao.eu.org/images/goods/119.jpg'
				},{
					id: 4,
					name: '青羽杆',
					price: 199,
					url: 'https://www.aaao.eu.org/images/goods/199.jpg'
				},{
					id: 5,
					name: '幻影杆',
					price: 299,
					url: 'https://www.aaao.eu.org/images/goods/299.jpg'
				},{
					id: 6,
					name: '幻影pro',
					price: 399,
					url: 'https://www.aaao.eu.org/images/goods/399.jpg'
				}],
				// 选中的数据详情
				chekInfo:{},
				num: 1,
				chekList: [],
				sumNum: 0,
				sumPrice: 0
			}
		},
		methods: {
			priceClick(e){
				this.chekInfo = e
				this.pageShow = false
				this.num = 1
			},
			backHome(){
				this.pageShow = true
			},
			minusClick(e){
				if (e>1) {
					this.num = e-1
				}
			},
			plusClick(e){
				this.num = e+1
			},
			toHome(){
				let arr = this.chekList
				if (arr.length>0) {
					let index = arr.findIndex(item => item.id === this.chekInfo.id)
					if (index == -1) {
						this.chekInfo.num = this.num
						this.chekList.push(this.chekInfo)
					}else{
						this.chekList[index].num = this.chekList[index].num + this.num
					}
				}else{
					this.chekInfo.num = this.num
					this.chekList.push(this.chekInfo)
				}
				this.pageShow = true
				this.countTools()
			},
			getCarList(){
				this.popupShow = !this.popupShow
			},
			claerChekList(){
				this.chekList = []
				this.popupShow = false
				for (let i = 0; i < this.priceList.length; i++) {
					this.priceList[i].num = 0
				}
			},
			del(e,i){
				let num = e.num - 1
				if (e.num==1) {
					this.chekList.splice(i,1)
					e.num = 0
					if(this.chekList.length==0){
						this.claerChekList()
					}
				}else{
					e.num = num
					this.$set(this.chekList,i,e)
				}
				this.countTools()
			},
			add(e,i){
				let num = e.num + 1
				e.num = num
				this.$set(this.chekList,i,e)
				this.countTools()
			},
			// 统计商品数量和价格
			countTools(){
				let arr = []
				let obj = {}
				arr = this.chekList
				for (var i = 0; i < arr.length; i++) {
					obj = arr[i]
					obj.pSum = obj.num*obj.price
				}
				// 计算字段的和
				const sum = arr.reduce((accumulator, currentValue) => {
				    return accumulator + currentValue.num
				}, 0)
				this.sumNum = sum
				const sumPrice = arr.reduce((accumulator, currentValue) => {
				    return accumulator + currentValue.pSum
				}, 0)
				this.sumPrice = sumPrice
			},
			// 预览图片
			previewImage(e){
				let imgs = []
				imgs.push(e.url)
				uni.previewImage({
					urls: imgs,
					success: (res) => {}
				})
			}
		}
	}
</script>

<style>
	
</style>
