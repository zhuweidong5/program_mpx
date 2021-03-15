/* eslint-disable no-multi-spaces */
const TITLE = '加载中...'; // 默认提示
const DURATION = 2000; // 默认 延迟 2000
const CANCEL = '0'; // 点击取消 返回 0 字符类型
const CONFIRM = '1'; // 点击确认 返回 1 字符类型
const CONFIRMTEXT = '确定'; // 默认确定框文字
const noOpenText = '暂未开放';

class AlertService {
  // 暂未开放
  static showToastNoOpen = () => {
    if (__mpx_mode__ === 'ali') {
      my.showToast({
        content: noOpenText,
        icon: 'none',
        duration: DURATION // 默认 延迟
      });
    } else {
      wx.showToast({
        title: noOpenText,
        icon: 'none',
        duration: DURATION, // 默认 延迟
        mask: true
      });
    }

  };

  // 打开loading
  static showLoading = title => {
    if (__mpx_mode__ === 'ali') {
      my.showLoading({
        content: title || TITLE,
        mask: true
      });
    } else {
      wx.showLoading({
        title: title || TITLE,
        mask: true
      });
    }

  };

  // 关闭 loading
  static hideLoading = () => {
    if (__mpx_mode__ === 'ali') {
      my.hideLoading();
    } else {
      wx.hideLoading();
    }

  };

  // 提示框
  static showToast = title => {
    if (__mpx_mode__ === 'ali') {
      my.showToast({
        type: 'none',
        content: title || '错误',
        duration: DURATION // 默认 延迟 2000
      });
    } else {
      wx.showToast({
        title: title || '错误',
        icon: 'none',
        duration: DURATION, // 默认 延迟 2000
        mask: true
      });
    }

  };

  // 对话框 确认对话框 无 取消按钮 content（必传）
  // 注意 参数必须按照顺序传入  不需要传入的 默认传空 ‘’ callback可不传
  // AlertService.showModalOk('', '提示内容', '', (res) => { });
  static showModalOk = (title, content, confirmText, callback) => {
    if (__mpx_mode__ === 'ali') {
      my.confirm({
        title: title === '' ? '提示' : title,
        content: content,
        confirmButtonText: confirmText === '' ? CONFIRMTEXT : confirmText,
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            if (callback) {
              callback(CONFIRM); // 确认回调 1
            }
          } else {
            if (callback) {
              callback(CANCEL); // 取消回调 0
            }
          }
        }
      });
    } else {
      wx.showModal({
        title: title === '' ? '提示' : title,
        content: content,
        confirmText: confirmText === '' ? CONFIRMTEXT : confirmText,
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            if (callback) {
              callback(CONFIRM); // 确认回调 1
            }
          } else if (res.cancel) {
            if (callback) {
              callback(CANCEL); // 取消回调 0
            }
          }
        }
      });
    }

  };

  // 对话框 确认对话框  content（必传）
  // 注意 参数必须按照顺序传入  不需要传入的 默认传空 ‘’ callback可不传
  // AlertService.showModalOkOrNotOk('抬头', '提示内容', 'ok按钮', '不ok按钮', (res) => { });
  static showModalOkOrNotOk = (title, content, confirmText, cancelText, callback) => {
    if (__mpx_mode__ === 'ali') {
      my.confirm({
        title: title === '' ? '提示' : title,
        content: content,
        confirmButtonText: confirmText === '' ? CONFIRMTEXT : confirmText,
        cancelButtonText: cancelText==='' ? '取消':cancelText,
        success: (res) => {
          if (res.confirm) {
            if (callback) {
              callback(CONFIRM); // 确认回调 1
            }
          } else {
            if (callback) {
              callback(CANCEL); // 取消回调 0
            }
          }
        }
      });
    }
  };

  // 弹框显示，简易方式，无需传入回调函数
  static showSimpleAlert = (title, content) => {
      if (__mpx_mode__ === 'ali') {
        my.alert({
          title: title,
          content: content,
          buttonText: '我知道了'
        })
      } else {
        wx.showModal({
          title: title,
          content: content,
          showCancel: false,
          mask: true
        });
      }

  };
}

export default AlertService;
