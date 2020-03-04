// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler,ActivityTypes,MessageFactory} = require('botbuilder');
const dialog=require("../services/dialogflow");
const question = {
    name: 'name',
    age: 'age',
    date: 'date',
    none: 'none'
};
class EchoBot extends ActivityHandler {
    getInlineAttachment(data) {
        data=data.map(e=>{
            var tablecontent={
                Account:e.selectedAccount,
                Product:e.selectedProduct,
                Revenue:e.revenue,
                Volume:e.volume,
                Year:e.selectedYear
            }
            Object.keys(tablecontent).forEach( e=>{
                if (!tablecontent[e]) {
                       delete tablecontent[e]
                }})
                return tablecontent;
        })
        var col=[];   
            Object.keys(data[0]).forEach( e=>{
                var obj1={
                    type: "Column",
                    width:"stretch",
                    items:[]
               }
                var obj2 = {
                    type: "TextBlock",
                    text: e,
                    "weight": "bolder"
                }
                obj1.items.push( {...obj2});
               
                col.push({...obj1});
            })
            data.forEach((element) => {
                
                Object.keys(element).forEach(( e,i)=>{
                    var obj3 = {
                        type: "TextBlock",
                        text: element[e].toString(),
                    }
                    col[i].items.push( {...obj3});
                });
                
            })
      
        return {
            name: 'as',
            contentType:  "application/vnd.microsoft.card.adaptive",
            content: {
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                    {
                        "type": "ColumnSet",
                        "backgroundImage":
                        {"url": "https://images.pexels.com/photos/326311/pexels-photo-326311.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                       
                       ,"columns": col
                    }
                ]
            }
        };
        
    }
    constructor() {
        super();
        
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            var dialogreturn=await dialog(context.activity.text);
            if (dialogreturn.result.fulfillment.messages.length==1) {
                await context.sendActivity(dialogreturn.result.fulfillment.messages[0].speech);
            }
            else if(dialogreturn.result.fulfillment.messages.length>1){
                dialogreturn.result.fulfillment.messages.forEach(async e=>{
                    await context.sendActivity(e.speech);
                })
                var payload=   dialogreturn.result.fulfillment.messages.find( e=>{
                    if (e.payload) {
                        return e
                    }
                })
                if (payload) {
                    await this.sendSuggestedActions(context,payload.payload.suggestions);
                }
               
            }
            
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    async sendSuggestedActions(turnContext,suggestions) {
        var reply = MessageFactory.suggestedActions(suggestions);
        await turnContext.sendActivity(reply);
    }

 
}

module.exports.EchoBot = EchoBot;
