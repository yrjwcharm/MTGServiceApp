import getInitState from './state';
import { put, call, delay } from 'redux-saga/effects';

import {
  fetchInfoList,
  fetchInfoTypeList,
  fetchInfoDetail,
  fetchInfoComments,
  fetchWorkCount,
  fetchDeleteComment,
} from './api';
import {useCallback} from 'react';

export default {
  state: getInitState(),
  reducer: {
    // 资讯分类
    changeInfoTypeList: (state, {param}) => ({...state, infoTypeList: [...param]}),
    // 资讯列表
    changeInfoList: (state, {param}) => ({...state, infoListData: {...param}}),
    // 资讯详情
    changeInfoDetail: (state, {param}) => ({...state, infoDetail: {...state.infoDetail, ...param}}),
    // 评论列表
    changeInfoComments: (state, {param}) => ({...state, commentsData: {...param}}),
    // 评论点赞实时加减 flag true 赞 false 取消赞
    changeCommentLikeNum: (state, param) => {
      const { flag, tempReply } = param;
      const { commentsData } = state;
      let { list } = commentsData;
      let tempList = list.find(v => v.reply.replyId == tempReply.replyId);
      let { reply } = tempList;
      if(flag) {
        reply['status'] = 1;
        reply['likeNum'] = Number(reply['likeNum'] || 0) + 1;
      } else {
        reply['status'] = 0;
        reply['likeNum'] = Number(reply['likeNum']) - 1;
      }
      return {...state, commentsData: {...commentsData, list: [...list]}};
    }
  },
  saga: {
    *fetchInfoList({typeId, size, page}) {
      try {
        const data = yield fetchInfoList({typeId, size, page});
        yield  put({type:'whitelistdata/changeInfoList',params:data.data})
        yield put({type: 'healthInfo/changeInfoList', param: data.data});
      } catch (error) {
        console.log(error);
      }
    },
    *fetchInfoTypeList() {
      try {
        const data = yield fetchInfoTypeList();
        yield  put({type:'whitelistdata/changeInfoTypeList',params:data.data})
        yield put({type: 'healthInfo/changeInfoTypeList', param: data.data});
      } catch (error) {
        console.log(error);
      }
    },
    *fetchInfoDetail({typeId, newsId}) {
      try {
        const data = yield fetchInfoDetail({typeId, newsId});
        yield put({type: 'healthInfo/changeInfoDetail', param: data.data});
      } catch (error) {
        console.log(error);
      }
    },
    *fetchInfoComments({modularType, secondLevelId, userId, oneLevelId}) {
      try {
        const data = yield fetchInfoComments({modularType, secondLevelId, userId, oneLevelId});
        yield put({type: 'healthInfo/changeInfoComments', param: data.data});
      } catch (error) {
        console.log(error);
      }
    },
    *fetchWorkCount({newsId, newsWorkType}, getState) {
      try {
        const homeState = getState().healthInfo;
        const data = yield fetchWorkCount({newsId, newsWorkType});
        let _param;
        if(newsWorkType == 1){
          _param = {'likeSum': data.data, 'userIsLike': homeState.infoDetail.userIsLike ? 0 : 1}
        } else if(newsWorkType == 2){
          _param = {'repaySum': data.data}
        } else if(newsWorkType == 3){
          _param = {'repaySum': data.data}
        } else if(newsWorkType == 4){
          _param = {'readSum': data.data}
        }
        yield put({type: 'healthInfo/changeInfoDetail', param: _param});
      } catch (error) {
        console.log(error);
      }
    },
    *fetchDeleteComment({modularType = 2, replyId}) {
      try {
        const data = yield fetchDeleteComment({modularType, replyId});
      } catch (error) {
        console.log(error);
      }
    }
  }
}
