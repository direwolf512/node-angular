var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'w1992j5y12',
	database: 'test',
	port: '3306'
});

connection.connect(function (err) {
	if (err) {
		console.log('[log] - ' + err);
		return;
	} else {
		console.log('[connection connect] success!');
	}
});

var userInsertSql = 'insert into user(username, password) values("user1", "123456")';
connection.query(userInsertSql, function (err, results) {
	if (err) {
		console.log('insert err: ' + err);
		return;
	}
	console.log('insert success');
});

var userSelectSql = 'select * from user';
connection.query(userSelectSql, function (err, results) {
	if (err) {
		console.log('select err: ' + err);
		return;
	}
	for (var i = 0; i < results.length; i++) {
		console.log(results[i].username);
	}
});

connection.end(function (err) {
	if (err) {
		console.log(err.toString());
		return;
	} else {
		console.log('[connection end] success!')
	}
});