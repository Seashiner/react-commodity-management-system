import React, { Component } from 'react'
import { Menu } from 'antd';
import logo from '../../../assets/images/sun.png'
import './css/leftNav.less'
import menuList from '../../../config/menuConfig.js'

const { SubMenu ,Item } = Menu;

export default class LeftNav extends Component {

  createMenu = (menuList) =>{
    return menuList.map((item)=>{
      if(!item.children){
        return (
          <Item key={item.key} icon={<item.icon/>}>
              {item.title}
          </Item>
        )
      }else{
        return (
          <SubMenu key={item.key} icon={<item.icon/>} title={item.title}>
            {this.createMenu(item.children)}
          </SubMenu>
        )  
      }
      
    })
  }


  render() {
    return (
      <div>
        <div className="navTop">
          <img src={logo} alt = "logo"/>
          <h1>商品管理系统</h1>
        </div>
        <div className="navItem" >

          <Menu
          defaultSelectedKeys={['home']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          {
            this.createMenu(menuList)
          }
        </Menu>
        </div>
      </div>
    )
  }
}
