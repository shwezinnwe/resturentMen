var express = require('express');
var router = express.Router();
var Staff = require('../model/Staff');

router.get('/login', function(req, res, next) {
    res.render('kitchen/login', { title: 'Express' });
  });
  
  router.get('/home', function(req,res,next){
      res.render('kitchen/home')
  });
  
  router.post('/login', function(req,res,next){
    Staff.findOne({$and:[{email:req.body.email},{position:"Kitchen"}]},(err,staff)=>{
      if(err) throw err;
      if(staff != null && Staff.compare(req.body.password,staff.password)){
        res.redirect('/kitchens/home')
      }else{
        res.redirect('/kitchens/login')
      }
    })
  });

module.exports = router;