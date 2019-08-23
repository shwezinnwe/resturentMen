var express = require('express');
var router = express.Router();
var Staff = require('../model/Staff');
var Menu = require('../model/Menu');
var Drink = require('../model/Drink');
var Order = require('../model/Order');

/* GET home page. */


router.get('/home', function(req,res,next){
  Order.find({$or:[{status:2},{status:3}]},(err,rtn)=>{
    if(err) throw err;
    Order.find({status:{$ne: 4}},{tableNo:1,_id:0},function (err2,rtn2) {
      if(err2) throw err2;
      var tno =[];
      for (var i = 0; i < rtn2.length; i++) {
        tno.push(rtn2[i].tableNo);
      }
      console.log(tno);
      res.render('waiter/home',{orders:rtn,tno:tno,name:req.session.users.name})
    })

  });
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
    res.render('waiter/order-detail',{order:rtn,name:req.session.users.name})
  })
})

router.get('/order/:tnum',(req,res)=>{
  Menu.find((err,rtn)=>{
    if(err) throw err;
    Drink.find((err2,rtn2)=>{
      if(err2) throw err2;
      res.render('waiter/order',{menus:rtn,drinks:rtn2,tnum:req.params.tnum,name:req.session.users.name});
    })
  })

})

router.post('/order',(req,res)=>{
  var order = new Order();
  order.menus = req.body.menu;
  order.drinks = req.body.drink;
  order.tableNo  = req.body.tnum;
  order.total = req.body.total;
  order.save(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.json({
      status:true
    })
  })
})

module.exports = router;
