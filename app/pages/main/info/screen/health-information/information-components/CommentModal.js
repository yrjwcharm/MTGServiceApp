import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import {Modal, List, TextareaItem} from '@ant-design/react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Provider} from '@ant-design/react-native';
import {ThemeFlags} from '../../../../../../styles/ThemeFactory';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../../../../util/AutoLayout';

// 打开相机
const openCamera = () => {
    ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
    }).then(image => {
        // this.uploadPhoto(image.path);
        console.log(image);
    });
};

// 打开相册
const openPicker = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
    }).then(image => {
        console.log(image);
        // this.uploadPhoto(image.path);
    });
};

const CommentModal = (props) => {
    const hasText = props.textareaValue;
    const _onPress = () => {
        if (!hasText) {
            return;
        }
        props.onSubmit();
    };
    return (
            <Modal
                popup
                visible={props.visiable}
                animationType="slide-up"
                maskClosable={true}
                onClose={props.onClose}
            >
                <View style={styles.bodyContainer}>
                    <View style={styles.commentContainer}>
                        <List>
                            <TextareaItem autoFocus rows={4} placeholder="请输入评论内容" onChange={props.onChange}
                                          value={props.textareaValue}/>
                        </List>
                    </View>
                    {/* <View style={styles.toolbarContainer}>
          <View style={styles.rowContainer}>
            <TouchableWithoutFeedback onPress={() => openCamera()}>
              <Iconfont name="paizhaopian" color={ThemeFlags['Gray']} size={29} style={{ marginRight: 20 }} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => openPicker()}>
              <Iconfont name="zhaopian" color={ThemeFlags['Gray']} size={29} />
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={props.onSubmit}>
            <View style={styles.submitBtn}>
              <Text style={styles.submitText}>发表</Text>
            </View>
          </TouchableWithoutFeedback>
        </View> */}
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <TouchableWithoutFeedback>
                            <View style={styles.rowContainer}>
                                {/* <Icon name="healthInfo/getPosition" />
              <Text style={styles.posiText}>点击获取位置</Text> */}
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={_onPress}>
                            <View style={[styles.submitBtn, hasText ? styles.submitBtnActive : {}]}>
                                <Text style={styles.submitText}>发表</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        padding: ThemeFlags['content-margin-horizontal'],
        flexDirection: 'column',
        paddingBottom: 8,
    },
    commentContainer: {},
    toolbarContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        justifyContent: 'flex-end',
    },
    rowContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    submitBtn: {
        width: scaleSizeW(72),
        height: scaleSizeH(25),
        borderRadius: 99,
        backgroundColor: ThemeFlags['text-tl-color'],
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    posiText: {
        fontSize: ThemeFlags['text-size-s'],
        color: ThemeFlags['text-tl-color'],
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: ThemeFlags['text-size-s'],
    },
    submitBtnActive: {
        backgroundColor: ThemeFlags['Green'],
    },
});

export default CommentModal
