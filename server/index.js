var express = require('express');
var proxy=require('http-proxy-middleware')
var history=require('connect-history-api-fallback')
var app = express();

app.use('/static', express.static('static'));
app.use(history)

app.get('/', function (req, res) {
  res.sendFile(__dirname + "../dist/" + "index.html");
})

// 加载代理中间件
app.use(proxy('/api',{
  target: 'http://192.168.3.183:8080/',  //目标接口域名
  changeOrigin: true,  //是否跨域
  pathRewrite: {
      '^/api': '/api'   //重写接口,
  }
}))

app.use(proxy('/uploads',{
  target: 'http://192.168.3.183:8080/',  //目标接口域名
  changeOrigin: true,  //是否跨域
  pathRewrite: {
      '^/uploads': '/uploads'   //重写接口,
  }
}))

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})