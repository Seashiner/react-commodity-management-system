/*
对axios的二次封装:
    1.配置请求的基础路径
		2.配置超时时间
		3.统一处理post请求json编码问题（转为urlencoded）
		4.统一返回真正的数据data，而不是response对象
		5.统一处理错误
*/

import axios from 'axios'
import qs from 'querystring' //用于将对象转为urlencoded字符串
import {message as msg} from 'antd'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 2000;

axios.interceptors.request.use((config)=>{
  const {method,data} = config
  if(method.toLowerCase() === 'post' & data instanceof Object){
    config.data = qs.stringify(data)
  }
  return config
})

axios.interceptors.response.use(
  response => {
    return response.data
  },
  	//失败的回调：1.返回的http状态码不是2开头；2.达到了超时时间；3.网络不通
  err => {
    let errMsg = '未知错误，请联系管理员'
    const {message} = err
    if(message.indexOf('401') !== -1) errMsg = '未登录或身份过期，请重新登录！'
    else if(message.indexOf('Network Error') !== -1) errMsg = '网络不通，请检查网络连接！'
    else if(message.indexOf('timeout') !== -1) errMsg = '网络不稳定，连接超时！'
    msg.error(errMsg,1)
    return new Promise(()=>{}) //统一处理错误
  }
)

export default axios
