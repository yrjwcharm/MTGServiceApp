import {getHealthNum} from "./api";

export default () => ({
  assessmentList: [], // 健康评估列表
  isAssessmentLoading: false,
  testQuestionList: [], // 健康评估题目列表
  isEnterQuestionLoading: true,
  isSubmitLoading: false,
  // testHistoryList: [],  // 测评历史时间列表,
  // assessmentResultOfConstitution: {},
  cardiovascularDiseaseData: {},
  cardiovascularVisabled: true, //true计算结果false原始数据

  // 首页计划
  homePlanData: [],
  // 首页人气设备
  equipmentData: [],
  // 首页热门服务
  serviceData: [],
  // 首页健康头条
  headLineData: [],
  // 首页健康追踪
  healthDetailData: [],
  // 首页健康指数
  healthNumData: [],
  // 首页通知数量
  noticeCount: 0,
  update:{
    visible: false,//是否显示更新modal
    des: '',
    visibleLoad:false,
    type:'',//更新的类型： total：全量更新，codepush：热更新
    data:{},//全量更新数据
  },
  progress:0,//更新进度
  visible_Mantle:false,//蒙层是否显示
})
