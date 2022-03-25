<template>
	<view class="car-status-form">
		<uni-forms label-width="88" :model-value="formData" ref="form" :rules="rules">
			<uni-forms-item label="轨迹图照片" name="orbitImageText" required>
				<uni-easyinput v-model="formData.orbitImageText" disabled :styles="stylesInput" placeholder="点击图标进行拍摄"
					:placeholder-style="placeholderStyle" suffixIcon="camera-filled" @click.native="previewImage"
					@iconClick="toTackPhoto">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="开始时间" name="startedAt" required>
				<uni-datetime-picker type="datetime" v-model="formData.startedAt" placeholder="请选择开始时间" disabled>
					<view class="csf-input">{{formData.startedAt}}</view>
				</uni-datetime-picker>
			</uni-forms-item>
			<uni-forms-item label="结束时间" name="endedAt" required>
				<uni-datetime-picker type="datetime" v-model="formData.endedAt" placeholder="请选择结束时间" disabled>
					<view class="csf-input">{{formData.endedAt}}</view>
				</uni-datetime-picker>
			</uni-forms-item>
			<uni-forms-item label="出发地" name="startAddress" required>
				<uni-easyinput v-model="formData.startAddress" disabled :styles="stylesInput" placeholder="请选择出发地"
					:placeholder-style="placeholderStyle">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="目的地" name="arrivedAddress" required>
				<uni-easyinput v-model="formData.arrivedAddress" disabled :styles="stylesInput" placeholder="请选择目的地"
					:placeholder-style="placeholderStyle">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="车牌号" name="carId" required>
				<uni-easyinput v-model="formData.carId" disabled :styles="stylesInput" placeholder="-"
					:placeholder-style="placeholderStyle">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="当前时速" name="currentSpeed" required>
				<view class="flex-input">
					<uni-easyinput v-model="formData.currentSpeed" disabled :styles="stylesInput" placeholder="-"
						:placeholder-style="placeholderStyle">
					</uni-easyinput>
					<text class="suf">km/h</text>
				</view>
			</uni-forms-item>
			<uni-forms-item label="已行驶" name="alreadyRunningDistance" required>
				<view class="flex-input">
					<uni-easyinput v-model="formData.alreadyRunningDistance" disabled :styles="stylesInput"
						placeholder="-" :placeholder-style="placeholderStyle">
					</uni-easyinput>
					<text class="suf">km</text>
				</view>
			</uni-forms-item>
			<uni-forms-item label="品牌" name="carBrand" required>
				<uni-easyinput v-model="formData.carBrand" disabled :styles="stylesInput" placeholder="-"
					:placeholder-style="placeholderStyle">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="行驶里程" name="mileage" required>
				<view class="flex-input">
					<uni-easyinput v-model="formData.mileage" disabled :styles="stylesInput" placeholder="-"
						:placeholder-style="placeholderStyle">
					</uni-easyinput>
					<text class="suf">km</text>
				</view>
			</uni-forms-item>
			<uni-forms-item label="行驶时长" name="duration" required>
				<uni-easyinput v-model="formData.duration" disabled :styles="stylesInput" placeholder="-"
					:placeholder-style="placeholderStyle">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="平均时速" name="avgSpeed" required>
				<view class="flex-input">
					<uni-easyinput v-model="formData.avgSpeed" disabled :styles="stylesInput" placeholder="-"
						:placeholder-style="placeholderStyle">
					</uni-easyinput>
					<text class="suf">km/h</text>
				</view>
			</uni-forms-item>
			<uni-forms-item label="GPS坐标" name="orbit" required>
				<uni-easyinput v-model="formData.orbit" disabled :styles="stylesInput" placeholder="-"
					:placeholder-style="placeholderStyle">
				</uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<button type="primary" plain :loading="isSubmit" @click="submit">提交</button>
	</view>
</template>

