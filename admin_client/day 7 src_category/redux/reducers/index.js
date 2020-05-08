import loginReducer from './login.js'
import titleReducer from './title.js'
import categoryReducer from './category.js'
import {combineReducers} from 'redux'

export default combineReducers({
	userInfo:loginReducer,
	title:titleReducer,
	categoryList :categoryReducer
})











