var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'abcd1234',
  port : 3306,
  database : 'test'
});

registerSql = 'select * from user';
loginSql = 'select * from user';

/**
 * 注册
 */
connection.query(registerSql,function (err, results) {
  if (err){
    console.log(err)
  }else{
    router.post('/register', function(req, res) {
      res.header('Access-Control-Allow-Origin', '*');
      res.send(results);
    });
  }
});

router
  .get('/login', function (req, res) {
    connection.query(loginSql,function (err, results) {
      if (err){
        console.log(err)
      }else{
        res.send(results);
      }
    });
  })
  .post('/login', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8580/');
    console.log(22222);
    connection.query(loginSql,function (err, results) {
      if (err){
        console.log(err)
      }else{
        var user = req.body,
          _data = {
            "username": user.username,
            "password": user.password
          },
          result = false;
        for (var i = 0; i < results.length; i++) {
          if (results[i].username === _data.username && results[i].password === _data.password) {
            result = true;
          }
        }
        res.send('1111111');
      }
    });
  });

/**
 * 登录
 */
/*connection.query(loginSql,function (err, results) {
  if (err){
    console.log(err)
  }else{
    router
      .get('/login', function (req, res) {
        res.render('index', { title: '注册' });
        console.log(1111)
      })
      .post('/login', function(req, res) {
        console.log(22222);
      var user = req.body,
        _data = {
          "username": user.username,
          "password": user.password
        },
        result = false;
      for (var i = 0; i < results.length; i++) {
        if (results[i].username === _data.username && results[i].password === _data.password) {
          result = true;
        }
      }
      res.send(result);
    });
  }
});*/

module.exports = router;
