import getInitState, { getUserInfo } from './state';
import { take, fork, put } from 'redux-saga/effects'
/**
* @author: liy_lmn
* @date: 2019-12-12
* @description: 白名单
* namespace: whitelistdata
*/

export default {
    state: getInitState(),
    reducer: {
        //修改登录data
        //修改登录data
        changeTokenData: (state, {data}) => ({...state, token: data,}),
        changeImTokenData: (state, {data}) => ({...state, imToken: data,}),
        changeUseridData: (state, {data}) => ({...state, userid: data,}),
        changePhone: (state, {data}) => ({...state, phone: data,}),
        changeIsClickRigiseSuccessButton: (state, {data}) => ({...state, isClickRigiseSuccessButton: data,}),
        changeIsVerification: (state, {data}) => ({...state, isVerification: data,}),
        changeUserInfo: (state, {data}) => ({...state,...data, userInfo: {...state.userInfo,...data,}}),
        changeSleepDevice: (state, {data}) => ({...state, sleepDevice: data,}),
        changeMotionDevice: (state, {data}) => ({...state, motionDevice: data,}),
        changePressureDevice: (state, {data}) => ({...state, pressureDevice: data,}),
        changeSugarDevice: (state, {data}) => ({...state, sugarDevice: data,}),
        changeHeartDevice: (state, {data}) => ({...state, heartDevice: data,}),
        changeWeightDevice: (state, {data}) => ({...state, weightDevice: data,}),
        changeBindDevice: (state, {data}) => ({...state, bindDevice: data,}),
        changeDeviceTypeList: (state, {data}) => ({...state, deviceTypeList: data,}),
        changeDeviceSyncDate: (state, {data}) => ({...state, deviceSyncDate: data,}),
        changeEarlyWarning: (state, {data}) => ({...state, earlyWarning: data,}),
        loginOut: (state) => ({ ...state, ...getUserInfo() }),
        reset: () => getInitState(),
        changeUpdateCode: (state, {data}) => ({...state, updateCode: data,}),
        changeVisibleAssessment: (state, {data}) => ({...state, visible_assessment: data,}),
        changeHealthTrackData: (state, {data}) => ({...state, healthTrackData: data,}),
        changeClassType:(state,{data})=>({...state,classRoom:{classType:data}}),
        changeInfoTypeList:(state,{data})=>({...state,infoType:data}),
        changeInfoList:(state,{data})=>({...state,infoList:data,})

    },
    saga: {

    }
}
