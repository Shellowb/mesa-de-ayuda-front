import axios from 'axios';  
  
const chatRepository = () => {  
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/webhooks/bot/chats/`;
    
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

  const getLastMessage = (chatId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json'  
          }  
      });  
 
      instance.get(`${chatId}`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => { 
        reject(e.response);  
      }); 
    }); 
  }; 
  
  return {  
    getChats,
    getLastMessage
  }  
};  
  
export default chatRepository();