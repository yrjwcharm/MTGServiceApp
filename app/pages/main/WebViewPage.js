import React, {PureComponent, useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {BackHandler, Dimensions, Platform, SafeAreaView, StatusBar, View} from 'react-native';
import {isIOS, isIPhoneX, isIPhoneXR, overAndroid5} from '../../util/AutoLayout';
import NavigationHelper from '../../NavigationHelper'
const {width, height} = Dimensions.get('window');
const statusBarHeight = isIOS ? ((isIPhoneX|| isIPhoneXR) ? 44 : 20) : (overAndroid5 ? StatusBar.currentHeight : 0);
const WebViewPage = (props) => {
     const {navigation,route:{params}} = props;
    const webview = useRef(null);
    const [canBack, setCanBack] = useState(false);
    const injectedJavascript = `(function() {
     window.postMessage = function(data) {
         window.ReactNativeWebView.postMessage(data);
     };
    })()`;
    useEffect(
        () => {
            BackHandler.addEventListener('hardwareBackPress', goBack);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress',goBack);
            };
        }, [canBack]);
    const onMessage = (event) => {
        try {
            console.log(123,event);
            let data = event.nativeEvent.data;
            let result = data && JSON.parse(data);
            result.back && props.navigation.goBack();

        } catch (error) {

        }
    };
    const goBack = () => {
        if (canBack) {
            webview.current.goBack();
            return true;
        } else {
             global.back = true;
            NavigationHelper.goBack();
        }

    };
    const onNavigationStateChange = (navState) => {
        if (navState.canGoBack) {
            setCanBack(true);
        } else {
            setCanBack(false);
        }


    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <WebView
                ref={webview}
                source={{uri: params.url}}
                automaticallyAdjustContentInsets={false}
                style={{width, height}}
                onMessage={onMessage}
                injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
                injectedJavaScriptForMainFrameOnly={false}
                onLoadEnd={() => {
                    webview.current.postMessage(JSON.stringify({statusBarHeight: statusBarHeight}));
                }}
                onNavigationStateChange={onNavigationStateChange}

                /* We set this property in each frame */
                injectedJavaScriptBeforeContentLoaded={``}

                /* We read the colourToUse property in each frame to recolour each frame */
                injectedJavaScript={injectedJavascript}
            />
        </SafeAreaView>
    );


};
export default WebViewPage;