<script>
	import moment from "moment";
	import "moment-duration-format";
	const STORAGE_KEY = "_TCS";
	export default {
		data() {
			return {
				formData: {
					orbitImage: null,
					orbitImageText: null,
					startedAt: null,
					endedAt: null,
					startAddress: null,
					arrivedAddress: null,
					carId: null,
					currentSpeed: null,
					alreadyRunningDistance: null,
					carBrand: null,
					mileage: null,
					duration: null,
					avgSpeed: null,
					orbit: null
				},
				rules: {
					orbitImageText: {
						rules: [{
							required: true,
							errorMessage: "点击图标进行拍摄"
						}]
					},
					startedAt: {
						rules: [{
							required: true,
							errorMessage: "开始时间缺失"
						}]
					},
					endedAt: {
						rules: [{
							required: true,
							errorMessage: "结束时间缺失"
						}]
					},
					startAddress: {
						rules: [{
							required: true,
							errorMessage: "出发地缺失"
						}]
					},
					arrivedAddress: {
						rules: [{
							required: true,
							errorMessage: "目的地缺失"
						}]
					},
					carId: {
						rules: [{
							required: true,
							errorMessage: "车牌号缺失"
						}]
					},
					currentSpeed: {
						rules: [{
							required: true,
							errorMessage: "当前时速缺失"
						}]
					},
					alreadyRunningDistance: {
						rules: [{
							required: true,
							errorMessage: "已行驶里程缺失"
						}]
					},
					carBrand: {
						rules: [{
							required: true,
							errorMessage: "品牌缺失"
						}]
					},
					mileage: {
						rules: [{
							required: true,
							errorMessage: "行驶里程缺失"
						}]
					},
					duration: {
						rules: [{
							required: true,
							errorMessage: "行驶时长缺失"
						}]
					},
					avgSpeed: {
						rules: [{
							required: true,
							errorMessage: "平均时速缺失"
						}]
					}
				},
				stylesInput: {
					color: "#333",
					disableColor: "#fff",
					borderColor: "#e5e5e5"
				},
				placeholderStyle: "color:#333",
				isSubmit: false
			};
		},
		onShow() {
			this.$nextTick(() => {
				this.$refs.form.setRules(this.rules);
				const tcInfo = uni.getStorageSync(STORAGE_KEY);
				if (!!tcInfo) {
					this.formData = Object.assign(this.formData, tcInfo);
				} else {
					this.getDataBase();
				}
				this.$refs.form.clearValidate();
				uni.removeStorageSync(STORAGE_KEY);
			});
		},
		methods: {
			// 获取基础数据
			getDataBase(enableLoading = true) {
				enableLoading && uni.showLoading({
					title: "载入中...",
					mask: true
				});
				// TODO get remote base data
				const data = {
					startedAt: "2022-03-20 13:48:09",
					endedAt: "2022-03-20 15:30:09",
					startAddress: "重庆",
					arrivedAddress: "青海",
					carId: "渝·A91328",
					currentSpeed: 98,
					alreadyRunningDistance: 118,
					carBrand: "东风",
					mileage: "520",
					duration: moment.duration(999, "minutes").format("d天h小时m分钟"),
					avgSpeed: 108,
					orbit: ['106.504819,29.528179', '106.505489,29.528186', '106.506171,29.528186',
						'106.506804,29.528182', '106.507338,29.528192', '106.507589,29.528275',
						'106.507813,29.528464', '106.50795,29.528631', '106.508168,29.528927',
						'106.508459,29.529177', '106.508607,29.529276', '106.509005,29.529395',
						'106.50924,29.529395', '106.509598,29.529401', '106.510092,29.529412',
						'106.510409,29.529387', '106.510976,29.529367'
					].join("|")
				};
				enableLoading && uni.hideLoading();

				this.formData = Object.assign(this.formData, data);
			},
			previewImage(e) {
				if (!this.isTtp) {
					if (!this.formData.orbitImage) uni.showToast({
						title: "请先拍照",
						icon: "error"
					});
					else uni.previewImage({
						current: 0,
						indicator: "default",
						longPressActions: true,
						urls: [this.formData.orbitImage]
					})
				}
			},
			toTackPhoto() {
				if (this.isSubmit) return false;
				this.isTtp = true;
				setTimeout(() => this.isTtp = false, 500);
				uni.setStorageSync(STORAGE_KEY, this.formData);
				uni.navigateTo({
					url: "/pages/map-orbit/map-orbit"
				})
			},
			// 提交表单信息
			submit() {
				if (this.isSubmit) return false;
				this.isSubmit = true;
				this.$refs.form.validate().then(() => {
					this.submitHandle();
				}).catch(e => {
					this.isSubmit = false;
				});
			},
			submitHandle() {
				// TODO 将表单信息提交到服务器
				// 上传图片
				uni.uploadFile({
					url: "",
					filePath: this.formData.orbitImage,
					name: "file",
					formData: {
						name: this.formData.orbitImageText
					},
					success: () => {
						console.info("图片上传成功");
					},
					fail: e => {
						console.info("图片上传异常: ", e);
					}
				});
				// 提交信息
				this.isSubmit = false;
				console.info("提交内容: ", JSON.parse(JSON.stringify(this.formData)));
				uni.showToast({
					title: "提交成功"
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.car-status-form {
		padding: 24rpx 56rpx;

		/deep/ {
			.is-disabled {
				color: #333 !important;
			}
		}

		.csf-input {
			display: flex;
			align-items: center;
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			color: #333;
			font-size: 14px;
			padding-left: 10px;
			height: 36px;
		}

		.flex-input {
			display: flex;
			align-items: center;

			.suf {
				padding-left: 4px;
				color: #333;
			}
		}
	}
</style>
