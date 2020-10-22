import request, { HOST_NEWS, HOST_SHARE } from '@request';

// 获取资讯类别
export const fetchInfoTypeList = () => {
  return request.get(HOST_NEWS + '/baNewsType/getBaNewsTypeList');
}

// 获取资讯
export const fetchInfoList = (data) => {
  return request.get(HOST_NEWS + '/baNews/getNewsList', data);
}

// 获取资讯详情
export const fetchInfoDetail = (data) => {
  return request.get(HOST_NEWS + '/baNews/getNews', data);
}

// 获取文章评论数量(modularType 1：微课堂;2:新闻资讯 )
export const fetchInfoCommentsNum = (modularType) => {
  return request.get(HOST_SHARE + '/BaReply/getReplyNum?modularType=' + modularType);
}

// 获取文章评论
export const fetchInfoComments = (data) => {
  return request.get(HOST_SHARE + '/BaReply/getList', data);
}

// 获取点赞 评论 转发 阅读数量 （1-点赞量，2-转发量，3-评论量，4-阅读量）
export const fetchWorkCount = ({newsId, newsWorkType}) => {
  return request.get(HOST_NEWS + '/baNews/getNewsWorkCount', {newsId, newsWorkType});
}

// 点赞/取消赞
export const postThumbsUp = ({newsId, typeId, flag}) => {
  let _url;
  if (flag) {
    _url = '/baNews/likeNews';
  } else {
    _url = '/baNews/unLikeNews';
  }
  return request.post(HOST_NEWS + _url, {newsId, typeId});
} 

// 添加评论
export const postComment = (data) => {
  return request.post(HOST_SHARE + '/BaReply/insert', data);
}

// 评论点赞/取消
export const postThumbsUpComment = (data) => {
  return request.post(HOST_SHARE + '/BaReply/like', data);
}

// 删除评论
export const fetchDeleteComment = (data) => {
  return request.get(HOST_SHARE + '/BaReply/delete', data);
}

// 阅读文章，用于统计阅读量
// data: { newsId: 资讯id, typeId: 类型id }
export const fetchReadNews = (data) => {
  return request.post(HOST_NEWS + '/baNews/readNews', data);
}
