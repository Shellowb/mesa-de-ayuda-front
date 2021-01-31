import axios from 'axios';  
import AuthApi from './authRepository';
  
const faqRepository = () => {  
  //let baseUrl = 'http://localhost:8000/api/v1/FAQ/';   
  let baseUrl = 'https://8a52de9f4247.ngrok.io/api/v1/FAQ/';   

  const getFaq = () => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`
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

  const getFaqPublished = () => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`
          }  
      });  
 
      instance.get('publicados')  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const getFaqByProcess = (processId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`
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

  const getFaqByProcessPublished = (processId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`
          }  
      });  
 
      instance.get(`${processId}/questions/published`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const postQuestion = (question) => {  
    console.log(AuthApi.getLocalToken());
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
      console.log(question);
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
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
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

  const likeQuestion = (questionId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
        }  
      });  
 
      instance.put(`${questionId}/like`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {    
        reject(e.response);  
      }); 
    }); 
  }; 

  const dislikeQuestion = (questionId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
        }  
      });  
 
      instance.put(`${questionId}/dislike`)  
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
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
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
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
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
    getFaq,
    postQuestion,
    deleteQuestion,
    updateQuestion,
    updatePublished,
    getFaqPublished,
    getFaqByProcessPublished,
    dislikeQuestion,
    likeQuestion
  }  
};  
  
export default faqRepository();