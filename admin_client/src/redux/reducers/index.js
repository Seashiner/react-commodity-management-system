import loginReducer from './login.js'
import titleReducer from './title.js'
import {combineReducers} from 'redux'

export default combineReducers({
	userInfo:loginReducer,
	title:titleReducer
})











