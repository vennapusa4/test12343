
var accountNames=["PIMCO","RAMCO","MIMCO","FRANKLIN"];
var productName=["G10","Electronic","Emerging Markets"];
var years=[2017,2018,2019];
var followups=["same for","me the same","What about"];
var requestedDetails=["revenue","volume","AccountInfo","MeetingInfo"];
var accountInfoWords={
    "CitiRepresentative":["CitiRepresentative","Citi Representative","Citi Rep"],
    "CustomerContact":["Customer Contact","Contact Person","point of contact","contact details"],
    "Meetings":["meet"]
}
var meetingInfoWords={
    "callNotes":["CitiRepresentative","Citi Representative","Citi Rep"],
    "actionItems":["Customer Contact","Contact Person","point of contact","contact details"],
    "citiAttendees":["Attendees"]
}
module.exports=(text)=>{
    var selectedData={
        selectedAccount:"all",
        selectedYear:"all",
        selectedProduct:"all",
        selectedFields:"all",
        requestedDetails:"",
        requestedFields:"",
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
        selectedData.requestedDetails=str.replace(/(^,)|(,$)/g, "");
        str=""
    }
   
var data={

}
    let result = [];
        for (let selectedAccount of selectedData.selectedAccount.split(",")) {
            for (let selectedYear of selectedData.selectedYear.split(",")) {
                for (let selectedProduct of selectedData.selectedProduct.split(",")) {
                    result.push({ selectedAccount, selectedYear, selectedProduct });
                }
            }
        }
data.data=result;
data.requestedDetails=selectedData.requestedDetails
return data;
};