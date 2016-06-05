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

/* POST home page. */
router.get('/', function(req, res) {
    //type :"POST": 
    var arg = url.parse(req.url,true).query;

    var userName = req.session.user;
    var nid = arg.nid;

    var Sql = "select nid,createDate,count,title,news from newslist where nid=? and userName=?";
    var Para = [nid,userName];
    var Result = {
        status:0,
        msg:'get date failed',
        news:[]
    }
    //执行SQL语句
    connection.query(Sql, Para, function(err, rows, fields) {
        if (err) {
            console.log('[query error]:' + err);
            return;
        }

        var num = rows.length;

        if(num == 1){
            Result.status = 1;
            Result.msg = 'success';
            Result.news = rows;
        }
        res.json(Result);
    }); 
    //关闭connection
    // connection.end();
});

module.exports = router;
