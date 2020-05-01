
import {INCREMENT , DECREMENT} from '../action_type.js'

// export const createIncrementAction = value => ({type : 'increment' , data : value})

// export const createDecrementAction = value => ({type : 'decrement' , data : value})


export const increment = value => ({type : INCREMENT , data : value})

export const decrement = value => ({type : DECREMENT , data : value})



