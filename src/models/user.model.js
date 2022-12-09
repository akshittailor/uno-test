const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name:{
    type: String,
    require: true,
    maxlength: 20,
    trim:true
  },
  email:{
    type: String,
    require: true,
    maxlength: 30,
    unique: true,
    trim:true
  },
  contactNo:{
    type: String,
    require: true,
    minlength: 10,
    unique: true,
    trim:true
  },
  password:{
    type: String,
    require:true
  },
  token:{
    type: String,
    default: null,
  },
},
{timestamps:true}
)

module.exports = mongoose.model('user',userSchema);