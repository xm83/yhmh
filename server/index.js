var express = require('express');
var router = express.Router();
var models = require('./models');
var User = models.User;


router.get('/', function(req, res){
    res.status(200).json({"success": true})
  })

module.exports = router;
