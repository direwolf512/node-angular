# 一个练手的小demo
**说明**

1 该项目前端主要使用AngularJS，后端主要使用Express;

2 项目构建使用gulp,实现：
- 项目初始化
	- 浏览器自动刷新
	- css预编译
	- 自动引入bower资源
- jsdoc文档

### 1 软件安装
- 安装 Node.js
- 安装 gulp + bower
- 安装 MySQL

### 2 安装依赖  gulp + bower
    tnpm install
	bower install

### 3 数据库准备
- 创建名为 `test` 的数据库
- 建立两张表：`user` + `articles`
    user: id + username + password
    articles: id + title + link + summary + img + createAt + updatedAt + readQuantity + authorId + authorName

### 4 启动
- 前端：gulp serve-dev (在主目录下)
- 后端：node ./bin/www (在.\src\server目录下)