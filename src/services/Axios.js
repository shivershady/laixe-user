import axios from "axios";

let axiosInstance = null;

function getInstance() {
  if (axiosInstance != null) {
    return axiosInstance
  }
  axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true
    },
    timeout: 5000 // request timeout
  })
  //hook interceptor cài ở đây
  axiosInstance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    response => {
      const res = response.data
      // if the custom code is not 20000, it is judged as an error.
      // if (res.code !== 20000) {
      //     ElMessage({
      //         message: res.message || 'Error',
      //         type: 'error',
      //         duration: 5 * 1000
      //     })

      //     // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //         // to re-login
      //         ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //             confirmButtonText: 'Re-Login',
      //             cancelButtonText: 'Cancel',
      //             type: 'warning'
      //         }).then(() => {
      //             store.dispatch('user/resetToken').then(() => {
      //                 location.reload()
      //             })
      //         })
      //     }
      //     return Promise.reject(new Error(res.message || 'Error'))
      // }
      return res
    },
    error => {
      console.log(error)
      return Promise.reject(error);
    })
  return axiosInstance;
}


function get(endpointApiUrl, payload = {}, config = {}) {
  return getInstance().get(endpointApiUrl, {
    params: payload,
    ...config,
  });
}

function post(endpointApiUrl, payload = {}, config = {}) {
  return getInstance().post(endpointApiUrl, payload, config);
}

function put(endpointApiUrl, payload = {}, config = {}) {
  return getInstance().put(endpointApiUrl, payload, config);
}

function del(endpointApiUrl, payload = {}, config = {}) {
  return getInstance().delete(endpointApiUrl, payload, config);
}

function patch(endpointApiUrl, payload = {}, config = {}) {
  return getInstance().patch(endpointApiUrl, payload, config);
}

export const Axios = {
  axiosInstance,
  get,
  post,
  put,
  del,
  patch
}