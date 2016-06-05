var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var ueditor=require('ueditor');
var redis = require('connect-redis')(session);

var routes = require('./routes/index');
var users = require('./routes/users');
var detail = require('./routes/detail');
var mag_login = require('./routes/login');  //user login page
var mag_index = require('./routes/mag_index');  //manage index page
var mag_register = require('./routes/mag_register');
var mag_edit = require('./routes/mag_edit');
var mag_setting = require('./routes/mag_setting');
var mag_search = require('./routes/mag_search');
var api_users_login = require('./routes/api_users_login');
var api_users_register = require('./routes/api_users_register');
var api_news_add = require('./routes/api_news_add');
var api_news_del = require('./routes/api_news_del');
var api_news_get = require('./routes/api_news_get');
var api_news_list = require('./routes/api_news_list');
var api_search = require('./routes/api_search');
 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('keyboard cat'));
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:3600000},
    store: new redis({
        host: "127.0.0.1",
        port: 6379,
        ttl: 3600000 // 过期时间
    }),
    secret: 'keyboard cat'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);
app.use('/users',users);
app.use('/detail',detail);
app.use('/manage/login', mag_login);
app.use('/manage/index',mag_index);
app.use('/manage/register',mag_register);
app.use('/manage/edit',mag_edit);
app.use('/manage/setting',mag_setting);
app.use('/manage/search',mag_search);
app.use('/lib/ueditor/ue', ueditor(path.join(__dirname, 'public'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if(req.query.action === 'uploadimage'){
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/lib/ueditor/image';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage'){
        var dir_url = '/lib/ueditor/image';
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/lib/ueditor/config.json')
    }}));
app.use('/api/users/login',api_users_login);
app.use('/api/users/register',api_users_register);
app.use('/api/news/add',api_news_add);
app.use('/api/news/del',api_news_del);
app.use('/api/news/get',api_news_get);
app.use('/api/news/list',api_news_list);
app.use('/api/search',api_search);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000);

module.exports = app;
