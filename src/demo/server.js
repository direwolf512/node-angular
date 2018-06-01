/**
 * @fileOverview
 * @author ISS
 */

var express = require('express');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'abcd1234',
  port : 3306,
  database : 'test'
});

sql = 'select * from user';

var arr = [];
connection.query(sql,function (err, results) {
  if (err){
    console.log(err)
  }else{
    console.log(results);
    for(var i = 0;i < results.length;i++){
      arr[i] = results[i].username;
    }

    app.get('/',function (req, res) {
      res.send(arr);  //这里必须用res.send,因为有数据返回到客户端
    });

    app.get('/articles/hot',function (req, res) {
      res.send(arr);  //这里必须用res.send,因为有数据返回到客户端
    });
  }
});

app.listen(8700);