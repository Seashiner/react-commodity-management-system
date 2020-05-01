import countReducer from './count.js'
import personReducer from './person.js'
import {combineReducers} from 'redux'

export default combineReducers({
	count:countReducer,
	persons:personReducer
})












