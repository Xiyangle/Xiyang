<template>
	<view class="">
		<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
	</view>
</template>

<script>
	import airport from '@/utils/apiData.js'
	export default {
		data() {
			return {
				list: airport.list
			}
		},
		onPullDownRefresh() {
			setTimeout(() =>{
				console.log(airport.list)
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			bindClick(e){
				console.log(e)
			}
		}
	}
</script>

<style>
</style>