/*
 * @Description: A lazy developer
 * @Author: yao
 * @Date: 2018-09-13 20:18:48
 * @LastEditTime: 2019-06-14 18:00:14
 * @LastEditors: yao
 */
'use strict';
/**
 * @class StylesCommon
 * @desc 通用样式
 * */

import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
import { ThemeFlags } from './ThemeFactory';
var cell_w = Dimensions.get('window').width;
import {scaleSizeH,setSpText,scaleSizeW} from '../util/AutoLayout'
var styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingLeft:scaleSizeW(30),
        paddingRight:scaleSizeW(30)
    },
    wrapper_main: {
        flex: 1,
        width:'100%',
        paddingLeft:scaleSizeW(10),
        paddingRight:scaleSizeW(10),
        marginTop:scaleSizeH(14)
    },
    bgColor: {
        backgroundColor: '#F5FCFF'
    },
    mgt5: {
        marginTop: 5,
    },
    mgb5: {
        marginBottom: 5,
    },
    pdt5: {
        paddingTop: 5,
    },
    pdb5: {
        paddingBottom: 5,
    },
    textCenter: {
        textAlign: 'center',
        flex: 1,
    },
    textAli: {
        textAlign: 'right',
    },
    navbar: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1/PixelRatio.get(),
    },
    justAlign: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    modal: {
        height: 100,
        width: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    viewList: {
        padding: 10,
        fontSize: 15,
    },

    flexRow: {
        flexDirection: 'row',
    },

    flex1: {
        flex: 1,
    },

    btn_style: {
        width:'100%',
        backgroundColor: '#00B28B',
        height: scaleSizeH(40),
        borderColor:'#FFFFFF',
        borderWidth:0,
        borderRadius:0,
        marginTop: scaleSizeH(20)
    },
    commonBottomButton: {
        backgroundColor: ThemeFlags["Green"],
        width: '100%',
        height: scaleSizeH(40),
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    commonBottomButtonText: {
        fontSize: setSpText(16),
        fontWeight: 'normal',
        color: '#FFFFFF',
    },
    color1_s: {
        color: ThemeFlags['text-fl-color'],
        fontSize: ThemeFlags['text-size-s'],
    },
    color1_m: {
        color: ThemeFlags['text-fl-color'],
        fontSize: ThemeFlags['text-size-m'],
    },
    color1_l: {
        color: ThemeFlags['text-fl-color'],
        fontSize: ThemeFlags['text-size-h'],
    },
    color2_s: {
        color: ThemeFlags['text-sl-color'],
        fontSize: ThemeFlags['text-size-s'],
    },
    color2_m: {
        color: ThemeFlags['text-sl-color'],
        fontSize: ThemeFlags['text-size-m'],
    },
    color2_l: {
        color: ThemeFlags['text-sl-color'],
        fontSize: ThemeFlags['text-size-h'],
    },
    color3_s: {
        color: ThemeFlags['text-tl-color'],
        fontSize: ThemeFlags['text-size-s'],
    },
    color3_m: {
        color: ThemeFlags['text-tl-color'],
        fontSize: ThemeFlags['text-size-m'],
    },
    color3_l: {
        color: ThemeFlags['text-tl-color'],
        fontSize: ThemeFlags['text-size-h'],
    },
   

});
module.exports = styles;
