const App = {
    data() {
        return {
            message: "Hello Element Plus",
            ipInput: '',
            ipData: {}
        }
    },
    created() {
        this.getApiInfo()
    },
    methods: {
        ipLookup() {
            $axios({
                method: 'get',
                url: this.ipInput + '/json'
            }).then(res => {
                this.ipData = res
            })
        },
        getApiInfo() {
            $axios({
                method: 'get',
                url: '/json'
            }).then(res => {
                this.ipData = res
            })
        }
    }
};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");
