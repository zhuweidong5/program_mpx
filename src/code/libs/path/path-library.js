/* eslint-disable no-multi-spaces */
/**
 * 定义页面路径常量
 */


import hospitalNav from '../../../pages/pachages_hospital/hospital/hospital_nav/index?resolve';
import patientList from '../../../pages/pachages_home/patient/patinet-list/index?resolve';

  const pathLibrary = {
    ACTION_HOME: 'home', // 首页
    ACTION_ME: 'me', // 我
  
    PAGES_HOME: '/pages/home/index', // 首页
    PAGES_ME: '/pages/me/index', // 我

    PACHAGES_HOSPITAL_NAV: hospitalNav,                 // 新增就诊人
    PACHAGES_PATIENT_LIST: patientList               // 就诊人列表


 };
 
 // 定义暴露出去的地址
 const actionUrl = {
  
  'patient-list': patientList // 就诊人管理(就诊人列表)
 };
 
 const actionUrlpath= {
//    'SUB_REG_INDEX': 'sub-reg-index',         // 预约挂号(科室列表)
//    'INPATIENT_PAYMENT': 'inpatient-payment',    // 住院缴费
//    'INPATIENT_PAYMENT_RECORD': 'inpatient-payment-record', // 住院缴费记录
//    'INPATIENT_ONE_DAY': 'inpatient-one-day', // 住院一日清
//    'OUTPATIENT_PAYMENT': 'outpatient-payment',  // 门诊缴费
//    'OUTPATIENT_PAYMENT_RECORD': 'outpatient-payment-record', // 门诊缴费记录
//    'CARD_PAYMENT': 'card-payment',             // 一卡通充值
//    'VIEW_REPORT': 'view-report',               // 查看报告
//    'drug': 'drug',                        // 药学服务
//    'QUEUE_REMIND': 'queue-remind',            // 排队提醒
//    'INPATIENT_REGISTER': 'inpatient-register',   // 住院登记
//    'PATIENT_LIST': 'patient-list', // 就诊人管理(就诊人列表)
//    'map': map   // 地图测试
 
 };
 
 export { pathLibrary, actionUrl, actionUrlpath };
 