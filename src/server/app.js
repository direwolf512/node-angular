/**
 * @fileOverview
 * @author ISS
 */

var http = require('http');
var querystring=require('querystring');

var server = http.createServer(function (req, res) {
  data = {
    "id": 1,
    "name": "direwolf",
    "password": "1234"
  };
  var postData = JSON.stringify(data);
  res.setHeader('Content-Length', postData.length);
  res.setHeader('Content-Type', 'application/json;charset=utf-8'); //浏览器以什么格式解析
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.url.indexOf('/articles') > -1) {
    res.write(postData);
  }
  res.end();
});

server.listen(8800);