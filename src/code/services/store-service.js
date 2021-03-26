
import { storeLib, storeFunType } from '../../code/libs/index';
import StoreCustom from "../../code/hopistal/store-custom"
import { configLib } from '../../code/libs/index';

import departmentStore from "../../store/patient";
// ... other


let instance = null; // 单例实例，不直接对外暴露
let hospital_id = '';
let customStore = 'customStore';
let customStoreName = null;

/**
 * 对 store 调用的封装
 *
 * @class StoreService
 */
class StoreService {

    // 单例获取
    static getInstance = () => {
        if (!instance) {
            instance = new StoreService();
            return instance;
        }
        return instance;
    }

    constructor() {
        if (!instance) {
            this._init();
        } else {
            // AlertService.showSimpleAlert(titleLib.warning, errorLib.singleton + StoreService.name);
        }
    }

    // 初始化
    _init = async () => {
        // 根据定制 医院id  查询 store
        // 检测是否存在定制化 store
        hospital_id = configLib.hospitalId;
        customStoreName = customStore + '_' + hospital_id;
        this.customstoreType =  StoreCustom.hasOwnProperty(customStoreName);
        // console.log("----- 是否有定制 -----:", customStoreName);
        // console.log("----- 是否有定制customstoreType -----:", this.customstoreType);

        if(this.customstoreType) {
            console.log(configLib.hospitalId+ '----- 医院存在定制化 -----');
        } else {
            console.error(configLib.hospitalId+ '----- 未找到医院定制化 -----');
        }
    }

    // 执行 store 中的 getter 方法
    doGetter = (storeName, getterName) => {
        console.log('----- doGetter -----')
        let storeData = this._storeCustomcheck(storeName, getterName, storeFunType.getters);
        return storeData;
    }

    // 执行 store 中的同步步方法
    doMutation = (storeName, mutationName, argumentValue) => {
        console.log('----- doMutation -----')
        let storeData = this._storeCustomcheck(storeName, mutationName, storeFunType.mutations, argumentValue);
        return storeData;
    }

    // 执行 store 中的异步方法
    doAction = async (storeName, actionName, argumentValue, inPage) => {
        console.log('----- doAction -----', storeName, ' -----', actionName, ' -----', argumentValue, ' -----', inPage)
        let storeData = this._storeCustomcheck(storeName, actionName, storeFunType.actions, argumentValue, inPage);
        return storeData;
    }


    // 根据方法名 去查找 是否存在定制化 store 方法 storeName store名  storeNameFun 方法  storeType sotre 调用的对应类型  argumentValue 方法参数
    _storeCustomcheck(storeName, storeNameFun, storeType, argumentValue) {
        // console.log( '----- 查找定制方法 -----',storeName, '-----', storeNameFun, '-----', storeType, '-----',  argumentValue);
        
        try{
            const _storeName = storeName+'_'+storeNameFun;  // 获取定制化 方法名称
            // console.log('----- 定制方法存在吗1 -----', _storeName);

            // 标准store
            let storeRef = this._getStore(storeName);

            // console.log('当前调用的 store-- ---', storeName,'当前调用的 store 方法 名称--- ---', storeNameFun);

            // 检测是否存在定制化 store 如果没有 直接 走标准
            if(this.customstoreType) {

                // 获取store 实例中的 方法  getters || mutations || actions
                const customStoreIItemFun = StoreCustom[customStoreName][storeType];
                // console.log( '----- 定制方法存在吗3 -----', customStoreIItemFun);


                // 检查是否存在 定制方法---
                const _scustomNameType = customStoreIItemFun.hasOwnProperty(_storeName);

                // console.log(_storeName, '----- 定制方法存在吗2 -----', _scustomNameType);

                // console.log('storeType:', storeType) // actions
                // console.log('storeFunType.actions:', storeFunType.actions) // actions

                // 读取定制化 方法 不存在定制化方法 走标准
                switch (storeType) {  
                    case storeFunType.getters: 
                    return  _scustomNameType ? StoreCustom[customStoreName].getters[_storeName] : storeRef.getters[storeNameFun];
                
                    case storeFunType.mutations: 
                    return  _scustomNameType ? StoreCustom[customStoreName].commit(_storeName, argumentValue): storeRef.commit(storeNameFun, argumentValue);

                    case storeFunType.actions: 
                    return  _scustomNameType ? StoreCustom[customStoreName].dispatch(_storeName, argumentValue) : storeRef.dispatch(storeNameFun, argumentValue);

                    default: 
                    throw new Error('Not found store: ' + storeType);
                }

            } else {
                switch (storeType) {  
                    case storeFunType.getters: 
                    return   storeRef.getters[storeNameFun];
                    
                    case storeFunType.mutations: 
                    return   storeRef.commit(storeNameFun, argumentValue);

                    case storeFunType.actions: 
                    return   storeRef.dispatch(storeNameFun, argumentValue);

                    default: 
                    throw new Error('Not found store: ' + storeType);
                }
            }
        }catch(e) {
            console.log('没找到定制方法',e);
        }
    }
    

    // 找到真正要执行的 store
    _getStore = (storeName) => {
        let storeRef;
        // console.log('storeName1', storeName)
        // console.log('storeName2', storeLib.departmentStore)
        switch (storeName) {

            // 科室...
            case storeLib.departmentStore: {
                storeRef = departmentStore;
                break;
            }

            // ...other
            
            default: {
                throw new Error('Not found store: ' + storeName);
                storeRef = null;
                break;
            }
        }

        return storeRef;
    }
}
export { StoreService };
