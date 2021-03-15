// 医院 配置定义
const hospitalConfigInfo_zjksdeyyadmin = {
  hospitalName: '张家口市第二医院',
  themeType: 0, // 主题肤色  0 蓝色  1 粉色
  shortcutSubscribe: '0', // 【科室列表】快捷预约挂号 是否显示  【0 显示】 【1 不显示】 默认 【0】
  outpatientPayment: '1', // 门诊缴费 多门诊/单门诊  【0 单门诊 】 【1 多门诊】 默认 【0】
  qryVisitTimeType: '1', // 预约挂号是否存在小时间段排班  【0 不存在】 【1 存在】 默认 【0】
  clinicType: '0', // 排班展示 类型 0 （专家 + 普通） 1 （专家） 2 （普通） 默认 0
  inpatientPatient: '8', // 住院缴费 查询组件 0（就诊人加 姓名 住院号） 1 （就诊人加 姓名 身份证 住院号） 2（姓名 住院号） 3（姓名 身份证 住院号） 4 （住院号）5（姓名 身份证） 6(和门诊缴费一样通过选择就诊人查询)  7 （就诊人 || 姓名+手机号）  8  （就诊人 + 姓名 住院号，姓名可编辑） 默认 0
  outpatientPatient: '6', // 门诊缴费缴费 查询组件 0（就诊人加 姓名 住院号） 1 （就诊人加 姓名 身份证 住院号） 2（姓名 住院号） 3（姓名 身份证 住院号） 4 （住院号）5（姓名 身份证） 6(和门诊缴费一样通过选择就诊人查询)  7 （就诊人 || 姓名+手机号）  8  （就诊人 + 姓名 住院号，姓名可编辑） 默认 0
  eCardPatient: '1', // 一卡通查询 查询组件 0（就诊人加 姓名 就诊卡 1 （就诊人加 姓名 身份证 就诊卡） 默认 0
  virtualCardPay: '0', // 是否允许对虚拟卡进行充值  【0 允许】  【1 不允许】 默认 【0】
  searchBar: '1', // 0 科室列表界面无搜索条 1 有搜索条 默认1
  showSubRegNotice: '0', // 0 不显示 1 显示预约挂号须知 默认【0】
  departmentType: '0',  // 科室列表  0 一二级样式 1 一级并按字母排序
  hasOneCardPay: '0',    // 是否 支持 一卡通支付  0  不支持 1支持  默认 0
  outpatientPayType: '0',  // 门诊缴费 时 处方是否支持单多选  0 不支持，单门诊一次性支付 1 多选 2 单选   默认0
  checkReportType: '4',   // 查看报告类型: 0: 门诊报告 + 住院报告, 1: 检查报告 + 检验报告, 2: 检查报告 + 检验报告 + 体检报告, 3: 检查报告 + 体检报告  4: 检验报告 + 体检报告 5 检查报告 6 门诊报告 + 体检报告
  outpatientDetailType: '0', // 门诊缴费 时 查看订单详情是否支持状态查询 0 不支持，1，支持
  showOneDaySettlement: '1', // 是否显示住院一日清按钮  0 显示 1 隐藏  默认 0
  inpatientPayType: '1', // 住院缴费支付  0  微信支付宝 1 跳转支付确认页面
  haveOnLineCardBuilding: '1',  // 是否有在线建卡 0  没有,  1 有
  patientSelectSubReg: '0', // 预约挂号就诊人面板 0 姓名+身份证
  patientType: '0', // 新增就诊人时是否显示和就诊人关系 【0 显示】【1 不显示】
  patientChildrenType: '0', // 就诊人类型是否显示儿童【0 显示】 【1 不显示】
  patientOthersType: '0',   // 就诊人类型是否显示他人【0 显示】 【1 不显示】
  reportListTextType: '2',   // 报告列表显示文字类型【0 不显示】【1 检验完成 + 检验中】 【2 已出报告+未出报告】
  hasShowHospitalIcon: '0',  // 是否显示医院浮动图标  【0 显示】 【1 不显示】
  isCurrentDaySubPay: '1', // 预约支付是否支持立即支付 【0 就诊日支付】 【1 立即支付】
  testReport:'0', //  查看体检报告是否需要调用查询详情接口 0 不需要 ，1 需要
  pId: 'mtxk07famhk3dmyidv5onq==',  // 数据埋点的pid
  showPatientAddress: '1',   // 添加就诊人是否显示地址【0 显示】 【1 不显示】
  noPatientCard: '1',// 特殊老医院无就诊卡 0 有就诊卡 1 无就诊卡
  buildCardType: '1', // 在线建卡展示的字段, 0, 表示只展示【身份证 + 姓名 + 手机号】, 1 暂时表示其他, 其他情况待补充
  generalScheduleDoctor: '0', // 特殊医院普通门诊 0 到科室(默认标准) 1 到专家(非标准)
  oneCardPayTip: '0', // 一卡通充值页面是否显示提醒  【0 显示】 【1 不显示】 默认0
  visitTimeType: '0',  //  增加预约挂号的时候小时间段入参字段用哪个?  0 visit_time  1 clinic_time_quantum  默认 0;
  daySubscribeType: '0',   // 针对某医院 本日的挂号为预约功能定制  0 否  1 是 默认 0;
  subscribePayType: '0',   // 预约成功后 不需要支付 直接展示预约成功 0 否  1 是  默认 0;
  hasOneCardPatientIdType: '0',  // 一卡通查询是否需要就诊卡 patient_id 0 否 1 是 默认 0;
  indexShowMeTheMoney: '0', // 首页是否显示就诊卡余额 0 不显示 1 显示
  depListWithLetter: '0', // 是否只展示一级科室并右侧带有字母, 0不是, 1是
  outpatientPaymentRecordInfo: '1',  // 门诊缴费查询 需要 customer_id && 不需要 patient_card ;  0 不是  1 是的  默认 0 标准 
  addPatientJustNameCardPhone: '0',   // 老UI项目 添加就诊人 只需要 姓名就诊卡号手机号, 与其他比较标准的 做个区别 【1:姓名就诊卡号手机号】 【0 : 其他标准】
  reportHaveIdCard: '1', // 查看报告 非体检报告的话 身份证是否显示? 0 不显示  1显示 默认1
  appointmentRegisterAlone: '0', // 预约和挂号是否是单独入口,(取消订单时重新预约按钮也要传subRegType值) 1 分开, 默认 0 不分开
  appointmentSpecialState: '0', // 预约待支付是否是特殊状态,有些医院预约完待支付状态是0 不是7,   1 是特殊状态, 0 正常标准
  patientBuildHaveRelationship: '0', // 在线建卡是否有关系字段 1 有,  默认0没有
  specialChildRelations: '0',  // 特殊情况儿童关系,有医院儿童关系和本人他人无区别, 仅仅是关系字段不同, 1 是特殊, 0 标准
  manyDistrict: '0',  // 预约挂号科室列表是否根据多院区各自院区id请求列表 1 多院区,  0 默认
  windowPayment: '0', // 门诊缴费不支持线上支付, 院内卡到窗口缴费 1 窗口缴费  0 线上支付
  haveEcard: '0', // 是否带一卡通充值功能  1 有, 0无
  addSubscriptionType: '0', // 专家/普通门诊预约接口参数区分 【0 旧参数】 【1 新参数】
  showPatientCard: '0', // 门诊缴费-是否显示就诊卡  【0 显示就诊卡和身份证】 【1 显示就诊人和住院号】
  noPatientInfo: '1', // 添加就诊人页面-部分信息(出生时间,性别,等)是否需要  【0 需要】 【1 不需要】
  noOrYesDetail: '1', // 单门诊缴费处方是否不能看详情  1 不能看  0 默认 
  hasInpatientPayQryBalance: '0', // 住院缴费确认页面是否查询一卡通余额 1 有, 0无
  hasQryMenu: '0', // 是否获取菜单信息 getMenuGroupByHospitalId  1 不请求 0 请求
  hasQryMessageConfig: '0', // 是否请求 QryMessageConfig  1 不请求 0 请求
  createOrderParam: '0', // 门诊缴费-订单支付接口是否需要参数feeType和patient_card  【0 需要】 【1 不需要】
  isQryprescriptionDetail: '1', // 门诊缴费-如果处方列表有setFeeDetail就取,否则就查处方详情接口  【0 查详情接口】 【1 不查详情接口,从处方列表取setFeeDetail】
  qryVisitTimeScheduleId: '1', // 预约挂号查询小时间段schedule_id取【1 resource_id】【0 schedule_id】


 };

export default hospitalConfigInfo_zjksdeyyadmin;
