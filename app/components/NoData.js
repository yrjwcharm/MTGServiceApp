import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import { ThemeFlags } from '../styles/ThemeFactory';
import { scaleSizeH, scaleSizeW } from '../util/AutoLayout';

/**
 * 暂无数据统一风格图片，上面图片下面文字，children放到最下面
 * @param {string} tip 提示文字 「可选」
 * @param {style} style 外层盒子样式 「可选」
 */
const NoData = ({ tip, children, style, image }) => {
  return (
    <View style={[styles.box, style]}>
      <Image
        resizeMode={'contain'}
        source={image ? image : Images.empty}
        style={styles.img}
      />
      <Text style={styles.tip}>{tip ? tip : '暂无数据'}</Text>
      {children ? children : null}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 500, // 设置最小高度是因为此组件可能放入scrollView中，无法适应flex1
  },
  tip: {
    color: ThemeFlags['text-sl-color'],
    fontSize: ThemeFlags['text-size-m'],
    marginVertical: 10,
  },
  img: {
    height: scaleSizeH(86),
    width: scaleSizeW(166),
    marginTop: -100,
  }
})

export default NoData;
