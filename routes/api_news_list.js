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
    var index = (parseInt(arg.pageIndex) - 1) * 20;

    var Sql = "select nid,createDate,count,title,news from newslist where userName=? LIMIT "+index+",20";
    var Sql2 = "select count(*) as Count from newslist where userName=?";
    var Para = [userName];
    var Result = {
        status:0,
        msg:'get date failed',
        total:0,
        pageIndex:1,
        news:[]
    }
    //执行SQL语句
    connection.query(Sql, Para, function(err, rows, fields) {
        if (err) {
            console.log('[query error]:' + err);
            return;
        }
        
        Result.status = 1;
        Result.msg = 'success';
        Result.pageIndex = index;
        Result.news = rows;

        connection.query(Sql2,Para,function(err,rows,fields){
            if(err){
                console.log('[get count error]' + err);
                return;
            }
            Result.total = rows.Count
        })

        res.json(Result);
    }); 
    //关闭connection
    // connection.end();
});

module.exports = router;
