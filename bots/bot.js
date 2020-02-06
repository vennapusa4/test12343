// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler,ActivityTypes} = require('botbuilder');
const dialog=require("../services/dialogflow");
const coordianter=require("../services/coordianter");
const classifier=require('../services/classifier');
var AdaptiveCards = require("adaptivecards");
class EchoBot extends ActivityHandler {
    getInlineAttachment(data) {

        data=data.map(e=>{
            return{
                AccountName:e.selectedAccount,
                Revenue:e.revenue,
                Volume:e.volume

            }
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
          
        //     var obj2={
        //         type: "TextBlock",
        //         text:e,

        //    }
        //    obj1.items.push( {...obj2});
           
      
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
            var classiferdata=await classifier(context.activity.text);
            var response=await coordianter(dialogreturn,classiferdata);
            if (typeof(response)=="string") {
                await context.sendActivity(response);
            }
            else{
                const reply = { type: ActivityTypes.Message };
                reply.text = 'below are the details';
                reply.attachments = [this.getInlineAttachment(response)];
                await context.sendActivity(reply);
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
}

module.exports.EchoBot = EchoBot;
