var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var StaffSchema = new Schema({
  name:{
    type: String,
    required : true
  },
  email:{
    type : String,
    required: true,
    unique : true
  },
  password:{
    type: String,
    required: true
  },
  nrc:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  position:{
    type: String,
    required: true
  }
});

StaffSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(8),null);
  next();
});
StaffSchema.statics.compare = function (cleartext,encrypted) {
  return bcrypt.compareSync(cleartext,encrypted)
}

module.exports = mongoose.model('Staffs', StaffSchema)