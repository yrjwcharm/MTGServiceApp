'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

import {connect} from 'react-redux';
import commonStyle from '../../../styles/common';
import changeLoginStyle from '../style/ChangeLoginStyle';
import {Toast} from "@ant-design/react-native";
class ChangeLoginScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })


    constructor(props) {
        super(props);
        this.state = {
            type: 0,  //登录状态：0：验证码 1：密码 2：微信 3：qq
            style_type: 1, //样式状态：0：四种都有（验证码 密码 微信 qq） 1：前三种（验证码 密码 微信） 2：前两种（验证码 密码）
            url: "",
        };
        this.toLogin = this.toLogin.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeStyleType = this.onChangeStyleType.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    // }


    toLogin() {
        this.props.navigation.push("Login")
    }
    toLoginPsw() {
        this.props.navigation.push("LoginPswScreen")
    }

    onChangeType(type) {
        this.setState({'type': type});
    }

    onChangeStyleType(type) {
        this.setState({'style_type': type});
    }
    onReload = () => {
        this.setState({ url:Images.ic_wx })
    }
    toMain = () => {
        this.props.navigation.navigate("Main")
    }

    componentDidMount() {
        this.setState({ url: Images.ic_qq_bottom })
    }

    render() {
        return (
            <View style={[commonStyle.wrapper, changeLoginStyle.loginWrap,
                // {alignItems: 'center', justifyContent: 'center', marginVertical: 20}
                ]}>
                <Text style={changeLoginStyle.text_title}>登录</Text>
                <View style={changeLoginStyle.view_change_type}>
                    <TouchableWithoutFeedback
                        onPress={()=>{
                            this.toLogin()

                            // ApiModule.startP2PSession('123');
                        }}>
                    <View
                        style={this.state.style_type === 0 ? changeLoginStyle.view_change_type_item_forall : changeLoginStyle.view_change_type_item}>
                        <Image source={Images.ic_code} resizeMode={'contain'}
                               style={changeLoginStyle.img_content}/>
                        <Text style={changeLoginStyle.text_content}>
                            验证码登录
                        </Text>
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={()=>{
                            this.toLoginPsw()
                            // UMShareModule.auth(0,(msg)=>{
                            //   alert(msg)
                            // });
                        }}>
                    <View
                        style={this.state.style_type === 0 ? changeLoginStyle.view_change_type_item_forall : changeLoginStyle.view_change_type_item}>
                        <Image source={Images.ic_login_psw} resizeMode={'contain'}
                               style={changeLoginStyle.img_content}/>
                        <Text style={changeLoginStyle.text_content}>
                            密码登录
                        </Text>
                    </View>
                    </TouchableWithoutFeedback>
                    {this.state.style_type === 2 ? null :
                        <TouchableWithoutFeedback onPress={()=>{
                            // this.props.navigation.push("LoginSendCodeScreen", {
                            //     phone: this.state.phone
                            // })
                            // this.props.navigation.navigate('TabNavigaytor');
                            Toast.info('暂未开通，敬请期待', );
                        }}>
                        <View
                        style={this.state.style_type === 0 ? changeLoginStyle.view_change_type_item_forall : changeLoginStyle.view_change_type_item}>

                        <Image source={Images.ic_wx} resizeMode={'contain'}
                               style={changeLoginStyle.img_content}/>
                        <Text style={changeLoginStyle.text_content}>
                            微信登录
                        </Text>
                    </View>
                        </TouchableWithoutFeedback>}
                    {this.state.style_type === 1 || this.state.style_type === 2 ? null :
                        <TouchableWithoutFeedback onPress={()=>{
                            this.props.navigation.navigate('ChangePerfectInformation',{
                                des:'ChangeLoginScreen'
                            });

                        }}>
                        <View style={this.state.style_type===0?changeLoginStyle.view_change_type_item_forall:changeLoginStyle.view_change_type_item}>
                        <Image source={Images.ic_qq} resizeMode={'contain'}
                                   style={changeLoginStyle.img_content}/>
                            <Text style={changeLoginStyle.text_content}>
                                QQ登录
                            </Text>
                        </View>
                        </TouchableWithoutFeedback>}
                </View>

                <View
                    style={changeLoginStyle.view_line}
                />

                <Text style={changeLoginStyle.text_content}>
                    登录遇到问题？
                </Text>


                {/*<SlideVerify*/}
                {/*    style={{width:'100%', height:200}}*/}
                {/*    useDefault*/}
                {/*    onVerifyPassed={alert('passed')}*/}
                {/*    onVerifyFailed={alert('failed')}*/}
                {/*/>*/}

            </View>
        );
    }
}
const mapStateToProps = (
    {
        whitelistdata: {
            token,
            userInfo,
        },
    }) => ({
    token,
    userInfo
});



export default connect(mapStateToProps)(ChangeLoginScreen);


