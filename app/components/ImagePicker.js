import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Platform
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { Portal, Toast, Modal } from '@ant-design/react-native'
import Iconfont from '../components/iconfont/Icon';
import { ThemeFlags } from "../styles/ThemeFactory";
// import { ThemeFlags } from '@styles/ThemeFactory';
// import Iconfont from './iconfont/Icon'
/**
 * value: [{...}, ...] //ImagePicker选中数据源
 * onPress: func 点击拍照调用次回调，默认值handleTakePhoto
 * onChange: func 图片选择完毕回调
 * tip: Compennt 图片后方提示
 * operateType: enum 1.'openPicker' 2.'openCamera' 3.'all'
 */

const ImagePickerView = ({
  close_style,
  image_style,
  take_icon,
  maxLength,
  value,
  onPress,
  navigation,
  onChange,
  onCloseIndex,
  uploadFile,
  tip,
  isMultiple,
  operateType = 'all',
  ...rest
}) => {
  // 默认图片上传
  const handleTakePhoto = () => {
    if (value.length == maxLength) {
      Toast.info('最多只能选择' + maxLength + '张照片', 1, null, false)
      return
    }
    const takePhoto = method => {
      ImagePicker[method]({
        width: 300,
        height: 400,
        multiple: !isMultiple ? true : false,
        maxFiles: Platform.OS === 'ios' ? maxLength : null,
        mediaType: 'photo',
        // includeBase64: true,
        loadingLabelText: '正在加载',
        ...rest
      }).then(selectdImages => {
        let path = selectdImages.path;
        if (!Array.isArray(selectdImages)) {
          selectdImages = [selectdImages];
        }
        const newImages = selectdImages.filter(
          image => image.mime.split('/')[0] === 'image'
        )
        if (
          selectdImages &&
          selectdImages.length === 1 &&
          newImages.length === 0
        ) {
          Toast.info('请选择图片类型的文件', 1, null, false)
        }
        onChange([...value, ...newImages])
        uploadFile && uploadFile(path);
      })
    }
    if (operateType === 'all') {
      Modal.operation([
        { text: '打开相机', onPress: () => takePhoto('openCamera') },
        { text: '打开相册', onPress: () => takePhoto('openPicker') }
      ])
    } else {
      takePhoto(operateType)
    }
  }


  const onDelete = index => {
    value.splice(index, 1)
    onChange([...value])
    // onCloseIndex(index)
  }
  return (
    <View style={styles.container}>
      <View style={styles.images}>
        {value &&
          value.map((image, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ViewImage', {
                  images: value,
                  index,
                  setImages: onChange
                })
              }
              activeOpacity={0.7}
              key={image.modificationDate + index + ''}
            >
              <Image
                source={{
                  uri: image.path
                }}
                style={image_style ? image_style : styles.image}
              />
              <Close
                onPress={() => onDelete(index)}
                close_style={close_style ? close_style : styles.close_wrapper}
              />
            </TouchableOpacity>
          ))}
        <TouchableOpacity
          style={take_icon ? take_icon : styles.take_icon}
          activeOpacity={0.7}
          onPress={onPress || handleTakePhoto}
        >
          <Iconfont name='pingjiapaizhao' color={ThemeFlags['Green']} size={32} />
        </TouchableOpacity>
      </View>
      {tip && (!value || !value.length) ? tip : null}
    </View>
  )
}

const Close = ({ onPress, close_style }) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
  >
    <View style={close_style ? close_style : styles.close_wrapper}>
      <Iconfont name="jiahao" color="#fff" size={8} />
    </View>
  </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
  close_wrapper: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ThemeFlags.Green,
    textAlign: 'center',
    lineHeight: 0,
    position: 'absolute',
    top: 10,
    right: 1,
    transform: [{ rotateZ: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center'
  },
  close_text: {
    color: '#fff'
  },
  take_desc: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 15,
    marginLeft: 5
  },
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 15
  },
  take_icon: {
    padding: 15,
    borderColor: ThemeFlags.Green,
    borderWidth: 1,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 15
  },
  container: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingBottom: 15
  }
})

export default ImagePickerView
