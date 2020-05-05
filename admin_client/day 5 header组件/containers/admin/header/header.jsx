import React, { Component } from 'react'
import './css/header.less'
import { FullscreenOutlined} from "@ant-design/icons";
import { Button } from 'antd';
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import {delete_userInfo} from '../../../redux/actions/login.js'

@connect(
  state => ({
    username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),
  {delete_userInfo}
)


class Header extends Component {

  fullScreen=()=>{
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  logOut=()=>{
    this.props.delete_userInfo()
  }

  render() {
    return (
      <div className="header">
        <div className='header_top'>
          <Button size="small" onClick={this.fullScreen}>
            <FullscreenOutlined />
          </Button>
          <span className='username'>欢迎，{this.props.username}</span>
          <Button type="link" onClick={this.logOut}>退出登录</Button>
        </div>
        <div className='header_bottom'>
        <div className="bottom_left">
						<span>首页</span>
					</div>
					<div className="bottom_right">
						<span>2020年5月5日 00:00:00</span>
						<img/>
						<span>多云转晴</span>
						<span>温度：0~15℃</span>
					</div>
        </div>
      </div>
    )
  }
}

export default Header


// export default connect(
//   state => ({
//     username:state.userInfo.user.username,
//     isLogin:state.userInfo.isLogin
//   }),
//   {delete_userInfo}
// )(Header)
