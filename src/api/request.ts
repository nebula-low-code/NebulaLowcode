import axios from 'axios'
import { message } from 'ant-design-vue'
import { useDataStore } from '@/stores'

// 创建一个错误
function errorCreate(msg: any) {
  const err = new Error(msg)
  errorLog(err)
  throw err
}

// 记录和显示错误
function errorLog(err: any) {
  console.log('>>>>>> Error >>>>>>', err)
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: 'https://api.xingyunzuo.com/platform/api',
  timeout: 20000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const store = useDataStore()
    // 在请求发送之前做一些处理
    config.headers['X-AUTH-TOKEN'] = store.token
    config.headers['X-AUTH-KEY'] = store.phone
    config.headers['X-AUTH-SOURCE'] = 'PAAS'

    // const token = localStorage.getItem('token');
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['X-Token'] = token;
    // token && (config.headers['Authorization'] = 'Bearer ' + token)
    return config
  },
  (error) => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log('response: ', response)
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    if (dataAxios.code !== 0) {
      if (dataAxios.code === 50000) {
        const store = useDataStore()
        // store.logoutFlag=true;
        store.nebulaMessage = {
          type: 'resetToken'
        }
        message.destroy()
        message.error({
          content: dataAxios.message,
          duration: 2
        })
      } else {
        message.error(dataAxios.message || 'Error')
      }
      return Promise.reject(new Error(dataAxios.message || 'Error'))
    } else {
      return dataAxios
    }
    // 根据 code 进行判断
    // if (code === undefined) {
    //     // 如果没有 code 代表这不是项目后端开发的接口
    //     return dataAxios;
    // } else {
    //     // 有 code 代表这是一个后端接口 可以进行进一步的判断
    //     switch (code) {
    //     case 0:
    //         // [ 示例 ] code === 0 代表没有错误
    //         return dataAxios.data;
    //     case 'xxx':
    //         // [ 示例 ] 其它和后台约定的 code
    //         errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`);
    //         break;
    //     default:
    //         // 不是正确的 code
    //         errorCreate(`${dataAxios.msg}: ${response.config.url}`);
    //         break;
    //     }
    // }
  },
  (error) => {
    // console.log('error------------------>>>: ', typeof error, error.request.custom.url)
    // if (error.request && error.request.custom.url.includes('merchant/after-sale-order/waiting-check-number')) return Promise.reject(error);
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = `请求错误：${error.response.data.message}`
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
