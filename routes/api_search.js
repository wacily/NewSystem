var express = require('express');
var router = express.Router();
var http = require('http');
var qs = require('querystring');

/* GET home page. */
router.post('/', function(req, res) {
  var Result = {
    status:"0",
    msg:"查询类型不存在或是有误，请查证后再查询。"
  };

  var type = req.body.type;
  var para = req.body.para;
  var typeid = "";
  if(type == "text"){
    typeid = req.body.typeid;
  }

  var host = "api.k780.com";
  var port = 88;
  var appkey = "19721";
  var sign = "4aa3200925ac83f2190a99ccc04a2abf";
  var Secret = "f699d9d61b2204a56dff17d870c16110";

  switch(type){
    case "ip":     //IP地址归属地查询
      var Data = {
        app:'ip.get',
        appkey:appkey,
        sign:sign,
        format:'json'
        ,ip:para
      };

      var strData = JSON.stringify(Data); 

      var option = {
        host:host,
        port:port,
        path:'/',
        method:'POST',
        headers: {  
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };

      // 服务器端发送REST请求  
      var reqPost = http.request(option, function(resPost) {  
          resPost.setEncoding('utf8');
          resPost.on('data', function(getData) {
              getData = JSON.parse(getData);
              Result.status = getData.success;
              if(getData.success == "1"){
                Result.msg = getData.result.ip+":"+getData.result.att;
              }else{
                Result.msg = getData.msg;
              }
              res.json(Result);
          })
      });

      // 发送REST请求时传入JSON数据  
      reqPost.write(strData);  
        
      reqPost.on('error', function(e) {  
          console.log("[onError]:" + e);  
      });

      reqPost.end();

      break;
    case "card":   //身份证号码归属地查询
      var Data = {
        app:'idcard.get',
        appkey:appkey,
        sign:sign,
        format:'json',
        idcard:para
      };

      var strData = qs.stringify(Data); 

      var option = {
        host:host,
        port:port,
        path:'/?'+strData,
        method:'GET'
      };

      // 服务器端发送REST请求  
      var reqGet = http.request(option, function(resGet) {  
          resGet.setEncoding('utf8');
          resGet.on('data', function(getData) { 
              getData = JSON.parse(getData);
              Result.status = getData.success;
              if(getData.success == "1"){
                Result.msg = "<b>号码：</b>"+getData.result.idcard+"，<b>归属地：</b>"+getData.result.att+"，<b>出生日期：</b>"+getData.result.born+"，<b>性别：</b>"+getData.result.sex;
              }else{
                Result.msg = getData.msg;
              }

              res.json(Result);
          });
      });
       
      reqGet.on('error', function(e) {  
          Result.msg = e.message;
          res.json(Result);
      });

      reqGet.end();

      break;
    case "phone":  //手机号码归属地查询

      var Data = {
        app:'phone.get',
        appkey:appkey,
        sign:sign,
        format:'json',
        phone:para
      };

      var strData = qs.stringify(Data); 

      var option = {
        host:host,
        port:port,
        path:'/?'+strData,
        method:'GET'
      };

      // 服务器端发送REST请求  
      var reqGet = http.request(option, function(resGet) {  
          resGet.setEncoding('utf8');
          resGet.on('data', function(getData) { 
              getData = JSON.parse(getData);
              Result.status = getData.success;
              if(getData.success == "1"){
                Result.msg = "<b>手机号码：</b>"+getData.result.phone+"，<b>号码类型：</b>"+getData.result.ctype+"，<b>归属地：</b>"+getData.result.style_simcall;
              }else{
                Result.msg = getData.msg;
              }

              res.json(Result);
          });
      });
       
      reqGet.on('error', function(e) {  
          Result.msg = e.message;
          res.json(Result);
      });

      reqGet.end(); 

      break;
    case "time":   //标准北京时间
      var Data = {
        app:'life.time',
        appkey:appkey,
        sign:sign,
        format:'json'
      };

      var strData = qs.stringify(Data); 

      var option = {
        host:host,
        port:port,
        path:'/?'+strData,
        method:'GET'
      };

      // 服务器端发送REST请求  
      var reqGet = http.request(option, function(resGet) {  
          resGet.setEncoding('utf8');
          resGet.on('data', function(getData) { 
              getData = JSON.parse(getData);
              Result.status = getData.success;
              if(getData.success == "1"){
                Result.msg = "<b>当前的标准北京时间为：</b>"+getData.result.datetime_2+"，<b>星期：</b>"+getData.result.week_2;
              }else{
                Result.msg = getData.msg;
              }

              res.json(Result);
          });
      });
       
      reqGet.on('error', function(e) {  
          Result.msg = e.message;
          res.json(Result);
      });

      reqGet.end(); 
      break;
    case "text":    //发送短信
      var Data = {
        app:'code.hanzi_pinyin',
        typeid:typeid,
        wd:para,
        appkey:appkey,
        sign:sign,
        format:'json'
      };

      var strData = qs.stringify(Data); 

      var option = {
        host:host,
        port:port,
        path:'/?'+strData,
        method:'GET'
      };

      // 服务器端发送REST请求  
      var reqGet = http.request(option, function(resGet) {  
          resGet.setEncoding('utf8');
          resGet.on('data', function(getData) { 
              getData = JSON.parse(getData);
              Result.status = getData.success;
              if(getData.success == "1"){
                Result.msg = getData.result.ret;
              }else{
                Result.msg = getData.msg;
              }

              res.json(Result);
          });
      });
       
      reqGet.on('error', function(e) {  
          Result.msg = e.message;
          res.json(Result);
      });

      reqGet.end(); 
      break;
    default :
      res.json(Result);
      break;
  }

  //res.json(Result);
});

module.exports = router;