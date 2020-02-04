const mongoose = require('mongoose');
const { Schema } = mongoose;
const meetingsSchema = require('./meetings');
const AccountSchema = new Schema({
    Account: String,
    CitiRepresentative: String,
    EmailID: String,
    CustomerContact : String,
    Meetings:[]
  });
  
  mongoose.model('accounts', AccountSchema);
  