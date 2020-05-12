import ajax from './ajax.js'
import jsonp from 'jsonp'
import {LOCATION , OUTPUT , AK} from '../config'
import { message } from 'antd';
import store from '@/redux/store'

const {username} = store.getState().userInfo.user

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
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add',{categoryName})

//请求更改分类名
export const reqUpdateCategory = (categoryId,categoryName) => ajax.post('/manage/category/update',{categoryId,categoryName})

//请求商品列表
export const reqProductList = (pageNum,pageSize) => ajax.get('/manage/product/list',{params:{pageNum,pageSize}})

//请求搜索商品
export const reqSearchProList = (searchType,keyWord,pageNum,pageSize) =>
	ajax.get('/manage/product/search',{params:{[searchType]:keyWord,pageNum,pageSize}})

//上架、下架
export const reqUpdateStatus = (productId,status) => ajax.post('/manage/product/updateStatus',{productId,status})

//根据商品ID获取商品
export const reqProductInfo = (productId) => ajax.get('/manage/product/info',{params:{productId}})

//删除商品图片
export const reqDeletePic = (name) => ajax.post('/manage/img/delete',{name})

//添加商品
export const reqAddProduct = (productObj) => ajax.post('/manage/product/add',productObj)

//修改商品
export const reqUpdateProduct = (productObj) => ajax.post('/manage/product/update',productObj)

//获取角色
export const reqRoleInfo = () => ajax.get('/manage/role/list')
//添加角色
export const reqAddRole = (roleName) => ajax.post('/manage/role/add',{roleName})
//更新角色权限
export const reqUpdateRole = (_id,menus) => ajax.post('/manage/role/update',{_id,auth_name:username,menus,auth_time:Date.now()})


//获取用户
export const reqUserInfo = () => ajax.get('/manage/user/list')
//添加用户
export const reqAddUser = (addUser) => ajax.post('/manage/user/add',addUser)
//更新用户
export const reqUpdateUser = (updateUser) => ajax.post('/manage/user/update',updateUser)
//删除用户
export const reqDeleteUser = (userId) => ajax.post('/manage/user/add',{userId})
