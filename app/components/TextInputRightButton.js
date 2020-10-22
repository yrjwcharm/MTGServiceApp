'use strict';
import React, {Component,useState} from "react";
import PropTypes from 'prop-types'
import {Image, StyleSheet, TextInput, TouchableOpacity, View, TouchableWithoutFeedback} from "react-native";
import {scaleSizeH, scaleSizeW, setSpText} from "../util/AutoLayout";

const TextInputRightButton = (props) => {
  //是否获取焦点
  const [isFocused, setIsFocused] = useState(false);
  const {source, source_psw, onButtonClick, onChange, value, isShowImgPsw, onChangeShow, secureTextEntry} = props;
  const _isNull = (str) => {
    let result = true;
    if (str === "" || str === undefined) {
      result = true;
    }

    if (str.length > 0) {
      result = false;
    }
    return result;
  }

  const _getRightButtonView = () => {
    //右侧按钮图
    //自定义 按钮图
    let source = source ? source :Images.ic_close;
    let source_psw = secureTextEntry ? Images.ic_eyes_close :Images.ic_eyes_open;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.closeOpacityStyle}
        onPress={
          onButtonClick
        }>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          {
            isShowImgPsw ?
              <TouchableWithoutFeedback onPress={
                onChangeShow
              }>
                <Image style={secureTextEntry ? styles.eyesStyle_close : styles.eyesStyle_open}
                       source={source_psw}
                       resizeMode={'contain'}
                />
              </TouchableWithoutFeedback>
              : null
          }
          {
            isFocused?<Image style={styles.closeStyle}
                             source={source}
                             resizeMode={'contain'}
            />:null
          }


        </View>

      </TouchableOpacity>)
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          fontSize: setSpText(13),
          color: '#333333',
          flex: 1,
        }}
        placeholderTextColor="#999999"
        underlineColorAndroid="transparent"
        numberOfLines={1}
        clearButtonMode={'never'}
        value={value}
        onChangeText={onChange}
        onBlur={()=>{
          setIsFocused(false)
        }}
        onFocus={()=>{
          setIsFocused(true)
        }}
        {...props}/>
      {_isNull(value)&&!isFocused ? null : _getRightButtonView()}
    </View>
  );
}
export default TextInputRightButton

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      height: scaleSizeH(38),
    },
    closeStyle: {
      height: scaleSizeH(16),
      width: scaleSizeW(16),
    },
    eyesStyle_open: {
      height: scaleSizeH(15),
      width: scaleSizeW(17),
      marginLeft: scaleSizeW(20),
      marginRight: 20
    },
    eyesStyle_close: {
      height: scaleSizeH(15),
      width: scaleSizeW(16),
      marginLeft: scaleSizeW(20),
      marginRight: 20
    },
    closeOpacityStyle: {
      justifyContent: 'center',
    },
  }
)
