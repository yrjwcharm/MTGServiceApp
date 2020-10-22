import {
    TouchableOpacity,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native';
import * as React from "react";
import {scaleSizeW,setSpText,scaleSizeH} from '../util/AutoLayout';
import Iconfont from "./iconfont/Icon";
export interface ITitleButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    /** 是否不可以点击button */
    disabled?: boolean;
    /** 按钮的样式 */
    style?: StyleProp<ViewStyle>;
    /** 标题名字 */
    title?: string;
    titleColor?: string;
    titleStyle?: StyleProp<TextStyle>;
    showArrow?: boolean;
}

const TitleButton = (props: ITitleButtonProps) => {
    const { onPress, style, title, titleColor = '#333333', titleStyle, disabled, showArrow = true } = props;
    return (
        <TouchableOpacity
            onPress={(e) => { onPress(e); }}
    style={[styles.btn, style]}
    activeOpacity={0.8}
    disabled={disabled}
    >
    {showArrow && <Iconfont name="goback" color={'#333'} />}
    {title ? <Text style={[{ color: titleColor, fontSize: setSpText(18) }, titleStyle]}
        numberOfLines={1}>{title}</Text >
    : null}
    </TouchableOpacity>
);
};

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: scaleSizeW(15),
        paddingVertical: scaleSizeH(15),
    },
});

export default TitleButton;
