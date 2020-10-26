'use strict';
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  AlertIOS,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  connect,
} from 'react-redux';
import {Button} from '@ant-design/react-native';
import {Toast} from 'teaset'

import commonStyle from '../../../styles/common';
import RegistStyle from '../style/RegistStyle';
import {scaleSizeH, scaleSizeW, setSpText} from "../../../util/AutoLayout";
import WidgetStyles from "../../../styles/WidgetStyles";
import {regExp} from "../../../util/reg";
import TextInputRigthButton from "../../../components/TextInputRightButton";
import {HeaderLeft} from "../../../components/helper";

/**
 * @author: liy_lmn
 * @date: 2019-10-10
 * @description: 注册
 */
class Register extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  })
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      secureTextEntry: true,
    };
  }


  onChangeName = (text) => {
    this.setState({'phone': text});
  }

  onChangePswd = (text) => {
    this.setState({'password': text});
  }

  onClearPswd = () => {
    this.setState({'password': ''});
  }

  toLoginPsw = () => {
    const {phone} = this.props.route.params
    this.props.fetchPswLogin({
      "username": phone,
      "password": this.state.password,
      "authType": 1
    }, this._result);
    // this.props.navigation.navigate("LoginPswScreen")
  }


  // 退出登录
  handleLoginOutFn = () => {
    const {loginOut} = this.props;
    // 清除有关用户的数据。防止退出登陆后打开程序首先进入首页然后再重定向到登陆页面
    loginOut();
  }

  _result = (data) => {
    if (data.code === 200) {

      this.props.fetchFindInfo({}, (data)=>{
        this.toRegisterSuccess();
      });
      this.props.getInfo((data) => {
        if (data.code == 200) {
        }
      })
    } else if (data.code === 900002) {
      this.onShow();
    }

  }

  toRegisterSuccess = () => {
    this.props.navigation.navigate("RegisterSuccess", {
      type: 1
    })
  }

  regist = () => {
    const {phone} = this.props.route.params

    if (!phone.search(regExp.RegNull)) {
        Toast.info('手机号不能为空', );
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
    if (this.state.password.search(regExp.Reg_PassWord)) {
        Toast.info('请填写带字母和数字的6-20位密码', );
        return;
    }

    this.props.fetchRegister({
        "username": phone,
        "password": this.state.password,
        authType:1
    }, this.toLoginPsw);

  }

  setIsShow = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
  }

  render() {
    const {phone} = this.props.route.params
    return (
      <View style={[commonStyle.wrapper, RegistStyle.loginWrap,{paddingTop:10}]}>
        <View style={{marginLeft: -scaleSizeW(10)}}>
          <HeaderLeft/>
        </View>

        <View style={RegistStyle.view_top}>
          <Text style={RegistStyle.text_top_left}>
            新用户注册
          </Text>

        </View>


        <View style={RegistStyle.view_content}>
          <Image
            style={RegistStyle.img_inputtext}
            source={Images.ic_rn_phone}
            resizeMode={'contain'}
          />
          <View
            style={RegistStyle.view_line_vertical}/>

          <Text style={{
            fontSize: setSpText(14),
            color: '#333333'
          }}>
            {phone}
          </Text>
          {/*<TextInput*/}
          {/*    source={RegistStyle.text_input_contnet}*/}
          {/*    placeholder='请输入手机号'*/}
          {/*    onChangeText={this.onChangeName}*/}
          {/*/>*/}
        </View>
        <View style={RegistStyle.view_line_Horizontal}/>

        <View style={[RegistStyle.view_content, {
          marginTop: scaleSizeH(10)
        }]}>
          <Image
            style={RegistStyle.img_inputtext}
            source={Images.ic_login_psw}
            resizeMode={'contain'}
          />
          <View
            style={RegistStyle.view_line_vertical}/>
          {/*<TextInput*/}
          {/*    source={RegistStyle.text_input_contnet}*/}
          {/*    placeholder='请设置登录密码'*/}
          {/*    onChangeText={this.onChangePswd}*/}
          {/*    secureTextEntry={true}*/}
          {/*/>*/}

          <TextInputRigthButton
            numberOfLines={1}
            underlineColorAndroid="transparent"
            maxLength={20}
            onButtonClick={this.onClearPswd}
            placeholder={"请设置登录密码"}
            placeholderTextColor={"#999999"}
            onChangeText={this.onChangePswd}
            value={this.state.password}
            secureTextEntry={this.state.secureTextEntry}
            isShowImgPsw={true}
            onChangeShow={this.setIsShow}
          />
        </View>

        <View style={RegistStyle.view_line_Horizontal}/>


        <Button
          onPress={this.regist}
          styles={WidgetStyles.getButtonStyles()}
          style={[commonStyle.btn_style, {marginTop: scaleSizeH(30)}]}
          type={'primary'}
        >立即注册</Button>

        {/*<View style={{*/}
        {/*  marginTop: scaleSizeH(109),*/}
        {/*}}>*/}
        {/*  <View style={RegistStyle.view_bottom}>*/}
        {/*    <View style={[RegistStyle.view_line_Horizontal_bottom, {marginRight: scaleSizeW(10)}]}>*/}
        {/*    </View>*/}

        {/*    <Text style={RegistStyle.text_bottom}>*/}
        {/*      其他登录方式*/}
        {/*    </Text>*/}

        {/*    <View style={[RegistStyle.view_line_Horizontal_bottom, {marginLeft: scaleSizeH(10)}]}>*/}
        {/*    </View>*/}

        {/*  </View>*/}

        {/*  <View style={{*/}
        {/*    flexDirection: 'row',*/}
        {/*    justifyContent: 'center',*/}
        {/*    marginTop: scaleSizeH(12)*/}
        {/*  }}>*/}
        {/*    <Image*/}
        {/*      style={{*/}
        {/*        width: scaleSizeW(34),*/}
        {/*        height: scaleSizeW(34),*/}
        {/*        // marginRight: scaleSizeW(10)*/}
        {/*      }}*/}
        {/*      source={require('../../../../imgs/login/ic_wx_bottom.png')}*/}
        {/*      resizeMode={'contain'}*/}
        {/*    />*/}


            {/*<Image*/}
            {/*    style={{*/}
            {/*        width: scaleSizeW(34),*/}
            {/*        height: scaleSizeW(34),*/}
            {/*        marginLeft: scaleSizeW(10)*/}
            {/*    }}*/}
            {/*    source={require('../../../../imgs/login/ic_qq_bottm.png')}*/}
            {/*    resizeMode={'contain'}*/}
            {/*/>*/}

        {/*  </View>*/}
        {/*</View>*/}


      </View>
    );
  }
}

const mapStateToProps = (
  {
    loading
  }) => ({
  isLoading: loading
});
const mapDispatchToProps = dispatch => ({
  fetchRegister(params, callback) {
    dispatch({type: 'login/fetchRegister', params, callback});
  },
  fetchPswLogin(params, callback) {
    dispatch({type: 'login/fetchPswLogin', params, callback});
  },
  loginOut() {
    dispatch({type: 'whitelistdata/loginOut'});
  },
  fetchFindInfo(restOptions, callback) {
    dispatch({type: 'login/fetchFindInfo', restOptions, callback});
  },
  getInfo(callback) {
    dispatch({type: 'interrogation/getInfo', callback});
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Register);
