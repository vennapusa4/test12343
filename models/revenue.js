const mongoose = require('mongoose');
const { Schema } = mongoose;
const revenueSchema = new Schema({
    AccountName: String,
    data: [{Name:String,Year:Number,Value:Number,Volume:Number}],
  });
  
  mongoose.model('revenues', revenueSchema);
  