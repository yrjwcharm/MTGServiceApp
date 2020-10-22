import React,{Component} from 'react';
import {View, Text, Image, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import Title from '../../../../components/Title';
import Iconfont from '../../../../components/iconfont/Icon';
const AccountSecurity = (props)=>{
    const {navigation}=props;
    const listItems = [{label:'绑定手机号',onPress:()=>navigation.navigate('BindPhoneCodeScreen')},{label:'修改密码',onPress:()=>navigation.navigate('SetPswCodeScreen')}];
    return(
        <View style={Styles.container}>
            {listItems.map(item=>{
                return(
                    <ListRow label={item.label} onPress={item.onPress}/>
                )
            })}
        </View>
    )
}
const ListRow = (props) => {
    return (
        <TouchableOpacity activeOpacity={.8} onPress={props.onPress}>
            <View style={{justifyContent:'center',borderBottomWidth:1,borderBottomColor:'#eee',height: scaleSizeH(43.5)}}>
                <View style={[styles.flexBox,{paddingHorizontal:scaleSizeW(15)}]}>
                    <Text style={{color:'#333',fontSize:setSpText(14 )}}>{props.label}</Text>
                    <Iconfont name="Fill" color="#999" size={14}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export  default  AccountSecurity;
