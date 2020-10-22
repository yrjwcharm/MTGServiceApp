import React from 'react'
import {View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {TeaNavigator} from 'teaset'

export const HealthTopic=()=>{
    return(
        <View style={{flex:1}}>
        <TouchableOpacity activeOpacity={0.8}>
            <View style={{
                marginTop:scaleSizeH(15),
                height: scaleSizeH(752/4/2),
                backgroundColor: '#fff',
                paddingHorizontal:scaleSizeW(15),
                justifyContent: 'center',
                borderBottomWidth: 0,
            }}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Image source={Images.banner} style={{ borderRadius:3,width:scaleSizeW(232/2),height:scaleSizeH(157/2)}}/>
                    <View style={{paddingLeft:scaleSizeW(15),flex:1}}>
                        <Text style={{flex:1,flexWrap:'wrap',color:'#333',fontSize:setSpText(14)}}>茅山颐园江南医院 聘任国家一流医院百名高级专家</Text>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',alignItems:'center',}}>
                                <View style={{flexDirection:'row',alignItems:'center',marginRight:scaleSizeW(15)}}>
                                   <Image source={Images.read} resizeMode={'stretch'} style={{width:scaleSizeW(17),height:scaleSizeH(11.5)}}/>
                                   <Text style={{marginLeft:scaleSizeW(5), color:'#666',fontSize:setSpText(12)}}>32</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image source={Images.shape} resizeMode={'stretch'} style={{width:scaleSizeW(12),height:scaleSizeH(12.8)}}/>
                                    <Text style={{marginLeft:scaleSizeW(5),color:'#666',fontSize:setSpText(12)}}>20</Text>
                                </View>

                            </View>
                            <Text style={{color:'#666',fontSize:setSpText(12)}}>2019/01/30</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        </View>
    )
}
export  default  HealthTopic
