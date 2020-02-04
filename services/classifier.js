
var accountNames=["PIMCO","RAMCO","MIMCO","FRANKLIN"];
var productName=["G10 Revenue","Electronic","Emerging Markets"];
var years=[2017,2018,2019];
var followups=["same for","me the same","What about"];
var requestedDetails=["revenue","volume"]
module.exports=(text)=>{
    var selectedData={
        selectedAccount:"",
        selectedYear:"",
        selectedProduct:"",
        rquestedDetails:"",
        followup:false
    }
    text= text.toLocaleLowerCase();
    var str="";
    productName.forEach(e=>{      
        if (text.includes(e.toLocaleLowerCase())) {       
            str+=e+",";
        }   
    })
    if (str!="") {
        selectedData.selectedProduct=str.replace(/(^,)|(,$)/g, "");
        str=""
    }
    accountNames.forEach(e=>{      
        if (text.includes(e.toLocaleLowerCase())) {       
            str+=e+",";
        }   
    })
    if (str!="") {
        selectedData.selectedAccount=str.replace(/(^,)|(,$)/g, "");
        str=""
    }
    years.forEach(e=>{  
        if (text.includes(e)) {       
            str+=e+",";
        }    
       
    })
    if (str!="") {
        selectedData.selectedYear=str.replace(/(^,)|(,$)/g, "");
        str=""
    }
    requestedDetails.forEach(e=>{      
        if (text.includes(e.toLocaleLowerCase())) {       
            str+=e+",";
        }   
    })
    if (str!="") {
        selectedData.rquestedDetails=str.replace(/(^,)|(,$)/g, "");
        str=""
    }
return selectedData;
};