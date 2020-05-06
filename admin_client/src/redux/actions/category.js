import {message} from 'antd'
import {GET_CATEGORY} from '../action_type.js'
import {reqCategory} from '../../api/'
//同步
export const get_category=(list)=>({type:GET_CATEGORY , data:list})

//异步
export const get_categoryAsync=()=>{
  return async (dispatch)=>{
    const result = await reqCategory()
    const {status,data,msg} = result
    if(status === 0){
      dispatch(get_category(data))
    }else{
      message.error(msg)
    }
  }
}
