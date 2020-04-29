# Redux 
<img src='./public/redux原理图.png'>

## mini版本redux (没有Action Creators)

`yarn add redux`

基本步骤：

1、建立redux文件夹，建立store.js，引入redux，创建一个store核心对象

- 如何得到store对象：
```js
import {createStore} from 'redux'
import reducer from './reducers'
const store = createStore(reducer)
```
- store对象的功能：
```js
getState(): 得到state
dispatch(action): 分发action, 触发reducer调用, 产生新的state
subscribe(listener): 注册监听, 当产生了新的state时, 自动调用
```
2、创建一个reducer.js（关键）
- reducer 是一个函数,该函数有两个参数，分别是：preState、action
- 该函数内部需要定义一个 newState ,并 return newState 
- action 有type 和 data 这两个属性，该函数内部需要根据不同的 type ，写不同的逻辑，得到 newState ，这个 newState 用于 return 出去
- 这个 reducer 函数需要 export default

3、store.js中引入reducer

4、组件中引入store，组件中不同的方法，可以调用拥有不同 type 的 dispatch ,dispatch 派发 action ,会找到该 store 对应的 reducer , reducer 中定义了这个 type 类型的 action 的逻辑
```js
store.dispatch({type:'increment',data:value*1}
store.getState()
```
5、在入口文件 index.js 中，监听状态的改变，并让页面的状态改变
```js
import store from './redux/store'

ReactDOM.render(<App/>,document.getElementById('root'))
//如果redux中保存的状态发生变化，那么就调用store.subcribe所指定的回调。
store.subscribe(()=>{
	ReactDOM.render(<App/>,document.getElementById('root'))
})
```

## 完整版本redux (有Action Creators)

基本步骤：

1、创建 actions/creator.js ，专门用于创建和 count 组件相关的 action , 并分别暴露
```js
export const createIncrementAction = value => ({type : 'increment' , data : value})
```
2、在 count 组件中，引入 actions/creator.js 中定义的 action
```js
import {createIncrementAction , createDecrementAction} from '../../redux/count_action_creator.js'

store.dispatch(createIncrementAction(value * 1))
```
3、优化：创建 action_type.js ,用于定义整个应用中的 action 对象中的 type 属性的常量,可以在使用这些变量的文件引入
```js
export const INCREMENT = 'increment'
```










