var express = require('express');
var router = express.Router();
var sql = require('../dal/sql'); 

var connection = sql.con();

/* GET home page. */
sql.query(router,"SELECT 'abc123' FROM userinfo",function(err, rows, fields){
    if (err) { console.log('[query error] - :'+err); return; }

    res.send('indo : ' + rows);
});

module.exports = router;
