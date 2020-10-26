/**
 * @author: liy_lmn
 * @date: 2019-12-16
 * @description: 本地的header
 */
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableWithoutFeedback, StatusBar} from 'react-native';
import {isIOS, isIPhoneX, isIPhoneXR, overAndroid5, scaleSizeH, scaleSizeW} from '../util/AutoLayout';
const statusBarHeight = isIOS ? ((isIPhoneX|| isIPhoneXR) ? 44 : 20) : (overAndroid5 ? StatusBar.currentHeight : 0);
const LocalHeader = (props) => {
    const {navigation, titleRight,title,onPress} = props;
    const goBack = () => {
        navigation.goBack()
    }
    return (
        <View style={[styles.view_content,{marginTop:statusBarHeight}]}>
            <TouchableWithoutFeedback onPress={onPress?onPress:goBack}>
                <View style={styles.view_left}>
                    <Image
                        style={{
                            width: scaleSizeW(10),
                            height: scaleSizeH(17),
                        }}
                        resizeMode={'contain'}
                        source={Images.ic_left}/>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.view_center}>
                <Text style={styles.text}>{title?title:null}</Text>
            </View>
            <View style={styles.view_right}>
                {titleRight?titleRight:null}
            </View>

        </View>);
};

const styles = StyleSheet.create({
    view_content: {
        height: scaleSizeH(40),
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#fff',
        flexDirection: 'row'
    },
    view_center: {
        height: scaleSizeH(40),
        justifyContent: 'center',
        alignItems: 'center',

    },
    view_left: {
        height: scaleSizeH(40),
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft:scaleSizeW(15)

    },
    view_right: {
        height: scaleSizeH(40),
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight:scaleSizeW(15)

    },
    text: {
        color: '#F3F3F3',
        fontSize: 16
    }
})

export default LocalHeader
