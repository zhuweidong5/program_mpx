import { createStore } from '@mpxjs/core';
// import { configLib } from '@/code/libs';
// import { actionUrlpath } from '@/code/libs/path/path-library';

// import { pathLibrary } from '../../libs/path/path-library';
var appInst =  getApp();
// 医院定制化 store ，用于覆盖标准 store 中定制化的方法或属性
const customStore_zjksdeyyadmin = createStore({
  state: {

    devHospitalMenu:{

      // 固定区域 菜单
      "menu_1":[{
        menuList: [
          // {icon_url: `${appInst.globalData.imgUrl}icon/icon_register.png`, name: '预约挂号', link_url: actionUrlpath.SUB_REG_INDEX, status: true, params: {'sub_reg_type': BasePublicLibrary.subRegType[0]}},
          // {icon_url: `${appInst.globalData.imgUrl}icon/icon_outpatient_pay.png`, name: '门诊缴费', link_url: actionUrlpath.OUTPATIENT_PAYMENT, status: true},
          // {icon_url: `${appInst.globalData.imgUrl}icon/icon_inpatient_pay.png`, name: '住院缴费', link_url: actionUrlpath.INPATIENT_PAYMENT, status: true},
        ]
      }],

      // 滑动区域菜单
      "menu_2":[{
        group_code : "004",
        group_name: '诊疗服务',
        group_show : true,
        menuList: [
          // {icon_url: `${appInst.globalData.imgUrl}laszyy/icon_register.png`, name: '查看报告', link_url: actionUrlpath.VIEW_REPORT, status: true, show: true, tips: '快捷高效查询'},
          // {icon_url: `${appInst.globalData.imgUrl}icon/icon_outpatientpayment.png`, name: '门诊缴费记录', link_url: actionUrlpath.OUTPATIENT_PAYMENT_RECORD, status: true, show: true, tips: '快捷高效查询'},
          // {icon_url: `${appInst.globalData.imgUrl}laszyy/icon_register.png`, name: '住院一日清', link_url: actionUrlpath.INPATIENT_ONE_DAY, status: true, show: true, tips: '快捷高效查询'},
          // {icon_url: `${appInst.globalData.imgUrl}laszyy/icon_register.png`, name: '住院缴费记录', link_url: actionUrlpath.INPATIENT_PAYMENT_RECORD, status: true, show: true, tips: '快捷高效查询'},
        ]
      }],

      // 个人中心 菜单
      "menu_3":[
        {
          title: '我的就诊人',
        //   viewid: pathLibrary.PACHAGES_PATIENT_LIST,
        //   img:
        //       `${appInst.globalData.imgUrl}default/icon_me_patient.png`,
        //   goTitle: '我的就诊人',
        //   check: true
        // },
        // {
        //   title: '我的预约挂号',
        //   viewid: pathLibrary.PACHAGES_APPOINTMENT_RECORD,
        //   img:
        //       `${appInst.globalData.imgUrl}default/icon_accountmanagement.png`,
        //   goTitle: '我的预约挂号',
        //   check: true
        // },
        // {
        //   title: '门诊缴费记录',
        //   viewid: pathLibrary.PACHAGES_OUTPATIENT_PAYMENT_LIST,
        //   img:
        //       `${appInst.globalData.imgUrl}default/icon_outpatient.png`,
        //   goTitle: '我的门诊缴费',
        //   check: true
        // },
        // {
        //   title: '住院缴费记录',
        //   viewid: pathLibrary.PACHAGES_INPATIENT_PATMENT_RECORD,
        //   img:
        //       `${appInst.globalData.imgUrl}default/icon_hospitalpaycost.png`,
        //   goTitle: '我的住院缴费',
        //   check: true
        }
      ],
    }
  },

  getters: {
    // 读取 菜单列表  定制 方法写法  标准store 文件名  加 定制方法名 _ 拼接  hospitalInfoStore_getDevHospitalMenu
    hospitalInfoStore_getDevHospitalMenu: state => {
        // console.log('定制化 数据读取成功----getDevHospitalMenu--');
        return state.devHospitalMenu
    },



  },

  // 同步
  mutations: {
 

  },

  // 异步
  actions: {
   
  }
});

export default customStore_zjksdeyyadmin;
