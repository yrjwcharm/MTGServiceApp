'use strict';
import React, {Component} from 'react';
import {BackHandler, Image, Text, TouchableWithoutFeedback, View ,AppState} from 'react-native';

import {connect,} from 'react-redux';
import {Button, Provider,} from '@ant-design/react-native';

import {Toast} from 'teaset'
import commonStyle from '../../../styles/common';
import {scaleSizeH, scaleSizeW, setSpText} from "../../../util/AutoLayout";
import loginStyle from "../style/LoginStyle";
import MyModal from "../../../components/MyModal";
import WidgetStyles from "../../../styles/WidgetStyles";
import {regExp} from "../../../util/reg";
import Loading from '../../../components/Loading'
import RegistModalView from '../../../components/RegistModalView'
import LocalHeader from '../../../components/LocalHeader'
import TextInputRigthButton from "../../../components/TextInputRightButton";
import {ThemeFlags} from "../../../styles/ThemeFactory";
import ApiModule from "../../../modules/ApiModule";

/**
 * @author: liy_lmn
 * @date: 2019-09-29
 * @description: 验证短信码登录
 */
let starttime = 0;
let endtime = 0;
class LoginSendCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationCode: '',
            btnFlag: true,
            modalVisible: false,
            countBtn: false,
            count: 60,
            visible: false,//是否显示注册对话框
            visible2: false,//是否显示返回对话框
        };
    }

    static navigationOptions = ({navigation}) => ({
        header: null,
    })

    componentDidMount() {
        const {phone} = this.props.route.params;
        if (this.state.count === 60) {
            this.props.fetchSendCode({
                phone: phone,
                authType:1,
                workType:2
            }, this.countTime);
        }
        AppState.addEventListener('change',this._handleAppStateChange);
    }

    componentWillUnmount() {
        // clearInterval(this._timer)
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }

    _handleAppStateChange = (nextAppState)=>{
        if (nextAppState!= null && nextAppState === 'active') {
            //再次进入到界面的时间
            endtime=new Date().getTime();
            //进入后台的时间间隔
            let time=Math.round((endtime-starttime)/1000)
            const {count}=this.state;
            //如果后台时间大于本地剩余时间则本地时间设置为0，反之取差值
            if (time>count){
                this.setState({
                    count:0
                })
            } else {
                this.setState({
                    count:count-time
                })
            }
            console.log(time);
        }else if(nextAppState != null && nextAppState === 'background'){
            //界面进入到后台的时间
            starttime=new Date().getTime()
        }

    }

    handleLogin = () => {
        const {phone} = this.props.route.params;
        if (!this.state.verificationCode.search(regExp.RegNull)) {
            Toast.info('验证码不能为空', );
            return;
        }
        this.props.fetchCodeLogin({
            phone: phone,
            verificationCode: this.state.verificationCode,
            authType:1
        }, this.getUerInfo);
    }

    // 退出登录
    handleLoginOutFn = () => {
        const { loginOut } = this.props;
        // 清除有关用户的数据。防止退出登陆后打开程序首先进入首页然后再重定向到登陆页面
        loginOut();
    }

    getUerInfo = (data) => {

        if (data.code === 200) {

            this.props.fetchFindInfo({}, this.toMain);

            this.props.getInfo((data) => {
                if (data.code == 200) {
                }
            })
        } else if (data.code === 900002) {
            this.onShow();
        }else {
            Toast.info(data.msg, );
        }

    }

    toMain = (userInfo) => {
        const {initComplete}=userInfo
        const {navigation}=this.props

        if (initComplete === 0) {
            // if (this.props.isVerification == undefined || this.props.isVerification == true) {
            //   goChangePerfectInformation();
            if (userInfo.sex && userInfo.birthday) {
                if (userInfo.height && userInfo.weight) {
                  //如果性别生日身高体重全都有则跳转第三页
                  navigation.navigate("NameAddressScreen", {
                    indexText: '1/1',
                    supplyText: '1',
                    backRoute: 'RegisterSuccess',
                    nextRoute: {
                      route: 'Preference',
                    }
                  })
                } else {
                  //如果没有身高和体重则走两步
                  navigation.navigate("HeightWeightEditScreen", {
                    backRoute: 'RegisterSuccess',
                    indexText: '1/2',
                    supplyText: '1',//随意填入文本就可以，为了不显示最顶部标题
                    nextRoute: {
                      indexText: '2/2',
                      route: 'NameAddressScreen',
                      backRoute: 'HeightWeightEditScreen',
                      supplyText: '1',
                      nextRoute: {
                        route: 'Preference',
                      }
                    },
                  })
                }
              } else {
                //如果没有性别和生日则走三步
                navigation.navigate("SexBirthEditScreen", {
                  indexText: '1/3',
                  supplyText: '1',//随意填入文本就可以，为了不显示最顶部标题
                  title: '',
                  backRoute:'RegisterSuccess',
                  nextRoute: {
                    indexText: '2/3',
                    route: 'HeightWeightEditScreen',
                    backRoute:'SexBirthEditScreen',
                    supplyText: '1',
                    nextRoute: {
                      indexText: '3/3',
                      route: 'NameAddressScreen',
                      backRoute:'HeightWeightEditScreen',
                      supplyText: '1',
                      nextRoute: {
                        route: 'Preference',
                      }
                    }
                  },
                })
              }

            // }
        } else if (initComplete === 3) {
            this.props.navigation.navigate('RegisterSuccess', {type: 1})
        }else {
             this.props.navigation.navigate("Main")
        }
    }
    onChangeName = (text) => {
        this.setState({'verificationCode': text});
    }

    onClearName = () => {
        this.setState({'verificationCode': ''});
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
    onClose2 = () => {
        this.setState({
            visible2: false,
        });
    };
    onShow2 = () => {
        this.setState({
            visible2: true,
        });
    };

    goBack = () => {
        this.onClose2();
        this.props.navigation.goBack();
    }


    countTime = () => {

        this.setState({
            countBtn: true
        })
        this._timer = setInterval(() => {
            let num = this.state.count
            if (num == 0) {
                this._timer && clearInterval(this._timer);
                this.setState({
                    countBtn: false,
                    count: 60
                })
            } else {
                this.setState({count: num - 1});
            }
        }, 1000);
    }

    toLoginCode = () => {
        this.onClose();
        this.props.navigation.navigate("Login")
    }

    toRegist = () => {
        this.onClose();
        const {phone} = this.props.route.params;
        this.props.navigation.navigate('Regist', {
            phone: phone
        })
    }

    reSendCode = () => {
        const {phone} = this.props.route.params;
        this.props.fetchSendCode({phone: phone,authType:1,
            workType:2}, this.countTime)
    }

    //安卓返回键关闭APP
    onBackPress = () => {
        if (this.props.navigation.isFocused()) {
            this.setState({
                visible2: true
            })
            return true;
        }else {
            return false
        }
    };

    render() {
        const {isLoading, navigation} = this.props;
        const {phone} = this.props.route.params;
        const modal_content = <RegistModalView phone={phone}/>;
        const modal_content2 = <Text style={{lineHeight:20}}>点击[返回]将会中断操作，确定要返回吗？</Text>;

        return (
            <Provider>
                <View style={{flex: 1}}>
                    <LocalHeader
                        onPress={this.onBackPress}
                        navigation={navigation}
                    />

                    <View style={loginStyle.loginWrap}>
                        <Loading isVisible={isLoading}/>

                        <MyModal
                            onRequestClose={this.onClose}
                            visible={this.state.visible}
                            title={'新手机号注册提醒'}
                            btn_left={'换账号登录'}
                            btn_right={'注册'}
                            content={
                                modal_content}
                            onClickRight={this.toRegist}
                            onClickLeft={
                                this.toLoginCode
                            }
                            btn_type={'1'}
                        />

                        <MyModal
                            onRequestClose={this.onClose2}
                            visible={this.state.visible2}
                            title={'操作提示'}
                            btn_left={'取消'}
                            btn_right={'返回'}
                            content={
                                modal_content2}
                            onClickRight={this.goBack}
                            onClickLeft={
                                this.onClose2
                            }/>


                        <View style={loginStyle.view_top}>
                            <Text style={loginStyle.text_top_left}>
                                输入验证码
                            </Text>

                        </View>

                        <Text style={
                            loginStyle.text_bottom_black
                        }>
                            <Text style={{color: ThemeFlags['text-fl-color']}}>6</Text>位验证码已发送至 <Text style={{
                            fontSize: setSpText(12),
                            color: '#333333'

                        }}>{phone}</Text>
                        </Text>

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
                            {/*        width:'100%'*/}
                            {/*    }}*/}
                            {/*    ref={'login_phone'}*/}
                            {/*    source={loginStyle.text_input_contnet}*/}
                            {/*    placeholder='请输入短信验证码'*/}
                            {/*    onChangeText={this.onChangeName}*/}
                            {/*    keyboardType='numeric'*/}
                            {/*/>*/}

                            <TextInputRigthButton
                                numberOfLines={1}
                                underlineColorAndroid="transparent"
                                maxLength={6}
                                onButtonClick={this.onClearName}
                                placeholder={"请输入短信验证码"}
                                placeholderTextColor={"#999999"}
                                keyboardType='numeric'
                                autoFocus={true}
                                onChangeText={this.onChangeName}
                                value={this.state.verificationCode}
                            />
                        </View>

                        <View style={loginStyle.view_line_Horizontal}>
                        </View>

                        {!this.state.countBtn ?
                            <TouchableWithoutFeedback onPress={this.reSendCode}>
                                <Text style={
                                    [loginStyle.text_bottom_black, {color: '#04B48D'}]
                                }>
                                    重新发送短信验证码
                                </Text>
                            </TouchableWithoutFeedback>
                            :
                            <Text style={
                                loginStyle.text_bottom_black
                            }>
                                重新发送({this.state.count}秒)
                            </Text>
                        }

                        <Button
                            onPress={this.handleLogin}
                            styles={WidgetStyles.getButtonStyles()}
                            style={[commonStyle.btn_style, {marginTop: scaleSizeH(30)}]}
                            type={'primary'}
                        >立即登录</Button>




                    </View>
                </View>
            </Provider>
        );
    }
}

const mapStateToProps = (
    {
        whitelistdata: {
            token,
            userInfo,
            isClickRigiseSuccessButton,

        },
        login: {
            loginData,
            isLoading
        },
    }) => ({
    loginData,
    isLoading,
    token,
    userInfo,
    isClickRigiseSuccessButton,
});

const mapDispatchToProps = dispatch => ({
    //短信验证码登录
    fetchCodeLogin(params, callback) {
        dispatch({type: 'login/fetchCodeLogin', params, callback});
    },
    fetchSendCode(params, callback) {
        dispatch({type: 'login/fetchSendCode', params, callback});
    },
    fetchFindInfo(restOptions, callback) {
        dispatch({type: 'login/fetchFindInfo', restOptions, callback});
    },
    loginOut() {
        dispatch({ type: 'whitelistdata/loginOut' });
    },
    getInfo(callback) {
        dispatch({type: 'interrogation/getInfo', callback});
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginSendCodeScreen);
