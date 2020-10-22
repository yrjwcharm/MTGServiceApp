import {
  Platform,
  StyleSheet,
} from 'react-native';
import { ThemeFlags } from './ThemeFactory';
import { scaleSizeH, scaleSizeW, setSpText } from '../util/AutoLayout';

// Picker的每一项
export const pickerItemStyle = Platform.select({
  android: { color: "#444", marginVertical: scaleSizeH(3), fontSize: ThemeFlags['text-size-h'], fontWeight: '100' }
})

// Picker、DatePicker
import style_1 from '@ant-design/react-native/lib/picker/style/index';
export const pickerStyles = StyleSheet.create({
  ...style_1,
  actionText: {
    ...style_1.actionText,
    color: ThemeFlags['text-sl-color'],
  }
})

// List.Item
import style_2 from '@ant-design/react-native/lib/list/style/index';
export const ListItemStyles = StyleSheet.create({
  ...style_2,
  Content: {
    ...style_2.Content,
    fontSize: ThemeFlags['text-size-m'],
  },
  Line: {
    ...style_2.Line,
    paddingRight: ThemeFlags['content-margin-horizontal'],
    minHeight: scaleSizeH(40),
    borderBottomWidth: 0,
  },
  Item: {
    ...style_2.Item,
    borderBottomColor: ThemeFlags['border-color'],
    borderBottomWidth: ThemeFlags['border-width'],
    paddingLeft: ThemeFlags['content-margin-horizontal'],
  },
  Extra: {
    ...style_2.Extra,
    fontSize: ThemeFlags['text-size-m'],
    color: ThemeFlags['text-sl-color'],
  },
  BriefText: {
    ...style_2.BriefText,
    fontSize: ThemeFlags['text-size-m'],
    color: ThemeFlags['text-tl-color'],
    lineHeight: 22,
  },
  Arrow: {
    ...style_2.Arrow,
    fontSize: setSpText(14),
    marginLeft: scaleSizeW(2),
    color: ThemeFlags['text-tl-color'],
    lineHeight: setSpText(14),
  },
})

// 图文资讯服务授权
export const EmpowerListItemStyle = StyleSheet.create({
  ...style_2,
  Content: {
    ...style_2.Content,
    fontSize: ThemeFlags['text-size-m'],
  },
  Line: {
    ...style_2.Line,
    paddingRight: ThemeFlags['content-margin-horizontal'],
    minHeight: scaleSizeH(40),
    borderBottomWidth: 0,
  },
  Item: {
    ...style_2.Item,
    borderBottomWidth: 0,
    paddingLeft: ThemeFlags['content-margin-horizontal'],
  },
  Extra: {
    ...style_2.Extra,
    fontSize: ThemeFlags['text-size-m'],
    color: ThemeFlags['text-sl-color'],
  },
  BriefText: {
    ...style_2.BriefText,
    fontSize: ThemeFlags['text-size-m'],
    color: ThemeFlags['text-tl-color'],
    lineHeight: 20,
  },
  Arrow: {
    ...style_2.Arrow,
    fontSize: setSpText(14),
    marginLeft: scaleSizeW(2),
    color: ThemeFlags['text-tl-color'],
    lineHeight: setSpText(14),
  },
})
