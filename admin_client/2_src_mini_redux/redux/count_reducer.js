

export default function (preState = 0 , action){
  let newState;

  const {type , data} = action
  switch(type){
    case 'increment':
      newState = preState + data
      break;
    case 'decrement':
      newState = preState - data
      break;
		default:
      return preState

  }

  return newState
}