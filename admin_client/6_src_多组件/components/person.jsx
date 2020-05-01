import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default class Person extends Component {

  add=()=>{
    const {nameNode , ageNode} = this.refs

    if(!nameNode.value || !ageNode.value){
      alert('姓名和年龄不能为空')
      return
    }

    this.props.add_person({
      id : uuidv4(),
      name : nameNode.value , 
      age : ageNode.value
    })

    nameNode.value = ''
    ageNode.value = ''
  }

  render() {
    return (
      <div>
				<h1>当前总人数为：{this.props.person.length}，上方组件求和为：{this.props.count} </h1>
				<input ref="nameNode" type="text" placeholder="输入名字"/>&nbsp;
				<input ref="ageNode" type="text" placeholder="输入年龄"/>&nbsp;
				<button onClick={this.add}>添加</button>
        <ul>
          {
            this.props.person.map((personObj)=>{
              return <li key={personObj.id}>姓名：{personObj.name} - 年龄：{personObj.age}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
