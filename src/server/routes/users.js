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


router.get('/', function(req, res) {
  connection.query(usersSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      res.send(results);
    }
  });
});

router.get('/*', function(req, res) {
  var id = req.url.split('/')[1].split('?')[0];
  var userSql = 'select * from user where id= "' + id + '"';
  connection.query(userSql,function (err, results) {
    if (err){
      console.log(err)
    }else{
      var result = results[0];
      result.password = null;
      res.send(result);
    }
  });
});

module.exports = router;