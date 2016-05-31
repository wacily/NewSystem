var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('Manage/register', { title: 'User Register' });
});

module.exports = router;