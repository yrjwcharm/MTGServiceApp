import getInitState from './state';
import { put, call, delay } from 'redux-saga/effects';

import {
  getHeadlines,

} from './api';

export default {
  state: getInitState(),
  reducer: {

    changeHeadLine: (state, { data }) => ({ ...state, headLineData: data }),
    changeLoading: (state, {data}) => ({...state, isLoading: data,}),
  },
  saga: {
    * getHeadlines() {
      try {
        yield  put({type:'home/changeLoading',data:true})
        const data = yield getHeadlines();
        yield  put({type:'home/changeLoading',data:false})
        yield put({type: 'home/changeHeadLine', data: data.data || []});
      } catch (e) {
        yield  put({type:'home/changeLoading',data:false})
      }
    },
  }
}
