const mongoose = require('mongoose')

var surgeon = new mongoose.Schema({
  name: {type:String, trim:true, default:''},
  city: {type:String, trim:true, default:''},
  state: {type:String, trim:true, default:''},
  specialty: {type:String, trim:true, default:''},
  email: {type:String, trim:true, default:''}
}, {collection: 'surgeon'});

module.exports = mongoose.model('surgeon', surgeon)
