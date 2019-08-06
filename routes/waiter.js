var express = require('express');
var router = express.Router();
var Staff = require('../model/Staff');
var Menu = require('../model/Menu');
var Drink = require('../model/Drink');
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('waiter/login', { title: 'Express' });
});

router.get('/home', function(req,res,next){
    res.render('waiter/home')
});

router.post('/login', function(req,res,next){
  Staff.findOne({$and:[{email:req.body.email},{position:"Waiter"}]},(err,staff)=>{
    if(err) throw err;
    if(staff != null && Staff.compare(req.body.password,staff.password)){
      res.redirect('/waiters/home')
    }else{
      res.redirect('/waiters/login')
    }
  })
});

router.get('/order/:tnum',(req,res)=>{
  Menu.find((err,rtn)=>{
    if(err) throw err;
    Drink.find((err2,rtn2)=>{
      if(err2) throw err2;
      res.render('waiter/order',{menus:rtn,drinks:rtn2});
    })
  })
  
})

router.post('/order',(req,res)=>{
  console.log('call',req.body.menu)
  console.log('call drink', req.body.drink);
  // res.end(req.body);
})

module.exports = router;
