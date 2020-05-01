import {INCREMENT , DECREMENT} from '../action_type.js'

export default function (preState = 0 , action){
  let newState;

  const {type , data} = action
  switch(type){
    case INCREMENT:
      newState = preState + data
      break;
    case DECREMENT:
      newState = preState - data
      break;
		default:
      return preState

  }

  return newState
}