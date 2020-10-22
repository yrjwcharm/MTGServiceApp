import defaultThemes from '@ant-design/react-native/lib/style/themes/default';
import {setSpText} from "../util/AutoLayout";
import buttonStyle from "@ant-design/react-native/lib/button/style";
import {ThemeFlags} from "./ThemeFactory";
import {changeStyle} from './ChangeStyle';

/**
 * @author: liy_lmn
 * @date: 2019-10-14
 * @description: 获取第三方组件自定义样式newStyle的util
 */
const data_button =
    [
        {
            cssType: 'largeRawText', // 要改的样式的类名字
            val: [{key: 'fontSize', value: setSpText(14)}] // 要更改或添加的样式 key 为样式名称, value为值
        },
        {
            cssType: 'primaryHighlight', // 要改的样式的类名字
            val: [{key: 'backgroundColor', value: ThemeFlags.Green},{key: 'borderColor', value: ThemeFlags.Green}] // 要更改或添加的样式 key 为样式名称, value为值
        },
        {
            cssType: 'primaryHighlightText', // 要改的样式的类名字
            val: [{key: 'color', value: "#FFFFFF"}] // 要更改或添加的样式 key 为样式名称, value为值
        }
    ]

export default class WidgetStyles {
    /**
     * 获取自定义Button的style
     */
    static getButtonStyles() {
        const newStyle = {};
        changeStyle(newStyle, buttonStyle(defaultThemes), data_button);
        return newStyle;
    }
}
