var express = require('express');
var router = express.Router();
var Admin = require('../model/Admin');
var Staff = require('../model/Staff');
var Menu = require('../model/Menu');
var Drink = require('../model/Drink');
var Order = require('../model/Order');
var bcrypt = require('bcrypt');
var multer = require('multer');
var upload = multer({ dest:'public/images/uploads'});

/* GET home page. */

router.get('/stafflist',function(req,res,next){
  Staff.find(function(err,rtn){
    if(err) throw err;
    res.render('admin/staff/stafflist',{staffs:rtn,name:req.session.users.name});
  });
});

router.get('/addstaff',function(req,res,next){
    res.render('admin/staff/addstaff',{name:req.session.users.name});
});

router.post('/addstaff',function(req,res,next){
  var staff = new Staff();
  staff.name = req.body.name;
  staff.email = req.body.email;
  staff.password = req.body.password;
  staff.nrc = req.body.nrc;
  staff.position = req.body.position;
  staff.address = req.body.address;
  staff.phone = req.body.phone;
  staff.save(function(err,rtn){
    if(err) throw err;
    res.redirect('/admins/stafflist');
  })
})

router.get('/updatestaff/:id',(req,res)=>{
  Staff.findById(req.params.id,(err,rtn)=>{
    if(err) throw err;
    res.render('admin/staff/updatestaff',{staff:rtn,name:req.session.users.name})
  });
});

router.post('/updatestaff',(req,res)=>{
  var update = {
    name: req.body.name,
    email: req.body.email,
    password :  bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8),null),
    nrc : req.body.nrc,
    address : req.body.address,
    position : req.body.position,
    phone : req.body.phone
  }
  Staff.findByIdAndUpdate(req.body.id,{$set:update},(err,rtn)=>{
    if(err) throw err;
    res.redirect('/admins/stafflist');
  })
})

router.get('/deletestaff/:id',(req,res)=>{
  Staff.findByIdAndRemove(req.params.id,(err,rtn)=>{
    if(err) throw err;
    res.redirect('/admins/stafflist');
  })
})

router.get('/addmenu',(req,res)=>{
  res.render('admin/menu/addmenu',{name:req.session.users.name});
});

router.post('/addmenu',upload.single('photo'),(req,res)=>{
  var menu = new Menu();
  menu.title = req.body.title;
  menu.category = req.body.category;
  menu.price = req.body.price;
  menu.status = req.body.status;
  menu.type = req.body.type;
  if(req.file) menu.imgUrl = '/images/uploads/'+ req.file.filename;
  menu.save((err,rtn)=>{
    if(err) throw err;
    res.redirect('/admins/menulist');
  })
})

router.get('/menulist',(req,res)=>{
  Menu.find((err,rtn)=>{
    if(err) throw err;
    res.render('admin/menu/menulist',{menus:rtn,name:req.session.users.name});
  })

})

router.get('/updateMen/:id',(req,res)=>{
    Menu.findById(req.params.id,(err,rtn)=>{
      if(err) throw err;
      res.render('admin/menu/updatemenu',{menu:rtn,name:req.session.users.name});
    })
})

router.post('/updateMen',upload.single('photo'), (req,res)=>{
  var update = {
    title : req.body.title,
    price : req.body.price,
    category : req.body.category,
    status : req.body.status,
    type: req.body.type
  }
  if(req.file) update[imgUrl] = '/images/uploads/'+ req.file.filename;
  Menu.findByIdAndUpdate(req.body.id,{$set:update},(err,rtn)=>{
    if(err) throw err;
    res.redirect('/admins/menulist');
  })
})

router.get('/deleteMen/:id',(req,res)=>{
  Menu.findByIdAndRemove(req.params.id,(err,rtn)=>{
    if(err) throw err;
    res.redirect('/admins/menulist');
  })
})

router.get('/adddrink',(req,res)=>{
  res.render('admin/drink/adddrink',{name:req.session.users.name});
});

router.post('/adddrink',upload.single('photo'),(req,res)=>{
  var drink = new Drink();
  drink.title = req.body.title;
  drink.category = req.body.category;
  drink.price = req.body.price;
  drink.status = req.body.status;
  if(req.file) drink.imgUrl = '/images/uploads/'+ req.file.filename;
  drink.save((err,rtn)=>{
    if(err) throw err;
    res.redirect('/admins/drinklist');
  })
})

router.get('/drinklist',(req,res)=>{
  Drink.find((err,rtn)=>{
    if(err) throw err;
    res.render('admin/drink/drinklist',{drinks:rtn,name:req.session.users.name});
  })

})

router.get('/updateDri/:id',(req,res)=>{
  Drink.findById(req.params.id,(err,rtn)=>{
    if(err) throw err;
    res.render('admin/drink/updatedrink',{drink:rtn,name:req.session.users.name});
  })
})

router.post('/updateDri',upload.single('photo'), (req,res)=>{
  var update = {
    title : req.body.title,
    price : req.body.price,
    category : req.body.category,
    status : req.body.status
  }
  if(req.file) update[imgUrl] = '/images/uploads/'+ req.file.filename;
  Drink.findByIdAndUpdate(req.body.id,{$set:update},(err,rtn)=>{
    if(err) throw err;
    res.redirect('/admins/drinklist');
  })
})

router.get('/deleteDri/:id',(req,res)=>{
  Drink.findByIdAndRemove(req.params.id,(err,rtn)=>{
    if(err) throw err;
    res.redirect('/admins/drinklist');
  })
})

router.get('/home', function(req,res,next){
    Staff.count({},(err,rtn)=>{
      if(err) throw err;
      console.log(rtn);
      Menu.count({},(err2,rtn2)=>{
        if(err2) throw err2;
        Drink.count({},(err3,rtn3)=>{
          if(err3) throw err3;
          Order.count({},(err4,rtn4)=>{
            if(err4) throw err4;
            res.render('admin/home',{order:rtn4,drink:rtn3,menu:rtn2,staff:rtn,name:req.session.users.name});
          })
        })
      })
    })

});

router.get('/daily',function (req,res) {
  Order.aggregate(
   [
      {
        $group : {
           _id : { month: { $month: "$inserted" }, day: { $dayOfMonth: "$inserted" }, year: { $year: "$inserted" } },
           totalPrice: { $sum: "$total" },
           count: { $sum: 1 }
        }
      }
   ]
    ).sort({inserted:1}).exec(function (err,rtn) {
        if(err) throw err;
        console.log(rtn);
        res.render('admin/daily',{order:rtn,name:req.session.users.name});
      })
})
router.get('/monthly',function (req,res) {
  Order.aggregate(
   [
      {
        $group : {
           _id : { month: { $month: "$inserted" }, year: { $year: "$inserted" } },
           totalPrice: { $sum: "$total" },
           count: { $sum: 1 }
        }
      }
   ]
    ).sort({inserted:1}).exec(function (err,rtn) {
        if(err) throw err;
        console.log(rtn);
        res.render('admin/monthly',{order:rtn,name:req.session.users.name});
      })
})

router.get('/yearly',function (req,res) {
  Order.aggregate(
   [
      {
        $group : {
           _id : { year: { $year: "$inserted" } },
           totalPrice: { $sum: "$total" },
           count: { $sum: 1 }
        }
      }
   ]
    ).sort({inserted:1}).exec(function (err,rtn) {
        if(err) throw err;
        console.log(rtn);
        res.render('admin/yearly',{order:rtn,name:req.session.users.name});
      })
})


module.exports = router;
