export const regExp = {
    Reg_IDCardNo: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, // 身份证
    Reg_TelNo: /^1[3|4|5|6|7|8|9]\d{9}$/,// 手机号
    // Reg_PassWord: /^(\w){8,16}$/,// 登录密码
    Reg_PassWord: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,// 密码
    Reg_Number: /(^\d{1,}$)|(^\d{1,}(\.\d+)$)/, // 验证数字
    // Reg_Name: /^[\u4e00-\u9fa5]{2,30}|[\w\-\u4e00-\u9fa5]{4,30}$/,//验证昵称
    Reg_Name: /^([\w\u4e00-\u9fa5\-_]{4,30})|([\u4e00-\u9fa5]{2,15})$/,//验证昵称
    Reg_RelName: /^[\u4E00-\u9FA5]{2,10}$/,//验证昵称
    Reg_Text: /^[0-9a-zA-Z\u4e00-\u9fa5`~!@#$^&*\\()=|{}':;',\\\\.<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]{1,20}$/,
    Reg_email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,//邮箱
    RegNull: /^\s*$/g,// 空字符
    RegHtmlLabel: /<\/?.+?\/?>/g,// html标签
    invoiceTitle: /^[0-9a-zA-Z\(\)\（\）\u4e00-\u9fa5]{0,50}$/, //发票抬头
    identifyNumber: /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/, //纳税人识别号
    bankNumber: /^\d{16,19}$/, //银行卡
    SaftCode: /^\d{3}$/, //银行卡
    Reg_CertificateNo: /^[0-9a-zA-Z]{6,18}$/,// 18位证件号
    // Reg_Topic: /^[,.，。'"'"?？0-9a-zA-Z\u4e00-\u9fa5]{10,}$/,// 创建主题
    Reg_Topic: /(.|\n){5,}/,// 创建主题
};

/**
 * 判断是否为数字
 * @param {string | 要判断的数字} num
 */
export function isNumber(value) {
    if (value === undefined || value === null || value === '') {
        return false
    }

    if (typeof (value) === 'string') {
        //正整数
        var reNumber = /^\d+$/
        //负整数
        var reNeNumber = /^-\d+$/
        //正实数
        var reRealNumber1 = /^[1-9]\d*[.]\d+$/ //非零开头
        var reRealNumber2 = /^0[.]\d+$/ //零开头
        //负实数
        var reNeRealNumber1 = /^-[1-9]\d*[.]\d+$/ //非零开头
        var reNeRealNumber2 = /^-0[.]\d+$/ //零开头

        if (reNumber.test(value) || reNeNumber.test(value) ||
            reRealNumber1.test(value) || reRealNumber2.test(value) ||
            reNeRealNumber1.test(value) || reNeRealNumber2.test(value)) {
            return true
        } else {
            return false
        }
    } else if (typeof (value) === 'number') {
        return true
    } else {
        return false
    }
    return false;
}
