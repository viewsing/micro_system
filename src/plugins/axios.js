"use strict";

import Vue from 'vue';
import axios from "axios";
import defaultCon from '../config'
import vueInstance from '../utils/vueInstance'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: defaultCon.baseURL,
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    //如果resultCode不为200，当作错误处理
    if (response.data.code !== 200) {
      // vueInstance.$Message.error(response.data.message)
      return Promise.reject({
        message: response.data.message,
        code: response.data.code
      })
    }
    return response.data;
  },
  function(error) {
    // Do something with response error
    // vueInstance.$Message.error(error.message)
    return Promise.reject({
      message: error.message
    });
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
