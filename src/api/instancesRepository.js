import axios from 'axios';  
import AuthApi from './authRepository';
  
const instancesRepository = () => {  
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/api/v1/instancias/`; 

  const getInstancesByProcess = (processId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
 
      instance.get(`${processId}/instancias`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const getInstancesPublishedByProcess = (processId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
 
      instance.get(`${processId}/instancias/publicados`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  };

  const postInstance = (instanceObject) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
      instance.post('', instanceObject)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const deleteInstance = (instanceId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
        }  
      });  
 
      instance.delete(`${instanceId}`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const updatePublished = (instanceId, published) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
        }  
      });  
 
      instance.put(`${instanceId}`, {published: published})  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const updateInstance = (instanceId, params) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
        }  
      });  
 
      instance.put(`${instanceId}`, params)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const getInstanceById = (instanceId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
 
      instance.get(`${instanceId}`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const getInstancePublishedById = (instanceId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
 
      instance.get(`${instanceId}/publicado`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  };

  const getSteps = (instanceId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
 
      instance.get(`${instanceId}/etapas`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const postStep = (step) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
 
      instance.post('etapas', step)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const deleteStep = (stepId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
        }  
      });  
 
      instance.delete(`etapas/${stepId}`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const updateStep = (stepId, params) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
        }  
      });  
 
      instance.put(`etapas/${stepId}`, params)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const getNews = (instanceId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
 
      instance.get(`${instanceId}/novedades`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const postNews = (news) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json',
            'Authorization': `Token ${AuthApi.getLocalToken()}`  
          }  
      });  
 
      instance.post('/novedades', news)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  const deleteNews = (newsId) => {
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Token ${AuthApi.getLocalToken()}`  
        }  
      });  
 
      instance.delete(`novedades/${newsId}`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => {  
        reject(e.response);  
      }); 
    }); 
  }; 

  return {  
    getInstancesByProcess,
    postInstance,
    deleteInstance,
    updatePublished,
    getInstanceById,
    updateInstance,
    getSteps,
    postStep,
    deleteStep,
    updateStep,
    getNews,
    postNews,
    deleteNews,
    getInstancesPublishedByProcess,
    getInstancePublishedById
  }  
};  
  
export default instancesRepository();