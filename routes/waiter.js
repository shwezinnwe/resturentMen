var express = require('express');
var router = express.Router();
var Staff = require('../model/Staff');
var Menu = require('../model/Menu');
var Drink = require('../model/Drink');
var Order = require('../model/Order');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('waiter/login', { title: 'Express' });
});

router.get('/home', function(req,res,next){
  Order.find({$or:[{status:2},{status:3}]},(err,rtn)=>{
    res.render('waiter/home',{orders:rtn})
  });
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

router.get('/taken/:id', function (req,res) {
  Order.findByIdAndUpdate(req.params.id,{$set:{status:'3'}},(err,rtn)=>{
    if(err) throw err;
    res.redirect('/waiters/home');
  })
})

router.get('/orderdetail/:id',(req,res)=>{
  Order.findById(req.params.id).populate('menus.menu_id').populate('drinks.drink_id').exec((err,rtn)=>{
    if(err) throw err;
    res.render('waiter/order-detail',{order:rtn})
  })
})

router.get('/order/:tnum',(req,res)=>{
  Menu.find((err,rtn)=>{
    if(err) throw err;
    Drink.find((err2,rtn2)=>{
      if(err2) throw err2;
      res.render('waiter/order',{menus:rtn,drinks:rtn2,tnum:req.params.tnum});
    })
  })

})

router.post('/order',(req,res)=>{
  var order = new Order();
  order.menus = req.body.menu;
  order.drinks = req.body.drink;
  order.tableNo  = req.body.tnum;
  order.save(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.json({
      status:true
    })
  })
})

module.exports = router;
