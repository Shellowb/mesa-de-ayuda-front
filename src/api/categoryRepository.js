import axios from 'axios';  
import AuthApi from './authRepository';
  
const categoryRepository = () => {  
  //let baseUrl = 'http://localhost:8000/api/v1/categorias/';   
  let baseUrl = 'https://8a52de9f4247.ngrok.io/api/v1/categorias/';   


  const getCategoriesByProcess = (processId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`
          }  
      });  
 
      instance.get(`${processId}/categories`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const postCategory = (category) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
 
      instance.post('', category)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const deleteCategory = (categoryId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
        }  
      });  
 
      instance.delete(`${categoryId}`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {    
        reject(e.response);  
      }); 
    }); 
  }; 

  const updateCategory = (categoryId, params) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
        }  
      });  
 
      instance.put(`${categoryId}`, params)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {    
        reject(e.response);  
      }); 
    }); 
  }; 


  return {  
    getCategoriesByProcess,
    postCategory,
    deleteCategory,
    updateCategory,
  }  
};  
  
export default categoryRepository();