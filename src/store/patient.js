/**
 * 科室列表
 */
 import { createStore } from '@mpxjs/core';
 import serverApiLibrary from '../code/http/server-api-library';
 import { HttpService } from '../code/services/http-service';
 import { configLib, BasePublicLibrary, titleLib, errorLib } from '../code/libs/index';
 import AlertService from '../code/services/alert-service';
 
 const departmentStore = createStore({
    state: {
     departmentList: [] // 科室列表
   },
 
   getters: {
 
     // 获取科室列表
     getDepartmentList: (state) => {
       return state.departmentList;
     }
   },
 
   // 同步
   mutations: {
     // 储存科室列表
     setDepartmentList: (state, data) => {
       state.departmentList = data;
     }
   },
 
   // 异步
   actions: {
 
        // 获取 科室列表
        qryAllDepartment: async (context, requestInfo) => {
            try {
                //  const info = {
                //    hospital_id: configLib.hospitalId,
                //    hospital_area_id: requestInfo ? requestInfo.hospital_area_id : '',
                //  };
                
                console.log('走路吗1：', serverApiLibrary.qryList)
        
                const res = await HttpService.getInstance().quickPost(serverApiLibrary.qryList, {});
                console.log('走路吗2：', res)

                if (res.message === 'success') {
                    console.log('走路吗3：', res)
                context.commit('setDepartmentList', res.responseData.list);
                } else {
                //    AlertService.showToast(res.responseMessage);
                }
            } catch (e) {
                console.log('请求错误了-亲', e)
                //  AlertService.showSimpleAlert(titleLib.login, errorLib.httpError);
            }
        }
    }
});
 
export default departmentStore;
 