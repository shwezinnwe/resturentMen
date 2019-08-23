var express = require('express');
var router = express.Router();
var Staff = require('../model/Staff');
var Order = require('../model/Order');

  router.get('/home', function(req,res,next){
      Order.find({status:'3'},{tableNo:1, _id:0},(err,rtn)=>{
        if(err) throw err;
        console.log(rtn);
        res.render('cashier/home',{tables:rtn,name:req.session.users.name})
      })
  });

  router.post('/ordersigle',(req,res)=>{
    Order.find({$and:[{status:"3"},{tableNo:req.body.tno}]}).populate('menus.menu_id').populate('drinks.drink_id').exec((err,rtn)=>{
      if(err) throw err;
      res.json({order:rtn})
    })
  })

  router.get('/checkout/:tno',(req,res)=>{
    Order.findOneAndUpdate({$and:[{status:"3"},{tableNo:req.params.tno}]},{$set:{status:"4"}},(err,rtn)=>{
      if(err) throw err;
      res.redirect('/cashiers/home');
    })
  })

module.exports = router;
