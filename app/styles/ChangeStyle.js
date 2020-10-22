/**
 * @author: liy_lmn
 * @date: 2019-10-12
 * @description: 修改第三方组件Style
 */

/**
 * @param newObj  自己的style
 * @param style   第三方组件的style
 * @param data    要修改的组件cssType,key和value
 */
import {StyleSheet} from 'react-native';

export function changeStyle(newObj, style, data) {
    for (let key in style) {
        if (Object.prototype.hasOwnProperty.call(style, key)) {
            newObj[key] = {...StyleSheet.flatten(style[key])};
            if (data.length > 0) {
                data.map((item, index) => {
                    if (key === item.cssType) {
                        item.val.map((items, indexs) => {
                            newObj[key][items.key] = items.value;
                        })
                    }
                })
            }
        }
    }

}

