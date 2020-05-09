import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Layout } from 'antd';
import { Switch,Redirect,Route} from 'react-router-dom'
import {delete_userInfo} from '../../redux/actions/login.js'
import './css/admin.less'
import Header from './header/header.jsx'
import LeftNav from './leftNav/leftNav.jsx'
import Check from '../Hoc/check.jsx'
import Home from './home/home.jsx'
import Category from './category/category.jsx'
import Product from './product/product.jsx'
import User from './user/user.jsx'
import Role from './role/role.jsx'
import Pie from './pie/pie.jsx'
import Line from './line/line.jsx'
import Bar from './bar/bar.jsx'


const { Footer, Sider, Content } = Layout;

@connect(
  state => ({
    // username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),
  {delete_userInfo}
)

@Check

class Admin extends Component {

  // loginOut=()=>{
  //   this.props.delete_userInfo()
  // }

  render() {
    // if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <div>
        {/* 你好，{this.props.username}
        <button onClick={this.loginOut}>退出登录</button> */}

        <Layout className='admin_container'>
          <Sider>
            <LeftNav/>
          </Sider>
          <Layout>
            <Header/>
            <Content className='admin_content'>
              <Switch>
                <Route path="/admin/home" component={Home}/>
                <Route path="/admin/prod_about/category" component={Category}/>
                <Route path="/admin/prod_about/product" component={Product}/>
                <Route path="/admin/user" component={User}/>
                <Route path="/admin/role" component={Role}/>
                <Route path="/admin/charts/bar" component={Bar}/>
                <Route path="/admin/charts/line" component={Line}/>
                <Route path="/admin/charts/pie" component={Pie}/>
                <Redirect to="/admin/home"/>
              </Switch>
            </Content>
            <Footer className='admin-footer'>“不要被黑暗阻止，不要被他人语言恶化，接收光明的力量”</Footer>
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