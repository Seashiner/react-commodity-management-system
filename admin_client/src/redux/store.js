import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import allReducer from './reducers/index.js'

export default createStore(allReducer,applyMiddleware(thunk))

