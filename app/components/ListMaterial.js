import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

import { ThemeFlags } from '../styles/ThemeFactory';
import { parseNickname } from '../util/helper/parsers';
// import commonStyles from '@styles/common';

export const NoMore = () => (
  <View style={styles.no_more}>
    <Text style={styles.no_more_text}>
      没有更多数据了
    </Text>
  </View>
)

export const More = () => (
  <View style={styles.loadingFooter}>
    <ActivityIndicator />
    <Text>正在加载更多数据...</Text>
  </View>
)

// 头像
export const Avatar = ({ imgUrl, name, isReverse, size = 60, style = {} }) => {
  const sizeStyle = {
    height: size,
    width: size,
    borderRadius: size / 2,
  }
  if (imgUrl) return (
    <Image
      style={[styles.avatar, sizeStyle, style]}
      source={{ uri: imgUrl }}
    />
  )
  return <View style={[styles.avatar, styles.no_avatar, sizeStyle, style, isReverse ? styles.isReverse : {}]}>
    <Text style={[styles.no_avatar_text, isReverse ? styles.isReverse : {}, {fontSize: size / 2.5}]}>{parseNickname(name)}</Text>
  </View>
}

// 消息徽标
export const Badge = ({ text = 0 }) => {
  return text ? (
    <Text style={styles.badge}>{text > 99 ? '99' : text}</Text>
  ) : null
}

// 标签 家医|全 家医|健 等等..
export const ConversationLable = ({ text }) => {
  if (text) {
    return <View style={[styles.label, { backgroundColor: '#F59A23' }]}>
      <Text style={styles.label_text}>
        {text}
      </Text>
    </View>
  }
  return null;
}

/**
 * 讨嫌的小红点
 * isVisible: 是否显示红点
 */
export const Dot = (props) => {
  return (
    <View style={styles.dot_wrapper}>
      {props.children}
      {!!props.isVisible && <View style={[styles.dot_dot, props.style]}></View>}
    </View>
  )
}


// ----------------------------- styles -----------------------------
const styles = StyleSheet.create({
  /* Dot */
  dot_wrapper: { position: "relative" },
  dot_dot: { position: "absolute", width: 7, height: 7, backgroundColor: '#EC2A2A', borderRadius: 7, top: 0, right: 3, },
  /* Dot */
  /* footer */
  loadingFooter: { flexDirection: 'row', height: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 10, },
  no_more: { height: 24, alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10, },
  no_more_text: { color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, },
  /* footer */
  isReverse: {backgroundColor: '#fff', color: ThemeFlags["Green"]},
  avatar: {
    height: 58,
    width: 58,
    borderRadius: 58 / 2,
    overflow: 'hidden',
  },
  no_avatar: {
    backgroundColor: ThemeFlags['Green'],
    justifyContent: "center",
    alignItems: 'center',
  },
  no_avatar_text: {
    color: '#fff',
    fontSize: 24,
  },
  badge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    overflow: 'hidden',
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#EC2A2A',
    color: '#eee',
    textAlign: 'center',
    fontSize: ThemeFlags['text-size-s'],
  },
  label: {
    backgroundColor: '#F59A23',
    borderRadius: 8,
    paddingHorizontal: 4,
    marginLeft: -105,
  },
  label_text: {
    color: '#FFFFFF',
    fontSize: ThemeFlags['text-size-s'],
  },
})
