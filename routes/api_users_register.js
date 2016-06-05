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
    var userName = req.body.userName;
    var userPwd = req.body.userPwd;
    var nickName = req.body.nickName;
    var age = req.body.age;
    var sex = req.body.userSex;
    var phone = req.body.phone;
    var mail = req.body.email;
    var now = new Date();
    var ct = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();

    var Sql = "insert into userinfo(userName,userPwd,nickName,age,sex,phone,mail,CreateTime) values(?,?,?,?,?,?,?,?)";
    var Para = [userName,userPwd,nickName,age,sex,phone,mail,ct];
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
            Result.msg = 'Register user failed';
        }
        res.json(Result);
    }); 
    //关闭connection
    // connection.end();
});

module.exports = router;
