let _user;

try {
  _user = JSON.parse(localStorage.getItem('user'))
} catch (error) {
  _user = null
}

let _token = localStorage.getItem('token')

let initState = {
  user: _user || {} , 
  token: _token || '',
  isLogin : _user && _token ? true :false
}

export default function(perState=initState , actions){
  let newState;
  const {type , data} = actions
  switch(type){
    case 'add_userInfo':
      newState = {...data,isLogin:true}
      return newState

    case 'delete_userInfo':
      newState = {
        user: {} , 
        token: '',
        isLogin : false
      }
      return newState
    default:
      return perState
    }
}


