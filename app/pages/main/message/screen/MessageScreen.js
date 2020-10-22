import React from 'react';
import {View, Text, Platform, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {TeaNavigator} from 'teaset';
import {isIPhoneX} from '../../../../util/AutoLayout';
import Title from '../../../../components/Title';
import {Input, Badge} from 'teaset';

export const MessageScreen = () => {
    return (
        <View style={{flex: 1}}>
            <Title name={'消息'}/>

            <View style={{backgroundColor:Color.f3f3f7}}>
                <View style={{
                    paddingHorizontal: scaleSizeW(15),
                    height: scaleSizeH(61),
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 29 / 2,
                        height: scaleSizeH(29),
                        backgroundColor: '#f1f1f1',
                    }}>
                        <Image resizeMode={'contain'} source={Images.search}
                               style={{width: scaleSizeW(14), height: scaleSizeH(14)}}/>
                        <Input placeholder={'搜索检验检查单'}
                               style={{marginLeft: scaleSizeW(5), borderWidth: 0, backgroundColor: 'transparent'}}/>
                    </View>
                </View>
                <View style={{
                    paddingHorizontal: scaleSizeW(30),
                    marginTop: scaleSizeH(10),
                    height: scaleSizeH(73),
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={Images.msg} resizeMode={'contain'} style={{width: 43, height: 43}}/>
                        <View style={{
                            width: 21 / 2,
                            height: 21 / 2,
                            borderRadius: 21 / 2 / 2,
                            backgroundColor: '#EC2A2A',
                            position: 'absolute',
                            left: scaleSizeW(32),
                            top: 0,
                        }}/>
                        <View style={{marginLeft: scaleSizeW(10)}}>
                            <Text style={{fontSize: setSpText(17), color: '#333'}}>消息通知</Text>
                            <Text style={{color: Color['666'], fontSize: setSpText(13)}}>你有条检验检查单，请查看！</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginHorizontal: scaleSizeW(15),
                    borderRadius: 5,
                    marginTop: scaleSizeH(16),
                    height: scaleSizeH(145 / 2),
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                }}>
                    <View style={{
                        marginLeft: scaleSizeW(27 / 2),
                        paddingRight: scaleSizeH(15),
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{fontSize: setSpText(14), color: '#333'}}>检验检查单提醒</Text>
                        <Text style={{color: Color['666'], fontSize: setSpText(12)}}>2019/01/05 14:34</Text>
                        <View style={{
                            width: 19 / 2,
                            height: 19 / 2,
                            borderRadius: 19 / 2 / 2,
                            backgroundColor: '#EC2a2a',
                            position: 'absolute',
                            right: scaleSizeW(5.5),
                            top: 0,
                        }}/>
                    </View>
                    <Text style={{
                        marginLeft: scaleSizeW(15),
                        marginTop: scaleSizeH(8),
                        color: '#666',
                        fontSize: setSpText(14),
                    }}>您有新的检验检查单，请查看！！</Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({});
export default MessageScreen;
