import React, { Component } from 'react'
import logo from './images/sun.png'
import './css/login.less'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class login extends Component {

  onFinish = values => {
    console.log('Received values of form: ', values);
  };

  render(){
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
                { max: 12, message: '必须小于等于12位'},
                { min: 4, message: '必须大于等于4位'},
                { pattern: /^\w+$/, message: '必须是英文、数字或下划线组成'}
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入用户名!'},
                { max: 12, message: '必须小于等于12位'},
                { min: 4, message: '必须大于等于4位'},
                { pattern: /^\w+$/, message: '必须是英文、数字或下划线组成'}
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
