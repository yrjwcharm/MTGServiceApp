'use strict';
import React, { Component } from 'react';
import { Image, Text, TouchableWithoutFeedback, View, Platform } from 'react-native';
import { Button,  } from '@ant-design/react-native';
import { connect, } from 'react-redux';
import {Toast} from 'teaset'

import commonStyle from '../../../styles/common';
import { scaleSizeH, scaleSizeW, setSpText } from "../../../util/AutoLayout";
import loginStyle from "../style/LoginStyle";
import WidgetStyles from "../../../styles/WidgetStyles";
import { regExp } from "../../../util/reg";
import Loading from '../../../components/Loading'
import { PswModalView } from "../../../components/RegistModalView";
import MyModal from "../../../components/MyModal";
import LocalHeader from '../../../components/LocalHeader'
import ApiModule from "../../../modules/ApiModule";
import TextInputRightButton from '../../../components/TextInputRightButton';
/**
 * @author: liy_lmn
 * @date: 2019-09-29
 * @description: 密码登录
 */
class LoginPswScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: this.props.phone || '',
      password: '',
      btnFlag: true,
      modalVisible: false,
      visible: false,
      secureTextEntry: true,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  // 退出登录
  handleLoginOutFn = () => {
    const { loginOut } = this.props;
    // 清除有关用户的数据。防止退出登陆后打开程序首先进入首页然后再重定向到登陆页面
    loginOut();
  }

  getUserInfo = (data) => {
    if (data.code === 200) {
      this.props.fetchFindInfo({}, this.toMain);
    } else if (data.code === 900002) {
      // this.onShow();
      Toast.info('账号或密码错误');
    } else if (data.code === 900003) {
      Toast.info('账号或密码错误');
    } else {
      Toast.info(data.msg);
    }
  }


  toMain = (userInfo) => {
    const { initComplete } = userInfo
    const {navigation}=this.props
    if (initComplete === 0) {

    } else if (initComplete === 3) {
      navigation.navigate('RegisterSuccess', { type: 1 })
    } else {
       navigation.navigate("Main")
    }
  }


  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  onShow = () => {
    this.setState({
      visible: true,
    });
  };

  handleLogin = () => {
    const { phone } = this.state;
    if (!phone.search(regExp.RegNull)) {
      Toast.info('手机号不能为空',);
      return;
    }
    if (!this.state.password.search(regExp.RegNull)) {
      Toast.info('密码不能为空', );
      return;
    }
    if (phone.search(regExp.Reg_TelNo)) {
      Toast.info('请填写符合规范的手机号', );
      return;
    }

    this.props.changePhone(this.state.phone);
    this.props.fetchPswLogin({
      "username": this.state.phone,
      "password": this.state.password,
      "authType": 1
    }, this.getUserInfo);
  }


  onChangeName = (text) => {
    this.setState({ 'phone': text.replace(/[^0-9]/g, '') });
  }

  onClearName = () => {
    this.setState({ 'phone': '' });
  }

  onChangePswd = (text) => {
    this.setState({ 'password': text });
  }

  onClearPswd = () => {
    this.setState({ 'password': '' });
  }

  toLoginCode = () => {
    this.onClose();
    this.props.navigation.navigate("Login")
  }

  toSetPsw = () => {
    this.props.navigation.navigate("SetPswCodeScreen")
  }

  toRegist = () => {
    this.props.navigation.navigate('Regist', {
      phone: this.state.phone
    })

  }

  setIsShow = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
  }

  render() {
    const modal_content = <PswModalView phone={this.state.phone} />;
    const { isLoading, navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/*<LocalHeader navigation={navigation}/>*/}
        <View style={loginStyle.loginWrap}>
          <Loading isVisible={isLoading} />

          <MyModal
            onRequestClose={this.onClose}
            visible={this.state.visible}
            title={'信息提示'}
            btn_left={'取消'}
            btn_right={'验证码登录'}
            content={modal_content}
            onClickRight={this.toLoginCode}
            onClickLeft={this.onClose}
            btn_type={'1'} />
          <View style={loginStyle.view_top}>
            <Text style={loginStyle.text_top_left}>
              密码登录
            </Text>
            {/*<TouchableWithoutFeedback onPress={this.toLoginCode}>*/}
            {/*    <Text style={loginStyle.text_top_right}>*/}
            {/*        验证码登录*/}
            {/*    </Text>*/}
            {/*</TouchableWithoutFeedback>*/}
          </View>

          <View style={loginStyle.view_content}>
            <Image
              style={loginStyle.img_inputtext}
              source={Images.ic_rn_phone}
              resizeMode={'contain'}
            />
            <View
              style={loginStyle.view_line_vertical}/>
            <TextInputRightButton
              numberOfLines={1}
              underlineColorAndroid="transparent"
              maxLength={11}
              onButtonClick={this.onClearName}
              placeholder={"请输入您的手机号"}
              placeholderTextColor={"#999999"}
              keyboardType='numeric'
              autoFocus={true}
              onChangeText={this.onChangeName}
              value={this.state.phone}
            />
          </View>
          <View style={loginStyle.view_line_Horizontal}>
          </View>

          <View style={[loginStyle.view_content, { marginTop: scaleSizeH(10) }]}>
            <Image
              style={loginStyle.img_inputtext}
              source={Images.ic_login_psw}
              resizeMode={'contain'}
            />
            <View
              style={loginStyle.view_line_vertical}/>
            <TextInputRightButton
              numberOfLines={1}
              underlineColorAndroid="transparent"
              maxLength={20}
              onButtonClick={this.onClearPswd}
              placeholder={"请输入您的登录密码"}
              placeholderTextColor={"#999999"}
              onChangeText={this.onChangePswd}
              value={this.state.password}
              secureTextEntry={this.state.secureTextEntry}
              isShowImgPsw={true}
              onChangeShow={this.setIsShow}
            />
          </View>

          <View style={[loginStyle.view_line_Horizontal, { marginBottom: scaleSizeH(3) }]} />
          <Text style={
            loginStyle.text_bottom_black
          }>
            进入内蒙康+，代表您已经同意

            <TouchableWithoutFeedback onPress={() => {
              this.props.navigation.navigate("RegisteAgreement", { type: 1 })
            }}>
              <Text style={loginStyle.text_bottom_green}>
                《内蒙康+APP用户管理协议》
              </Text>
            </TouchableWithoutFeedback>
            及
            <TouchableWithoutFeedback onPress={() => {
              this.props.navigation.navigate("PrivacyClause", { type: 2 })
            }}>
              <Text style={loginStyle.text_bottom_green}>
                《内蒙康+隐私政策》
              </Text>
            </TouchableWithoutFeedback>
          </Text>
          <Button
            onPress={this.handleLogin}
            style={commonStyle.btn_style}
            styles={WidgetStyles.getButtonStyles()}
            type={'primary'}
          >立即登录</Button>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <TouchableWithoutFeedback onPress={
              this.toLoginCode
            }>
              <Text style={{
                fontSize: setSpText(12),
                color: '#06B48D',
                marginTop: scaleSizeH(15),
                height: scaleSizeH(30)
              }}>验证码登录/注册</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={
              this.toSetPsw
            }>
              <Text style={{
                fontSize: setSpText(12),
                color: '#999999',
                marginTop: scaleSizeH(15),
                height: scaleSizeH(30)
              }}>忘记密码</Text>
            </TouchableWithoutFeedback>

          </View>

        </View>
      </View>
    );
  }
}

const mapStateToProps = (
  {
    login: {
      loginData,
      isLoading

    },
    whitelistdata: {
      token,
      phone,
      userInfo,
      isClickRigiseSuccessButton,
    },
  }) => ({
    token,
    loginData,
    isLoading,
    phone,
    userInfo,
    isClickRigiseSuccessButton,
  });

const mapDispatchToProps = dispatch => ({
  fetchPswLogin(params, callback) {
    dispatch({ type: 'login/fetchPswLogin', params, callback });
  },
  fetchFindInfo(restOptions, callback) {
    dispatch({ type: 'login/fetchFindInfo', restOptions, callback });
  },
  loginOut() {
    dispatch({ type: 'whitelistdata/loginOut' });
  },
  changePhone(data) {
    dispatch({ type: 'whitelistdata/changePhone', data: data });
  },
  getInfo(callback) {
    dispatch({ type: 'interrogation/getInfo', callback });
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginPswScreen);


