import React, {Component, useEffect, useState} from 'react';
import {View, Text, Image, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import Iconfont from '../../../../components/iconfont/Icon';
import * as CacheManager from 'react-native-http-cache';
import Title from '../../../../components/Title';
import {Toast} from 'teaset'
const ClearCache = (props)=>{
    const [cacheSize,setCacheSize]=useState(0);
    useEffect(()=>{
            getCacheSize();
    },[])
    const clearCache=()=>{
         CacheManager.clearCache();
        Toast.success('缓存清理完成');
        // Toast.info('缓存已清理')
        getCacheSize();
    }
    const getCacheSize =async ()=>{
       const cacheSize = await CacheManager.getCacheSize()
            setCacheSize((cacheSize/1024/1024).toFixed(2))

    }
    return(
        <View style={Styles.container}>
            <ListRow label={'缓存大小'}  onPress={clearCache} size={cacheSize+'MB'}/>



        </View>
    )
}
const ListRow = (props) => {
    return (
        <TouchableOpacity activeOpacity={.8} onPress={props.onPress}>
            <View style={{justifyContent:'center',height: scaleSizeH(43.5),borderBottomWidth:1, borderBottomColor:'#eee'}}>
                <View style={[styles.flexBox,{paddingHorizontal:scaleSizeW(15)}]}>
                    <Text style={{color:'#333',fontSize:setSpText(14)}}>{props.label}</Text>
                    <Text style={{color:'#999',fontSize:setSpText(14)}}>{props.size}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export  default  ClearCache;
