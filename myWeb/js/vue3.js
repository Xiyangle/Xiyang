const { createApp, ref } = Vue

createApp({
    setup() {
        const ipInput = ref('')
        const ipData = ref({})

        function ipLookup() {
            $axios({
                method: 'get',
                url: ipInput.value + '/json'
            }).then(res => {
                ipData.value = res
            })
        }

        function getApiInfo() {
            $axios({
                method: 'get',
                url: '/json'
            }).then(res => {
                ipData.value = res
            })
        }
        getApiInfo()

        return {
            ipInput,
            ipData,
            ipLookup
        }
    }
}).mount('#app')
