import React, { Component } from 'react'
import sun from './images/animat-day-night-color.gif'
import './css/home.less'

export default class Home extends Component {
  render() {
    return (
      <div className = 'home'>
        <img src={sun}/>
        <h1>商品管理系统</h1>
      </div>
    )
  }
}
