import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Alert} from 'react-native';
import Title from '../../../../components/Title';
import Iconfont from '../../../../components/iconfont/Icon';
import {fetchUserLoginOut} from '../store/service';
import {connect} from 'react-redux';
const UserSettings = ({navigation,loginOut}) => {
    const listItems = [
        {label:'账号安全',onPress:()=>navigation.navigate('AccountSecurity')},
        {label:'反馈意见',onPress:()=>navigation.navigate('FeedBackOption')},
        {label:'清理缓存',onPress:()=>navigation.navigate('ClearCache')}]
    const _operationLogin =()=>{
        Alert.alert('温馨提示', '确定要退出登录吗?', [
            {
                text: "取消",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "确定", onPress: () => _exitLogin()}
        ]);

    }
    const _exitLogin = ()=>{
            // 清除有关用户的数据。防止退出登陆后打开程序首先进入首页然后再重定向到登陆页面
            loginOut();
            fetchUserLoginOut().then(res => {
                navigation.navigate('Login');
            })
    }
    return (
        <View style={styles.container}>
                {
                    listItems.map((item,index)=>{
                        return(
                            <ListRow key={index} label={item.label} onPress={item.onPress}/>
                        )
                    })
                }
                <TouchableOpacity activeOpacity={.8} onPress={_operationLogin}>
                <View style={{backgroundColor:'#fff', height:scaleSizeH(43.5),justifyContent:'center',marginTop:scaleSizeH(10)}}>
                    <Text style={{textAlign:'center',fontSize:setSpText(14)}}>
                        退出登录
                    </Text>
                </View>
                </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f7f7",
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
            <View style={{backgroundColor:'#fff',justifyContent:'center',height: scaleSizeH(43.5),borderBottomWidth:1, borderBottomColor:'#eee'}}>
                <View style={[styles.flexBox,{paddingHorizontal:scaleSizeW(15)}]}>
                    <Text style={{color:'#333',fontSize:setSpText(14)}}>{props.label}</Text>
                    <Iconfont name="Fill" color="#999" size={14}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const mapStateToProps = ({

                         }) => ({

})

const mapDispatchToProps = dispatch => ({
    loginOut() {
        dispatch({ type: 'whitelistdata/loginOut' });
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
