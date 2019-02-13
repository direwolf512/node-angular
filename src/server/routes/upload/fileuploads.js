/**
 * @fileOverview
 * @author ISS
 */
var multer = require('multer');
var md5 = require('md5');
var config = require('./config');

var storage = multer.diskStorage({
  destination: config.upload.path,
  filename: function (req, file, cb) {
    var fileFormat =(file.originalname).split(".");
    cb(null, file.fieldname + '-' + md5(file) + "." + fileFormat[fileFormat.length - 1]);
  }
});

//添加配置文件到muler对象。
var upload = multer({
  storage: storage
  //其他设置请参考multer的limits
  //limits:{}
});
//导出对象
module.exports = upload;