import axios from 'axios';  
  
const processRepository = () => {  
  // let baseUrl = 'http://localhost:8000/api/v1/procesos/';  
  let baseUrl = 'https://mesadeayudadcc.herokuapp.com/api/v1/procesos/';  
    
  const getProcess = () => {  
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

  const getProcessById = (processId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json'  
          }  
      });  
 
      instance.get(`${processId}`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => { 
        reject(e.response);  
      }); 
    }); 
  }; 

  const getProcessPublished = () => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json'  
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
  
  const postProcess = (process) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
          baseURL: baseUrl,   
          headers: {  
            'Content-Type': 'application/json'  
          }  
      });  
 
      instance.post('', process)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => { 
        reject(e.response);  
      }); 
    }); 
  }; 

  const deleteProcess = (processId) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json'  
        }  
      });  
 
      instance.delete(`${processId}`)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => { 
        reject(e.response);  
      }); 
    }); 
  }; 

  const updatePublished = (processId, published) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json'  
        }  
      });  
 
      instance.put(`${processId}`, {published: published})  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => { 
        reject(e.response);  
      }); 
    }); 
  }; 

  const updateProcess = (processId, params) => {  
    return new Promise((resolve, reject) => {  
      const instance = axios.create({  
        baseURL: baseUrl,   
        headers: {  
          'Content-Type': 'application/json'  
        }  
      });  
 
      instance.put(`${processId}`, params)  
      .then(r => {  
        resolve(r.data);  
      }).catch(e => { 
        reject(e.response);  
      }); 
    }); 
  }; 
  
  return {  
    getProcess,
    postProcess,
    deleteProcess,
    updatePublished,
    getProcessById,
    updateProcess,
    getProcessPublished
  }  
};  
  
export default processRepository();