/**
 * @fileOverview
 * @author ISS
 */
var express = require('express'),
  upload = require('./upload/fileuploads.js'),
  router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'abcd1234',
  port : 3306,
  database : 'test'
});

/**
 * 获取用户列表
 */
router.post('/profile/photo', upload.single('avatar'), function(req, res) {
  var setProfilePhoto = '';
  /*connection.query(setProfilePhoto,function (err, results) {
    if (err){
      console.log(err)
    }else{
      res.send(results);
    }
  });*/
  console.log(req.file);
  res.send(true);
});

module.exports = router;