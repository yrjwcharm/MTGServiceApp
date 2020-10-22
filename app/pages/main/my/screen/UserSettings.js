import React, {PureComponent} from 'react';
import {StyleSheet,TouchableOpacity, Text, View} from 'react-native';
import Title from '../../../../components/Title';
import Iconfont from '../../../../components/iconfont/Icon';
const UserSettings = (props) => {
    const {navigation} = props;
    const listItems = [
        {label:'账号安全',onPress:()=>navigation.navigate('AccountSecurity')},
        {label:'反馈意见',onPress:()=>navigation.navigate('FeedBackOption')},
        {label:'清理缓存',onPress:()=>navigation.navigate('ClearCache')}]
    return (
        <View style={styles.container}>
                {
                    listItems.map((item,index)=>{
                        return(
                            <ListRow key={index} label={item.label} onPress={item.onPress}/>
                        )
                    })
                }
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    flexBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
const ListRow = (props) => {
    return (
        <TouchableOpacity activeOpacity={.8} onPress={props.onPress}>
            <View style={{justifyContent:'center',height: scaleSizeH(43.5),borderBottomWidth:1, borderBottomColor:'#eee'}}>
                <View style={[styles.flexBox,{paddingHorizontal:scaleSizeW(15)}]}>
                    <Text style={{color:'#333',fontSize:setSpText(14)}}>{props.label}</Text>
                    <Iconfont name="Fill" color="#999" size={14}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export  default  UserSettings;
