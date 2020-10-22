import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    BackHandler,
    ToastAndroid,
    DeviceEventEmitter,
    Keyboard,
    Platform,
} from 'react-native';
import HomeScreen from './main/home/screen/HomeScreen';
import Info from './main/info/screen/health-information/index';
import MessageScreen from './main/message/screen/MessageScreen';
import MineScreen from './main/my/screen/MineScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

 const MainScreen =(props)=> {
     let lastBackPressed = 0;
     const tabConfigs = {
         home: {
             screen: HomeScreen,
             tabName: '首页',
             activeIcon: Images.home_selected,
             inActiveIcon: Images.home,
             options: {tabBarLabel: '首页', headerShown: false},
         },
         info: {
             screen: Info,
             tabName: '资讯',
             activeIcon: Images.info_selected,
             inActiveIcon: Images.info,
             options: {tabBarLabel: '资讯'},
         },
         message: {
             screen: MessageScreen,
             tabName: '消息',
             activeIcon: Images.message_selected,
             inActiveIcon: Images.message,
             options: {tabBarLabel: '消息'},
         },
         mine: {
             screen: MineScreen,
             tabName: '我的',
             activeIcon: Images.mine_selected,
             inActiveIcon: Images.mine,
             options: {tabBarLabel: '我的'},
         },
     };
     useEffect(
         () => {
             BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
             return () => {
                 BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
             }
         }, [])
     const _tabBarOptions = {
         activeTintColor: '#3299FF',
         inactiveTintColor: '#999999',
     };
     const onBackAndroid = () => {
         if (props.navigation.isFocused()) {
             if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
                 //最近2秒内按过back键，可以退出应用。
                 BackHandler.exitApp()
                 return false
             }
             /**
              * 这块代码是处理从webview 返回监听
              */
             if(global.back){
                 global.back = null;
                 return true;
             }
             lastBackPressed = Date.now();
             ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
             return true;
         }

     }
     /**
      * 返回键处理
      * @returns {boolean}
      */
        return (
        <Tab.Navigator
            initialRouteName={'home'}
            screenOptions={({route, navigation}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    const _source = focused ? tabConfigs[route.name].activeIcon : tabConfigs[route.name].inActiveIcon;
                    return <Image source={_source} resizeMode={'contain'} style={{width: size, height: size}}/>;
                },
            })}
            backBehavior={'none'}
            tabBarOptions={_tabBarOptions}
        >
            {Object.keys(tabConfigs).map((key, i) => {
                const item = tabConfigs[key];
                return (
                    <Tab.Screen
                        name={key}
                        component={item.screen}
                        options={item.options}
                        key={`${i}`}
                    />
                );
            })}
        </Tab.Navigator>
    );
}

export default MainScreen;
