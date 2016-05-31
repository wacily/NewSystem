var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('Manage/edit', { title: 'User Register' });
});

module.exports = router;