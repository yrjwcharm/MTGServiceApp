import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    ImageBackground,
    Dimensions,
    StatusBar, FlatList, ScrollView, DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import {isIPhoneX} from '../../../../util/AutoLayout';
import Swiper from 'react-native-swiper'
import stylesOfComponents from '../style/style';
import stylesOfHI from '../style/specStyle';
import {ThemeFlags} from '../../../../styles/ThemeFactory';
import InfoItems from '../../info/screen/health-information/information-components/InfoItems';
import Geolocation from '@react-native-community/geolocation';
import Loading from '../../../../components/Loading';
import AsyncStorageUtil from '../../../../util/AsyncStorageUtil';
import TitleButton from '../../../../components/TitleButton';
import NavigationHelper from '../../../../NavigationHelper'
const HomeScreen =(props)=>{
    const {isLoading, navigation, getHeadlines,userInfo, headLineData,route} =props;
    const [position,setPosition]=useState('');
    const goToWebViewPage=(type)=>{
        let url ='';
        switch (type){
            case "todayRegister":
                url =Config.api+Config.register+`?userInfo=${JSON.stringify(userInfo)}&typeOfRegistration=${'RegisterToday'}`;
                break;
            case "AppointmentRegistration":
                url =Config.api+Config.register+`?userInfo=${JSON.stringify(userInfo)}&typeOfRegistration=${'AppointmentRegistration'}`;
                break;
            case "mobilePayment":
                url =Config.api+Config.mobilePayment+`?userInfo=${JSON.stringify(userInfo)}`;
                break;
            case "reportQuery":
                url =Config.api+Config.reportQuery+`?userInfo=${JSON.stringify(userInfo)}`;
                break;
        }
        navigation.navigate('WebViewPage',{url});
    }
    useEffect(()=>{
           getPositions();
            getHeadlines();
    },[])
    const getPositions=()=>{
            Geolocation.getCurrentPosition(location=>{
                //         //通过调用高德地图逆地理接口，传入经纬度获取位置信息
                    fetch(Config.location+`location=${location.coords.latitude},${location.coords.longitude}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: ``
                    })
                        .then((response) => response.json())
                        .then((jsonData) => {
                            try {
                                const {addressComponent:{city}}=jsonData.result;
                                AsyncStorageUtil._storeData('location',city);
                                setPosition(city)
                            }catch (e) {

                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    //访问网络结束
                },
                error => {
                    console.error(error);
                }
            );
    }

    // 跳转资讯详情
    const handlePressItem = () => {
        const {navigation} = props;
        navigation.navigate('HealthInfoDetail');
    }
    // 跳转到健康资讯
    const goHealthInfo = () => {
        const {navigation} = props;
        navigation.navigate('Main');
        DeviceEventEmitter.emit('changeTab','info');
    }


    return(
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={styles.paddingTop}>
            <View style={StyleSheet.flatten(styles.header)}>
                <View style={{paddingHorizontal:scaleSizeW(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity activeOpacity={.8}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image source={Images.location} resizeMode={'stretch'} style={{width:scaleSizeW(17),height:scaleSizeH(43/2)}}/>
                        <Text style={{color:'#222',marginLeft:scaleSizeW(8),fontSize:setSpText(17.5)}}>{position}</Text>
                    </View>
                    </TouchableOpacity>
                    <Image source={Images.notification} resizeMode={'stretch'} style={{width:scaleSizeW(29/2),height:scaleSizeH(16)}}/>
                </View>
            </View>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} style={{paddingHorizontal:scaleSizeW(15)}}>
            <View style={{height:scaleSizeH(278/2)}}>
            <Swiper
                 height={scaleSizeH(278/2)}
                onMomentumScrollEnd={(e, state, context) =>
                    console.log('index:', state.index)
                }
                dot={
                    <View
                        style={{
                            backgroundColor:'#D9D9D9',
                            width: scaleSizeW(5),
                            height: scaleSizeH(5),
                            borderRadius:2.5,
                        }}
                    />
                }
                activeDot={
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width:scaleSizeW(14),
                            height:scaleSizeH(5),
                            borderRadius: 2.5,
                        }}
                    />
                }
                // paginationStyle={{
                //     bottom: -23,
                //     left: null,
                //     right: 10
                // }}
                loop
            >
                <Image source={Images.banner} resizeMode={'stretch'} style={{
                    // borderRadius:8,
                    width:scaleSizeW(690/2),
                    height:scaleSizeH(278/2),
                }}/>
            </Swiper>
            </View>
                <View style={{marginTop:scaleSizeH(35/2),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity activeOpacity={.8} onPress={()=>goToWebViewPage('todayRegister')}>

                    <ImageBackground source={Images.today} resizeMode={'stretch'} style={{width:scaleSizeW(331/2)}}>
                    <View style={{justifyContent:'center',width:scaleSizeW(331/2),height:scaleSizeH(132/2)}}>
                        <Text style={{marginLeft:scaleSizeW(49/2),color:'#fff',fontSize:setSpText(19)}}>
                            今日挂号
                        </Text>
                    </View>
                    </ImageBackground>
                </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} onPress={()=>goToWebViewPage('AppointmentRegistration')}>
                    <ImageBackground source={Images.order} resizeMode={'stretch'} style={{width:scaleSizeW(331/2)}}>
                        <View style={{justifyContent:'center',width:scaleSizeW(331/2),height:scaleSizeH(132/2)}}>
                            <Text style={{marginLeft:scaleSizeW(43/2),color:'#fff',fontSize:setSpText(19)}}>
                                预约挂号
                            </Text>
                        </View>
                    </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:scaleSizeH(43/2),flexDirection:'row',flexWrap:'wrap', alignItems:'center',justifyContent:'space-between'}}>
                    <Menu label={'移动缴费'} onPress={()=>goToWebViewPage('mobilePayment')} source={Images.mobile_payment} style={{width:scaleSizeW(24),height:scaleSizeH(25)}}/>
                    <Menu label={'核酸检测'} source={Images.hesuanjiance} style={{width:scaleSizeW(51/2),height:scaleSizeH(25)}}/>
                    <Menu label={'健康档案'} source={Images.archives} style={{width:scaleSizeW(25),height:scaleSizeH(25)}}/>
                    <Menu label={'报告查询'} onPress={()=>goToWebViewPage('reportQuery')} source={Images.report_query} style={{width:scaleSizeW(25),height:scaleSizeH(25)}}/>
                </View>
                <View style={{marginTop:scaleSizeH(45/2),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Menu label={'价格查询'} source={Images.price_query} style={{width:scaleSizeW(25),height:scaleSizeH(21)}}/>
                    <Menu label={'住院清单'} source={Images.in_hospital} style={{width:scaleSizeW(25),height:scaleSizeH(25)}}/>
                    <Menu label={'处方查询'} source={Images.prescription_query} style={{width:scaleSizeW(21),height:scaleSizeH(25)}}/>
                    <Menu label={'医院介绍'} source={Images.hospital_intro} style={{width:scaleSizeW(47/2),height:scaleSizeH(25)}}/>
                </View>
                <View style={{
                    borderRadius: scaleSizeW(6),
                    backgroundColor: '#FFFFFF',
                    marginTop: scaleSizeH(10),
                    paddingTop: scaleSizeH(11),
                    // paddingBottom: scaleSizeH(31),
                    marginBottom: scaleSizeH(10),
                    // marginLeft: scaleSizeW(10),
                    // marginRight: scaleSizeW(10)
                }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: scaleSizeH(10),
                        borderBottomWidth: 1,
                        borderBottomColor: ThemeFlags['screen-background-color']
                    }}>
                        <Text style={{
                            fontSize: setSpText(16),
                            color: '#333333',
                            marginLeft: scaleSizeW(10),
                            fontWeight: '500'
                        }}>
                            健康头条
                        </Text>
                        <TouchableOpacity
                            onPress={goHealthInfo}
                            TouchableOpacity={0.7}
                            hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
                        >
                            <Text style={{
                                fontSize: setSpText(12),
                                color: '#999999',
                                marginRight: scaleSizeW(10)
                            }}>
                                更多
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <FlatList
                        data={headLineData}
                        renderItem={(props) =>
                            <InfoItems {...props}
                                       stylesOfComponents={stylesOfComponents}
                                       styles={stylesOfHI}
                                       onPressFn={handlePressItem}
                                       temp={{'isNominate': 1, 'typeId': '10000'}}
                                       length={headLineData.length}
                            />}
                        keyExtractor={(item,index)=>index.toString()}
                    >
                    </FlatList>
                </View>
            </ScrollView>
            <Loading isVisible={isLoading}/>
        </View>
    )
}
const Menu=(props)=>{
    return(
        <TouchableOpacity activeOpacity={.8} onPress={props.onPress}>
        <View style={{alignItems:'center',}}>
            <Image source={props.source} style={props.style}/>
            <Text style={styles.flexFont}>{props.label}</Text>
        </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    header:{
        height:scaleSizeH(44),
        justifyContent:'center',
    },
    paddingTop:{
        paddingTop:Platform.OS==='android'?StatusBar.currentHeight:isIPhoneX()?34:20
    },
    flexFont:{
        color:"#333",
        fontSize:setSpText(13)
    }
})
const mapStateToProps = ({
                             whitelistdata: {
                                 token,
                                 userInfo
                             },
                             whitelistdata,
                             home: {
                                 headLineData,
                                 isLoading
                             },
                         }) => ({
    token,
    isLoading,
    userInfo,
    whitelistdata,
    headLineData,
});

const mapDispatchToProps = dispatch => ({
    fetchFindInfo(restOptions, callback) {
        dispatch({type: 'login/fetchFindInfo', restOptions, callback});
    },
    getHeadlines() {
        dispatch({type: 'home/getHeadlines'});
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

