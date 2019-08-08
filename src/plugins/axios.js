"use strict"

import Vue from 'vue'
import axios from "axios"
import store from '../store'
import router from '../router'
import {
  message
} from 'ant-design-vue'

message.config({
  top: `100px`,
  duration: 2,
  maxCount: 3,
});


// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config)

_axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    store.getters.token && (config.headers.Authorization = store.getters.token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
_axios.interceptors.response.use(
  response => {
    response.headers.token && store.dispatch('commitaddtoken', response.headers.token)
    return response.data;
  },
  error => {

    error.response.status === 401 && router.currentRoute.name !== 'login' &&
      store.dispatch('commitremovetoken').then(() => {
        message.error(error.response.data.message);
        router.push({
          name: 'login'
        })
      })
    error.response.status === 500 && message.error(error.response.data.message);

    return Promise.reject(error.response)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {

      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
