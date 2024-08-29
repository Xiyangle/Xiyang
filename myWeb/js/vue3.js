const app = Vue.createApp({
    data(){
        return {
            ipInput: '',
            ipData: {}
        }
    },
    mounted() {
        this.getApiInfo()
    },
    methods: {
        ipLookup() {
            $axios({
                method: 'get',
                url: this.ipInput+'/json'
            }).then(res =>{
                this.ipData = res
            })
        },
        getApiInfo() {
            $axios({
                method: 'get',
                url:  '/json'
            }).then(res =>{
                this.ipData = res
            })
        }
    }
})
const vm = app.mount('#app')
