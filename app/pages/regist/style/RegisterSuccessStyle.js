'use strict';
import {
    StyleSheet,
} from 'react-native';
import {scaleSizeW, scaleSizeH, setSpText} from '../../../util/AutoLayout'

var styles = StyleSheet.create({

    Wrap: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    text_top1: {
        fontSize: setSpText(16),
        color: '#333333',
        marginTop: scaleSizeH(18)
    },
    text_top2: {
        fontSize: setSpText(16),
        color: '#00B88B'
    },
    text_center1: {
        fontSize: setSpText(14),
        color: '#666666',
        marginTop: scaleSizeH(10),
        paddingBottom: scaleSizeH(46)
    },
    img_content: {
        width: scaleSizeW(90),
        height: scaleSizeH(79),
        marginTop: scaleSizeH(46)
    },
    img_bottom: {
        width: 16,
    },

    view_line: {
        height: scaleSizeH(0.1),
        width: scaleSizeW(110),
        backgroundColor: "#333333"
    },
    text_bottom: {
        fontSize: setSpText(14),
        color: '#666666',
        height:scaleSizeH(54)
    },


})


module.exports = styles;
