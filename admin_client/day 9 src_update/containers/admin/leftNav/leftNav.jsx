import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link , withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {add_title} from '../../../redux/actions/title.js'
import logo from '../../../assets/images/sun.png'
import './css/leftNav.less'
import menuList from '../../../config/menuConfig.js'

const { SubMenu ,Item } = Menu;

@connect(
  state => ({
    title:state.title
  }),
  {add_title}
)
@withRouter

class LeftNav extends Component {

  saveTitle=(title)=>{
    this.props.add_title(title)
  }

  createMenu = (menuList) =>{
    return menuList.map((item)=>{
      if(!item.children){
        return (
          <Item key={item.key} onClick={()=>{this.saveTitle(item.title)}}>
            <Link to={item.path}>
              {<item.icon/>}
              {item.title}
            </Link>
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

  computedTitle=(menuList)=>{
    let {pathname} = this.props.location
    let currentKey = pathname.split('/').slice(-1)[0]
    
    //退出后重新登录，路径会有问题
    if(currentKey === 'admin') currentKey = 'home'
    if(pathname.indexOf('product') !== -1) currentKey = 'product'

    let title = ''

    menuList.forEach((menuObj)=>{
      if(!menuObj.children){
        if(menuObj.key === currentKey){
          title = menuObj.title
          this.props.add_title(title)
        }
      }else{
        this.computedTitle(menuObj.children)
      }
    })
    
  }

  componentDidMount(){
    this.computedTitle(menuList)
  }

  render() {
    let {pathname} = this.props.location
    let nameArr = pathname.split('/')
    let currentName = nameArr.slice(-1)
    
    return (
      <div>
        <div className="navTop">
          <img src={logo} alt = "logo"/>
          <h1>商品管理系统</h1>
        </div>
        <div className="navItem" >

          <Menu
          // defaultSelectedKeys={currentName}
          selectedKeys={currentName}
          defaultOpenKeys={nameArr}
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

export default LeftNav