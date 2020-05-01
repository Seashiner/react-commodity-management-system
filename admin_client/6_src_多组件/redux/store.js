import {createStore , applyMiddleware} from 'redux'
// import countReducer from './reducers/count.js'
import allReducer from './reducers/index.js'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(
  allReducer , 
  composeWithDevTools(applyMiddleware(thunk))
)

