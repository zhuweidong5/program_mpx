/*
 *  小程序 路由 跳转 统一 处理
 */

// import { actionUrl } from '../libs/path/path-library';
// import alertService from './alert-service';
// import GlobalFunction from '../utils/global-function';
export default class RouterService {
  // 进行tab页面跳转
  goSwitchTab(path) {
    if (__mpx_mode__ === 'ali') {
      my.switchTab({ url: path });
    } else {
      wx.switchTab({ url: path });
    }
  }

  // 关闭所有页面，打开到应用内的某个页面
  reLaunch(path, params) {
    if (__mpx_mode__ === 'ali') {
      my.reLaunch({ url: `${path}${_dataToUrl(params)}` });
    } else {
      wx.reLaunch({ url: `${path}${_dataToUrl(params)}` });
    }
  }

  // 进行组件页面跳转
  goNavigateTo(path, params) {
    console.log('当前路由跳转参数 --- ', path, + '----携带参数---', params);
    if (__mpx_mode__ === 'ali') {
      my.navigateTo({ url: `${path}${_dataToUrl(params)}` });
    } else {
      wx.navigateTo({ url: `${path}${_dataToUrl(params)}` });

    }
  }

  // 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
  goNavigateBack(delta) {
    if (__mpx_mode__ === 'ali') {
      my.navigateBack({delta});
    } else {
      wx.navigateBack({delta});
    }
  }

  // 外部定义菜单跳转
//   goNavigateToAction(item, params) {
//     console.log('---------', item);
//     // 判断 该菜单是否启用
//     if (item.status) {
//       GlobalFunction.init().throttle(() => {
//         _statusOpen(item, params);
//       }, 2000, this);
//     } else {
//     //   alertService.showToastNoOpen();
//     }
//   }
};

// 菜单启用 - 正常跳转
// const _statusOpen = (item, params) => {
//   console.log('-----0000----', item, params);
//   // 判断 path-library.js 中 是否 存在该路径
//   const _url = item.link_url || item.mp_url;
//   if (actionUrl[_url]) {
//     console.log('---1111------', `${actionUrl[_url]}${_dataToUrl(params)}`);
//     wx.navigateTo({ url: `${actionUrl[_url]}${_dataToUrl(params)}` });
//   } else {
//     console.error(`未找到路由${_url}, 请在path-library.js中检查其是否存在`);
//   }
// };

// 参数处理
const _dataToUrl = (data) => {
  let str = _urlEncode(data);
  if (str) {
    str = str.replace('&', '?');
  }
  console.log('str', str);
  return str;
};

const _urlEncode = (param, key, encode) => {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += _urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};
