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
  //type :"GET": 
    //var arg = url.parse(req.url,true).query;

    var userName = req.session.user;
    //var index = (parseInt(arg.pageIndex) - 1) * 20;

    var Sql = "select nid,date_format(createDate,'%Y-%m-%d') as createDate,count,title,news from newslist where userName=? LIMIT 0,20";
    var Sql2 = "select count(*) as Count from newslist where userName=?";
    var Para = [userName];
    var Result = {
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

        Result.news = rows;

        connection.query(Sql2,Para,function(err,rows,fields){
            if(err){
                console.log('[get count error]' + err);
                return;
            }
            Result.total = rows[0].Count

            console.log(req.session.user);
            console.log(Result);

            res.render('Manage/index', { title: 'Manager Index',data:Result });
        })        
    });  
});

module.exports = router;