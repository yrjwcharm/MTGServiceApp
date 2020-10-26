/**
* @author: liy_lmn
* @date: 2019-12-07
* @description: 项目通用host配置
*/

/**
 * 调试接口不要合并到总分支
 */

/** 维护一个值，其他全部基于「HOST」*/
// export const HOST = 'http://youjk.sinocode.net:8060'; // 外网
// export const HOST = 'http://123.57.11.4:8081'; // 阿里云
export const HOST = 'http://192.168.100.90:8083'; // 阿里云

// export const HOST = 'http://192.168.103.190:8081'; // 本地正式测试服务器8081端口
//  export const PREHOST = 'http://192.168.31.197:8093';
// export const PREHOST = 'http://youjk.sinocode.net:8060'
export const PREHOST = 'http://192.168.31.192:8093' //本地
// export const PREHOST = 'http://m.youjiankang.net:8081' //阿里云

/**
 * 接口类：
 * 每个前缀代表一台子服务器，子接口与子服务器的从属关系不会改变
 */
export const HOST_NM = HOST // 本机服务，处理登陆注册验证码等
export const HOST_BUSINESS = HOST + '/business' // business服务
export const HOST_ASSESSMENT = HOST + '/assessment' // 'assessment'子服务 健康评估
export const HOST_MONITOR = HOST + '/monitor' // 'monitor'子服务
export const HOST_MANAGE = HOST + '/smartmedica' // 'manage'子服务
export const HOST_NEWS = HOST + '/news' // 'news'子服务
export const HOST_PRESCRIPTION = HOST + '/prescription' //健康处方子服务
export const HOST_CLASSROOM = HOST + '/classroom' // 课堂子服务
export const HOST_INQUIRY = HOST + '/inquiry' // 问诊子服务
export const HOST_PLAN = HOST + '/plan'
export const HOST_SHARE = HOST + '/share'   // 评论转发子服务

/**
 * 图片类：
 * 图片最终会指向一台服务器，前端只需拼接 ip + 端口 + 后端返回的地址
 * 目前暂时放到不同服务器
 */
export const HOST_IMAGE = HOST_MANAGE
export const HOST_FOOD_IMG = HOST_BUSINESS
