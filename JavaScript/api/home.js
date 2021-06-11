new Vue({
    el: '#app',
    data() {
        return {
            token: '',
            spmShipnum: '',
            tableData: [],
            // 分页
            page: 1,
            limit: 10,
            total: 0
        }
    },
    mounted() {
        this.token = this.getQueryVariable('token')
        this.spmShipnum = this.getQueryVariable('spmTsCode')
        this.getSpmOrderList()
    },
    methods: {
        // 订单集中查询 H5 (分页)
        getSpmOrderList() {
            axios({
                method: 'post',
                url: 'https://otps.anji-ceva.com/Otps/api/material/order/getSpmOrderList?limit='+this.limit+'&page='+this.page,
                data: {
                    spmShipnum: this.spmShipnum
                },
                headers: {
                    'Authori-zation': this.token
                }
            }).then(res => {
                let data = res.data
                if (data.code === 200) {
                    this.tableData = data.data.list
                    this.total = data.data.total
                } else {
                    this.token = false
                    this.$message.error(data.message);
                }
            });
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
        // 轨迹查询
        handleClick(e) {
            window.open('./maps.html?orderCode='+e.orderCode+'&token='+this.token,'_self')
        },
        // 分页
        handleSizeChange(val) {
            this.limit = val
            this.getSpmOrderList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getSpmOrderList()
        }
    }
})
