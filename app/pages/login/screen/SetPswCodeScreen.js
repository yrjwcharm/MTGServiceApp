'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    Image,
    AlertIOS,
    TouchableWithoutFeedback
} from 'react-native';

import {
    connect,
} from 'react-redux';
import {Button, Toast} from '@ant-design/react-native';


import commonStyle from '../../../styles/common';
import loginStyle from '../style/LoginStyle';
import {scaleSizeH, scaleSizeW, setSpText} from "../../../util/AutoLayout";
import WidgetStyles from "../../../styles/WidgetStyles";
import {regExp} from '../../../util/reg'
import Loading from '../../../components/Loading'
import LocalHeader from '../../../components/LocalHeader'
import TextInputRigthButton from '../../../components/TextInputRightButton'
import {fetchFindPswSendCode} from "../store/service";
import RegistModalView from "../../../components/RegistModalView";
import MyModal from "../../../components/MyModal";

/**
 * @author: liy_lmn
 * @date: 2019-09-29
 * @description: 验证码登录（设置密码）
 */

class SetPswCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            btnFlag: true,
            modalVisible: false,
            visible: false,//是否显示对话框
        };
    }

    static navigationOptions = ({navigation}) => ({
        header: null,
    })

    //跳转验证码登录页面
    toSetPswSendCodeScreen = () => {
        this.props.navigation.navigate("SetPswSendCodeScreen", {
            phone: this.state.phone
        })
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    toLoginCode = () => {
        this.onClose();
        this.props.navigation.navigate("LoginCodeScreen")
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
        // this.props.fetchFindPswSendCode({
        //     phone: this.state.phone,
        // }, this.toSetPswSendCodeScreen);
        this.toSetPswSendCodeScreen();

    }


    onChangeName = (text) => {
        this.setState({'phone': text.replace(/[^0-9]/g, '')});
    }

    onClearName = () => {
        this.setState({'phone': ''});
    }
    onShow = () => {
        this.setState({
            visible: true,
        });
    };


    toRegist = () => {
        if (!this.state.phone.search(regExp.RegNull)) {
            Toast.info('手机号不能为空', 1.5, null, false);
            return;
        }
        if (this.state.phone.search(regExp.Reg_TelNo)) {
            Toast.info('请填写符合规范的手机号', 1.5, null, false);
            return;
        }
        this.onClose();
        this.props.navigation.navigate('Regist',{
            phone:this.state.phone
        })
    }

    render() {
        const {isLoading, navigation} = this.props;
        const {phone} = this.state;
        const modal_content = <RegistModalView phone={phone}/>;

        return (
            <View style={{flex: 1}}>
                <LocalHeader navigation={navigation}/>
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
                        }/>
                    <View style={loginStyle.view_top}>
                        <Text style={loginStyle.text_top_left}>
                            验证手机号
                        </Text>
                    </View>

                    <View style={loginStyle.view_content}>
                        <Image
                            style={loginStyle.img_inputtext}
                            source={Images.ic_rn_phone.png}
                            resizeMode={'contain'}
                        />
                        <View
                            style={loginStyle.view_line_vertical}/>

                        <TextInputRigthButton
                            numberOfLines={1}
                            underlineColorAndroid="transparent"
                            maxLength={11}
                            onButtonClick={this.onClearName}
                            placeholder={"请输入您的手机号"}
                            placeholderTextColor={"#999999"}
                            keyboardType='numeric'
                            onChangeText={this.onChangeName}
                            value={this.state.phone}
                            autoFocus={true}
                        />
                    </View>

                    <View style={loginStyle.view_line_Horizontal}/>

                    {/* <Text style={
                        loginStyle.text_bottom_black
                    }>
                        进入佑健康代表您同意
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate("RegisteAgreement", {
                                type: 1
                            })
                        }}>
                            <Text style={loginStyle.text_bottom_green}>
                                《用户协议》
                            </Text>
                        </TouchableWithoutFeedback>
                        及
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate("PrivacyClause", {type: 2})
                        }}>
                            <Text style={loginStyle.text_bottom_green}>
                                《隐私政策》
                            </Text>
                        </TouchableWithoutFeedback>
                    </Text> */}
                    <Button
                        onPress={
                            this.sendCode
                        }
                        activeStyle={false}
                        styles={WidgetStyles.getButtonStyles()}
                        style={commonStyle.btn_style}
                        type={'primary'}
                    >获取验证码</Button>

                    {/*<View style={{*/}
                    {/*    marginTop: scaleSizeH(223),*/}
                    {/*    marginBottom: scaleSizeH(40)*/}
                    {/*}}>*/}
                    {/*    <View style={loginStyle.view_bottom}>*/}
                    {/*        <View style={[loginStyle.view_line_Horizontal_bottom, {marginRight: scaleSizeW(10)}]}>*/}
                    {/*        </View>*/}

                    {/*        <Text style={loginStyle.text_bottom}>*/}
                    {/*            其他登录方式*/}
                    {/*        </Text>*/}

                    {/*        <View style={[loginStyle.view_line_Horizontal_bottom, {marginLeft: scaleSizeH(10)}]}>*/}
                    {/*        </View>*/}

                    {/*    </View>*/}

                    {/*    <View style={{*/}
                    {/*        flexDirection: 'row',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        marginTop: scaleSizeH(12)*/}
                    {/*    }}>*/}
                    {/*        <Image*/}
                    {/*            style={{*/}
                    {/*                width: scaleSizeW(34),*/}
                    {/*                height: scaleSizeW(34),*/}
                    {/*                // marginRight: scaleSizeW(10)*/}
                    {/*            }}*/}
                    {/*            source={require('../../../../imgs/login/ic_wx_bottom.png')}*/}
                    {/*            resizeMode={'contain'}*/}
                    {/*        />*/}
                    {/*    </View>*/}
                    {/*</View>*/}

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
    }) => ({
    isLoading
});

const mapDispatchToProps = dispatch => ({
    fetchFindPswSendCode(params, callback) {
        dispatch({type: 'login/fetchFindPswSendCode', params, callback});
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(SetPswCodeScreen);


