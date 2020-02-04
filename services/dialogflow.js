const apiai = require('test422');
const app = apiai("af5a5dee9a84473bb83898476d40e8ef");
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