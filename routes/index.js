var express = require('express');
var router = express.Router();

/* GET listing. */
router.get('/', function(req, res, next) {
  res.json({message: 'Email Micro-Service is operational.'});
});

module.exports = router;
