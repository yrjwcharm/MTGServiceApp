import {StyleSheet} from "react-native";
import {scaleSizeW, setSpText} from "../util/AutoLayout";
import { ThemeFlags } from "./ThemeFactory";
/**
* @author: liy_lmn
* @date: 2019-11-22
* @description: 顶部选择标题style
*/
var styles = StyleSheet.create({
    view_flatlist:{
        marginLeft: scaleSizeW(12),
        marginRight: scaleSizeW(12)
    },

    view_flatlist_date_item: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    view_flatlist_date_item_check: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#04B48D',
        borderBottomWidth: scaleSizeW(2)
    },
    view_flatlist_date_item_uncheck: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "transparent",
        borderBottomWidth: scaleSizeW(2),

    },
    text_flatlist_item_top_check: {
        fontSize: setSpText(14),
        color: ThemeFlags['Green'],
        paddingLeft: scaleSizeW(2.5),
        paddingRight: scaleSizeW(2.5),
        fontWeight:'500'
    },
    text_flatlist_item_top_uncheck: {
        fontSize: setSpText(14),
        color: ThemeFlags['text-fl-color'],
        paddingLeft: scaleSizeW(2.5),
        paddingRight: scaleSizeW(2.5),
    },
})
module.exports = styles;
