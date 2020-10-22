import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {scaleSizeH, scaleSizeW, setSpText} from "../util/AutoLayout";

const RegistModalView = (props) => {
  const {
    phone,
  } = props;
  return (
    <Text style={styles.text_content}>手机号
      <Text style={styles.text_center}>[{phone}]</Text>
      未注册, 点击
      <Text style={styles.text_center}>[注册] </Text>
      按钮，我们将为您注册并进入
      <Text style={styles.text_center}>佑健康</Text>
    </Text>
  );
}
//密码登录显示样式
export const PswModalView = (props) => {
  const {
    phone,
  } = props;
  return (
    <Text style={styles.text_content}>手机号
      <Text style={styles.text_center}>[{phone}]</Text>
      未注册, 您可以继续点击
      <Text style={styles.text_center}>[验证码登录] </Text>
      按钮登录并注册
      <Text style={styles.text_center}>佑健康</Text>
    </Text>
  );
}

//密码登录显示样式
export const BindModalView = (props) => {
  const {
    phone,
  } = props;
  return (
    <Text style={styles.text_content}>当前账号已成功绑定新手机号：
      <Text style={styles.text_center}>{phone},</Text>
      您需要用新手机号重新登录
    </Text>
  );
}

const styles = StyleSheet.create({
  text_content: {
    color: '#333333',
    fontSize: setSpText(14),
    lineHeight: 20
  },
  text_center: {
    color: '#04B48D',
    fontSize: setSpText(14),
    lineHeight: 20
  },

})

export default RegistModalView;
