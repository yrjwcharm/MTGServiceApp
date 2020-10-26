import React, {Component} from 'react';
import {
    View,
    Image,
    Platform,
    TouchableOpacity,
    StyleSheet, StatusBar,
} from 'react-native';

import {
    scaleSizeW,
    scaleSizeH,
    setSpText,
    isIOS,
    isIPhoneX,
    isIPhoneXR,
    overAndroid5,
} from '../util/AutoLayout';
import {ThemeFlags} from '../styles/ThemeFactory';
import  Iconfont from '../components/iconfont/Icon'
const StatusBarHeight = isIOS ? ((isIPhoneX|| isIPhoneXR) ? 44 : 20) : (overAndroid5 ? StatusBar.currentHeight : 0);
//快速录入
// import QuickJumpModal from '../pages/main/home/screen/QuickJumpModal';

const styles = StyleSheet.create({
    headerLeft: {
        width: scaleSizeW(40),
        height: scaleSizeW(22),
        justifyContent: 'center',
    },
    headerLeftImage: {
        width: scaleSizeW(10),
    },
})

// header左侧组件
export const _HeaderLeft = ({navigation, color}) => {
    const HeaderLefetImage = (
        <Iconfont name="goback" color={color} />
    )
    const touchProps = {
        style: styles.headerLeft,
        onPress: () => {
            const { backHandler } = navigation.state.params || {};
            backHandler ? backHandler() : navigation.goBack();
        },
        hitSlop: {left: 30, top: 30, right: 30, bottom: 30},
        activeOpacity: 0.7,
    }
    return (
        <TouchableOpacity
            {...touchProps}
        >
            {HeaderLefetImage}
        </TouchableOpacity>
    )
}
export const HeaderLeft = _HeaderLeft;

// 统一createStackNavigator默认配置中defaultNavigationOptions属性的配置
export const defaultNavigationOptions = {
    headerLeft: <HeaderLeft/>,
    headerStyle: {
        // height: scaleSizeH(44),
        height: scaleSizeH(44 + StatusBarHeight),
        elevation: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingTop: scaleSizeH(StatusBarHeight),
    },
    headerBackTitle: null, // ios下返回null，因为默认会有back或者上一级标题
    headerLeftContainerStyle: {
        paddingLeft: scaleSizeW(10),
    },
    headerRightContainerStyle: {
        // 统一右侧header。与现有页面冲突，去掉
        // marginRight: scaleSizeW(10),
    },
    headerTitleStyle: {
        fontSize: setSpText(16),
        color: '#333333',
        fontWeight: '400'
    }
}

// 统一的tab图片显示判断
export const TabView = (props) => {
    const {focused, height, width, source_select, source_deselect, size = 18} = props;

    const icon = focused ? source_select : source_deselect;
    // 如果传入的是字符串，则是iconfont编码的情况
    if (typeof icon === 'string') {
      return (
        <Iconfont
          name={icon}
          size={size}
        />
      )
    }
    return <Image
      resizeMode={"contain"}
      source={icon}
      style={{height: height, width: width}}
    />
  }

// 中间添加按钮
export class AddView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    render() {
        const {focused, height, width, source_select, source_deselect} = this.props;
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex:1
            }}>
                {/* <TouchableOpacity
                    hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
                    onPress={() => {
                        this.props.navigation.navigate("QuickJumpModal")
                    }}> */}
                    <View style={{
                        width: 32,
                        height: 32,
                        borderRadius: 100,
                        backgroundColor: ThemeFlags.Green,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15
                    }}>
                    <Image
                        resizeMode={"contain"}
                        source={focused ? source_select : source_deselect}
                        style={{height: height, width: width,}}
                    />
                    </View>
                {/* </TouchableOpacity> */}
            </View>
        )
    }

}

/**
 * 统一每个tabNavigator 的 tabNavigationOptions配置
 * @param {string} tabBarLabel icon下面的名称
 * @param {number} width icon的宽
 * @param {number} height icon的高
 * @param {Image：source} source_select 未选中icon
 * @param {Image：source} source_deselect 选中icon
 *
 */
