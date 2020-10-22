import React,{Component} from 'react';
import {Platform, StatusBar,StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {isIPhoneX, statusBarHeight} from '../util/AutoLayout';
import Iconfont  from '../components/iconfont/Icon';
const Title =(props)=>{
    return(
        <View style={[styles.paddingTop,{backgroundColor:'#fff',borderBottomColor:'#eee',borderBottomWidth:StyleSheet.hairlineWidth}]}>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
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
