## 项目文件说明
- admin_client 文件夹，是前端项目
- admin_server 文件夹，是服务器
- _db_source 文件夹，是需要导入数据库的数据

## 运行项目步骤
- 安装mongoDB数据库
- 配置环境变量
- 安装数据库管理软件(studio-3t)
- 导入数据库需要的数据：
  - 在 studio-3t 中 New Connection , 关闭 studio-3t 
  - 进入 admin_server 文件夹，`yarn start` 启动服务器（不要关闭服务器的cmd）
  - 打开 studio-3t 连接数据库，找到 admin_db，鼠标右键，选择 import ......（需要导入数据库的数据在_db_source文件夹中 ，这些数据是JSON格式的数据） 
  - 数据导入成功后，进入 admin_db,会出现 categorys 、 products 、users
- 数据导入成功后，就可以运行前端应用

## 运行已经写好的项目：
- 服务器准备好---进入 admin_server 文件夹，`yarn start`启动服务器
- 开启前端应用---进入 admin_client 文件夹，`yarn start`启动服项目