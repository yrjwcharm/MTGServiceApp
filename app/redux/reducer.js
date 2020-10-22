import model from './saga'
import { take, fork, put } from 'redux-saga/effects'

const getSaga = (store) => function* saga() {
  while (true) {
    const action = yield take(action => {
      const name = action.type.split('/')[0]
      const method = action.type.split('/')[1]
      try {
        if (typeof model[name].saga[method] === 'function') {
          return true
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    })
    const name = action.type.split('/')[0]
    const method = action.type.split('/')[1]
    yield fork(model['loading'].saga['asyncChangeLoading'], {
      method: model[name].saga[method],
      action,
      store,
    });
  }
}

let initState = {}
for (let name in model) {
  initState[name] = model[name].state
}

const reducer = (state = initState, action) => {
  const name = action.type.split('/')[0]
  const method = action.type.split('/')[1]
  try {
    return {
      ...state,
      [name]: model[name].reducer[method](state[name], action)
    }
  } catch (e) {
    return { ...state }
  }
}

export {
  reducer,
  getSaga,
}