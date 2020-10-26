'use strict';
import {
    StyleSheet,
} from 'react-native';
import {scaleSizeW, scaleSizeH, setSpText} from '../../../util/AutoLayout'

let styles = StyleSheet.create({

    Wrap: {
        flex:1,
        backgroundColor: '#F3F3F3',
        // alignItems: 'center',

    },

    img_top: {
        width: 80,
        borderRadius:100
    },
    text_top:{
        fontSize:setSpText(14),
        color:'#00B88B',
    },


    view_content:{
        height:scaleSizeH(40),
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:scaleSizeW(1),
        borderBottomColor:'#F3F3F3',
        backgroundColor:'#FFFFFF',
    },

    text_content_left:{
        fontSize: setSpText(14),
        color:'#333333',
        marginLeft:scaleSizeW(10),
        fontWeight: '400',
        lineHeight: 20
    },

    text_content_right:{
        fontSize: setSpText(14),
        color:'#333333',
        marginRight:scaleSizeW(10),
        fontWeight: '400',
    }

})


module.exports = styles;
