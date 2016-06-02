var mysql  = require('mysql');  //调用MySQL模块
 
 var con = function(){
    //创建一个connection
    var connection = mysql.createConnection({    
        host     : '192.168.1.103',
        user     : 'root',
        password : 'password01!',
        port     : '3306',
        database : 'newsys'
    });

    return connection;
}

module.exports.con = con;