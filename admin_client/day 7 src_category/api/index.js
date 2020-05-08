import ajax from './ajax.js'
import jsonp from 'jsonp'
import {LOCATION , OUTPUT , AK} from '../config'
import { message } from 'antd';

//请求登录的函数,loginObj形如：{username:'xx',password:'xx'}
export const reqLogin =(loginObj) => ajax.post('/login' , loginObj)

//天气请求接口

export const reqWeather = ()=>{
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${LOCATION}&output=${OUTPUT}&ak=${AK}`

  return new Promise((resolve) => {
    jsonp(url , {
      timeout : 2000
    } , (err , data)=>{
      if(err){
        message.error(err.message)
      }else{
        resolve(data.results[0].weather_data[0])
      }
      
    })
  })
  
}

//请求分类列表
export const reqCategory = () => ajax.get('/manage/category/list')

//添加分类列表
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add',categoryName)









