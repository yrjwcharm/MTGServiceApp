import React,{Component} from 'react';
import {Platform, StatusBar,StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Iconfont  from '../components/iconfont/Icon';
import {BoxShadow} from 'react-native-shadow';
import {isIOS, isIPhoneX, isIPhoneXR, overAndroid5} from '../util/AutoLayout';
const width = Dimensions.get('window').width;
const StatusBarHeight = isIOS ? ((isIPhoneX|| isIPhoneXR) ? 44 : 20) : (overAndroid5 ? StatusBar.currentHeight : 0);
const Title =(props)=>{
    const shadowOpt = {
        width, //包裹的子内容多宽这里必须多宽
        height:scaleSizeH(44) + StatusBarHeight,//同上
        color:"#000",//阴影颜色
        border:4,//阴影宽度
        // radius:22,//包裹的子元素圆角多少这里必须是多少
        opacity:0.1,//透明度
        x:0,
        y:0,
    }
    return(
        <BoxShadow setting={shadowOpt}>
        <View style={[styles.paddingTop,{backgroundColor:'#fff',borderBottomColor:'#eee',borderBottomWidth:StyleSheet.hairlineWidth}]}>
        <View style={StyleSheet.flatten(styles.header)}>
            <View style={{paddingHorizontal:scaleSizeW(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <TouchableOpacity activeOpacity={.8} onPress={props.onPressBack}>
                    {props.back?<Iconfont name="goback" color={'#333'} />
                        :<View/>}
                </TouchableOpacity>
                  <Text style={{color:Color.black,fontSize:setSpText(18)}}>{props.name}</Text>
                <View/>
            </View>
        </View>
        </View>
        </BoxShadow>

    )
}
export  default Title;

console.log(333,StatusBar.currentHeight);
const styles = StyleSheet.create({
    header:{
        height:scaleSizeH(44),
        justifyContent:'center',
    },
    paddingTop:{
        paddingTop:Platform.OS==='android'?StatusBar.currentHeight:isIPhoneX()?34:20
    }
})
