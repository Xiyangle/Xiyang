<template>
	<view class="map-orbit" ref="mo">
		<div class="map" ref="map"></div>
		<view class="mo-view" v-if="tcInfo">
			<!-- 车牌号 -->
			<view class="mo-car-id">
				<text>{{tcInfo.truckCode}}</text>
			</view>
			<!-- 日期 -->
			<view class="mo-block mo-date-time">
				{{ dateTime }}
			</view>
			<!-- 当前时速 -->
			<view class="mo-block speed">
				当前时速: {{ tcInfo.averageSpd }} km/h
			</view>
			<!-- 当前时速 -->
			<view class="mo-block arm">
				已行驶: {{ tcInfo.mileage }} km
			</view>
			<!-- 状态面板 -->
			<view class="mo-panel">
				<view class="mp-cb-time">
					<text class="mp-car-brand">{{tcInfo.truckBrand||"未知"}}</text>
					<text class="mp-time">{{tcInfo.begDate}} ~ {{tcInfo.endDate}}</text>
				</view>
				<!-- 起点 -->
				<view class="mp-start-address">{{tcInfo.startAddress||"未知"}}</view>
				<!-- 终点 -->
				<view class="mp-arrive-address">{{tcInfo.finishAddress||"未知"}}</view>
				<!-- 行驶状态 -->
				<view class="mp-status">
					<view class="ms-item">
						<text class="mi-value">{{tcInfo.mileage||"-"}}</text>
						<text class="mi-text">行驶里程(km)</text>
					</view>
					<view class="ms-item">
						<text class="mi-value">{{tcInfo.driverTime||"-"}}</text>
						<text class="mi-text">行驶时长</text>
					</view>
					<view class="ms-item">
						<text class="mi-value">{{tcInfo.spd||"-"}}</text>
						<text class="mi-text">平均时速(km/h)</text>
					</view>
				</view>
				<!-- 操纵 -->
				<view class="mp-operations">
					<view @click="uploadMapImage()" class="mp-operation">
						<text class="mo-text">跟着走</text>
					</view>
					<view class="mp-operation mo-primary">
						<text class="mo-text">再走一次</text>
					</view>
				</view>
				<view class="mp-operations" v-if="isReady && !isGeneratorWmm">
					<view class="mp-operation mo-primary mo-full" @click="generatorWmm">
						<text class="mo-text">拍照</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AMapLoader from '@amap/amap-jsapi-loader';
	import moment from "moment";
	import "moment-duration-format";
	import html2canvas from "html2canvas";

	const STORAGE_KEY = "_TCS";
	let map, AMap, graspRoad, carMarker;
	import config from '@/utils/config.js'
	
	export default {
		data() {
			return {
				// 运单id
				tsId: '',
				// 运单code
				tsCode: '',
				// 当前登录用户token
				token: '',
				
				tcInfo: null,
				dateTime: null,
				orbit: [],
				isReady: false,
				isGeneratorWmm: false,
				inter: {
					time: -1
				}
			};
		},
		mounted() {
			this.token = uni.getStorageSync('APP_AJOTPS_WEBTOKEN')
			this.tsCode = uni.getStorageSync('APP_AJOTPS_WEBTSCODE')
			this.tsId = uni.getStorageSync('APP_AJOTPS_WEBTSID')
			
			this.getDriverTsGpsMap()
			
			// 必要参数解析
			// this.tcInfo = uni.getStorageSync(STORAGE_KEY);
			// if (!this.tcInfo) {
			// 	uni.showModal({
			// 		content: "缺少必要数据，无法渲染轨迹",
			// 		showCancel: false,
			// 		confirmText: "返回",
			// 		success: () => {
			// 			uni.navigateTo({
			// 				url: "/pages/car-status-form/car-status-form"
			// 			});
			// 		}
			// 	});
			// 	return false;
			// }
			// // 轨迹解析
			// if (this.tcInfo.orbit) this.orbit = this.tcInfo.orbit.split("|").map(v => v.split(",").map(p => Number(p)));
			
			
			// 时间处理
			this.dateTimeHandle();
			// 初始化必要内容
			// this.$nextTick(() => {
			// 	this.getDataBase(false);
			// 	this.initMap().then(this.renderMap.bind(this));
			// });
		},
		beforeDestroy() {
			this.destroy();
		},
		methods: {
			// 通过运单id查询 司机轨迹图
			getDriverTsGpsMap(){
				uni.showLoading({
					title: '加载中'
				})
				this.$https.get('/admin/transportnode/getDriverTsGpsMap',{
					transportId: this.tsId
				}).then(res =>{
					this.tcInfo = res.data
					// let orbit = []
					// res.data.gpsList.map((v,i) => {
					// 	if (i<500) {
					// 		orbit.push(v)
					// 	}
					// })
					this.orbit = res.data.gpsList
					
					this.$nextTick(() => {
						this.getDataBase(false);
						this.initMap().then(this.renderMap.bind(this));
					});
					
					uni.hideLoading()
				})
			},
			dateTimeHandle() {
				const fn = () => this.dateTime = moment().format("MM-DD HH:mm:ss");
				fn();
				this.inter.time = setInterval(fn.bind(this), 1000);
			},
			getDataBase() {
				// TODO get remote base data
				const data = {
					startedAt: "03-20 13:48",
					endedAt: "03-20 15:30",
					startAddress: "重庆",
					arrivedAddress: "青海",
					carId: "渝·A91328",
					currentSpeed: Math.floor(Math.random() * 10 + 100),
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
				// this.tcInfo = Object.assign(this.tcInfo, data);
				
				clearTimeout(this.inter.getData);
				this.inter.getData = setTimeout(this.getDataBase.bind(this), 2000);
			},
			initMap() {
				return new Promise(resolve => {
					if (!map) {
						AMapLoader.load({
							"key": "d1c52120f93c51dcce52437c00d8683a",
							"version": "2.0",
							"plugins": ["AMap.GraspRoad", "AMap.MoveAnimation", "AMap.CustomLayer"]
						}).then(am => {
							AMap = am;
							map = new AMap.Map(this.$refs.map, {
								center: [106.512732, 29.529032],
								zoom: 16,
								// dragEnable: false,
								// zoomEnable: false,
								WebGLParams: {
									preserveDrawingBuffer: true
								}
							});
							map.on("complete", () => {
								this.addCustomLayer();
								resolve()
							});
						}).catch(e => {
							console.error(e);
							uni.showToast({
								title: "地图异常",
								icon: "error"
							});
						});
					} else {
						resolve();
					}
				})
			},
			addCustomLayer() {
				const canvas = document.createElement("canvas");
				const iconStart = new Image();
				iconStart.setAttribute("src", "/static/icons/icon.start.png");
				const iconEnded = new Image();
				iconEnded.setAttribute("src", "/static/icons/icon.end.png");
				const ctx = canvas.getContext("2d");
				const customLayer = new AMap.CustomLayer(canvas, {
					zooms: [1, 20],
					alwaysRender: true,
					zIndex: 120,
					render: () => {
						let retina = AMap.Browser.retina;
						let size = map.getSize();
						let width = size.width;
						let height = size.height;
						const propertion = retina ? 2 : 1;
						canvas.style.width = width + "px";
						canvas.style.height = height + "px";
						if (retina) {
							width *= propertion;
							height *= propertion;
						}
						canvas.width = width;
						canvas.height = height;
						let startPoint = this.orbit[0];
						let endPoint = this.orbit[this.orbit.length - 1];
						if (startPoint) {
							startPoint = map.lngLatToContainer(startPoint);
							ctx.drawImage(iconStart, (startPoint.x - 16) * propertion, (startPoint.y - 32) *
								propertion, 32 * propertion, 32 * propertion);
						}
						if (endPoint) {
							endPoint = map.lngLatToContainer(endPoint);
							ctx.drawImage(iconEnded, (endPoint.x - 16) * propertion, (endPoint.y - 32) *
								propertion, 32 * propertion, 32 * propertion);
						}
					}
				});
				customLayer.setMap(map);
			},
			renderMap() {
				// 清空地图
				map.clearMap();
				// 绘制轨迹线
				// const orbit = this.orbit.map(o => ({
				// 	x: o[0],
				// 	y: o[1],
				// 	sp: 10,
				// 	ag: 0,
				// 	tm: 5
				// }));
				// console.log(orbit)
				map.setCenter(this.orbit[0], true);
				// 轨迹纠偏
				// if (!graspRoad) graspRoad = new AMap.GraspRoad();
				// graspRoad.driving(orbit, (error, result) => {
				// 	if (!error) {
				// 		var orbitPer = [];
				// 		var pathOp = result.data.points;
				// 		for (var i = 0; i < pathOp.length; i += 1) {
				// 			orbitPer.push([pathOp[i].x, pathOp[i].y])
				// 		}
						const orbitPer = this.orbit;
						// 创建货车图标
						carMarker = new AMap.Marker({
							map,
							position: orbitPer[0],
							// icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
							content: " ",
							offset: new AMap.Pixel(-13, -26)
						});
						const orbitLine = new AMap.Polyline({
							map,
							path: orbitPer,
							showDir: true,
							strokeWeight: 8,
							strokeOpacity: 0.8,
							strokeColor: '#0091ea',
							showDir: true
						});
						this._orbitLine = orbitLine;

						const passedPolyline = new AMap.Polyline({
							map,
							strokeColor: "#AF5",
							strokeWeight: 6
						});
						this.isReady = true;
						map.setFitView(orbitLine, false, [50, 240, 24, 24]);
						// carMarker.moveAlong(orbitPer, {
						// 	duration: 500,
						// 	autoRotation: true,
						// });
						// setTimeout(() => {
						// 	carMarker.pauseMove();
						// 	map.setFitView(orbitLine, false, [50, 240, 24, 24]);
						// 	this.isReady = true;
						// }, 1000);
						carMarker.on("moving", e => {
							passedPolyline.setPath(e.passedPath);
							map.setCenter(e.target.getPosition(), true)
						});
						carMarker.on("movealong", e => {
							map.setFitView(orbitLine, false, [50, 240, 24, 24]);
						});
				// 	} else {
				// 		uni.showModal({
				// 			content: "轨迹渲染异常，请返回重试",
				// 			showCancel: false,
				// 			confirmText: "返回",
				// 			// success: () => {
				// 			// 	uni.navigateTo({
				// 			// 		url: "/pages/car-status-form/car-status-form"
				// 			// 	});
				// 			// }
				// 		});
				// 	}
				// })
			},
			
			// 生成水印地图
			generatorWmm() {
				if (this.isGeneratorWmm) return false;
				this.isGeneratorWmm = true;
				map.setFitView(this._orbitLine, false, [50, 240, 24, 24]);
				carMarker.stopMove();
				setTimeout(() => {
					uni.showLoading({
						title: "图片生成中.",
						mask: true
					});
					html2canvas(this.$refs.mo.$el).then(canvas => {
						var dataUrl = canvas.toDataURL("image/png");
						this.tcInfo.orbitImage = dataUrl
						uni.setStorageSync(STORAGE_KEY, this.tcInfo);
						this.uploadMapImage()
						uni.hideLoading();
					});
				}, 350);
			},
			destroy() {
				clearTimeout(this.inter.getData);
				clearInterval(this.inter.time);
				map && map.destroy();
				map = null;
			},
			// 上传服务器
			uploadMapImage(){
				uni.uploadFile({
					url: config.baseUrl+'/admin/upload/fileUp',
					filePath: this.tcInfo.orbitImage,
					name: 'multipart',
					header: {
						'Authori-zation': this.token
					},
					formData: {
						'model': 'drive',
						'pid': 1,
						'transportCode': this.tsCode,
						'fileName': '轨迹图'
					},
					success: (res) => {
						let data = JSON.parse(res.data)
						uni.showToast({
							title: data.message,
							icon: 'none',
							duration: 3000
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.map-orbit {
		height: 100%;
		color: #333;
		font-family: "Microsoft YaHei UI Light", sans-serif;

		* {
			box-sizing: border-box;
		}

		.map {
			position: relative;
			z-index: 1;
			height: 100%;

			/deep/ .amap-markers {
				width: 100%;
				height: 100%;
			}
		}

		.mo-view {
			position: absolute;
			left: 0;
			top: 0;
			z-index: 2;
			width: 100%;
			height: 100%;
			padding: 12px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			pointer-events: none;

			.mo-car-id {
				width: 100%;
				box-shadow: 0 0 8px #8c8c8c;
				border-radius: 4px;
				padding: 8px 24px;
				font-weight: bolder;
				text-align: center;
				font-size: 18px;
				font-family: "Microsoft YaHei UI", sans-serif;
				background-color: rgba(255, 255, 255, .6);
				backdrop-filter: blur(2px);
			}

			.mo-block {
				display: inline-block;
				margin-top: 6px;
				border: 1px solid #ccc;
				border-radius: 12px;
				padding: 4px 12px;
				font-weight: bolder;
				text-align: center;
				font-size: 14px;
				background-color: rgba(255, 255, 255, .6);
				backdrop-filter: blur(2px);
			}

			.mo-date-time {
				margin-top: 38px;
			}

			.mo-panel {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				background-color: #fff;
				box-shadow: 0 0 8px #8c8c8c;
				border-radius: 4px;
				padding: 8px 12px;
				font-size: 14px;

				.mp-cb-time {
					margin-bottom: 8px;

					.mp-car-brand {
						display: inline-block;
						background-color: #c1e7ff;
						border-radius: 2px;
						border: 1px solid #a5e0ff;
						color: #059fff;
						padding: 1px 8px;
						letter-spacing: .1em;
						margin-right: 12px;
					}

					.mc-time {
						padding-left: 8px;
					}
				}

				.mp-start-address,
				.mp-arrive-address {
					position: relative;
					padding-left: 16px;
					margin: 4px 0;
					font-weight: bolder;
					font-size: 16px;

					&::after {
						position: absolute;
						left: 2px;
						top: 6px;
						content: " ";
						border-radius: 100%;
						border: 2px solid #00ff7f;
						width: 6px;
						height: 6px;
					}
				}

				.mp-arrive-address {
					&::after {
						border-color: #ff6063;
					}
				}

				.mp-status {
					display: flex;
					align-items: flex-start;
					justify-content: center;
					padding: 12px 8px;
					background-color: #edf5ff;
					border-radius: 4px;

					.ms-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 33.33%;

						.mi-value {
							font-weight: bolder;
							padding-bottom: 4px;
						}
					}
				}

				.mp-operations {
					display: flex;
					margin: 12px 0 4px;
					justify-content: space-between;
					pointer-events: auto;

					.mp-operation {
						padding: 4px 12px;
						font-size: 18px;
						transition: .12s ease-in-out;
						border-radius: 16px;
						border: 1px solid #059fff;
						color: #059fff;
						margin-right: 24rpx;
						text-align: center;
						width: 30%;

						&:active {
							transform: scale(.95);
						}

						&.mo-primary {
							width: 60%;
							padding: 4px 32px;
							background: linear-gradient(to right, #11d8ff, #2b7cff);
							color: #fff;
						}

						&.mo-full {
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>
