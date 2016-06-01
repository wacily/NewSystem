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

var query = function (router,sql,func){

    var connection = mysql.createConnection({    
        host     : '192.168.1.103',
        user     : 'root',
        password : 'password01!',
        port     : '3306',
        database : 'newsys'
    });


    router.get('/', function(req, res) {
      //创建一个connection
        connection.connect(function(err){
            if(err){       
                console.log('[query error] - :'+err);
                return;
            }
        }); 
        //执行SQL语句
        connection.query(sql, func); 
        //关闭connection
        connection.end(function(err){
            if(err){       
                return;
            }
        });
    });
}

module.exports.con = con;
module.exports.query = query;