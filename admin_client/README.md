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










