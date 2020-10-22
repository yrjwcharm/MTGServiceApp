
/**
 * 截取昵称某字段制作头像
 * @param {string} name nickname
 */
export function parseNickname(name) {
  const nameLen = name.length;
  let nickname = '';
  // 如果昵称小于两个字符，则直接使用。
  if (nameLen <= 2) {
    nickname = name;
  } 
  // 如果用户输入的姓名大于等于3个字符，截取后面两位
  else {
    const first = name.substring(0, 1);
    // 如果第一个字符是中文
    if (!(/[^\u4e00-\u9fa5]/.test(first))) {
      // 截取倒数两位汉字
      nickname = name.substring(nameLen - 2);
    } else {
      // 截取前面的两个英文字母
      nickname = name.substring(0, 2).toUpperCase();
    }
  }
  return nickname;
}

/**
 * 将秒转化为时分秒
 */
export const formateSeconds = (endTime) => {
  let ss = Number.parseInt(endTime); // 将传入的秒的值转化为Number
  let mm = 0; // 初始化分
  let hh = 0; // 初始化小时
  let result = '';
  // 如果秒数大于60，将秒数转换成整数
  if (ss > 60) {
    mm = Number.parseInt(String(ss / 60)); // 获取分钟，除以60取整数，得到整数分钟
    ss = Number.parseInt(String(ss % 60)); // 获取秒数，秒数取佘，得到整数秒数
    // 如果分钟大于60，将分钟转换成小时
    if (mm > 60) {
      hh = Number.parseInt(String(mm / 60)); // 获取小时，获取分钟除以60，得到整数小时
      mm = Number.parseInt(String(mm % 60)); // 获取小时后取佘的分，获取分钟除以60取佘的分
    }
  }
  /* eslint-disable */
  result = `${hh > 0 ? hh.toString().padStart(2, '0') + ':' : ''}${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  /* eslint-enable */
  return result;
}
