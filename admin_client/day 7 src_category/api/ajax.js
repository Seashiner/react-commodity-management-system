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
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../redux/store.js'
import {delete_userInfo} from '../redux/actions/login'

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 2000;

axios.interceptors.request.use((config)=>{
  nprogress.start();
  const {method,data} = config
  if(method.toLowerCase() === 'post' & data instanceof Object){
    config.data = qs.stringify(data)
  }
  const {token} = store.getState().userInfo
  if(token){
    config.headers.Authorization = 'atguigu_'+token
  }

  return config
})

axios.interceptors.response.use(
  response => {
    nprogress.done();
    return response.data;
  },
  	//失败的回调：1.返回的http状态码不是2开头；2.达到了超时时间；3.网络不通
  err => {
    nprogress.done();
    let errMsg = '未知错误，请联系管理员'
    const {message} = err
    if(message.indexOf('401') !== -1) {
      store.dispatch(delete_userInfo())
      errMsg = '未登录或身份过期，请重新登录！'
    }
    else if(message.indexOf('Network Error') !== -1) errMsg = '网络不通，请检查网络连接！'
    else if(message.indexOf('timeout') !== -1) errMsg = '网络不稳定，连接超时！'
    msg.error(errMsg,1)
    return new Promise(()=>{}) //统一处理错误
    
  }
)

export default axios
