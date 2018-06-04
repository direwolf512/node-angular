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

var usernamesSql = 'select * from user';
var loginSql = 'select * from user';

/**
 * 注册
 */
router.post('/register', function(req, res) {
  var user = req.body,
    result = false;
  var registerInsertSql = 'insert into user(username, password) values("' + user.username + '", "'+ user.password +'")';
  connection.query(registerInsertSql, function (err) {
    if (err) {
      result = false;
    } else {
      result = true;
    }
    res.send(result);
  });
});

/**
 * 用户名防重
 */
router.post('/usernames', function(req, res) {
  connection.query(usernamesSql, function (err, results) {
    if (err){
      console.log(err)
    }else{
      var user = req.body,
        _data = {
          "username": user.username
        },
        result = false;
      for (var i = 0; i < results.length; i++) {
        if (results[i].username === _data.username) {
          result = true;
        }
      }
      res.send(result);
    }
  });
});

/**
 * 注册
 */
router.post('/login', function(req, res) {
  connection.query(loginSql, function (err, results) {
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
        if (results[i].username === _data.username) {
          if (results[i].password === _data.password) {
            result = {
              id: results[i].id,
              msg: '登陆成功'
            };
          } else {
            result = {
              id: null,
              msg:'密码有误'
            };
          }
        }
      }
      if (!result) {
        result = {
          id: null,
          msg:'用户名不存在'
        };
      }
      result = JSON.stringify(result);
      res.send(result);
    }
  });
});

module.exports = router;
