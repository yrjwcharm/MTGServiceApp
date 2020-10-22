/**
 * Created by qianxin on 17/6/1.
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */
import {Dimensions,PixelRatio,Platform,StatusBar} from 'react-native'
// 获取屏幕的dp
export const screenW = Dimensions.get('window').width;
export const screenH = Dimensions.get('window').height;
export const fontScale = PixelRatio.getFontScale();
export const pixelRatio =PixelRatio.get();

// 高保真的宽度和告诉
const designWidth = 375.0;
const designHeight = 667.0;



// 根据dp获取屏幕的px
let screenPxW =PixelRatio.getPixelSizeForLayoutSize(screenW);
let screenPxH =PixelRatio.getPixelSizeForLayoutSize(screenH);

/**
 * 设置text
 * @param size  px
 * @returns {Number} dp
 */
export function setSpText(size) {
    // console.log("screenW======"+screenW)
    // console.log("screenPxW======"+screenPxW)
    var scaleWidth = screenW / designWidth;
    var scaleHeight = screenH / designHeight;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round(size * scale/fontScale + 0.5);
    return size;
}

/**
 * 设置高度
 * @param size  px
 * @returns {Number} dp
 */
export function scaleSizeH(size) {
    var scaleHeight = size * screenPxH / designHeight;
    size = Math.round((scaleHeight / pixelRatio + 0.5));
    return size;
}

/**
 * 设置宽度
 * @param size  px
 * @returns {Number} dp
 */
export function scaleSizeW(size) {
    var scaleWidth = size * screenPxW / designWidth;
    size = Math.round((scaleWidth/pixelRatio + 0.5));
    return size;
}

const window = Dimensions.get('window');

/**
 * 判断是否IOS平台
 */
const isIOS = Platform.OS === 'ios';
/**
 * 判断是否Android平台
 */
const isAndroid = Platform.OS === 'android';
/**
 * 判断是否iPhoneX  X和XS  375*812
 */
const isIPhoneX: boolean = isIOS && window.width === 375 && window.height === 812;
/**
 * 判断是否iPhoneXR  XS_Max和XR 414*896
 */
const isIPhoneXR: boolean = isIOS && window.width === 414 && window.height === 896;
/**
 * 判断是否Android5.x平台
 */
const isAndroid5: boolean = isAndroid && Platform.Version > 20 && Platform.Version < 23;
/**
 * 判断是否Android5.0以上平台
 */
const overAndroid5: boolean = isAndroid && Platform.Version > 19;

export {
    isIOS,
    isAndroid,
    isIPhoneX,
    isIPhoneXR,
    isAndroid5,
    overAndroid5,
};
