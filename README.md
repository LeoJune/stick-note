# stick-note
基于express,node.js开发的在线便利贴，可用github账号登陆 

[线上地址](http://www.leojune.xyz)

# 当然，你也可以clone到本地使用，在线上出问题的时候
```
#clone到你本地
$ git clone git@github.com:LeoJune/stick-note.git

#进入到项目目录中，并安装依赖
$ cd stick-note
$ npm install

#启动本地服务器，运行起来，并打开浏览器 http://localhost:3000
npm run start
```
# 用到的技术
前端：
- html,css3,less,js,jquery
- js组件化
- webpack

后端：
- express＋ejs模板
- sequelize + sqlite3数据库
- oauth认证,passport,passport-github
- pm2 
