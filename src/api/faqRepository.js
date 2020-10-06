import axios from 'axios';  
  
const faqRepository = () => {  
  // let baseUrl = 'http://localhost:8000/api/v1/FAQ/';   
  let baseUrl = 'http://mesadeayudadcc.herokuapp.com/api/v1/FAQ/';   

  const getFaqByProcess = (processId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json'  
          }  
      });  
 
      instance.get(`${processId}/questions`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const postQuestion = (question) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json'  
          }  
      });  
 
      instance.post('', question)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const deleteQuestion = (questionId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json'  
        }  
      });  
 
      instance.delete(`${questionId}`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {    
        reject(e.response);  
      }); 
    }); 
  }; 

  const updateQuestion = (questionId, params) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json'  
        }  
      });  
 
      instance.put(`${questionId}`, params)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {    
        reject(e.response);  
      }); 
    }); 
  }; 

  const updatePublished = (questionId, published) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json'  
        }  
      });  
 
      instance.put(`${questionId}`, {published: published})  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {    
        reject(e.response);  
      }); 
    }); 
  }; 

  return {  
    getFaqByProcess,
    postQuestion,
    deleteQuestion,
    updateQuestion,
    updatePublished
  }  
};  
  
export default faqRepository();