import mpx, { createApp } from '@mpxjs/core'
import apiProxy from '@mpxjs/api-proxy'

// import { defaultConfigInfo } from '../src/code/libs/index.js';
// import { defaultConfigInfo } from './code/libs/index.js'

mpx.use(apiProxy, { usePromise: true })

createApp({
  globalData: {
    publicType: {}, // 小程序类型 全局使用
    // globalFunction: GlobalFunction,
    // themeType: configLib.themeType,
    // imgUrl: defaultConfigInfo.defaultImagePath,
    // hospitalConfigInfo: HospitalConfigInfo,
    // StrategyConfigService: new StrategyConfigService(),
    Descriptiontext: null,
    AliLobalData: {
      checkedIndex: '', // 选择的就诊人index
      patientItemDetail: '', // 编辑就诊人数据
      checkedPatinetItem: '', // 切换就诊人数据
      checkedPatinetStatus: '', // 切换就诊人标识
      hospitalInfo: '', // 医院名称和logo
      descriptions: '', // 提示内容
      newContent: '', // 新闻内容
      qryOrderData: '' // 订单详情数据
    }
  },

  onLaunch () {
    // onLaunch
  }
})
