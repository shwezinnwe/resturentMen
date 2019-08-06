var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DrinkSchema = new Schema({
  title:{
    type: String,
    required : true
  },
  category:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  imgUrl:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Drinks', DrinkSchema)