/**
 * @format
 */

import {AppRegistry, LogBox, StatusBar} from 'react-native';
 import './app/base/Global'
import App from './App';
import {name as appName} from './app.json';
// app内去除黄色警告
LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);
