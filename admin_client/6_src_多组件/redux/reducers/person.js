import {ADD_PERSON} from '../action_type.js'


let initState = [
  {id : '001' ,name : '张三' , age : 15},
  {id : '002' ,name : '李四' , age : 18}
]

export default function (preState = initState , action){
  let newState;

  const {type , data} = action
  switch(type){
    case ADD_PERSON:
      newState = [data , ...preState]
      break;

		default:
      return preState

  }

  return newState
}