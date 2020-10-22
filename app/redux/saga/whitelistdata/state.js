export const getUserInfo = () => ({
  token: "", // 登录token
  imToken: "", // im登录token
  userid: "", // 用户id
  userInfo: {}, // 用户信息
  isVerification: true, // 是否验证个人信息
  updateCode:0,
  visible_assessment: false,//提示评估modal
  healthTrackData:[],
})

export default () => ({
  phone: '', //手机号
  isClickRigiseSuccessButton:false,//是否点击了注册完成按钮
  ...getUserInfo(),
})
