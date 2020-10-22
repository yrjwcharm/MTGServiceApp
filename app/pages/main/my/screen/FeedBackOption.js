import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View,} from 'react-native';
import {Toast} from '@ant-design/react-native';
import {connect} from 'react-redux';

import {ThemeFlags} from '../../../../styles/ThemeFactory';
import  ImagePickerView from '../../../../components/ImagePicker';
import BlockButton  from '../../../../components/BlockButton';
import commonStyles from '../../../../styles/common';
import {CustomPickerItem} from '../../../../components/CustomPickerItem'
import ImageResizer from "react-native-image-resizer";

/**
 * 反馈意见
 */
const FeedBackOption = (props) => {
    // props方法
    const {navigation} = props;

    // 组件state
    const [picker_value, setPicker_value] = useState('');
    const [description, setDescription] = useState('');
    const [phone_email, setPhone_email] = useState('');
    const [img_list, setImageList] = useState([]);
    const [upimg_list, setUpImageList] = useState([]);

    const [images, setImages] = useState([]);
    const onOk_setType = (value) => {
        setPicker_value(value[0])
    }
    const submit = () => {
        if (!picker_value) {
            Toast.info('请选择反馈类型', 1, null, false);
            return;
        }
        if (!description) {
            Toast.info('请填写建议或者意见', 1, null, false);
            return;
        }
        props.postSuggestInsert({
            title: picker_value,
            info: description,
            contactWay: phone_email,
            image1: upimg_list&&upimg_list.length>0&&upimg_list[0],
            image2: upimg_list&&upimg_list.length>1&&upimg_list[1],
            image3: upimg_list&&upimg_list.length>2&&upimg_list[2],
            image4: upimg_list&&upimg_list.length>3&&upimg_list[3],
            image5: upimg_list&&upimg_list.length>4&&upimg_list[4]
        }, (data) => {
            Toast.info('提交成功', 1, null, false);
            navigation.goBack();
        })
    }
    const onchange_pick = (data) => {
        console.log('选择照片数据'+JSON.stringify(data.length))
        console.log('本地数据'+JSON.stringify(img_list.length))

        if (data) {
            if (data.length > img_list.length) {
                ImageResizer.createResizedImage(data[data.length-1].path, 600, 800, 'PNG', 0, 0, null).then((response) => {
                    let formData = new FormData();
                    formData.append('type','suggest')
                    let uris = [];
                    uris.push(response.uri)
                    props.fetchUpload(
                        uris,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }, (_data) => {
                            if (_data.code == 200) {
                                setImageList(data)
                                setUpImageList([...upimg_list,_data.data])
                                Toast.info('上传成功', 1, null, false);
                            } else {
                                Toast.info('上传失败', 1, null, false);
                            }
                        })
                })
            } else {
                setImageList(data)
            }
        }

    }
    const onCloseIndex=(index)=>{
        upimg_list.splice(index, 1)
        console.log('删除后的上传过的图片集合'+JSON.stringify(upimg_list))
        setUpImageList([...upimg_list])
        console.log('删除index'+ index)
    }

    return (
        <View style={Styles.container}>
            <CustomPickerItem
                value={[picker_value]}
                onOk={onOk_setType}
                label='反馈类型'
                cols={1}
                data={
                    [{label: "功能异常", value: "功能异常"}, {label: "意见建议", value: "意见建议"}, {label: "其他", value: "其他"}]
                }
                style={{marginBottom: 10, marginTop: 0,}}
            />
            <View style={{
                backgroundColor: ThemeFlags.White,
            }}>
                <Text style={{
                    fontSize: ThemeFlags['text-size-m'],
                    color: ThemeFlags['text-fl-color'],
                    marginLeft: 10,
                }}>
                    建议或意见
                </Text>
                <TextInput
                    autoFocus={true}
                    autoCorrect={false}
                    placeholder="请输入反馈意见和建议，我们将为您不断改进"
                    multiline={true}
                    numberOfLines={5}
                    style={styles.textinput}
                    onChangeText={text => setDescription(text)}
                    value={description}
                />
            </View>
            <View style={{
                backgroundColor: ThemeFlags.White,
                paddingTop: 10,
                paddingRight: 10,
                marginTop: 10
            }}>
                <Text style={{
                    fontSize: ThemeFlags['text-size-m'],
                    color: ThemeFlags['text-fl-color'],
                    marginLeft: 10
                }}>上传图片
                    <Text style={{
                        fontSize: ThemeFlags['text-size-m'],
                        color: ThemeFlags['text-tl-color']
                    }}>（图片不超过1M，最多上传5张）</Text>
                </Text>
                <ImagePickerView
                    maxLength={5}
                    value={img_list}
                    // onPress={handleTakePhoto}
                    onChange={onchange_pick}
                    onCloseIndex={onCloseIndex}
                />
            </View>
            <View style={{
                backgroundColor: ThemeFlags.White,
                paddingHorizontal: 10,
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: ThemeFlags['text-size-m'],
                    color: ThemeFlags['text-fl-color'],
                }}>
                    联系方式（可选）
                </Text>
                <TextInput
                    style={{
                        width: '100%',
                    }}
                    numberOfLines={1}
                    placeholder={'请输入手机号或邮箱地址'}
                    onChangeText={setPhone_email}
                    underlineColorAndroid={'#0000'}
                    value={phone_email}
                    multiline={true}
                />
            </View>


            <BlockButton
                onPress={submit}
                style={styles.bottom_button}
            >
                提交
            </BlockButton>
        </View>
    )
}

// ----------------------------- UIComponent -----------------------------

// ----------------------------- styles -----------------------------
const styles = StyleSheet.create({
    images: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        height: 60, width: 60,
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 15,
    },
    contianer: {
        flex: 1,
        backgroundColor: ThemeFlags['screen-background-color'],
    },
    tips: {
        backgroundColor: '#F7F4D4',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    tips_text: {
        ...commonStyles['color1_s'],
        lineHeight: 17,
    },
    textinput: {
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        paddingHorizontal: 10
    },
    take: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingBottom: 15,
    },
    take_icon: {
        padding: 15,
        borderColor: ThemeFlags['Green'],
        borderWidth: 1,
        height: 60, width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 15,
    },
    take_desc: {
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginTop: 15,
        marginLeft: 5,
    },
    bottom_button: {
        marginTop: 'auto',
    }
})

const mapState = ({
                      whitelistdata: {
                          userInfo
                      },
                  }) => ({
    userInfo
})
const mapDispatchToProps = dispatch => ({
    postSuggestInsert(params, callback) {
        dispatch({type: 'user/postSuggestInsert', params, callback});
    },
    fetchUpload(images, params, options, callback) {
        dispatch({type: 'user/fetchUploadPhoto', images, params, options, callback});
    },

})
// ----------------------------- exports -----------------------------
export default connect(mapState, mapDispatchToProps)(FeedBackOption);
