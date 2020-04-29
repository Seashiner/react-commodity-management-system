import React, { Component } from 'react'

export default class Count extends Component {

  state={
    count : 0
  }

  increment=()=>{
    const {value} = this.refs.user_selected
    let {count} = this.state
    count += value*1
    this.setState({count})
  }

  decrement=()=>{
    const {value} = this.refs.user_selected
    let {count} = this.state
    count -= value*1
    this.setState({count})
  }

  incrementIfOdd=()=>{
    const {value} = this.refs.user_selected
    let {count} = this.state
    if(count % 2 === 1){
      count += value*1
      this.setState({count})  
    }
  }

  incrementAsync=()=>{
    const {value} = this.refs.user_selected
    let {count} = this.state

    setTimeout(() => {
      count += value*1
      this.setState({count}) 
    }, 1000);
  }

  render() {
    return (
      <div>
				<h1>当前求和为：{this.state.count}</h1>
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
