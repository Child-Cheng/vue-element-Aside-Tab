/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import apiUrl from "../config/EnvUrl.js";
import axios from "axios";
const TIME_OUT_MS = 60 * 1000; // 默认请求超时时间
axios.defaults.baseURL = apiUrl; //设置默认接口地址

//与后端进行数据交换的时候带上cookie
axios.defaults.withCredentials = true;
//http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = Math.random(1.2 * 1000);

    if (config.method == "post") {
      if (token) {
        Object.assign(config.headers, { access_token: token });
      }
    } else if (config.method == "get") {
      Object.assign(config.headers, { access_token: token });
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//   // 发送请求前处理request的数据
// axios.defaults.transformRequest = [function (data) {
//     //let newData = ''
//     //for (let k in data) {
//     //  newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
//    // }
//     return data
//   }]

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.ErrorCode == 99) {
      // eslint-disable-next-line no-undef
      router.push({
        path: "/",
        querry: { redirect: router.currentRoute.fullPath }
      });
    }
    return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;

        case 401:
          error.message = "未授权，请登录";
          break;

        case 403:
          error.message = "拒绝访问";
          break;

        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;

        case 408:
          error.message = "请求超时";
          break;

        case 500:
          error.message = "服务器内部错误";
          break;

        case 501:
          error.message = "服务未实现";
          break;

        case 502:
          error.message = "网关错误";
          break;

        case 503:
          error.message = "服务不可用";
          break;

        case 504:
          error.message = "网关超时";
          break;

        case 505:
          error.message = "HTTP版本不受支持";
          break;

        default:
      }
    }
    console.error(error);
    return Promise.reject(error);
  }
);

/*
 * @param response 返回数据列表
 */
function handleResults(response) {
  // let remoteResponse = response.data;
  // var result = {
  //   success: false,
  //   ErrorMsg: "",
  //   status: [],
  //   ErrorCode: "",
  //   data: ""
  // };
  // if (remoteResponse.success) {
  //   result.data = remoteResponse.Data;
  //   result.success = true;
  // }
  // // if (!remoteResponse.success) {
  // //     let code = remoteResponse.ErrorCode
  // //     if (code === 400) {
  // //         console.log('传参错误')
  // //     }

  // // }
  // result.ErrorCode = remoteResponse.ErrorCode;
  // result.ErrorMsg = remoteResponse.ErrorMsg;
  return response.data;
}

/*
 * @param data 参数列表
 * @return
 */
function handleParams(data) {
  return data;
}

export default {
  /*
   * @param url
   * @param data
   * @param response 请求成功时的回调函数
   * @param exception 异常的回调函数
   */
  post(url, data, response, exception) {
    axios({
      method: "post",
      url: url,
      data: handleParams(data),
      timeout: TIME_OUT_MS,
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
      .then(result => {
        response(handleResults(result));
      })
      .catch(error => {
        if (exception) {
          exception(error);
        } else {
          console.log(error);
        }
      });
  },
  /*
   * @param url
   * @param data
   * @param response 请求成功时的回调函数
   * @param exception 异常的回调函数
   */
  async postAsync(url, data, response, exception) {
    await axios({
      method: "post",
      url: url,
      data: handleParams(data),
      timeout: TIME_OUT_MS,
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
      .then(result => {
        response(handleResults(result));
      })
      .catch(error => {
        if (exception) {
          exception(error);
        } else {
          console.log(error);
        }
      });
  },
  /*
   * get 请求
   * @param url
   * @param response 请求成功时的回调函数
   * @param exception 异常的回调函数
   */
  async getAsync(url, response, exception) {
    await axios({
      method: "get",
      url: url,
      timeout: TIME_OUT_MS,
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
      .then(result => {
        response(handleResults(result));
      })
      .catch(error => {
        if (exception) {
          exception(error);
        } else {
          console.log(error);
        }
      });
  },
  /*
   * get 请求
   * @param url
   * @param response 请求成功时的回调函数
   * @param exception 异常的回调函数
   */
  get(url, response, exception) {
    axios({
      method: "get",
      url: url,
      timeout: TIME_OUT_MS,
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
      .then(result => {
        response(handleResults(result));
      })
      .catch(error => {
        if (exception) {
          exception(error);
        } else {
          console.log(error);
        }
      });
  },
  /*
   * 导入文件
   * @param url
   * @param data
   * @param response 请求成功时的回调函数
   * @param exception 异常的回调函数
   */
  uploadFile(url, data, response, exception) {
    axios({
      method: "post",
      url: url,
      data: handleParams(data),
      dataType: "json",
      processData: false,
      contentType: false
    })
      .then(result => {
        response(handleResults(result, data));
      })
      .catch(error => {
        if (exception) {
          exception(error);
        } else {
          console.log(error);
        }
      });
  },
  /*
   * 下载文件用，导出 Excel 表格可以用这个方法
   * @param url
   * @param param
   * @param fileName 如果是导出 Excel 表格文件名后缀最好用.xls 而不是.xlsx，否则文件可能会因为格式错误导致无法打开
   * @param exception 异常的回调函数
   */
  downloadFile(url, data, fileName, exception) {
    axios({
      method: "post",
      url: url,
      data: handleParams(data),
      responseType: "blob"
    })
      .then(result => {
        const excelBlob = result.data;
        if ("msSaveOrOpenBlob" in navigator) {
          // Microsoft Edge and Microsoft Internet Explorer 10-11
          window.navigator.msSaveOrOpenBlob(excelBlob, fileName);
        } else {
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          const blob = new Blob([excelBlob]);
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          document.body.removeChild(elink);
        }
      })
      .catch(error => {
        if (exception) {
          exception(error);
        } else {
          console.log(error);
        }
      });
  },

  uploadFileFormData(url, data, response, exception) {
    axios({
      method: "post",
      url: url,
      data: data,
      timeout: TIME_OUT_MS,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(result => {
        response(handleResults(result));
      })
      .catch(error => {
        if (exception) {
          exception(error);
        } else {
          console.log(error);
        }
      });
  }
};
