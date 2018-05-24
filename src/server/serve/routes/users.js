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

sql = 'select * from user';

connection.query(sql,function (err, results) {
  if (err){
    console.log(err)
  }else{
    router.get('/', function(req, res) {
      res.send(results);
    });
  }
});

module.exports = router;