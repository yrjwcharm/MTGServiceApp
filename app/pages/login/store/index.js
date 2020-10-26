import getInitState from './state';
import {put, delay} from 'redux-saga/effects';

import {
  fetchSendCode,
  fetchCodeLogin,
  fetchPswLogin,
  fetchFindPswSendCode,
  fetchUpdatePassword,
  fetchFindInfo,
  fetchRegister,
  fetchCheckCode,
  fetchbindPhone,
  fetchGetVerificationCode,


  fetchisBindPhone,
} from './service';
import {setHeaders} from '../../../util/NavUtil';

export default {
  state: getInitState(),
  reducer: {

    //修改登录data
    changeLoginData: (state, {data}) => ({...state, loginData: data,}),
    changeLoading: (state, {data}) => ({...state, isLoading: data,}),

  },
  saga: {
    //获取验证码
    * fetchSendCode(params) {
      try {
        yield put({type: 'login/changeLoading', data: true,});
        const data = yield fetchGetVerificationCode(params.params);
        if (data.code == 200) {
          params.callback();
        }
        yield put({type: 'login/changeLoading', data: false,});
      } catch (e) {
        yield put({type: 'login/changeLoading', data: false,});
      }
    },

    //找回密码获取验证码
    * fetchFindPswSendCode(params) {
      try {
        yield put({type: 'login/changeLoading', data: true,});

        const data = yield fetchGetVerificationCode(params.params,);
        params.callback(data);
        yield put({type: 'login/changeLoading', data: false,});

      } catch (e) {
        yield put({type: 'login/changeLoading', data: false,});

      }
    },
    //验证码登录
    * fetchCodeLogin(params) {
      try {
        yield put({type: 'login/changeLoading', data: true,});

        const data = yield fetchCodeLogin(params.params);
         // yield put({type: 'login/changeLoginData', data,});
        if (data.code == 200) {
          yield put({type: 'whitelistdata/changeTokenData', data: data.data.token,});
          yield put({type: 'whitelistdata/changeImTokenData', data: data.data.imToken,});
          yield put({type: 'whitelistdata/changeUseridData', data: data.data.userid,});
          setHeaders(data.data);
        }
        yield put({type: 'login/changeLoading', data: false,});
        params.callback(data);
      } catch (e) {
        yield put({type: 'login/changeLoading', data: false,});

      }
    },

    //密码登录
    * fetchPswLogin(params) {
      try {
        yield put({type: 'login/changeLoading', data: true,});

        const data = yield fetchPswLogin(params.params);
        console.log(444,data)
        if (data.code == 200) {
          yield put({type: 'whitelistdata/changeTokenData', data: data.data.token,});
          yield put({type: 'whitelistdata/changeImTokenData', data: data.data.imToken,});
          yield put({type: 'whitelistdata/changeUseridData', data: data.data.userid,});
          setHeaders(data.data);
        }

        params.callback(data);
        yield put({type: 'login/changeLoading', data: false,});

      } catch (e) {
        yield put({type: 'login/changeLoading', data: false,});


      }
    },
    //修改密码
    * fetchUpdatePassword(params) {
      try {
        yield put({type: 'login/changeLoading', data: true,});
        const data = yield fetchUpdatePassword(params.params, params.options);
        if (data.code == 200) {
          params.callback();
        }
        yield put({type: 'login/changeLoading', data: false,});

      } catch (e) {
        yield put({type: 'login/changeLoading', data: false,});

      }
    },
    //修改密码
    * fetchCheckCode(params) {
      try {
        yield put({type: 'login/changeLoading', data: true,});
        const data = yield fetchCheckCode(params.params);
        params.callback(data);
        yield put({type: 'login/changeLoading', data: false,});

      } catch (e) {
        yield put({type: 'login/changeLoading', data: false,});

      }
    },
    //获取个人信息
    * fetchFindInfo(params) {
      try {
        yield put({type: 'login/changeLoading', data: true,});

        const data = yield fetchFindInfo(params.restOptions);
        console.log(555,data);
        if (data.code == 200) {
          yield put({type: 'whitelistdata/changeUserInfo', data: data.data,});
          params.callback && params.callback(data.data);
        }
        yield put({type: 'login/changeLoading', data: false,});
      } catch (e) {
        params.callback && params.callback(null);

        yield put({type: 'login/changeLoading', data: false,});

      }
    },
    //绑定手机号
    * fetchbindPhone(params) {
      try {
        yield put({type: 'login/changeLoading', data: true,});

        const data = yield fetchbindPhone(params.params);

        if (data.code == 200) {
          params.callback && params.callback(data.data);
        }
        yield put({type: 'login/changeLoading', data: false,});
      } catch (e) {
        yield put({type: 'login/changeLoading', data: false,});

      }
    }, //判断是否注册过的手机号，如果是则不能绑定
    * fetchisBindPhone(params) {
      try {
        yield put({type: 'login/changeLoading', data: true,});

        const data = yield fetchisBindPhone(params.params);

        params.callback && params.callback(data);
        yield put({type: 'login/changeLoading', data: false,});
      } catch (e) {
        yield put({type: 'login/changeLoading', data: false,});
      }
    },
    //注册
    * fetchRegister(params) {
      try {
        yield put({type: 'login/changeLoading', data: true,});

        const data = yield fetchRegister(params.params);
        if (data.code == 200) {
          params.callback();
        }
        yield put({type: 'login/changeLoading', data: false,});

      } catch (e) {
        yield put({type: 'login/changeLoading', data: false,});

      }
    },
  }
}
