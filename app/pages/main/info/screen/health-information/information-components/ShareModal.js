import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Modal } from '@ant-design/react-native';
import  Icon  from '../../../../../../components/Icon';
import { ThemeFlags } from "../../../../../../styles/ThemeFactory";
import { scaleSizeH, scaleSizeW,setSpText } from '../../../../../../util/AutoLayout';

const ShareModal = (props) => {
  return (
    <Modal
      popup
      visible={props.visiable}
      animationType="slide-up"
      onClose={props.onClose}
    >
      <View style={styles.bodyContainer}>
        <View style={styles.shareItems}>
          <View style={styles.shareContainer}>
            <Icon name={'healthInfo/shareWechat'} />
            <Text style={styles.shareText}>微信</Text>
          </View>
          <View style={styles.shareContainer}>
            <Icon name={'healthInfo/shareQQ'} />
            <Text style={styles.shareText}>QQ</Text>
          </View>
          <View style={styles.shareContainer}>
            <Icon name={'healthInfo/shareMessage'} />
            <Text style={styles.shareText}>短信</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback onPress={props.onClose}>
            <View style={styles.closeBtn}>
              <Text style={styles.btnText}>取消</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    marginHorizontal: scaleSizeW(20),
    marginTop: scaleSizeW(20),
  },
  closeBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 99,
    // width: '100%',
    height: scaleSizeH(40),
    // marginHorizontal: ThemeFlags['content-margin-horizontal'],
    // marginBottom: scaleSizeH(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    paddingVertical: 20,
    backgroundColor: '#EFEFEF',
    flexDirection: 'column',
  },
  shareContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    color: ThemeFlags['text-fl-color'],
    fontSize: ThemeFlags['text-size-m'],
    marginTop: ThemeFlags['content-margin-vertical'],
  },
  btnText: {
    fontSize: ThemeFlags['text-size-m'],
    color: ThemeFlags['text-fl-color'],
  },
  shareItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
})

export default ShareModal
