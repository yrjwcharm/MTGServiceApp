import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ThemeFlags } from '../styles/ThemeFactory';
import { scaleSizeH, setSpText } from '../util/AutoLayout';
/**
 * isInverse: bool 控制背景色与文本颜色反转
 *
 */
export default props => {
  const {style, textStyle, isInverse, children, ...rest} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, isInverse ? styles.inverseContainer : {}, style]}
      {...rest}
    >
      {children && typeof children === 'string' ? (
        <Text style={[styles.text, isInverse ? styles.inverseText : {}, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeFlags["Green"],
    height: scaleSizeH(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: setSpText(16),
    color: '#fff',
  },
  inverseContainer: {
    backgroundColor: "#fff",
  },
  inverseText: {
    color: ThemeFlags["Green"],
  }
})
