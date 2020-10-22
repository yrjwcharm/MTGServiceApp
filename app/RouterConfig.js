/*
 * @Description: A lazy developer
 * @Author: yao
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2019-06-14 16:59:22
 * @LastEditors: yao
 */
import React from 'react';
import {Animated, StatusBar,StyleSheet} from 'react-native';
import {NavigationContainer,NavigationContainerRef} from '@react-navigation/native';
import {TransitionPresets,createStackNavigator,} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from './Splash';
/**
 * 登录相关 模块 静态导入
 */
import LoginCodeScreen from './pages/login/screen/LoginCodeScreen';
import AgreementScreen from './pages/login/screen/AgreementScreen';
import BindPhoneCodeScreen from './pages/login/screen/BindPhoneCodeScreen';
import ChangeLoginScreen from './pages/login/screen/ChangeLoginScreen';
import LoginPswScreen from './pages/login/screen/LoginPswScreen';
import LoginSendCodeScreen from './pages/login/screen/LoginSendCodeScreen';
import SetPswCodeScreen from './pages/login/screen/BindPhoneCodeScreen';
import SetPswSendCodeScreen from './pages/login/screen/BindPhoneSendCodeScreen';
import WebViewPage from './pages/main/WebViewPage';
import HealthInfoDetail from './pages/main/info/screen/health-information/HealthInfoDetail';
import UserSettings from './pages/main/my/screen/UserSettings';
import AccountSecurity from './pages/main/my/screen/AccountSecurity';
import FeedBackOption from './pages/main/my/screen/FeedBackOption';
import ClearCache from './pages/main/my/screen/ClearCache';
import NavigationHelper from './NavigationHelper';
import MainScreen from './pages/MainScreen'
import TitleButton from './components/TitleButton';
import {isIOS, isIPhoneX, isIPhoneXR, overAndroid5} from './util/AutoLayout';
const Stack = createStackNavigator();
const StatusBarHeight = isIOS ? ((isIPhoneX|| isIPhoneXR) ? 44 : 20) : (overAndroid5 ? StatusBar.currentHeight : 0);
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        height:scaleSizeH(44) + StatusBarHeight,
        // paddingTop: Platform.OS === 'ios' ? 0 : StatusBarHeight,
        shadowOpacity: 0, // remove shadow on iOS
    },
    headerTitle: {
        color: '#333',
        fontSize: setSpText(18),
        alignSelf: 'center',
        textAlign: 'center',
    },
});
const _ref = (ref:NavigationContainerRef) => {
    NavigationHelper.setNavigator(ref);
};

const _backButton = () => <TitleButton  onPress={NavigationHelper.backAction} />;
function AppContainer() {
    return (
        <NavigationContainer ref={_ref}>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerStyle: styles.header,
                    headerTintColor: '#fff', // 返回按钮和标题都使用这个属性作为它们的颜色
                    headerTitleStyle: styles.headerTitle,
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                    gestureEnabled: true,
                    transitionSpec: { timing: Animated.timing },
                    headerLeft: _backButton,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
                keyboardHandlingEnabled
                mode={'card'}
                headerMode={'screen'}
            >
                <Stack.Screen options={{ headerLeft: null, headerShown: false }}
                               name="Splash" component={Splash}/>
                <Stack.Screen  options={{ headerLeft: null, headerShown: false }}
                               name="Login" component={LoginCodeScreen}/>
                <Stack.Screen options={{  headerShown: false }} name="AgreementScreen" component={AgreementScreen}/>
                <Stack.Screen options={{  headerShown: false }} name="BindPhoneCodeScreen" component={BindPhoneCodeScreen}/>
                <Stack.Screen options={{  headerShown: false }} name="ChangeLoginScreen" component={ChangeLoginScreen}/>
                <Stack.Screen options={{  headerShown: false }} name="LoginPswScreen" component={LoginPswScreen}/>
                <Stack.Screen options={{ headerShown: false }} name="LoginSendCodeScreen" component={LoginSendCodeScreen}/>
                <Stack.Screen options={{ headerShown: false }} name="SetPswCodeScreen" component={SetPswCodeScreen}/>
                <Stack.Screen options={{ headerShown: false }} name="SetPswSendCodeScreen" component={SetPswSendCodeScreen}/>
                <Stack.Screen
                    name={'Main'}
                    component={MainScreen}
                    options={{ gestureEnabled:false, headerLeft: null, headerShown: false }}
                />
                <Stack.Screen options={{headerShown:false}} name="WebViewPage" component={WebViewPage}/>
                <Stack.Screen options={{title:'资讯详情'}} name="HealthInfoDetail" component={HealthInfoDetail}/>
                <Stack.Screen options={{title:'系统设置'}} name="UserSettings" component={UserSettings}/>
                <Stack.Screen options={{ title:'账号安全'}}  name="AccountSecurity" component={AccountSecurity}/>
                <Stack.Screen options={{title:'反馈意见'}} name="FeedBackOption" component={FeedBackOption}/>
                <Stack.Screen  options={{title:'缓存大小'}} name="ClearCache" component={ClearCache}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer;
