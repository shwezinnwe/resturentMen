var express = require('express');
var router = express.Router();
var Admin = require('../model/Admin');
var Staff = require('../model/Staff');

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

router.get('/alogin', function(req, res, next) {
  res.render('admin/login', { title: 'Express' });
});

router.post('/alogin',function(req,res,next){
  Admin.findOne({email:req.body.email},function(err,rtn){
    if(rtn != null && Admin.compare(req.body.password,rtn.password)){
      req.session.users = {email: rtn.email, name: rtn.name, roll: "admin"};
      res.redirect('/admins/home');
    }else{
      res.redirect('/alogin');
    }
  });
});

router.get('/clogin', function(req, res, next) {
    res.render('cashier/login', { title: 'Express' });
  });

  router.post('/clogin', function(req,res,next){
    Staff.findOne({$and:[{email:req.body.email},{position:"Cashier"}]},(err,rtn)=>{
      if(err) throw err;
      if(rtn != null && Staff.compare(req.body.password,rtn.password)){
        req.session.users = {email: rtn.email, name: rtn.name, roll: "cashier"};
        res.redirect('/cashiers/home')
      }else{
        res.redirect('/clogin')
      }
    })
  });

  router.get('/klogin', function(req, res, next) {
      res.render('kitchen/login', { title: 'Express' });
    });

    router.post('/klogin', function(req,res,next){
      Staff.findOne({$and:[{email:req.body.email},{position:"Kitchen"}]},(err,rtn)=>{
        if(err) throw err;
        if(rtn != null && Staff.compare(req.body.password,rtn.password)){
          req.session.users = {email: rtn.email, name: rtn.name, roll: "staff"};
          res.redirect('/kitchens/home')
        }else{
          res.redirect('/klogin')
        }
      })
    });

  router.get('/wlogin', function(req, res, next) {
      res.render('waiter/login', { title: 'Express' });
    });

    router.post('/wlogin', function(req,res,next){
      Staff.findOne({$and:[{email:req.body.email},{position:"Waiter"}]},(err,rtn)=>{
        if(err) throw err;
        if(rtn != null && Staff.compare(req.body.password,rtn.password)){
          req.session.users = {email: rtn.email, name: rtn.name, roll: "waiter"};
          res.redirect('/waiters/home')
        }else{
          res.redirect('/wlogin')
        }
      })
    });

    router.get('/logout',function (req,res) {
      req.session.destroy(function (err) {
        if(err) throw err;
        res.redirect('/');
      })
    })
module.exports = router;
