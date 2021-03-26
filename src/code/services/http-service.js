/*
 * 封装了 http 请求
 */

import { configLib, titleLib, errorLib, serverStatusLib, BasePublicLibrary } from '../libs/index';
import Fly from 'flyio/dist/npm/wx';
import serverApiLibrary from '../http/server-api-library';
import AlertService from '../services/alert-service';
import InPageInfo from '../http/info/in-page-info';

let httpServiceInstance = null; // 单例实例，不直接对外暴露
let miniProgramLoginData= null;
class HttpService {
  // 单例获取
  static getInstance = () => {
    if (!httpServiceInstance) {
      httpServiceInstance = new HttpService();
    }
    return httpServiceInstance;
  }

  constructor() {
    if (!httpServiceInstance) {
      this.timeForCheckToken = 1000; // 检查token的设定时间，毫秒
      this.httpTimeout = 45000; // http请求超时设置，毫秒

      this.token = '';

      this.fly = this._initFly();
      this.inpageObj = new InPageInfo(); // 默认分页
    } else {
      AlertService.showSimpleAlert(titleLib.warning, errorLib.singleton + HttpService.name);
    }
  }

  static getMiniProgramLoginData() {
    return miniProgramLoginData;
  }

  // 初始化，从服务器中获取 token
  init = async () => {
   const a = await this._updateToken();
  }

  // 外部使用，对post做了封装，并自动填充token，正常逻辑中应使用本方法
  quickPost = async (api, info, inPage) => {
    //   console.log('请求地址：', api)
    let myToken;
    if (__mpx_mode__ === 'ali') {
    //   console.log('请求地址2：', api)

    //   myToken = await this.getTokenAli();
      myToken = '';
      // 如果要使得aliLogger自动上报http请求, 需要改成:
      return this._post(api, info, myToken, inPage);
      // return this._postAli(api, info, myToken);
    } else {
      myToken = await this.getToken();

      return this._post(api, info, myToken, inPage);

    }

  }

  // 获取 ali token，异步方法
  getTokenAli = async () => {
    try {
      return new Promise((resolve, reject) => {
        let aliToken = '';
        my.getStorage({
          key: 'token',
          success: (res) => {
            res.data? aliToken = res.data.token : '';
          }
        })

        if (aliToken.length > 0) {
          resolve(aliToken); // 立即返回
        } else {
          // this._checkToken(resolve); // 开启定时检查、
          const _checkToken = () => {
            my.getStorage({
              key: 'token',
              success: (res) => {
                 res.data? aliToken = res.data.token : '';
              }
            })
            if (aliToken.length > 0) {
              resolve(aliToken);
            } else {
              setTimeout(_checkToken, this.timeForCheckToken, resolve);
            }
          };
          _checkToken();
        }


      });
    } catch (e) {
      console.log('catch--------', e);

    }

  }

  // 获取 token，异步方法
  getToken = async () => {
    try {
      return new Promise((resolve, reject) => {
        if (this.token.length > 0) {
          resolve(this.token); // 立即返回
        } else {
          // this._checkToken(resolve); // 开启定时检查、
          const _checkToken = () => {
            if (this.token.length > 0) {
              resolve(this.token);
            } else {
              setTimeout(_checkToken, this.timeForCheckToken, resolve);
            }
          };
          _checkToken();
        }

      });
    } catch (e) {
      console.log('catch--------', e);

    }

  }

  // 内部 post，不做 token 处理，直接发送
  _post = async (api, info, token, inPage) => {
    //   console.log('api:', configLib.serverUrl + api)
    //   console.log('info:', info)
    //   console.log('token:', token)
    return this.fly.post(configLib.serverUrl + api + this._getRandom(), {
      requestToken: token,
      requestData: info,
      pageSize: inPage ? inPage.page_size : this.inpageObj.page_size,
      pageNumber: inPage ? inPage.page_number : this.inpageObj.page_number
    });
  }

  // 内部 post，不做 token 处理，直接发送
  _postAli = async (api, info, token, inPage) => {
    let INFO = {
      requestToken: token,
      requestData: info,
      pageSize: inPage ? inPage.page_size : this.inpageObj.page_size,
      pageNumber: inPage ? inPage.page_number : this.inpageObj.page_number
    }
    return new Promise((resolve, reject) => {
      my.httpRequest({
        url: configLib.serverUrl + api + this._getRandom(),
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        data: INFO,
        dataType: 'json',
        success: (res) => {
          let responseData = res.data; // 获取 responseData
          if (responseData.responseCode === serverStatusLib.tokenTimeOut) {
            // token 过期
            this._updateToken(); // 重新获取 token
            // 弹框提示
            AlertService.showSimpleAlert(titleLib.request, errorLib.tokenTimeOut);
          }
          // 正常响应
          resolve(res.data);
        }
      })
    })

  }

