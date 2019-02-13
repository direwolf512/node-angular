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


/**
 * 获取全部文章列表
 */
router.get('/', function(req, res) {
  var articlesSql = 'select * from articles';
  connection.query(articlesSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      var len = results.length;
      for (var i = 0; i < len; i++) {
        results[i].author = {
          id: results[i].authorId,
          name: results[i].authorName
        };
      }
      for (var j = 0; j < len; j++) {
        delete results[j].authorId;
        delete results[j].authorName;
      }
      res.send(results);
    }
  });
});

/**
 * 获取热门文章列表（按阅读量排序）
 */
router.get('/hot', function(req, res) {
  var hotArticlesSql = 'select * from articles order by readQuantity DESC;';
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
  var _data = req.body,
    nowTime = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay(),
    userSql = 'select * from user where id= "' + _data.authorId + '"';
  connection.query(userSql, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      var user = results[0];
      var addArticlesSql = 'insert into articles(title, link, summary, img, createdAt, updatedAt, readQuantity, authorId, authorName) values("'+ _data.title +'", "'+ _data.link +'", "'+ _data.summary +'", "'+ _data.img +'", "'+ nowTime +'", "'+ nowTime +'", "0", "'+ _data.authorId +'", "' + user.username + '")';
      connection.query(addArticlesSql, function (err) {
        if (err) {
          console.log(err);
        } else {
          res.send(true);
        }
      });
    }
  });
});

/**
 * 增加文章阅读量
 */
router.post('/readQuantity', function (req, res) {
  var id = req.body.id,
    searchArticleSql = 'select * from articles where id= "' + id + '"';
  connection.query(searchArticleSql,function (err, results) {
    if (err) {
      console.log(err)
    } else {
      var result = results[0],
        readQuantity = result.readQuantity + 1;
      var updateArticle = 'update articles set readQuantity="' + readQuantity + '"where id="' + id + '";';
      connection.query(updateArticle, function (err) {
        if (err) {
          console.log(err)
        }
        res.send(result);
      });
    }
  })
});

/**
 * 編輯文章
 */
router.post('/*', function (req, res) {
  var id = req.url.split('/')[1].split('?')[0];
  var _data = req.body,
    nowTime = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay();
  var editArticleSql = 'update articles set title="'+ _data.title +'", link="'+ _data.link +'", summary="'+ _data.summary +'", img="'+ _data.img +'", createdAt="'+ _data.createdAt.slice(0,10) +'", updatedAt="'+ nowTime +'", readQuantity="'+ _data.readQuantity +'" where id="' + id + '";';
  connection.query(editArticleSql, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send(true);
    }
  });
});

/**
 * 获取用户全部文章列表
 */
router.get('/user/*', function(req, res) {
  var authorId = req.url.split('/')[2].split('?')[0];
  var searchUserArticlesSql = 'select * from articles where authorId= "' + authorId + '"';
  connection.query(searchUserArticlesSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      res.send(results);
    }
  });
});

/**
 * 获取文章内容
 */
router.get('/*', function(req, res) {
  var id = req.url.split('/')[1].split('?')[0];
  var searchArticleSql = 'select * from articles where id= "' + id + '"';
  connection.query(searchArticleSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      var result = results[0],
        userid = results[0].authorId;
      var searchUserSql = 'select * from user where id= "' + userid + '"';
      connection.query(searchUserSql,function (err, results) {
        if (err) {
          console.log(err)
        } else {
          result.user = {
            id:userid,
            name: results[0].username
          };
          delete result.authorId;
          delete result.authorName;
        }
        res.send(result);
      });
    }
  });
});

module.exports = router;