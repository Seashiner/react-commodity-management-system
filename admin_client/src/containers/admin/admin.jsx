import React, { Component } from 'react'
import {connect} from 'react-redux'
import {delete_userInfo} from '../../redux/actions/login.js'
import { Redirect } from 'react-router-dom'

class Admin extends Component {

  loginOut=()=>{
    this.props.delete_userInfo()
  }

  render() {
    if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <div>
        你好，{this.props.username}
        <button onClick={this.loginOut}>退出登录</button>
      </div>
    )
  }
}


export default connect(
  state => ({
    username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),
  {delete_userInfo}
)(Admin)