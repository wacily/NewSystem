var express = require('express');
var router = express.Router();
var sql = require('../dal/sql'); 

var connection = sql.con();

/* GET home page. */
router.get('/', function(req, res) {
  //创建一个connection
    connection.connect(function(err){
        if(err){       
            console.log('[connect error]:' + err);
            return;
        }
    }); 
    //执行SQL语句
    connection.query("SELECT * FROM userinfo", function(err, rows, fields) {
        if (err) {
            console.log('[query error]:' + err);
            return;
        }
        res.send('ddghfgg' + rows);
    }); 
    //关闭connection
    connection.end(function(err){
        if(err){  
            console.log('[end error]:' + err);     
            return;
        }
    });
});

module.exports = router;
