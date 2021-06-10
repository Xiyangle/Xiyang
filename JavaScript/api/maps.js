new Vue({
    el: '#app',
    data() {
        return {
            token: '',
            nodeList: [],
            // 订单号
            orderCode: '',
            // 时间轴相关参数
            lastArriverDate: '',
            exArriverDate: '',
            timeLine: [],
            findex: 0
        }
    },
    mounted() {
        this.orderCode = this.getQueryVariable('orderCode')
        this.token = this.getQueryVariable('token')
        this.getMapNodeByOrderCode()
        this.getTimelineByOrderCode()
    },
    methods: {
        // 根据订单查询时间轴节点
        getTimelineByOrderCode() {
            axios({
                method: 'get',
                url: 'http://121.37.190.48:8080/Otps/api/admin/transportnode/getPCOderNodeByCode?orderCode='+this.orderCode,
                headers: {
                    'Authori-zation': this.token
                }
            }).then(res => {
                let data = res.data
                this.lastArriverDate = data.data.lastArriverDate
                this.exArriverDate = data.data.exArriverDate
                data.data.nodeList.forEach(item => {
                    item.isShow = false
                })
                for (var i = 0; i < data.data.nodeList.length; i++) {
                    if (data.data.nodeList[i].nodeTime != "") {
                        this.findex=i
                    }
                }
                this.timeLine = data.data.nodeList
                console.log(data)
                if (data.code !== 200) {
                    this.$message.error(data.message);
                }
            })
        },
        // 根据订单查询得到地图上的节点
        getMapNodeByOrderCode() {
            axios({
                method: 'get',
                url: 'http://121.37.190.48:8080/Otps/api/admin/transportnode/getMapNodeOrder?orderCode='+this.orderCode,
                headers: {
                    'Authori-zation': this.token
                }
            }).then(res => {
                let data = res.data
                this.nodeList = data.data;
                this.mapInit()
                if (data.code !== 200) {
                    this.$message.error(data.message);
                }
            })
        },
        // 地图初始化事件
        mapInit() {
            var lineArr = []
            var map = new AMap.Map('mapId', {
                resizeEnable: true
            })

            // 实例化点标记
            var infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(0, -30)
            })

            for (var i = 0, marker; i < this.nodeList.length; i++) {
                var marker = new AMap.Marker({
                    map: map,
                    position: [this.nodeList[i].longitude, this.nodeList[i].latitude],
                    icon: this.nodeList[i].wayNodeImg
                })

                marker.content = '<h3 style="color: #0a6aa1">' + this.nodeList[i].wayNodeName + '</h3>'
                marker.content += '<div>' + this.nodeList[i].nodeTime + '</div>'
                marker.content += '<div>' + this.nodeList[i].address + '</div>'

                marker.on('mouseover', infoOpen)
                //注释后打开地图时默认关闭信息窗体
                // marker.emit('mouseover', {target: marker});
                marker.on('mouseout', infoClose)
                marker.on('click', newMAp)

                lineArr.push([this.nodeList[i].longitude, this.nodeList[i].latitude])
            }

            //鼠标点击事件,设置地图中心点及放大显示级别
            function newMAp(e) {
                //map.setCenter(e.target.getPosition());
                map.setZoomAndCenter(12, e.target.getPosition())
                var infoWindow = new AMap.InfoWindow({
                    offset: new AMap.Pixel(0, -30)
                })
                infoWindow.setContent(e.target.content)
                infoWindow.open(map, e.target.getPosition())
            }

            function infoClose(e) {
                infoWindow.close(map, e.target.getPosition())
            }

            function infoOpen(e) {
                infoWindow.setContent(e.target.content)
                infoWindow.open(map, e.target.getPosition())
            }

            // 绘制轨迹
            var polyline = new AMap.Polyline({
                map: map,
                path: lineArr,
                strokeColor: '#04C5D4', //线颜色
                strokeOpacity: 1, //线透明度
                strokeWeight: 3, //线宽
                strokeStyle: 'solid' //线样式
            })

            map.setFitView()
        },
        // JS获取url参数
        getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
            }
            return(false);
        },
    }
})
