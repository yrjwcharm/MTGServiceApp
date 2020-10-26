'use strict';
import React, {Component} from 'react';
import {BackHandler, Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Button} from '@ant-design/react-native';
import {connect,} from 'react-redux';
import {Toast} from 'teaset'

import commonStyle from '../../../styles/common';
import RegisterSuccessStyle from '../style/RegisterSuccessStyle';
import {scaleSizeW} from "../../../util/AutoLayout";
import WidgetStyles from "../../../styles/WidgetStyles";
import {ThemeFlags} from "../../../styles/ThemeFactory";
import MyModal from "../../../components/MyModal";
import ApiModule from "../../../modules/ApiModule";

/**
 * @author: liy_lmn
 * @date: 2019-09-30
 * @description: 注册成功界面
 */
let that;
class RegisterSuccess extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '注册成功',
    headerRight:
          <TouchableWithoutFeedback onPress={() => {
            that.props.skipInitComplete((data) => {
              if (data.code == 200) {
                navigation.navigate("Preference")
                // navigation.navigate("HomePageScreen")
              } else {
                Toast.info(data.msg, );
              }
            })
          }
          }>
            <Text style={{
              fontSize: ThemeFlags['text-size-m'],
              marginRight: scaleSizeW(15),
              color: ThemeFlags['text-sl-color']
            }}>跳过</Text>
          </TouchableWithoutFeedback>
  })

  constructor(props) {
    super(props);
    that = this;
    this.state = {
      visible_modal: false,//是否显示返回modal
    };
    this.toUser = this.toUser.bind(this);
    this.toDoctor = this.toDoctor.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)

    this.addBackHandler();
  }

  onClose = () => {
    this.setState({
      visible_modal: false
    })
  }
  addBackHandler = () => {
    const {navigation} = this.props;
    // navigation.setParams({ backHandler: () => navigation.navigate('LoginCodeScreen') })
    navigation.setParams({
      backHandler: () => {
        this.setState({
          visible_modal: true
        })
      }
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.isLoggedIn === true) {

      //will redirect
      this.setState({
        modalVisible: false
      })
      this.toMain();
      return;
    }
    if (nextProps.status == 'error' || nextProps.status == 'done') {
      console.log(nextProps.error);
      this.setState({
        modalVisible: false
      })
      // this.refs.modal.close();
      return;
    }
  }

  toUser() {
    this.props.navigation.push("Preference")
  }

  toDoctor() {
    this.props.navigation.push("Preference")
  }

  //安卓返回键关闭APP
  onBackPress = () => {
    if (this.props.navigation.isFocused()) {
      this.setState({
        visible_modal: true
      })
      return true
    } else {
      return false
    }
  };
  exitAll = () => {
    ApiModule.loginout();
    this.onClose()
    const {loginOut} = this.props;
    // 清除有关用户的数据。防止退出登陆后打开程序首先进入首页然后再重定向到登陆页面
    loginOut();
    this.props.navigation.navigate('LoginCodeScreen')
  }

  goPerfectUser=()=>{
    this.props.changeIsClickRigiseSuccessButton(true)
    const {navigation}=this.props
    this.props.updateInitComplete(0,(data)=>{
      if (data.code == 200) {
        this.props.fetchFindInfo({},(userInfo)=>{
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
        })
      } else {
        Toast.info(data.msg, );
      }
    })


  }

  render() {
    const type = 1;
    const modal_content = <Text style={{lineHeight: 20}}>点击[退出登录]将会退出当前登录状态，确定要退出吗？</Text>;

    return (
      <View style={[commonStyle.wrapper, RegisterSuccessStyle.Wrap]}>
        <MyModal
          onRequestClose={this.onClose}
          visible={this.state.visible_modal}
          title={'退出登录提示'}
          btn_left={'取消'}
          btn_right={'退出登录'}
          content={modal_content}
          onClickRight={this.exitAll}
          onClickLeft={this.onClose}/>
        <Image
          source={Images.ic_success}
          resizeMode={'contain'}
          style={RegisterSuccessStyle.img_content}
        />
        <Text style={RegisterSuccessStyle.text_top1}>
          恭喜您成功注册<Text style={RegisterSuccessStyle.text_top2}>佑健康</Text> ^_^
        </Text>

        <Text style={RegisterSuccessStyle.text_center1}>
          当前身份:{type === 1 ? '公众用户' : '医师用户'}
        </Text>


        <Text style={[RegisterSuccessStyle.text_bottom,{
          lineHeight:24,
        }]}>
          <Image
            source={Images.ic_remind}
            resizeMode={'contain'}
            style={RegisterSuccessStyle.img_bottom}
          />
          {type === 1 ? '  接下来，我们希望了解您更多，以便为您提供更加精准的健康服务~' : '   接下来我们需要您完善个人基本信息并完成医师资格认证，认证之后才可以使用~'}

        </Text>


        <Button
          onPress={this.goPerfectUser}
          styles={WidgetStyles.getButtonStyles()}
          style={commonStyle.btn_style}
          type={'primary'}
        >立即完善</Button>

      </View>
    );
  }
}

const mapStateToProps = (
  {
    whitelistdata: {
      token,
      userInfo
    },
  }) => ({
  token,
  userInfo
});

const mapDispatchToProps = dispatch => ({
  //修改是否需要验证个人信息状态
  changeIsVerification(params) {
    dispatch({type: 'whitelistdata/changeIsVerification', data: params});
  },
  skipInitComplete(callback) {
    dispatch({type: 'user/skipInitComplete', callback});
  },

  updateInitComplete(params,callback) {
    dispatch({type: 'user/updateInitComplete',params, callback});
  },

  loginOut() {
    dispatch({ type: 'whitelistdata/loginOut' });
  },
  fetchFindInfo(restOptions, callback) {
    dispatch({type: 'login/fetchFindInfo', restOptions, callback});
  },
  changeIsClickRigiseSuccessButton(data) {
    dispatch({type: 'whitelistdata/changeIsClickRigiseSuccessButton', data: data});
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSuccess);
