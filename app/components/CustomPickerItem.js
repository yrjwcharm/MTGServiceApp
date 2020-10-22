/*
 * @Description: 自定义选择栏
 * @Author: SuiJiaqi
 * @Date: 2019-12-19
 */
import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'
import {
    Picker,
} from '@ant-design/react-native'
import {scaleSizeH, scaleSizeW, setSpText} from "../util/AutoLayout"
import { pickerStyles,pickerItemStyle } from '../styles/resetStyles'
import Iconfont from '../components/iconfont/Icon';

/**
 *
 * @param {*} data 下拉数组(必填)
 * @param {*} onOk 确定按钮回调(必填)
 * @param {*} label 左侧静态文本(必填)
 * @param {*} cols 下拉列表列数(非必填,默认值为1)
 * @param {*} value 初始值(非必填)
 * @param {*} style 扩展children样式(非必填)
 */
export const CustomPickerItem = (props) => {

    return (
        <Picker
            disabled={props.disabled}
            data={props.data}
            cols={props.cols != undefined ? props.cols : 1}
            onOk={props.onOk}
            styles={pickerStyles}
            itemStyle={pickerItemStyle}
            value={props.value}
            onVisibleChange={props.onVisibleChange}
            extra={props.extra}
        >
        {props.itemView ?
            props.itemView
            :<CustomChildren value={props.value} ishideImg={props.disabled} style={props.style}>{props.label}</CustomChildren>
        }
        </Picker>
    )
}

const CustomChildren = props => {

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[styles.dateItemContainer,props.style]}>
                <View style={{justifyContent:'center',}}>
                    <Text style={styles.labelText}>{props.children}</Text>
                </View>
                <View style={{alignItems:'center',flexDirection:'row',}}>
                    <Text style={props.value&&props.value.length>0?styles.itemText:styles.itemText_nodata}>{props.extra}</Text>
                    {props.ishideImg?null:
                      <Iconfont name={'Fill'}color="#666" size={14} style={{marginRight:10}}/>
                    //   <Image
                    //   style={styles.arrowBtn_right}
                    //   resizeMode={'contain'}
                    //   source={require('@imgs/common/ic_rn_listitem_right.png')}
                    // />

                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    dateItemContainer:{
        height:40,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    labelText:{
        fontSize:setSpText(14),
        marginLeft:scaleSizeW(9),
        textAlign:'center',
        color:'#333',
    },
    itemText:{
        fontSize:setSpText(14),
        marginRight:scaleSizeW(10),
        color:'#333',
    },
    itemText_nodata:{
        fontSize:setSpText(14),
        marginRight:scaleSizeW(10),
        color:'#999',
    },
    arrowBtn_right:{
        width: scaleSizeW(7),
        height: scaleSizeH(13),
        marginRight: scaleSizeW(10)
    },
})
