/**
 * 主题
 * @flow
 */
import React, {Component} from 'react';
import {
    StyleSheet,
} from 'react-native';
import { scaleSizeH, scaleSizeW } from '../util/AutoLayout';
import {setSpText} from "../util/AutoLayout";

// 这里改了也要更改 scripts/custom-rn-theme.js下的文件主题色
export const ThemeFlags = {
    Primary: '#048ee2',
    Default:'#2196F3',
    White: '#fff',
    Gray: '#999999',
    Red: '#F44336',
    Pink:'#E91E63',
    Purple:'#9C27B0',
    DeepPurple:'#673AB7',
    Border: '#e0e0e0',
    Paper: '#f3f3f3',
    Indigo:'#3F51B5',
    Blue:'#2196F3',
    LightBlue:'#03A9F4',
    Cyan:'#00BCD4',
    Teal:'#009688',
    Green:'#06B48D', // primary-color主题色
    LightGreen:'#8BC34A',
    Lime:'#CDDC39',
    Yellow:'#FFEB3B',
    Amber:'#FFC107',
    Orange:'#FF9800',
    DeepOrange:'#FF5722',
    Brown:'#795548',
    Grey:'#9E9E9E',
    BlueGrey:'#607D8B',
    Black:'#000000',
    "screen-background-color": "#F5F6F9", // screen的背景颜色
    "border-color": "#f6f6f6", // border 1px 的颜色，list分割线的颜色
    "text-fl-color": "#333333", // text一级字体颜色
    "text-sl-color": "#666666", // text二级字体颜色
    "text-tl-color": "#999999", // text三级字体颜色
    // 数值类
    "text-padding-horizontal": scaleSizeW(10), // 文字距离盒子的距离
    "content-margin-horizontal": scaleSizeW(10), // 内容距离屏幕两边的距离
    "content-margin-vertical": scaleSizeH(10), // 盒子与盒子之间的距离
    "border-width": 1, // 定义1像素
    "text-size-s": setSpText(12), // 小号字体
    "text-size-m": setSpText(14), // 中号字体
    "text-size-h": setSpText(16), // 大号字体
    "status-bar-bg-color": 'rgba(255, 255, 255, 1)', // 状态栏背景颜色
    "status-bar-style": 'dark-content'
}

export default class ThemeFactory{
    /**
     * 创建一个主题样式
     * @param themeFlag 主题标识
     * @returns {{themeColor: *, styles: *}}
     */
    static createTheme(themeFlag){
        return {
            themeColor:themeFlag,
            styles:StyleSheet.create({
                selectedTitleStyle:{
                    color:themeFlag,
                },
                tabBarSelectedIcon:{
                    tintColor: themeFlag,
                },
                navBar:{
                    backgroundColor:themeFlag,
                }
            }),
        }

    }
}
