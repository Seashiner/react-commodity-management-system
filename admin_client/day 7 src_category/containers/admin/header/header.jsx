import React, { Component } from 'react'
import './css/header.less'
import { FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import { Button ,Modal } from 'antd';
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import {delete_userInfo} from '../../../redux/actions/login.js'
import {add_title} from '../../../redux/actions/title.js'
import dayjs from 'dayjs'
import {reqWeather} from '../../../api'

const { confirm } = Modal;
@connect(
  state => ({
    username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin,
    title:state.title
  }),
  {delete_userInfo,add_title}
)

class Header extends Component {

  state = {
    isFull : false,
    time : dayjs().format('YYYY年 MM月 DD日 HH：mm:ss'),
    weatherData : {}
  }

  getWeather = async ()=>{
    const result = await reqWeather()
    const {dayPictureUrl ,weather , temperature} = result
    this.setState({weatherData : {dayPictureUrl ,weather , temperature}})
  }

  fullScreen=()=>{
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  logOut=()=>{
    confirm({
      title: '确定退出登录吗?',
      icon: <ExclamationCircleOutlined />,
      content: '退出后需要重新登录', //副标题
			cancelText:'取消',
			okText:'确认',
      onOk : ()=> {
        this.props.delete_userInfo()
      }
    });
    
  }

  componentDidMount(){

    screenfull.onchange(()=>{
			const {isFull} = this.state
			this.setState({isFull:!isFull})
		})

    this.timer = setInterval(() => {
      this.setState({time : dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
    }, 1000);

    // this.getWeather()
  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  render() {
    const {dayPictureUrl ,weather , temperature} = this.state.weatherData
    return (
      <div className="header">
        <div className='header_top'>
          <Button size="small" onClick={this.fullScreen}>
          {this.state.isFull ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
          </Button>
          <span className='username'>欢迎，{this.props.username}</span>
          <Button type="link" onClick={this.logOut}>退出登录</Button>
        </div>
        <div className='header_bottom'>
        <div className="bottom_left">
						<span>{this.props.title}</span>
					</div>
					<div className="bottom_right">
						<span>{this.state.time}</span>
						<img src={dayPictureUrl}/>
						<span>{weather}</span>&nbsp;
						<span>{temperature}</span>
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
