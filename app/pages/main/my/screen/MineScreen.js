import React from 'react';
import {View, Text, StatusBar, StyleSheet, TouchableOpacity, Image, NativeModules, Platform} from 'react-native';
import {connect} from 'react-redux';
import {isIPhoneX} from '../../../../util/AutoLayout';
import Title from '../../../../components/Title';
import Iconfont from '../../../../components/iconfont/Icon';
import ImagePicker from 'react-native-image-crop-picker';
import {ActionSheet} from 'teaset';
import Loading from '../../../../components/Loading';
import ListRow from 'teaset/components/ListRow/ListRow';

export const MineScreen = (props) => {
    const {isLoading, userInfo: {photoUrlDic, realName},navigation} = props;
    const listItems= [
        {label:'就诊人',source:Images.patient, onPress:()=>{navigation.navigate('WebViewPage',{url:Config.api+Config.patient+`?userInfo=${props.userInfo}`})}},
        {label:'我的预约',source:Images.myAppointment, onPress:()=>{}},
        {label:'我的卡包',source:Images.wallet, onPress:()=>{navigation.navigate('WebViewPage',{url:Config.api+Config.myWallet+`?userInfo=${props.userInfo}`})}},
        {label:'我的缴费',source:Images.myPayment, onPress:()=>{}},
        {label:'缴纳住院押金',source:Images.hospitalDeposit, onPress:()=>{}},
        {label:'设置', source:Images.settings,onPress:()=>{navigation.navigate('UserSettings')}},
    ]
    //拍照
    const _getAvatarFromCapture = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            // let source = {uri: image.path};
            _uploadImage(image.path);

        });
    };
    /**
     * 显示操作面板
     */
    const showActionSheet = (bool) => {
        let items = [
            {title: '拍照', onPress: () => _getAvatarFromCapture()},
            {title: '从相册选取', onPress: () => _getAvatarFromGallery()},
            // {title: 'Disabled', disabled: true},
        ];
        let cancelItem = {title: '取消'};
        ActionSheet.show(items, cancelItem, {bool});

    };

    //从相册选取
    const _getAvatarFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
             cropping: true,
             mediaType: "photo",
        }).then(image => {
            // let source = {uri: image.path};
            _uploadImage(image.path);
        });
    };
    /**
     *  上传头像
     * @param uri
     * @private
     */
    const _uploadImage = (uri) => {
        const {fetchUploadPhoto} = props;
        let formData = new FormData();
        let uris = [];
        uris.push(uri);
        fetchUploadPhoto(
            uris,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    };
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Title name={'我的'}/>
            <View style={styles.AvatarSettings}>
                <View style={StyleSheet.flatten(styles.common)}>
                    <TouchableOpacity activeOpacity={.8} onPress={()=>showActionSheet(true)}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={{uri: photoUrlDic}} style={{
                                borderRadius: scaleSizeW(25.5),
                                width: scaleSizeW(51),
                                height: scaleSizeW(51),
                            }}/>
                            <Text style={{
                                marginLeft: scaleSizeW(10),
                                color: Color.black,
                                fontSize: setSpText(18),
                            }}>{realName}</Text>
                        </View>
                    </TouchableOpacity>
                    <Image source={Images.qrcode} resizeMode={'contain'}
                           style={{width: scaleSizeW(22), height: scaleSizeH(22)}}/>
                </View>
            </View>
            <View style={{backgroundColor: Color.f3f3f7, height: scaleSizeH(10)}}/>
            <View style={{paddingHorizontal: scaleSizeW(15)}}>
                {listItems.map((item,index)=>{
                    return(
                        <Menu key={index.toString()} label={item.label} source={item.source} onPress={item.onPress} />
                    )
                })}
            </View>
            <Loading isVisible={isLoading}/>
        </View>
    );
};
const styles = StyleSheet.create({
    AvatarSettings: {
        height: scaleSizeH(177 / 2),
        justifyContent: 'center',
        paddingLeft: scaleSizeW(15),
        paddingRight: scaleSizeW(22),
    },
    common: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
const Menu = (props) => {
    return (
        <TouchableOpacity activeOpacity={.8} onPress={props.onPress}>
            <View style={{height: scaleSizeH(55), justifyContent: 'center'}}>
                <View style={StyleSheet.flatten(styles.common)}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={props.source} resizeMode={'contain'}
                               style={{width: scaleSizeW(24), height: scaleSizeH(24)}}/>
                        <Text style={{
                            color: '#333',
                            fontSize: setSpText(16),
                            marginLeft: scaleSizeW(15),
                        }}>{props.label}</Text>
                    </View>
                    <Iconfont name="Fill" color="#999" size={14} style={{marginRight: 10}}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const mapStateToProps = ({

                             whitelistdata: {
                                 userInfo,
                             },
                             user:{
                                 isLoading,
                             }
                         }
                         ) => ({
    userInfo,
    isLoading,
});
const mapDispatchToProps = dispatch => ({
    fetchFindInfo(restOptions, callback) {
        dispatch({type: 'login/fetchFindInfo', restOptions, callback});
    },
    fetchUploadPhoto(images, params, options, callback) {
        dispatch({
            type: 'user/fetchUploadPhoto',
            images,
            params,
            options,
            callback,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MineScreen);

