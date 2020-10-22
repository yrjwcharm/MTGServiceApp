/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar,  NativeEventEmitter, NativeModules, SafeAreaView, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './app/redux/store';
import SplashScreen from 'react-native-splash-screen';
import AppContainer from './app/RouterConfig';

let {store, persistor} = configureStore();

//正式环境打包 屏蔽console
if (!__DEV__) {
    // 去掉console
    global.console = {
        log: () => { },
        info: () => { },
        error: () => { },
        warn: () => { },
        group: () => { },
        groupEnd: () => { },
        groupCollapsed: () => { },
        assert: () => { },
    };
}
export default class App extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        SplashScreen.hide();

    }

    render() {
        return (
                <Provider store={store}>
                  <StatusBar
                      backgroundColor="transparent"
                      translucent={true}
                  />
                    <PersistGate loading={null} persistor={persistor}>
                        <AppContainer/>
                    </PersistGate>
                </Provider>
        );
    }
}
