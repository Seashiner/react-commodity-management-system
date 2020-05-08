import {GET_CATEGORY} from '../action_type'

let initState=[]
export default function(preState = initState , action){
  const {type , data} = action
  let newState;
  switch (type) {
    case GET_CATEGORY:
      newState = data
      return newState
    default:
      return preState
  }
}







