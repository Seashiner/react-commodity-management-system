import React, { Component } from 'react'
import store from '../redux/store.js'
import {increment , decrement} from '../redux/actions/count.js'

export default class Count extends Component {


  increment=()=>{
    const {value} = this.refs.user_selected
    // store.dispatch(increment(value * 1))
  }

  decrement=()=>{
    const {value} = this.refs.user_selected
    // store.dispatch(decrement(value * 1))
  }

  incrementIfOdd=()=>{
    const {value} = this.refs.user_selected
    // let count = store.getState()
    // if(count % 2 === 1){
      // store.dispatch(increment(value * 1))
    // }
  }

  incrementAsync=()=>{
    const {value} = this.refs.user_selected
    setTimeout(() => {
      // store.dispatch(increment(value * 1))
    }, 1000);
  }

  render() {
    return (
      <div>
				{/* <h1>当前求和为：{store.getState()}</h1> */}
				<h1>当前求和为：xxxx</h1>
				<select ref="user_selected">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
				<button onClick={this.incrementAsync}>increment async</button>
			</div>
    )
  }
}
