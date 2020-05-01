import {INCREMENT , DECREMENT} from '../action_type.js'

export const increment = (value) => ({type : INCREMENT , data : value})

export const decrement = (value) => ({type : DECREMENT , data : value})

export const incrementAsync = value => {
  return (dispatch)=>{
    setTimeout(() => {
      dispatch(increment(value))
    }, 1000);
  }
}
