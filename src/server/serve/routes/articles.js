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

router.get('/', function(req, res) {
  console.log(req.body);
  connection.query(articlesSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      res.send(results);
    }
  });
});

router.get('/*', function(req, res) {
  var id = req.url.split('/')[1].split('?')[0];
  searchArticleSql = 'select * from articles where id= "' + id + '"';
  connection.query(searchArticleSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      var result = results[0],
        userid = result.authorId;
      usersSql = 'select * from user where id= "' + userid + '"';
      connection.query(usersSql,function (err, results) {
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