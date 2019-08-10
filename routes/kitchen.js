var express = require('express');
var router = express.Router();
var Staff = require('../model/Staff');
var Order = require('../model/Order');

router.get('/login', function(req, res, next) {
    res.render('kitchen/login', { title: 'Express' });
  });

  router.get('/home', function(req,res,next){
    Order.find({$or:[{status:"0"},{status:"1"}]},(err,rtn)=>{
      if(err) throw err;
      res.render('kitchen/home',{orders:rtn})
    })
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

  router.get('/orderdetail/:id',(req,res)=>{
    Order.findById(req.params.id).populate('menus.menu_id').populate('drinks.drink_id').exec((err,rtn)=>{
      if(err) throw err;
      console.log(rtn);
      res.render('kitchen/order-detail',{order:rtn});
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
