import {connect} from 'react-redux'
import React, { Component } from 'react'
import {increment , decrement , incrementAsync} from '../redux/actions/count'
class Count extends Component {

  increment=()=>{
    const {value} = this.refs.user_selected
    // store.dispatch(increment(value*1))
    this.props.increment(value*1)
  }

  decrement=()=>{
    const {value} = this.refs.user_selected
    // store.dispatch(decrement(value*1))
    this.props.decrement(value*1)
  }

  incrementIfOdd=()=>{
    const {value} = this.refs.user_selected
    let count = this.props.count
    if(count % 2 === 1){
      // store.dispatch(increment(value*1))
      this.props.increment(value*1)
    }
  }

  incrementAsync=()=>{
    const {value} = this.refs.user_selected
    // store.dispatch(incrementAsync(value*1))
    this.props.incrementAsync(value*1)

    // setTimeout(() => {
    //   store.dispatch(increment(value*1))
    // }, 1000);
  }

  render() {
    return (
      <div>
				<h1>当前求和为：{this.props.count} , 下方组件总人数为 : {this.props.persons.length}</h1>
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







export default connect(
  state => ({
    count:state.count,
    persons:state.persons
  }),
  {increment , decrement ,incrementAsync }
)(Count)









