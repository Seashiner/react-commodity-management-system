import React, { Component } from 'react'
import logo from '../../assets/images/sun.png'
import {reqLogin} from '../../api'
import './css/login.less'
import { Form, Input, Button ,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {add_userInfo} from '../../redux/actions/login.js'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import Check from '../Hoc/check.jsx'

@connect(
  state => ({
    userInfo:state.userInfo,
    isLogin:state.userInfo.isLogin
  }),
  {add_userInfo}
)

@Check

class Login extends Component {
  // onFinish = values => {
  //   axios.post('http://localhost:3000/login',values).then(
  //     response =>{console.log('成功了',response)},
  //     error =>{console.log('出错了',error)}
  //   )
  // };
  // onFinish = async values => await ajax.post('http://localhost:3000/login',values)
  onFinish = async values => {
    let result = await reqLogin(values)
    const {status,data,msg} = result
    if(status === 0){
      message.success('登录成功')
      // this.props.history.replace('/admin')
      this.props.add_userInfo(data)
      console.log(data);
    }else{
      message.error(msg)
    }
  }



  //自定义规则:
    //每次只输入一个错误规则：
  // validate = (_,value='') => {
  //   if(!value.trim()){
  //     return Promise.reject('密码必须输入！')
  //   }
  //   if(value.length < 4){
  //     return Promise.reject('必须大于等于4位！')
  //   }
  //   if(value.length > 13){
  //     return Promise.reject('必须小于等于12位！')
  //   }
  //   if(!(/^\w+$/).test(value)){
  //     return Promise.reject('必须是英文、数字或下划线组成！')
  //   }
  //   else return Promise.resolve()
  // }

  //每次输入多个规则：
  validate = (_,value='') => {
    let errMsg = []
    if(!value.trim()) errMsg.push('密码必须输入！')

    if(value.length < 4) errMsg.push('必须大于等于4位！')

    if(value.length > 13) errMsg.push('必须小于等于12位！')

    if(!(/^\w+$/).test(value)) errMsg.push('必须是英文、数字或下划线组成！')

    if(errMsg.length !== 0) return Promise.reject(errMsg)

    else return Promise.resolve()
  }

  render(){

    if(this.props.isLogin) return <Redirect to="/admin"/>

    return (
      <div className="login">
        <header>
          <img src={logo} alt = "logo"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <span className='title'>用户登录</span>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名!'},
                { max: 12, message: '必须小于等于12位!'},
                { min: 4, message: '必须大于等于4位!'},
                { pattern: /^\w+$/, message: '必须是英文、数字或下划线组成!'}
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              //密码：自定义规则
              rules={[
                {validator:this.validate}
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default Login


// export default connect(
//   state => ({
//     userInfo:state.userInfo,
//     isLogin:state.userInfo.isLogin
//   }),
//   {add_userInfo}
// )(Login)

