import React, { Component } from 'react'
import {connect, connectAdvanced} from 'react-redux'
import {delete_userInfo} from '../../redux/actions/login.js'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import './css/admin.less'
import Header from './header/header.jsx'

const { Footer, Sider, Content } = Layout;

@connect(
  state => ({
    // username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),
  {delete_userInfo}
)

class Admin extends Component {

  // loginOut=()=>{
  //   this.props.delete_userInfo()
  // }

  render() {
    if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <div>
        {/* 你好，{this.props.username}
        <button onClick={this.loginOut}>退出登录</button> */}

        <Layout className='admin_container'>
          <Sider>Sider</Sider>
          <Layout>
            <Header/>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Admin

// export default connect(
//   state => ({
//     // username:state.userInfo.user.username,
//     isLogin:state.userInfo.isLogin
//   }),
//   {delete_userInfo}
// )(Admin)