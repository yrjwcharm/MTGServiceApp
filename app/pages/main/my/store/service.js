import Request,{ HOST_MANAGE }  from '@request';
import request from '../../../../request/NetUtils';
import {HOST} from '../../../../request';
/**
 * 更新用户类型
 */
export const fetchUpdateUserType = (params) => {
    return Request.post(HOST_MANAGE+'/userController/updateUserType', params,);
}

/**
 * 上传头像
 */
export const fetchUploadPhoto = (images,params,options) => {
    return Request.upload(HOST_MANAGE+'/uploadController/perfect/uploadPhoto', images,params,options);
}

/**
 * 完善个人信息
 */
export const fetchUpdateInfo = (params) => {
    return Request.post(HOST_MANAGE+'/userController/perfect/updateInfo', params,);
}

/**
 *上传资质认证
 */
export const fetchUploadAnnex = (images,params,options) => {
    return Request.upload(HOST_MANAGE+'/uploadController/perfect/uploadAnnex',images, params,options);
}


/**
 *获取个人信息
 */
export const getUserInfo = (params) => {
    return Request.get(HOST_MANAGE+'/userController/getUserInfo',params, );
}

/**
 *更新个人信息
 */
export const updateUserInfo = (params) => {
    return Request.post(HOST_MANAGE+'/userController/updateUserInfo', params, );
}
/**
 *跳过完善信息
 */
export const skipInitComplete = () => {
    return Request.post(HOST_MANAGE+'/userController/skipInitComplete', );
}

/**
 *注册完成页点击按钮记录操作
 */
export const updateInitComplete = (params) => {
    return Request.post(HOST_MANAGE+'/userController/updateInitComplete',params );
}
export const fetchQRCardList = () => {
    return {
        myQRCard: [
            {
                id: '1',
                imgUri: "https://facebook.github.io/react-native/img/tiny_logo.png",
                title: '内蒙古自治区电子健康卡',
                text: '通过扫描内蒙古电子健康二维码，可在窗口挂号、自助终端身份验证、取药等作为身份验证使用'
            },
        ]
    }
}

export const fetchQrCardDetail = ({ uId }) => {
    return request.get(`${HOST_MANAGE}/userController/getQRcode`, uId);
}

export const fetchQRCardInfo = ({ uId }) => {
    return request.get(`${HOST_MANAGE}/userController/getQRcodeInfo`, uId);
}

// 验证信息获取二维码
export const postQrCard = (data) => {
    return request.post(`${HOST_MANAGE}/userController/createQRcode`, data);
}

// 获取健康史列表
export const fetchHealthHistoryList = () => {
    return request.get(`${HOST_BUSINESS}/health/history/list`);
}

// 获取每一项健康史内容
export const fetchHealthHistoryDetail = ({ typeCode }) => {
    return request.get(`${HOST_BUSINESS}/health/history/info?typeCode=` + typeCode);
}

// 提交健康史内容
export const putSubmitHealthHistoryDetail = (data) => {
    return request.put(`${HOST_BUSINESS}/health/history/update`, data);
}

// 完善信息-获取个人信息
export const fetchUserBasicInfo = ({ uId }) => {
    return request.get(`${HOST_MANAGE}/userController/basic/findInfo`, uId);
}

// 完善信息 获取基本信息
export const fetchUserBasicInfoValue = ({ uId }) => {
    return request.get(`${HOST_MANAGE}/userController/basic/findBasicInfo?uId=` + uId);
}

// 完善信息 根据code 修改基本信息basicInfoSetting里的值, switch:0否1是
export const postChangeBasicInfoValue = (data) => {
    return request.post(`${HOST_MANAGE}/userController/basic/updateBasicInfo`, data);
}

// 完善信息 修改个人信息
export const postChangeUserBasicInfo = (data) => {
    return request.post(`${HOST_MANAGE}/userController/basic/updateMyInfo`, data);
}

/**
 * 提交反馈
 * @param data {title:'',info:'',contactWay:'',image1:'',image2:'',image3:'',image4:'',image5:''}
 * @returns {Promise<any | never>}
 */
export const postSuggestInsert = (data) => {
    return request.post(`${HOST_MANAGE}/suggest/insert`, data);
}

/**
 *上传图片
 */
export const fetchUpload = (images, params, options) => {
    return request.upload(HOST_MANAGE + '/uploadController/up/file', images, params, options);
}


// 用户退出登录
export const fetchUserLoginOut = () => {
    return request.get(HOST + '/login/logout');
}


/**
 * 用户获取我的服务列表
 * data: {}
 */
export const getUserServiceList = (data) => {
    return request.get(`${HOST}/shop/user/service/list`, data);
}


