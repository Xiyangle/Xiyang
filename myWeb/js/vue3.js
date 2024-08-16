const app = Vue.createApp({
    data(){
        return {
            message: 'Hello Vue.js'
        }
    },
    methods: {
        msg() {
            this.message = 'Hello Vue3.js'
        },
    }
})
const vm = app.mount('#app')
