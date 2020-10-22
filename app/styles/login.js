/*
 * @Description: A lazy developer
 * @Author: yao
 * @Date: 2018-09-13 20:18:48
 * @LastEditTime: 2019-06-14 17:00:34
 * @LastEditors: yao
 */
'use strict';
/**
 * @class
 * @desc login
 * */
import {
    StyleSheet,
    PixelRatio,
    Dimensions,
} from 'react-native';

var cell_w = Dimensions.get('window').width;
var styles = StyleSheet.create({
    loginWrap: {
        backgroundColor: '#FCE9D4',
    },

    imgWrap: {
        flexDirection: 'row',
        flex: 1,
    },

    loginMain: {
        flex: 1,
    },

    loginMainCon: {
        position: 'absolute',
        marginTop: 110,
        marginLeft: (cell_w - 320) / 2,
        backgroundColor: '#fff',
        height: 330,
        borderRadius: 20,
    },

    companyCulture: {
        width: 320,
        minHeight: 50,
    },

    logoImg: {
        position: 'absolute',
        top: 0,
        left: cell_w / 7,
        width: cell_w / 7 * 5,
        resizeMode: 'contain',
    },

    formStyle: {
        backgroundColor: '#F4F3F3',
        marginTop: 30,
        marginLeft: 10,
        width: 300,
        marginBottom: 30,
        borderRadius: 8,
    },

    formInput: {
        flexDirection: 'row',
        padding: 20,
    },

    formInputSplit: {
        borderBottomWidth: 1,
        borderBottomColor: '#dbdada',
    },

    loginInput: {
        borderColor: '#000',
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
    },

    forget: {
        //alignItems: 'flex-end',
        flexDirection: 'row',

    },

    btn: {
        flexDirection: 'row',
        //backgroundColor:'transparent',
    },

    btnWrap: {
        borderRadius: 5,
        height: 50,
    },

    loginBtn1: {
        fontSize: 20,
        color: '#ffffff',
        backgroundColor: 'transparent',
        width: 150,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 15,
        marginRight: 20,
        flex: 1,
        textAlign: 'center',
    },

    loginBtn2: {
        fontSize: 20,
        color: '#C7D634',
        backgroundColor: '#fff',
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 15,
        flex: 1,
        textAlign: 'center',
    },

})


module.exports = styles;
