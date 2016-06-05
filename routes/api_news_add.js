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
router.post('/', function(req, res) {
    //type :"POST": 
    var userName = req.session.user;
    var title = req.body.title;
    var content = req.body.content;
    var now = new Date();
    var ct = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();

    var Sql = "insert into newslist(userName,createDate,count,title,news) values(?,?,?,?,?)";
    var Para = [userName,ct,1,title,content];
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

        var num = rows.affectedRows;

        if(num != 1){
            Result.status = 0;
            Result.msg = 'Add news failed';
        }
        res.json(Result);
    }); 
    //关闭connection
    // connection.end();
});

module.exports = router;
