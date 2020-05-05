# 项目描述
- 此项目为一个前后台分离的后台管理的SPA应用, 包括前端PC应用和后端应用
- 包括用户管理 / 商品分类管理 / 商品管理 / 权限管理等功能模块
- 前端: 使用React全家桶/技术栈 + Antd + Axios + ES6+ + Webpack等技术
- 后端: 使用Node + Express + Mongodb等技术
- 采用模块化、组件化、工程化的模式开发

# 项目搭建步骤

## 使用脚手架
```
  npm install -g create-react-app
  create-react-app admin-client
  cd admin-client
  yarn start

  npm run build  // 打包
  npm install -g serve  // 安装静态资源
  serve build  // 运行打包后的项目
```

## 引入antd
具体配置请参考官方文档：https://ant.design/docs/react/use-with-create-react-app-cn

【注意点：】
在进行自定义主题时，要安装less-loader@5，并且移除 lessOptions 这一级，直接配置选项

`$ yarn add less less-loader@5`

```js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
);

```
## 引入路由
`yarn add react-router-dom`

1、在 pages 下创建 admin 、login 
2、给入口文件 index.js 中的 < App/> 包裹 **< BrowserRouter>** 
3、在 App.js 中映射路由
```js
  <Switch>
    <Route path='/login' component={Login}/>
    <Route path='/admin' component={Admin}/>
    <Redirect to='/login'/>
  </Switch>
```
## Login 组件

1、重置样式reset.css文件，可使用 github 上的 **minireset** 

2、react中使用img引入图片时候，要用import
```js
import logo from './images/sun.png'
<img src={logo} alt = "logo"/>
```
3、引入 antd 中的 Form 组件进行表单验证

非自定义验证方式：
```js
rules={[
        { required: true, message: '请输入用户名!'},
        { max: 12, message: '必须小于等于12位!'},
        { min: 4, message: '必须大于等于4位!'},
        { pattern: /^\w+$/, message: '必须是英文、数字或下划线组成!'}
      ]}
```

自定义验证方式（一）：
```js
rules={[
        {validator:this.validate}
      ]}
-------------------------------------
// 每次只输入一个错误规则：
  validate = (_,value='') => {  //给value 一个默认空串，否则是undefined ,会报错
    if(!value.trim()){
      return Promise.reject('密码必须输入！')
    }
    if(value.length < 4){
      return Promise.reject('必须大于等于4位！')
    }
    if(value.length > 13){
      return Promise.reject('必须小于等于12位！')
    }
    if(!(/^\w+$/).test(value)){
      return Promise.reject('必须是英文、数字或下划线组成！')
    }
    else return Promise.resolve()
  }

```

自定义验证方式（二）：
```js
rules={[
        {validator:this.validate}
      ]}
-------------------------------------
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
```

## 封装 ajax 请求

`yarn add axios`

1、配置代理(服务器的端口是4000，本地的是3000)

在 package.json 文件中：
```js
"proxy": "http://localhost:4000" //将所有发送给3000的请求都发送给了4000
```
所以在发送 axios 请求时，不能向 4000 直接发请求了，要发送给 3000：
```js
onFinish = values => {
  axios.post('http://localhost:3000/login',values).then(
    response =>{console.log('成功了',response)},
    error =>{console.log('出错了',error)}
  )
};

```

2、post 请求体的3种格式

使用 axios 不用单独设置请求头，底层自动更改了请求头。

第一种：json

Content-Type: application/json
```js
import axios from 'axios'

let data = {"username":"admin","password":"admin"};
axios.post('http://localhost:3000/login',data)
.then(res=>{
    console.log('成功',res);            
})
```

第二种：urlencoded

Content-Type: application/x-www-form-urlencoded
```js
import axios from 'axios'
import qs from 'querystring'

let data = {"username":"admin","password":"admin"};
axios.post('http://localhost:3000/login',qs.stringify(
    data
)).then(res=>{
    console.log('成功',res);            
})
```

第三种：form

Content-Type: multipart/form-data

