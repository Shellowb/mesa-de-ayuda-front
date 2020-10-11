import axios from 'axios';  
  
const authRepository = () => {  
  // let baseUrl = 'http://localhost:8000/rest-auth';  
  let baseUrl = 'http://mesadeayudadcc.herokuapp.com/rest-auth';  
  // let userUrl = 'http://localhost:8000/api/auth/me/';  
   
  const tokenName = 'token';  
  /*
  const getLocalToken = () => {  
    return JSON.parse(localStorage.getItem(tokenName));  
  }; 
  */
    
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
    logOut  
  }  
};  
  
export default authRepository();