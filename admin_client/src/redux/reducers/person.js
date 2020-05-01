import {ADD_PERSON} from '../action_type'

let initState = [
  {id : '001' , name : '张三' , age : 18},
  {id : '002' , name : '李四' , age : 15}
]

export default function (preState=initState , actions) {
  const {type,data} = actions
  let newState

  switch (type) {
		case ADD_PERSON:
			newState = [data,...preState]
			return newState
		default:
			return preState
  }
}

