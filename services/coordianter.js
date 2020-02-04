const mongoose = require('mongoose');
require("../models/meetings");
require("../models/account");
require("../models/revenue");
const meet = mongoose.model('meetings');
const account = mongoose.model('accounts');
const revenue = mongoose.model('revenues');

mongoose.connect("mongodb://ravi:Ravi%401994@cluster0-shard-00-00-jdpev.mongodb.net:27017,cluster0-shard-00-01-jdpev.mongodb.net:27017,cluster0-shard-00-02-jdpev.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", (e) => {
    console.log(e);
})

getSum = function (items, prop) {
    return items.reduce(function (a, b) {
        return a + b[prop];
    }, 0);
};

getRevenue = async (sel) => {
    var years = sel.selectedYear.split(",").map(Number).filter(Boolean);
    var products = sel.selectedProduct.split(",").filter(Boolean);
    var aggregate = [
        sel.selectedAccount!=""?{ $match: { AccountName: sel.selectedAccount } }:null,
    { $unwind: '$data' },
    years.length ? { $match: { "data.Year": { $in: years } } } : null,
    products.length ? { $match: { "data.Name": { $in: products } } } : null,
    { $group: { _id: '$_id', data: { $push: '$data' } } }].filter(Boolean);
    var data = await mongoose.model('revenues').aggregate(aggregate);
    var info={revenue:0,volume:0};
    data.forEach(e=>{
        info.revenue+= getSum(e.data, "Value"),
        info.volume+=getSum(e.data, "Volume")
    })
    return info;
}
getMeetingDetails = () => {
    return 1;
}
getInfo = () => {
    return 1;
}
module.exports = async (dialog, sel) => {
    if (sel.rquestedDetails=="") {
        return dialog;
    }
    else{
        var info = await getRevenue(sel);
        return dialog.replace('550000', info.revenue)
  
    }
}