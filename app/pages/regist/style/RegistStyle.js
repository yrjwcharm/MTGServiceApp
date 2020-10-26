'use strict';
import {
    StyleSheet,
} from 'react-native';
import {scaleSizeW, scaleSizeH, setSpText} from '../../../util/AutoLayout'

let styles = StyleSheet.create({

    loginWrap: {
        flex:1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal:scaleSizeW(32)
    },
    view_content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleSizeH(85)
    },
    view_top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: scaleSizeH(43)
    },

    view_line_vertical: {
        height: scaleSizeH(20),
        width: scaleSizeW(1),
        marginLeft: scaleSizeW(10),
        marginRight: scaleSizeW(10),
        backgroundColor: '#F3F3F3'
    },

    view_line_Horizontal: {
        height: 1,
        backgroundColor: '#F3F3F3',
    },
    view_line_Horizontal_bottom: {
        height: 1,
        backgroundColor: '#F3F3F3',
        flex:1,
    },

    view_bottom:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:scaleSizeH(112)
    },

    img_inputtext: {
        width: scaleSizeW(9),
        height: scaleSizeH(11),

    },
    text_input_contnet: {
        fontSize: setSpText(14),
        color: '#000000'
    },
    text_top_left: {
        fontSize: setSpText(26),
        color: '#333333',
    },
    text_top_right: {
        fontSize: setSpText(14),
        color: '#04B48D',
    },



    text_bottom_black: {
        color: '#999999',
        fontSize: setSpText(12),
        marginTop:scaleSizeH(14)
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
