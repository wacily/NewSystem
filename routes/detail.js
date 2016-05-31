var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('detail', { title: 'News Detailed' });
});

module.exports = router;