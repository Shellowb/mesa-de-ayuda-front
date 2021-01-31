import axios from 'axios';  
  
const authRepository = () => {  
  //let baseUrl = 'http://localhost:8000/rest-auth';   
  let baseUrl = 'https://8a52de9f4247.ngrok.io/rest-auth';  
  // let userUrl = 'http://localhost:8000/api/auth/me/';  
   
  const tokenName = 'token';  

  const getLocalToken = () => {  
    return JSON.parse(localStorage.getItem(tokenName));  
  }; 

  const getLocalUser = () => {  
    return JSON.parse(localStorage.getItem('user'));  
  };
    
  const logIn = user => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json'  
          }  
      });  
 
      instance.post('login/', user)  
      .then(r => {  
        localStorage.setItem(tokenName, JSON.stringify(r.data.key)); 
        resolve(r.data);  
      }).catch(e => {  
        console.log(e);
        reject(e.response);  
      }); 
    }); 
  };  

  const getUser = () => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${getLocalToken()}`
          }  
      });  
 
      instance.get('user/')  
      .then(r => {  
        localStorage.setItem('user', JSON.stringify(r.data));  
        resolve(r.data);  
      }).catch(e => {  
        console.log(e);
        reject(e.response);  
      }); 
    }); 
  };  

  const signUp = user => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,  
        headers: {  
          'Content-Type': 'application/json'  
        }  
      });  
      instance.post('registration/', user)  
      .then(r => {  
        localStorage.setItem(tokenName, JSON.stringify(r.data.key));  
        resolve(r.data);  
      }).catch(e => {  
        console.log(e);
        reject(e.response);  
      }); 
    }); 
  }; 

  const logOut = () => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,  
        headers: {  
          'Content-Type': 'application/json'  
        }  
      });  

      instance.post('logout/', {})  
      .then(r => {  
        localStorage.removeItem(tokenName); 
        localStorage.removeItem('user');  
        resolve(r.data);  
      }).catch(e => {   
        console.log(e);
        reject(e.response);  
      }); 
    }); 
  };
  
  return {  
    logIn,  
    signUp, 
    logOut,
    getLocalUser,
    getUser,
    getLocalToken
  }  
};  
  
export default authRepository();