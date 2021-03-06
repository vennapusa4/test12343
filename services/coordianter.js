const mongoose = require('mongoose');
require("../models/meetings");
require("../models/account");
require("../models/revenue");
const meet = mongoose.model('meetings');
const account = mongoose.model('accounts');
const revenue = mongoose.model('revenues');

var connection=mongoose.connect("mongodb://ravi:010816@cluster0-shard-00-00-jdpev.mongodb.net:27017,cluster0-shard-00-01-jdpev.mongodb.net:27017,cluster0-shard-00-02-jdpev.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", (e,db) => {
    console.log(e,"dd");
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
        sel.selectedAccount!="all"?{ $match: { AccountName: sel.selectedAccount } }:null,
    { $unwind: '$data' },
    // years.length ? { $match: { "data.Year": { $in: years } } } : null,
    // products.length ? { $match: { "data.Name": { $in: products } } } : null,
    sel.selectedYear!="all"? { $match: { "data.Year": parseInt(sel.selectedYear) } } : null,
    sel.selectedProduct!="all"?{ $match: { "data.Name": sel.selectedProduct } } : null,
    { $group: { _id: '$_id', data: { $push: '$data' } } }].filter(Boolean);
    var test=await mongoose.model('revenues').find({},(e=>{
        console.log(e);
        
    }));
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
getInfo =async(e) => {
  
}
module.exports = async (dialog, sel) => {
    substrings=["revenue","volume"];
    if (new RegExp(substrings.join("|")).test(sel.requestedDetails.toLocaleLowerCase())) {
        // At least one 
        var data=[];
        await Promise.all(sel.data.map(async e=>{
            var info=await getRevenue(e);
            var fullinfo={...info,...e}
              Object.keys(fullinfo).forEach( e=>{
                if (fullinfo[e]=="all") {
                       delete fullinfo[e]
                }
            });

            data.push(fullinfo);
        }))
        return data;
    }
    else
        return dialog;
    
    
}