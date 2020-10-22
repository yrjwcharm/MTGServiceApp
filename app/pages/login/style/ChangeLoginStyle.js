'use strict';
import {
    StyleSheet,
} from 'react-native';
import {scaleSizeW, scaleSizeH, setSpText} from '../../../util/AutoLayout'

var styles = StyleSheet.create({

    loginWrap: {
        backgroundColor: '#FFFFFF',
    },
    text_title: {
        marginTop: scaleSizeH(74),
        color: '#2D2F2E',
        fontSize: setSpText(24)
    },
    text_content: {
        fontSize: setSpText(13),
        marginTop: scaleSizeH(10),
        color: '#04B48D'
    },
    text_bottom: {
        fontSize: setSpText(12),
        marginTop: scaleSizeH(20),
        color: '#04B48D'
    },


    view_change_type: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaleSizeH(76)
    },
    view_change_type_item: {
        flex: 1,
        alignItems: 'center'
    },
    view_change_type_item_forall: {
        alignItems: 'center'
    },
    view_line: {
        height: scaleSizeH(0.1),
        backgroundColor: '#F3F3F3',
        marginTop: scaleSizeH(20)
    },


    img_content: {
        width: scaleSizeW(60),
        height: scaleSizeH(60),
    },


})


module.exports = styles;
