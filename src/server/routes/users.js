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

var usersSql = 'select * from user';

/**
 * 获取用户列表
 */
router.get('/', function(req, res) {
  connection.query(usersSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      res.send(results);
    }
  });
});

/**
 * 获取用户信息
 */
router.get('/*', function(req, res) {
  var id = req.url.split('/')[1].split('?')[0];
  var userSql = 'select * from user where id= "' + id + '"',
    searchUserArticlesSql = 'select * from articles where authorId= "' + id + '"';
  connection.query(userSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      var result = results[0];
      result.password = null;
      connection.query(searchUserArticlesSql,function (err, results) {
        if (err){
          console.log(err)
        }else{
          result.articleNum = results.length;
          res.send(result);
        }
      });
    }
  });
});

module.exports = router;