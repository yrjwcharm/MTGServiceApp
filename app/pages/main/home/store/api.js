import request, { HOST_BUSINESS, HOST_ASSESSMENT, HOST_MANAGE, HOST_MONITOR, HOST_PLAN, HOST } from '@request';

// 健康头条（首页）
export const getHeadlines = (data) => {
  return request.get(HOST_MANAGE + '/homeConfController/getHeadlines', data);
}
