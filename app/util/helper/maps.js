import {ThemeFlags} from '../../styles/ThemeFactory';

/**
 * 记录所有测量字段（血压、心率等）对应的中文名称
 * 测量字段为手动录入页面的表单提交key
 */
export const measureValueMap = {
  measureTimeDesc: {label: "测量时间",},

  // 血压
  highPressure: {label: "舒张压(低压mmHg)",},
  lowPressure: {label: "收缩压(高压mmHg)",},
  heartRate: {label: "心率(次/分)",},

  // 心率
  // heartRate: {label: '心率', },

  // 血糖
  bloodSugar: {label: '血糖(mmol/L)'},
  measurePeriod: {label: '测量时段'},
  isuseDrug: {label: '是否用药'},

  // 体脂
  height: {label: '身高(cm)'},
  weight: {label: '体重(kg)'},
  waist: {label: '腰围(cm)'},

  // 饮水
  drinkamount: {label: '饮水量(ML)'},
  drinkTimeDesc: {label: '饮水时间'},

  // 睡眠
  startTimeDesc: {label: '入睡时间'},
  endTimeDesc: {label: '起床时间'},

  // 运动
  sportTime: {label: '运动时长(分)'},
  sportType: {label: '运动类型'},
  sportDateDesc: {label: '运动日期'},

  // 膳食
  dietTimeDesc: {label: '摄入时间'},
  // timetype: { label: '运动日期' },
  name: {label: '食物名称'},
  heat: {label: '热量(千卡)'},
  nums: {label: '数量'},
  unit: {label: '单位'},
  // foodHeatId: { label: '运动日期' },
  // url: { label: '运动日期' },
}

/**
 * 记录任务类型value与路由以及名称相对应
 * {label: "饮水", value: "10001"}
 * {label: "膳食", value: "10002"}
 * {label: "睡眠", value: "10003"}
 * {label: "运动", value: "10004"}
 * {label: "血压", value: "10005"}
 * {label: "心率", value: "10006"}
 * {label: "血糖", value: "10007"}
 * {label: "血脂", value: "10008"}
 * {label: "体脂", value: "10009"}
 * {label: "BMI", value: "10010"}
 * {label: "其他", value: "10011"}
 */
export const measureTypeMap = {
  "10005": {screen: 'PressureRecordScreen', label: '血压', title: '血压测量'},
  "10006": {screen: 'HeartRecordScreen', label: '心率', title: '心率测量'},
  "10007": {screen: 'SugarRecordScreen', label: '血糖', title: '血糖测量'},
  "10009": {screen: 'FatRecordScreen', label: '体脂', title: '体脂测量'},
  "10001": {screen: 'DrinkRecordScreen', label: '饮水', title: '饮水录入'},
  "10003": {screen: 'SleepRecordScreen', label: '睡眠', title: '睡眠录入'},
  "10004": {screen: 'MotionRecordScreen', label: '运动', title: '运动记录'},
  "10002": {screen: 'EatRecordScreen', label: '膳食', title: '膳食录入'},
}

const COLORS = [ThemeFlags['Green'], '#FF7A2A', '#FFB62A'] // 健康史颜色序列
const COLORS2 = [ThemeFlags['Green'], '#5696FF', '#8962ec', '#f48d15']
// 健康史图标
export const healthHistoryTypeMap = {
  "JIAZUSHI": {
    label: '家族史',
    icon: 'jiazushi',
    iconColor: COLORS[0],
  },
  "JIBINGSHI": {
    label: '疾病史',
    icon: 'jibingshi',
    iconColor: COLORS[1],
  },
  "GUOMINSHI": {
    label: '过敏史',
    icon: 'jinjianguoguomin',
    iconColor: COLORS[2],
  },
  "YONGYAOSHI": {
    label: '用药史',
    icon: 'yaopin',
    iconColor: COLORS[0],
  },
  "SHOUSHUSHI": {
    label: '手术史',
    icon: 'shoushu',
    iconColor: COLORS[1],
  },
  "YUEJINGSHENGYUSHI": {
    label: '月经生育史',
    icon: 'nvxing2',
    iconColor: COLORS[2],
  },
  "XIYANSHI": {
    label: '吸烟史',
    icon: 'xiyanqu',
    iconColor: COLORS[0],
  },
  "YINJIUSHI": {
    label: '饮酒史',
    icon: 'yinjiushi',
    iconColor: COLORS[1],
  },
}

// 日常监测图标
export const healthMonitorTypeMap = {
  'XUEYA': {
    label: '血压',
    icon: 'xueya',
    screen: 'PressureHistoryScreen',
    iconColor: COLORS2[0],
  },
  'XINLV': {
    label: '心率',
    icon: 'xinlv',
    screen: 'HeartHistoryScreen',
    iconColor: COLORS2[1],
  },
  'XUETANG': {
    label: '血糖',
    icon: 'xuetang',
    screen: 'SugarHistoryScreen',
    iconColor: COLORS2[2],
  },
  'TIZHONGTIZHI': {
    label: '体重/体脂',
    icon: 'chengtizhong',
    screen: 'FatHistoryScreen',
    iconColor: COLORS2[3],
  },
}

// 健康追踪图标
export const healthTrackTypeMap = {
  'YINSHUI': {
    label: '饮水跟踪',
    icon: 'heshui',
    screen: 'DrinkHistoryScreen',
    iconColor: COLORS2[0],
  },
  'SHANSHI': {
    label: '膳食跟踪',
    icon: 'shanshijiankang',
    screen: 'EatHistoryScreen',
    iconColor: COLORS2[1],
  },
  'SHUIMIAN': {
    label: '睡眠跟踪',
    icon: 'shuimian',
    screen: 'SleepHistoryScreen',
    iconColor: COLORS2[2],
  },
  'YUNDONG': {
    label: '运动跟踪',
    icon: 'paobu',
    screen: 'MotionHistoryScreen',
    iconColor: COLORS2[3],
  },
}


// 妙健康设备类型
export const DataTypeEnums = [
  /**
   * 运动0
   */
  'DATA_SPORT',
  /**
   * 睡眠1
   */
  'DATA_SLEEP',
  /**
   * 血压2
   */
  'DATA_BLOOD_PRESSURE',
  /**
   * 血糖3
   */
  'DATA_BLOOD_GLUCOSE',
  /**
   * 体温4
   */
  'DATA_TEMPERATURE',
  /**
   * 行为检测仪5
   */
  'DATA_ELDER',
  /**
   * 瘦身6
   */
  'DATA_SLIMMING',
  /**
   * 心率7
   */
  'DATA_HEART',
  /**
   * 血氧8
   */
  'DATA_SPO2',

  /**
   * 尿检数据9
   */
  'DATA_URINALYSIS',

  /**
   * 专业睡眠数据10
   */
  'DATA_SLEEP_PRO',

  /**
   * 胎心仪数据11
   */
  'DATA_FETAL_HR',

  /**
   * 心电数据12
   */
  'DATA_ECG_DATA',

  /**
   * 所有数据13
   */
  'DATA_ALL',

  /**
   * 发送血氧数据14
   */
  'SEND_DATA_SPO2'];
