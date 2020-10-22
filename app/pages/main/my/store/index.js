import getInitState from './state';
import {put, delay} from 'redux-saga/effects';

import {
  fetchUserBasicInfo,
  fetchQRCardList,
  fetchQrCardDetail,
  fetchQRCardInfo,
  fetchUserBasicInfoValue,
  fetchHealthHistoryList,
  fetchHealthHistoryDetail,
  postSuggestInsert,
  fetchUploadPhoto,
  fetchUpdateUserType,
  updateUserInfo,
  getUserInfo,
  // putSubmitHealthHistoryDetail,
} from './service';

export default {
  state: getInitState(),
  reducer: {
    changeLoading: (state, {data}) => ({...state, isLoading: data,}),
    changeUploadPhotoData: (state, {data}) => ({...state, uploadPhotoData: data,}),
    changeQualificationData: (state, {data}) => ({...state, qualificationData: data,}),
    changeUploadAnnexData: (state, {data}) => ({...state, uploadAnnexData: data,}),
  },
  saga: {
    //更改用户类型
    * fetchUpdateUserType(params) {
      try {
        yield put({type: 'user/changeLoading', data: true,});
        const data = yield fetchUpdateUserType(params.params);
        if (data.code === 200) {
          params.callback();
        }
        yield put({type: 'user/changeLoading', data: false,});
      } catch (e) {
        yield put({type: 'user/changeLoading', data: false,});
      }
    },
    //上传头像
    * fetchUploadPhoto(params) {
      try {
        yield put({type: 'user/changeLoading', data: true,});
        console.log(params)
        const data = yield fetchUploadPhoto(params.images, params.params, params.options);

        if (data.code === 200) {
          yield put({type: 'user/changeUploadPhotoData', data: data.data,});
          // yield put({type: 'my/changeUserUploadPhoto', data: data.data});
          params.callback(data);
        }
        yield put({type: 'user/changeLoading', data: false,});
      } catch (e) {
        yield put({type: 'user/changeLoading', data: false,});
      }
    },

    //获取个人信息
    * getUserInfo(params) {
      try {
        const data = yield getUserInfo(params.params);
        params.callback(data);
        if (data.code == 200 && data.data)
          yield put({type: 'whitelistdata/changeUserInfo', data: data.data,});
      } catch (e) {
      }
    },

    //更新个人信息
    * updateUserInfo(params) {
      try {
        const data = yield updateUserInfo(params.params);
        if (data.code == 200) {
          yield put({type: 'whitelistdata/changeUserInfo', data: params.params});
        }
        params.callback(data);
      } catch (e) {
      }
    },

    *postSuggestInsert(params) {
      try {
        const data = yield postSuggestInsert(params.params);
        params.callback&&params.callback(data)

      } catch (e) {
        console.log(e);
      }
    },
  }
}
