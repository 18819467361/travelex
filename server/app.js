var express = require('express');
//解析前端post过来的数据
var bodyParser = require('body-parser')
// var path = require('path');
var app = express();
var util = require('./util/util')
const env = process.env.NODE_ENV;
app.use(bodyParser.urlencoded({extended: false}))

app.all("*", (req, res, next) => {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
//统一设置跨域资源共享的响应报文头解决所有的请求都可以跨域，配置客户端
    res.setHeader('Access-Control-Allow-Origin', "*");
// 表示任何客户端的跨域请求
    res.setHeader('Access-Control-Allow-Headers', "X-Requested-With, accept,OPTIONS, content-type");
// 表示任何请求方法都可以跨域
    res.setHeader('Access-Control-Allow-Methods', "*");
    res.setHeader('Cache-Control', 0);
// true:值表示允许客户端在进行请求的时候可以带cookie到服务器 ，false：表示要不允许带cookie
// 配合axios的 axios.defaults.withCredentials = true 来使用
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// 导入路由规则对象
// var userRouter = require('./router/user.js');
// app.use('/user',userRouter);
//
app.get('/data', function (req, res) {
    console.log('数据data')
    res.json({code: 0, data: ['这是数据接口！']});
})
app.post('/postFrom', function (req, res) {
    //数据写到文本
    util.writeToText(req.body);
    res.json({code: 200, data: '保存成功！'});
})

app.listen(8868, function () {
    console.log('Node app start at port 8868');
    console.log(env);
})



