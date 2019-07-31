"use strict"

import Vue from 'vue'
import axios from "axios"
import store from '../store'
import router from '../router'
import {
  Modal
} from 'ant-design-vue'


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
  function (config) {
    // console.log('加token啊')
    // Do something before request is sent
    if (store.getters.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      // console.log('加token')
      config.headers.Authorization = store.getters.token
    }
    return config
  },
  function (error) {

    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.status === 215) {
      console.log(response.data.token) // 获取打印token
      store.dispatch('commitaddtoken', response.data.token)
    }
    return response;
  },
  function (error) {
    // Do something with response error
    // Do something with request error
    console.log('登录过气了', error.response.status)
    switch (error.response.status) {
      case 462: // 返回 462 登录过期
      case 465: // 返回 465 未登录

        store.dispatch('commitremovetoken').then(() => { // 清除token信息
          Modal.error({
            title: '错误信息',
            content: error.response.data.msg,
            onOk() {
              // 清除用户名并跳转到登录页面
              router.push({
                name: 'login',
                params: {
                  visible: true,
                  err: error.response.data.msg
                }
              })
            }
          })
        })

        break
      case 404:
        console.log('sjdfl')
        break
      case 405:
        console.log('未登录')
        break
    }
    return Promise.reject(error)
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
