'use strict';
import React, {Component} from 'react';
import {BackHandler, Image, Text, TouchableWithoutFeedback, View} from 'react-native';

import {connect,} from 'react-redux';
import {Button, Toast} from '@ant-design/react-native';


import commonStyle from '../../../styles/common';
import loginStyle from '../style/LoginStyle';
import {scaleSizeH, scaleSizeW, setSpText} from "../../../util/AutoLayout";
import WidgetStyles from "../../../styles/WidgetStyles";
import {regExp} from '../../../util/reg'
import Loading from '../../../components/Loading'
import TextInputRightButton from '../../../components/TextInputRightButton'

/**
 * @author: liy_lmn
 * @date: 2019-09-29
 * @description: 验证码登录（填写手机号）
 */

class LoginCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: this.props.phone||'',
      password: '',
      btnFlag: true,
      modalVisible: false,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)

  }
  //安卓返回键关闭APP
  onBackPress = () => {
    if (this.props.navigation.isFocused()) {
      BackHandler.exitApp()
      return true
    } else {
      return false
    }
  };

  static navigationOptions = ({navigation}) => ({
    header: null,
  })

  //跳转验证码登录页面
  toLoginSendCode = () => {
    this.props.navigation.push("LoginSendCodeScreen", {
      phone: this.state.phone
    })
  }

  sendCode = () => {
    if (!this.state.phone.search(regExp.RegNull)) {
      Toast.info('手机号不能为空', 1.5, null, false);
      return;
    }
    if (this.state.phone.search(regExp.Reg_TelNo)) {
      Toast.info('请填写符合规范的手机号', 1.5, null, false);
      return;
    }
    // this.props.fetchSendCode({
    //     phone: this.state.phone,
    // }, this.toLoginSendCode);
    this.props.changePhone(this.state.phone);
    this.toLoginSendCode();


  }


  onChangeName = (text) => {

    this.setState({'phone': text.replace(/[^0-9]/g, '')});
  }

  onClearName = () => {
    this.setState({'phone': ''});
  }


  toLoginPsw = () => {
    this.props.navigation.navigate("LoginPswScreen")
  }


  render() {
    const {isLoading, navigation} = this.props;
    return (
        <View style={{flex: 1}}>
          {/*<LocalHeader navigation={navigation}/>*/}
          <View style={loginStyle.loginWrap}>
            <Loading isVisible={isLoading}/>
            <View style={loginStyle.view_top}>
              <Text style={loginStyle.text_top_left}>
                验证码登录/注册
              </Text>
              {/*<TouchableWithoutFeedback onPress={*/}
              {/*    this.toLoginPsw*/}
              {/*}>*/}
              {/*    <Text style={loginStyle.text_top_right}>*/}
              {/*        密码登录*/}
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
              {/*<TextInput*/}
              {/*    style={{*/}
              {/*        fontSize: setSpText(14),*/}
              {/*        color: '#999999',*/}
              {/*        width:'100%'*/}
              {/*    }}*/}
              {/*    ref={'login_phone'}*/}
              {/*    source={loginStyle.text_input_contnet}*/}
              {/*    placeholder='请输入您的手机号'*/}
              {/*    onChangeText={this.onChangeName}*/}
              {/*    keyboardType='numeric'*/}
              {/*    autoFocus={true}*/}
              {/*/>*/}

              <TextInputRightButton
                  numberOfLines={1}
                  underlineColorAndroid="transparent"
                  maxLength={11}
                  onButtonClick={this.onClearName}
                  placeholder={"请输入您的手机号"}
                  placeholderTextColor={"#999999"}
                  keyboardType='numeric'
                  onChangeText={this.onChangeName}
                  value={this.state.phone}
              />
            </View>

            <View style={loginStyle.view_line_Horizontal}/>

            <Text style={
              loginStyle.text_bottom_black
            }>
              进入内蒙康+，代表您已经同意
              <TouchableWithoutFeedback onPress={() => {
                this.props.navigation.navigate("RegisteAgreement", {
                  type: 1
                })
              }}>
                <Text style={loginStyle.text_bottom_green}>
                  《内蒙康+APP用户管理协议》
                  《用户协议》
                </Text>
              </TouchableWithoutFeedback>
              及
              <TouchableWithoutFeedback onPress={() => {
                this.props.navigation.navigate("PrivacyClause", {type: 2})
              }}>
                <Text style={loginStyle.text_bottom_green}>
                  《内蒙康+隐私政策》
                </Text>
              </TouchableWithoutFeedback>
            </Text>
            <Button
                onPress={
                  this.sendCode
                }
                activeStyle={false}
                styles={WidgetStyles.getButtonStyles()}
                style={commonStyle.btn_style}
                type={'primary'}
            >获取验证码</Button>
            {/*<BlockButton*/}
            {/*    style={{*/}
            {/*        marginTop: scaleSizeH(20)*/}
            {/*    }}*/}
            {/*    onPress={this.sendCode}>获取验证码</BlockButton>*/}

            <TouchableWithoutFeedback onPress={
              this.toLoginPsw
            }>
              <Text style={{
                fontSize: setSpText(12),
                color: '#06B48D',
                marginTop: scaleSizeH(15),
                height: scaleSizeH(30)
              }}>账号密码登录</Text>
            </TouchableWithoutFeedback>


          </View>
        </View>
    )
        ;
  }
}


const mapStateToProps = (
    {
      login: {
        isLoading

      },
      whitelistdata: {
        phone
      },
    }) => ({
  isLoading,
  phone
});

const mapDispatchToProps = dispatch => ({
  fetchSendCode(params, callback) {
    dispatch({type: 'login/fetchSendCode', params, callback});
  },
  changePhone(data) {
    dispatch({type: 'whitelistdata/changePhone',data: data});
  },

})
export default connect(mapStateToProps, mapDispatchToProps)(LoginCodeScreen);


