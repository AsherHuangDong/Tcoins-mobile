import Axios from "axios";

Axios.defaults = Object.assign(Axios.defaults, {
  //baseURL: "http://localhost:8200",
   //baseURL: "http://39.104.181.213:8666/",        // new地址
  // baseURL:'http://admin.psychic.zhineng.talkingcake.cn',
  baseURL: 'http://tcoins.talkingcake.cn',
  timeout: 0,
  // responseType: "json",
  withCredentials: true,
});

// 添加请求拦截器
Axios.interceptors.request.use(
  function (config) {
    if (config.axiosLoading) {
      // Indicator.open();
    }
    config.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'accessToken': localStorage.getItem('accessToken')
      //'accessToken':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbkRUTyI6IntcImNvZGVcIjpcIjBcIixcIm1zZ1wiOlwi5oiQ5YqfXCIsXCJkYXRhXCI6e1wiYWNjZXNzX3Rva2VuXCI6XCI0NzA4NDA4ZGY5NjRjNzRjMWM5ZDY5NzM1ODM4YmI1M1wiLFwicmVmcmVzaF90b2tlblwiOlwiZTg1NWJhNGEwMmY4ZjdiM2UzNTk3ZDljZWUwMjYzZWRcIixcImV4cGlyZXNfaW5cIjo3MjAwLFwib3BlbmlkXCI6XCI4MWI4NjNjNjBhNTI5OGFjZTM5OWFkMTUwMGMyNGEyOVwiLFwic2NvcGVcIjpcInNuc2FwaV9iYXNlXCIsXCJ1aWRcIjpcIjEwNjI3XCJ9fSIsInN1aWppc2h1IjoxNTc3MzI4ODA5Njk5fQ.oqULctJOC2P38Ll2a6N47HsIGbyf77TZOM6Mm35HiWY'
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Axios.interceptors.response.use(
  function (response) {
    console.log('response', response)
    if (response.data) {
      switch (response.data.code) {
        case 0:
          return response
        case 600: // 正常
          return
        default:
          return response
      }
    } else {
      return response;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default Axios;
