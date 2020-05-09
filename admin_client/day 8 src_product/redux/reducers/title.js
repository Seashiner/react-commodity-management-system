import {ADD_TITLE} from '../action_type.js'

let initState ='首页'

export default function(preState=initState , action){
  let newState = ''
  const {type , data} = action
  switch (type) {
    case ADD_TITLE:
      newState = data
      return newState;
    default:
      return preState;
  }
}