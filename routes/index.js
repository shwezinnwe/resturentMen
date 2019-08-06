var express = require('express');
var router = express.Router();
var Admin = require('../model/Admin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req,res,next){
  res.render('register');
});

router.post('/register', function(req,res,next){
  var admin = new Admin();
  admin.name = req.body.name;
  admin.email = req.body.email;
  admin.password = req.body.password;
  admin.save(function(err,rtn){
    if(err) throw err;
    res.redirect('/')
  })
})

module.exports = router;
