import loginReducer from './login.js'
import {combineReducers} from 'redux'

export default combineReducers({
	userInfo:loginReducer,
})











