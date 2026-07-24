const App = {
    data() {
        return {
            message: "Hello Element Plus",
            ipInput: '',
            ipData: {}
        }
    },
    created() {

    },
    methods: {
        ipLookup() {
            $axios({
                method: 'get',
                url: this.ipInput + '/info'
            }).then(res => {
                this.ipData = res
            })
        },
        getApiInfo() {
            $axios({
                method: 'get',
                url: '/info'
            }).then(res => {
                this.ipData = res
            })
        }
    }
};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");
