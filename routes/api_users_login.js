var express = require('express');
var router = express.Router();
var url = require('url');
var sql = require('../dal/sql'); 

var connection = null;

if(connection == null){
    connection = sql.con();
    connection.connect(function(err){
        if(err){       
            console.log('[connect error]:' + err);
            return;
        }
    }); 
}

/* GET home page. */
router.get('/', function(req, res) {
    //type : "GET":
    var arg = url.parse(req.url,true).query;
    var userName = arg.name;
    var userPwd = arg.pwd;

    var Sql = "SELECT count(*) as num FROM userinfo where userName=? and userPwd=?";
    var Para = [userName,userPwd];
    var Result = {
        status:1,
        msg:'success'
    };
    //执行SQL语句
    connection.query(Sql, Para, function(err, rows, fields) {
        if (err) {
            console.log('[query error]:' + err);
            return;
        }
        var num = rows[0].num;

        if(num != 1){
            Result.status = 0;
            Result.msg = 'login failed';
        }
        res.json(Result);
    }); 
    //关闭connection
    // connection.end();
});

/* POST home page. */
router.post('/', function(req, res) {
    //type :"POST": 
    var userName = req.body.name;
    var userPwd = req.body.pwd;

    var Sql = "SELECT count(*) as num FROM userinfo where userName=? and userPwd=?";
    var Para = [userName,userPwd];
    var Result = {
        status:1,
        msg:'success'
    }
    //执行SQL语句
    connection.query(Sql, Para, function(err, rows, fields) {
        if (err) {
            console.log('[query error]:' + err);
            return;
        }
        var num = rows[0].num;

        if(num != 1){
            Result.status = 0;
            Result.msg = 'login failed';
        }
        res.json(Result);
    }); 
    //关闭connection
    // connection.end();
});

module.exports = router;
