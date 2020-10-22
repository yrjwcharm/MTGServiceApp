import Request,{HOST_NM, HOST_MANAGE,HOST}  from '@request';
/**
 * 获取验证码(统一为一个)
 */
export const fetchGetVerificationCode = (params) => {
    return Request.get(HOST+'/verification/getVerificationCode', params,);
}
/**
 * 发送验证码
 */
export const fetchSendCode = (params) => {
    return Request.get(HOST_MANAGE+'/verification/getVerificationCode/login', params,);
}
/**
 * 找回密码发送验证码
 */
export const fetchFindPswSendCode = (params) => {
    return Request.get(HOST_MANAGE+'/verification/getVerificationCode/retrievePassword', params,);
}
/**
 * 判断验证吗是否正确
 */
export const fetchCheckCode = (params) => {
    return Request.get(HOST+'/login/checkCode', params);
}
/**
 * 验证码登录
 */
export const fetchCodeLogin = (params) => {
    return Request.get(HOST+'/login/verificationLogin', params,);
}
/**
 * 密码登录
 */
export const fetchPswLogin = (params) => {
    return Request.post(HOST+'/login/login', params,);
}
/**
 * 修改密码
 */
export const fetchUpdatePassword = (params,options) => {
    return Request.post(HOST_MANAGE+'/userController/updatePassword', params,options);
}

/**
 * 获取个人信息
 */
export const fetchFindInfo = (restOptions) => {
    return Request.get(HOST_MANAGE+'/userController/perfect/findInfo',{}, restOptions);
}
/**
 * 判断是否注册过的手机号，如果是则不能绑定
 * code 105（重复） 106（已存在）
 */
export const fetchisBindPhone = (params) => {
    return Request.get(HOST_MANAGE+'/userController/isBindPhone', params,);
}

/**
 * 绑定手机号
 */
export const fetchbindPhone = (params) => {
    return Request.get(HOST_MANAGE+'/userController/bindPhone', params,);
}

/**
 * 注册
 */
export const fetchRegister = (params) => {
    return Request.post(HOST+'/login/register', params,);
}