```js
import axios from 'axios'

let data = new FormData();
data.append('username','admin');
data.append('password','admin');
axios.post('http://localhost:3000/login',data)
.then(res=>{
    console.log('成功',res);            
})
```

3、二次封装 axios ：
- 配置请求的基础路径
- 配置超时时间
- 统一处理post请求json编码问题（转为urlencoded）
- 统一返回真正的数据data，而不是response对象
- 统一处理错误
- 进度条

## Login 组件

1.登录结果的提示+进度条

2.若登录成功，跳转到：/admin

```js
this.props.history.replace('/admin')
```

3.搭建项目的redux环境

4.登录成功后，保存用户信息到redux

```js
this.props.add_userInfo(data)
```

5.Admin组件读取用户名展示

```js
{this.props.username}

state => ({
    username:state.userInfo.user.username
  })
```
6.处理刷新页面redux信息丢失的问题——localStorage

```js
  actions:

  export const add_userInfo = userObj => {
  const {user,token} = userObj
  localStorage.setItem('user',JSON.stringify(user))
  localStorage.setItem('token',token)
  return {type : ADD_USERINFO , data : userObj}

  export const delete_userInfo = () =>{
  localStorage.clear()
  return {type : DELETE_USERINFO}
}
}
```
```js
reducers:

let _user;

try {
  _user = JSON.parse(localStorage.getItem('user'))
} catch (error) {
  _user = null
}

let _token = localStorage.getItem('token')

let initState = {
  user: _user || {} , 
  token: _token || '',
  isLogin : _user && _token ? true :false
}
```
7.给Login组件和Admin组件增加权限的校验

传递一个标识符：isLogin（当token 和 user 同时都有值的时候才算登录）

Login组件:如果已经登录，就直接跳转到 admin 组件中，并且停止渲染（render）整个login组件

```js
  render(){
    if(this.props.isLogin) return <Redirect to="/admin"/>
    return (
      ... ...
    )
  }
---------------------------------------------------------------
  state => ({
    username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  })

```
Admin组件:如果没有登录，就直接跳转到 login 组件中，并且停止渲染（render）整个 admin 组件

```js
  render(){
    if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      ... ...
    )
  }
  ---------------------------------------------------------------
  state => ({
    username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  })

```

8.Header组件-静态

9.Header组件-全屏，使用screenfull.js

`yarn add screenfull`

`import screenfull from 'screenfull'`

设置是否全屏 的state ———— 设置点击toggle事件 ———— 在生命周期componentDidMount中检测屏幕的变化，通过screenfull.onchange事件来设置setState全屏的状态

10.Header组件-退出登录

```js
this.props.delete_userInfo()
```

## 装饰器语法来定义容器组件

```js
@connect(
  state => ({}),
  {}
)

class Header extends Component {}

export default Header

```
## 使用高阶组件模仿路由守卫来定义页面访问的权限

```js
export default function (ReceiveComponent){
  @connect(
    state => ({
      isLogin:state.userInfo.isLogin
    })
  )

  class TargetComponent extends Component {
    render() {
      const {isLogin} = this.props
      const {pathname} = this.props.location
      if(!isLogin && pathname !== '/login') return <Redirect to="/login"/>
      if(isLogin && pathname === '/login') return <Redirect to="/admin"/>

      return <ReceiveComponent {...this.props}/>
    }
  }

  return TargetComponent
}
```
```js

@connect(
  state => ({}),
  {}
)

@Check

class Header extends Component {}

export default Header

```
## Header 组件

### 动态生成日期

`yarn add dayjs`

`import dayjs from 'dayjs'`

设置 时间 的state ———— 在生命周期componentDidMount中设置定时器每秒更改setState一下时间 ———— 在生命周期componentWillUnmount中清除定时器

### 动态生成天气
`yarn add jsonp` 利用 jsonp 来解决跨域问题

## LeftNav 组件

`npm view antd version` 产看所有版本

`yarn remove antd` 移除

利用 递归 动态生成导航

## 二级路由








