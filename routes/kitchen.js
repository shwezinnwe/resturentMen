var express = require('express');
var router = express.Router();
var Staff = require('../model/Staff');
var Order = require('../model/Order');



  router.get('/home', function(req,res,next){
    Order.find({$or:[{status:"0"},{status:"1"}]},(err,rtn)=>{
      if(err) throw err;
      res.render('kitchen/home',{orders:rtn,name:req.session.users.name})
    })
  });


  router.get('/orderdetail/:id',(req,res)=>{
    Order.findById(req.params.id).populate('menus.menu_id').populate('drinks.drink_id').exec((err,rtn)=>{
      if(err) throw err;
      console.log(rtn);
      res.render('kitchen/order-detail',{order:rtn,name:req.session.users.name});
    });
  })

  router.get('/startOrder/:id',(req,res)=>{
    Order.findByIdAndUpdate(req.params.id,{$set:{status:"1"}},(err,rtn)=>{
      if(err) throw err;
      res.redirect('/kitchens/orderdetail/'+req.params.id);
    })
  })

  router.get('/startFinish/:id',(req,res)=>{
    Order.findByIdAndUpdate(req.params.id,{$set:{status:"2"}},(err,rtn)=>{
      if(err) throw err;
      res.redirect('/kitchens/home');
    })
  })

module.exports = router;
