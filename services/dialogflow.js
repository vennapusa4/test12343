const apiai = require('test422');
const app = apiai("09e87d444f5a4a0180544ae327d75788");
module.exports=async text=>{   
    const myPromise = new Promise(function(resolve, reject) {
        var request = app.textRequest(text, {    
            sessionId: '123456'
          });
          request.on('response', (response)=> {
            resolve(response.result.fulfillment.speech);
          });
          request.on('error', function(error) {
              console.log(error);
          });
          request.end();
    });  
       
          return myPromise;
         
}