  // 检查 token，如果还没有的话，定时检测一次。检测到了，就立即返回
  _checkToken = (resolveOutside) => {
    // console.log('-------- check again --------', this.token);
    if (this.token.length > 0) {
      // console.log('-------- check Token ready --------', this.token);
      resolveOutside(this.token);
    } else {
      setTimeout(this._checkToken, this.timeForCheckToken, resolveOutside);
    }
  }

  // 初始化 fly 实例
  _initFly = () => {
    let myFly = new Fly();
    myFly.config.timeout = this.httpTimeout; // 超时

    myFly.interceptors.response.use(
      res => {
        let responseData = res.data; // 获取 responseData
        if (responseData.responseCode === serverStatusLib.tokenTimeOut) {
          // token 过期
          this._updateToken(); // 重新获取 token
          // 弹框提示
          AlertService.showSimpleAlert(titleLib.request, errorLib.tokenTimeOut);
        } else {
          // 正常响应
          return responseData;
        }
      },
      err => {
        wx.hideLoading(); // 关闭 loading
        console.error(err);
        let code = err.status;
        switch (code) { // 只处理部分已知类型
          case 404:
            AlertService.showSimpleAlert(titleLib.request, errorLib.apiNotFound);
            break;
          case 500:
            AlertService.showSimpleAlert(titleLib.request, errorLib.apiError);
            break;
          default:
        }
      }
    );

    return myFly;
  }

  // 从服务器中获取 token，并保存下来
  _updateToken =  () => {
    try {

      return new Promise( async (resolve, reject) => {
        let CODE = null;
        let CHANNEL_TYPE = BasePublicLibrary.BROWSER_TYPE; // 获取小程序类型
        if (__mpx_mode__ === 'ali') {
  
            const res = await this._aliLogin(); // 从支付宝服务器中获取code
            if(res.error == 11) {
              console.log('授权结果---', res)
              miniProgramLoginData = res;
              resolve(res);
              return;
              
            } else {
              CODE = res;
              my.setStorageSync({ key: "authCode", data: { authCode: res } });
            }
  
        } else {
          CODE = await this._wxLogin(); // 从微信服务器中获取code
        }
  
        const info = {
          code: CODE,
          channel_type: CHANNEL_TYPE,
          hospital_id: configLib.hospitalId
        };
  
        let responseFromServer = await this._post(serverApiLibrary.miniProgramLogin, info, ''); // 访问医路通服务器
        if (responseFromServer.responseCode === serverStatusLib.success) {
          // 正确时，保存 token
          this.token = responseFromServer.responseToken;
          if (__mpx_mode__ === 'ali') {
            my.setStorage({ key: 'token',
              data: {  token: responseFromServer.responseToken },
              success: function () {
                console.log('token 写入成功');
              }
            });
  
            console.log('登陆成功信息---', responseFromServer);
            miniProgramLoginData = responseFromServer.responseData.aliUserInfo;
            
  
          }
  
          my.setStorageSync({ key: "authType", data: { authType: true } });
          resolve(true);
          // console.log('-------- !!! get it --------', this.token);
        } else {
          // 出错时，仅弹框提示
          wx.hideLoading();
          AlertService.showSimpleAlert(titleLib.login, errorLib.wxLoginError);
        }





      })

 
    } catch (e) {
      AlertService.showSimpleAlert(titleLib.login, errorLib.wxLoginError);
    }
  }

  // 将原始的 wx.login 改造为 Promise
  _wxLogin = () => {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          resolve(res.code);
        },
        fail: (res) => {
          reject(res);
        },
        timeout: (res) => {
          reject(res);
        }
      });
    });
  }

  // 支付宝 授权登陆
  _aliLogin = () => {
    return new Promise((resolve, reject) => {
      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => {
          console.log('授权登录', res);
          resolve(res.authCode);
        },
        fail: (res) => {
          resolve(res);
        },
        timeout: (res) => {
          reject(res);
        }
      });
    });
  }


  // 取随机数，用于发起http请求时附带上的随机数
  _getRandom = () => {
    return '?v=' + Math.random();
  };
}
export { HttpService };
