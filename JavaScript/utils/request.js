let apiUrl = 'https://svm.lingyaoauto.com/wj/proxyWmes-test'
//https://svm.lingyaoauto.com/wj/proxyWmes-test
//http://localhost:8080/wj/proxyWmes-test

// 创建axios实例
const $axios = axios.create({
    baseURL: apiUrl, // 你的API地址
    timeout: 10000, // 请求超时时间
})
// 请求拦截器
$axios.interceptors.request.use(
    config => {
        //config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
        return config
    },
    error => {
        console.log('request' + error)
        return Promise.reject(error)
    }
)
// 响应拦截器
$axios.interceptors.response.use(
    response => {
        let res = response
        let data = res.data
        if (data.code > 99 || data.code < 0) {
            alert(data.msg)
            return Promise.reject('error')
        } else {
            return data
        }
    },
    error => {
        console.log('response' + error)
        let {message} = error
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        alert(message)
        return Promise.reject(error)
    }
)
