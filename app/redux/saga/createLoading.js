/**
 * mxy
 * 模拟实现dva框架createLoading功能
 */
import { call, put } from 'redux-saga/effects';

const getInitState = (model) => {
  const state = {
    loading: false,
  };
  for (let namespace in model) {
    for (let method in model[namespace]["saga"]) {
      //! 默认为true，会导致若没有调用该方法（namespace + "/" + method），则loading会一直为true。
      //! 若默认值为false，会导致在false => true的一瞬间界面取值为false，导致页面闪动问题。
      // TODO: 最好初始值为null，在避免闪动处单独做null的判断。
      state[namespace + "/" + method] = true;
    }
  }
  return state
}
const createLoading = (model) => ({
  state: getInitState(model),
  reducer: {
    CHANGE_LOADING: (state, {data, namespace}) => {
      return {
        ...state,
        [namespace]: data,
      }
    },
    // 改变全局Loading
    changeLoading: (state, {data}) => ({
      ...state,
      loading: data,
    })
  }, 
  saga: {
    *asyncChangeLoading({ method, action, store }) {
      const [name, methodName] = action.type.split('/');
         yield put({type: 'loading/CHANGE_LOADING/' + methodName, data: true, namespace: name + "/" + methodName});
         yield call(method, action, store.getState, store);
         yield put({type: 'loading/CHANGE_LOADING/' + methodName, data: false, namespace: name + "/" + methodName});
    }
  }
})

export default createLoading;