

let initState = 0
export default function(perState=initState , actions){
  let newState;
  const {type , data} = actions
  switch(type){
    case 'increment':
      newState = perState + data
      return newState
    case 'decrement':
      newState = perState - data
      return newState
    default:
      return perState
    }
}



