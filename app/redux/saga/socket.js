import { put } from 'redux-saga/effects';
import Socket from '../Socket';

export default {
  // namespace: 'socket',
  state: {
    socket: null,
    test: null,
  },
  reducer: {
    changeSocket: (state, { socket }) => ({ ...state, socket }),
    changeTest: (state, { data }) => ({ ...state, test: data }),
  },
  saga: {
    *initSocket(action, getState, store) {
      const socket = new Socket(store.dispatch);
      yield put({ type: 'socket/changeSocket', socket });
    }
  }
}
