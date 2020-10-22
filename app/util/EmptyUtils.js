/**
 * @author: liy_lmn
 * @date: 2019-12-16
 * @description: 判断数据是否为空
 */
export function getKeysLength(data) {
    return Object.keys(data).length
}

export function isEmpty(obj) {
    if (typeof (obj) != 'number' && (!obj || obj == null || obj == ' ' || obj == undefined || typeof (obj) == 'undefined')) {
        return true;
    }
    return false;
}
