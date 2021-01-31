import axios from 'axios';  
  
const chatRepository = () => {  
  //let baseUrl = 'http://localhost:8000/webhooks/bot/chats/';  
  let baseUrl = 'https://8a52de9f4247.ngrok.io/webhooks/bot/chats/';  
    
  const getChats = () => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json'  
          }  
      });  
 
      instance.get('')  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => { 
        reject(e.response);  
      }); 
    }); 
  }; 

  
  
  return {  
    getChats
  }  
};  
  
export default chatRepository();