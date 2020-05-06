import {ADD_USERINFO , DELETE_USERINFO} from '../action_type.js'

export const add_userInfo = userObj => {
  const {user,token} = userObj
  localStorage.setItem('user',JSON.stringify(user))
  localStorage.setItem('token',token)
  return {type : ADD_USERINFO , data : userObj}
}

export const delete_userInfo = () =>{
  localStorage.clear()
  return {type : DELETE_USERINFO}
}




