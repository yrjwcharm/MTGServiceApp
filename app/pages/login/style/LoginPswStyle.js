'use strict';
import {
    StyleSheet,
} from 'react-native';
import {scaleSizeW, scaleSizeH, setSpText} from '../../../util/AutoLayout'

var styles = StyleSheet.create({
    loginWrap: {
        flex:1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal:scaleSizeW(32)
    },
    view_content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleSizeH(45),
    },
    view_top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: scaleSizeH(74)
    },

    view_line_vertical: {
        height: scaleSizeH(19),
        width: 1,
        marginLeft: scaleSizeW(9),
        marginRight: scaleSizeW(9),
        backgroundColor: '#F3F3F3'
    },

    view_line_Horizontal: {
        height: scaleSizeH(0.1),
        backgroundColor: '#F3F3F3',
    },
    view_line_Horizontal_bottom: {
        height: scaleSizeH(0.1),
        backgroundColor: '#F3F3F3',
        flex:1,
    },

    view_bottom:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:scaleSizeH(112)
    },

    img_inputtext: {
        width: scaleSizeW(12),
        height: scaleSizeH(17),

    },
    text_input_contnet: {
        fontSize: setSpText(14),
        color: '#000000'
    },
    text_top_left: {
        fontSize: setSpText(22),
        color: '#333333',
    },
    text_top_right: {
        fontSize: setSpText(16),
        color: '#04B48D',
    },



    text_bottom_black: {
        color: '#B5B3B3',
        fontSize: setSpText(12),
        marginTop:scaleSizeH(19),
    },

    text_bottom_green: {
        color: '#04B48D',
        fontSize: setSpText(12)
    },
    text_bottom:{
        flex:0.8,
        fontSize:setSpText(13),
        color:'#CCCCCC',
    },


})


module.exports = styles;
