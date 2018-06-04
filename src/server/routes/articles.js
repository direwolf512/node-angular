/**
 * @fileOverview
 * @author ISS
 */
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

articlesSql = 'select * from articles';
hotArticlesSql = 'select * from articles order by readQuantity DESC;';

/**
 * 获取全部文章列表
 */
router.get('/', function(req, res) {
  connection.query(articlesSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      res.send(results);
    }
  });
});

/**
 * 获取热门文章列表（按阅读量排序）
 */
router.get('/hot', function(req, res) {
  connection.query(hotArticlesSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      var result = results.length > 3 ? results.slice(0, 3) : results;
      res.send(result);
    }
  });
});

/**
 * 添加文章
 */
router.post('/', function (req, res) {
  console.log(req.body);
  var _data = req.body,
    nowTime = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay();
  var hotArticlesSql = 'insert into articles(title, link, summary, img, createdAt, updatedAt, readQuantity, authorId) values("'+ _data.title +'", "'+ _data.link +'", "'+ _data.summary +'", "'+ _data.img +'", "'+ nowTime +'", "'+ nowTime +'", "0", "'+ _data.authorId +'")';
  connection.query(hotArticlesSql, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send(true);
    }
  });
});

/**
 * 获取文章内容
 */
router.get('/*', function(req, res) {
  var id = req.url.split('/')[1].split('?')[0];
  searchArticleSql = 'select * from articles where id= "' + id + '"';
  connection.query(searchArticleSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      var result = results[0],
        userid = result.authorId;
      searchUserSql = 'select * from user where id= "' + userid + '"';
      connection.query(searchUserSql,function (err, results) {
        if (err) {
          console.log(err)
        } else {
          result.authorName = results[0].username;
        }
        res.send(result);
      });
    }
  });
});

module.exports = router;