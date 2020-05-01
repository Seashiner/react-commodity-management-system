import countReducer from '../reducers/count.js' 
import personReducer from '../reducers/person.js' 
import {combineReducers} from 'redux'



export default combineReducers({
  number : countReducer,
  person : personReducer
})