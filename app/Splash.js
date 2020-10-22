import React, {useEffect, useState} from 'react';
import {
    View,
    ActivityIndicator,
    ImageBackground,
    Text,
    Image
} from 'react-native';
import {connect} from 'react-redux';

import {getKeysLength} from './util/EmptyUtils';
import {setNavigation, setHeaders} from './util/NavUtil';
import {Toast} from 'teaset';

/**
 * 初始化用户：根据token调用userInfo，没有token去登陆；
 * 将token放入@utils/NavUtil/setHeaders中
 * 将navigation放入@utils/NavUtil/setNavigation中
 */
const Splash = (props) => {
    // 是否接口请求通过
    const {fetchFindInfo} = props;
    const {token, userInfo: userInfoState, whitelistdata} = props;
    const {navigation} = props;
    useEffect(() => {
        // 设置提供接口使用的参数
        setHeaders(whitelistdata);
        // 设置全局navigation
        setNavigation(navigation);
        // 初始化权限判断
        initAuthorization();
    }, [])
    const initAuthorization = () => {
        // 如果没有token或者没有用户信息，则重定向到重新登陆
        if (!token || getKeysLength(userInfoState) === 0) {
            navigation.navigate('Login');
        }
        // 此步操作是为了将redux缓存数据替换再进行后续操作，每次打开app都获取服务器最新用户信息
        if (token) {
            // setTimeout(()=>{
            fetchFindInfo({}, (userInfoNet)=>{
                if(userInfoNet){
                    navigation.navigate('Main');
                }else{
                    Toast.message('登录失效');
                    navigation.navigate('Login');
                }

            });
            // },500)
        }
    }
    return (
        <View style={{flex: 1,}}/>
    )
}

const mapStateToProps = ({
                             whitelistdata: {
                                 token,
                                 userInfo
                             },
                             login: {
                                 isLoading
                             },
                             whitelistdata,
                         }) => ({
    token,
    isLoading,
    userInfo,
    whitelistdata,
});

const mapDispatchToProps = dispatch => ({
    fetchFindInfo(restOptions, callback) {
        dispatch({type: 'login/fetchFindInfo', restOptions, callback});
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
