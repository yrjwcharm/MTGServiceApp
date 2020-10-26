const idNo15To18 = (idNo) => {  //15位转18位身份证号
  if (idNo.length == '15') {
    const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
    const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
    let idNoTemp = 0, i;
    idNo = idNo.substr(0, 6) + '19' + idNo.substr(6, idNo.length - 6)
    for (i = 0; i < 17; i++) {
      idNoTemp += idNo.substr(i, 1) * arrInt[i]
    }
    idNo += arrCh[idNoTemp % 11]
    return idNo
  }
  return idNo
};
//校验位的检测
export const checkParity = (idNo) => {
  //15位转18位
  idNo = idNo15To18(idNo)
  const len = idNo.length
  if (len == '18') {
    const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
    const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
    let idNoTemp = 0, i, valnum
    for (i = 0; i < 17; i++) {
      idNoTemp += idNo.substr(i, 1) * arrInt[i]
    }
    valnum = arrCh[idNoTemp % 11]
    if (valnum == idNo.substr(17, 1)) {
      return true
    }
    return false
  }
  return false
};
