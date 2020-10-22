import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { reducer, getSaga } from './reducer'
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


//此时设置whitelist是为了约束当前的store的值，设置为白名单。
//黑名单接收字符串数组。每个字符串必须匹配部分状态(传入persistReducer中reducer管理的状态)。
//白名单(whitelistdata)的设置和黑名单一样，除了它表示的是你想要持久化的state。
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist:['whitelistdata']
};
//注意：使用此插件的时候，是保存当前的store树，如果app退出接着进入，
// 则当前store开始为初始的值，再由persist来渲染，所以，在root中，render会走两次。
////当 PersistGate 如果写了这个属性，那么就会导致当前的树形结构首先被渲染完成后，
// 然后再渲染视图，此时root只会渲染一次。
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
    persistedReducer, /* preloadedState, */
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
  ));

sagaMiddleware.run(getSaga(store))

export { store };

export  default () => {
  let persistor = persistStore(store)
  return { store, persistor }
}
