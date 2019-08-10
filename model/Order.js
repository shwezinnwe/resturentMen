var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  menus:[{
    menu_id:{
      type:Schema.Types.ObjectId,
      ref:'Menus',
    },
    low:{
      type:Array
    },
    count:{
      type:Number
    },
    apo:{
      type: String
    }
  }],
  drinks:[{
    drink_id:{
      type:Schema.Types.ObjectId,
      ref:'Drinks',
    },
    count:{
      type:Number
    }
  }],
  status:{
    type:String,
    required: true,
    default: "0" // 0 is ordering, 1 is cooking, 2 is finish, 3 Take, 4 complete
  },
  tableNo:{
    type:String,
    required: true
  }
});

module.exports = mongoose.model('Orders', OrderSchema)
