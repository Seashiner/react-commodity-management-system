import {connect} from 'react-redux'
import React, { Component } from 'react'
import {add_person} from '../redux/actions/person'
import { v4 as uuidv4 } from 'uuid'

class Person extends Component {

  add=()=>{
    const {nameNode , ageNode} = this.refs
    if(!nameNode.value || !ageNode.value){
      alert('不能为空')
      return 
    }
    this.props.add_person({
      id:uuidv4(),
      name:nameNode.value,
      age:ageNode.value
    })
    nameNode.value = ''
    ageNode.value = ''
  }

  render() {
    console.log(this.props);
    
    return (
      <div>
        <h1>当前总人数为：{this.props.persons.length}，上方组件求和为：{this.props.count} </h1>
				<input ref="nameNode" type="text" placeholder="输入名字"/>&nbsp;
				<input ref="ageNode" type="text" placeholder="输入年龄"/>&nbsp;
				<button onClick={this.add}>添加</button>
        <ul>
          {
            this.props.persons.map((person)=>{
              return <li key={person.id}>姓名：{person.name}-年龄：{person.age}</li>
            })
          }
        </ul>
			</div>
    )
  }
}


export default connect(
  state => ({
    count:state.count,
    persons:state.persons
  }),
  {add_person}
)(Person)


