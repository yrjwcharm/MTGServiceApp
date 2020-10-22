let nav=null;
let headers = {}; // 可以存任何数据的对象

export const setNavigation = (navigation) => {
    nav = navigation;
}

export const getNavigation = () => nav

/**
 * store => namespace(redux业务模块) => api.js | server.js => NetUtils => store
 * 为了打破循环引用，将接口所用redux数据放入此闭包中。如：token
 * @param {object} header 要存储的接口处使用的全局信息: header: { toke: 'token1' }
 */
export const setHeaders = (header) => {
    headers = { ...headers, ...header };
}

export const getHeaders = () => headers;