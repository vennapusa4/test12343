const apiai = require('test422');
const app = apiai("f696acab198140a8a66c496fa190ebea");
module.exports=async text=>{   
    const myPromise = new Promise(function(resolve, reject) {
        var request = app.textRequest(text, {    
            sessionId: '123456'
          });
          request.on('response', (response)=> {
            resolve(response);
          });
          request.on('error', function(error) {
              console.log(error);
          });
          request.end();
    });  
       
          return myPromise;
         
}