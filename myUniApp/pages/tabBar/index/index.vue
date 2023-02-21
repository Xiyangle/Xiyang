<template>
	<view style="width: 750rpx;">
		<movable-area style="width: 100%;height: 90vh;">
			<movable-view 
				class="movable-view-box"
				direction="all"
				:x="x" :y="y"
				:inertia="true"
				@change="movableChange">
				mystic
			</movable-view>
		</movable-area>
		<view style="color: #f40;">
			<view>X：{{x}}</view>
			<view>Y：{{y}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				x: 0,
				y: 0,
			}
		},
		methods: {
			movableChange(e){
				this.x = e.detail.x
				this.y = e.detail.y
			}
		}
	}
</script>

<style>
	.movable-view-box{
		height: 100rpx;
		width: 120rpx;
		background-color: #f40;
		text-align: center;
		line-height: 100rpx;
		border-radius: 8rpx;
		color: #fff;
	}
</style>
