import React, { useEffect, useState, useCallback, forwardRef } from 'react';
import {
  View,
  StyleSheet,
  NetInfo,
  FlatList, AsyncStorage, Alert
} from 'react-native';
import PropTypes from 'prop-types';

import { NoData } from './NoData';
import { useRequest } from './hooks';
import { More, NoMore, } from './ListMaterial';
import { Tabs } from '@ant-design/react-native';
import {connect} from "react-redux";

const INIT_PAGE = 1;

List.propTypes = {
  requestMethod: PropTypes.func.isRequired, // 接口api
  renderItem: PropTypes.func.isRequired, // 渲染Item
  renderHeader: PropTypes.func, // 列表头部显示，可用于搜索，不随List滚动
  ListHeaderComponent: PropTypes.func, // 列表头部显示, 随List滚动,
  renderFooter: PropTypes.func, // 列表底部显示，
  renderEmpty: PropTypes.func, // 无数据显示,
  renderError: PropTypes.func, // 错误显示
  onEndReached: PropTypes.func,
  onRefresh: PropTypes.func,
  keyExtractor: PropTypes.func.isRequired,
  initTab: PropTypes.any,
  initPage: PropTypes.number,
  initSearchText: PropTypes.string,
  getList: PropTypes.func, // 取出接口返回数据中FlatList数据源
  getMore: PropTypes.func, // 取出接口返回数据中是否还有更多数据
  getPage: PropTypes.func, // 取出接口返回数据中当前页

  wrapperStyle: PropTypes.object, // container样式
}

List.defaultProps = {
  getList: (source = {}) => source['object'] || [],
  getMore: (source = {}) => Boolean(source['more']),
  getPage: (source = {}) => source['currentPage'] || INIT_PAGE,
  renderEmpty: () => <NoData />,
  renderError: () => <NoData />,
  initTab: 0,
  initPage: INIT_PAGE,
  initSearchText: '',
}

/**
 * 公用List, 支持上拉加载、下拉刷新、搜索🔍
 * 其中：source.object， source.currentPage， source.more与业务耦合
 *
 */
function List(props, ref) {
  const {
    // 方法
    requestMethod,
    renderItem,
    renderHeader,
    renderFooter,
    renderEmpty,
    renderError,
    onEndReached,
    onRefresh,
    keyExtractor,
    ListHeaderComponent,
    classRecommendList,
    getList,
    getMore,
    getPage,

    // 数据
    wrapperStyle,
    initTab,
    classTypeId,
    initPage,
    initSearchText,
    ...rest
  } = props;

  // state
  const [page, setPage] = useState(initPage); // 当前页
  const [list, setList] = useState([]); // list数据
  const [searchText, setSearchText] = useState(initSearchText); // 搜索文本
  const [text, setText] = useState(initSearchText); // searchInput 的value
  const [tab, setTab] = useState(initTab); // 用于头部标签选择
  const [refreshValue, setRefreshValue] = useState(0); // 用于刷新第一页
  const refresh = () => setRefreshValue(Math.random());

  /* 监听参数变动，请求新的数据 */
  const [source, isRefreshing, isError] = useRequest(() => {
    return requestMethod(page, searchText, tab);
  }, [page, searchText, tab, refreshValue], {});

  /* 监听接口返回值的effect，根据当前page是否为初始page来判断是否合并上次数据 */
  useEffect(() => {
    if (isError) {
      return;
    }
        if (getPage(source) !== INIT_PAGE) {
          setList([...list, ...(getList(source) || [])]);
        } else {
          setList(getList(source) || []);
        }

  }, [source])
  /**
   * 读取缓存数据
   * @param {类别}} classTypeId
   */
  /* 监听滑动到底部，请求数据 */
  const _onEndReached = useCallback(() => {
    onEndReached && onEndReached();
    if (isError) return;
    if (getMore(source) && !isRefreshing) {
      setPage(page + 1);
    }
  }, [page, source, isRefreshing])

  /* 底部渲染函数，通过不同状态渲染不同UI */
  const _renderFooter = useCallback(() => {
    if (isError) return;
    if (!getMore(source) && list.length) {
      return renderFooter ? renderFooter('NO_MORE') : <NoMore />
    } else if (page !== INIT_PAGE && isRefreshing) {
      return renderFooter ? renderFooter('MORE') : <More />
    } else {
      return renderFooter ? renderFooter() : <View style={{ height: 34 }} />
    }
  }, [source, list, page, isRefreshing])

  /* 监听结束输入 */
  const _onEndEditing = (str) => {
    str = typeof str === 'string' ? str : null;
    setSearchText(str || text);
    setPage(INIT_PAGE);
  }

  /* 监听下拉刷新 */
  const _onRefresh = useCallback(() => {
    onRefresh && onRefresh();
    if (INIT_PAGE === page) {
      refresh();
    } else {
      setPage(INIT_PAGE);
    }
  }, [page])

  if (isError) {
    return renderError();
  }

  /* 头部参数 */
  const headerProps = {
    onEndEditing: _onEndEditing,
    onChangeText: text => setText(text),
    value: text,
    setTab,
    tab,
  }

  return (
    <View style={[styles.container, wrapperStyle]}>
      {renderHeader ? renderHeader(headerProps) : null}
      <FlatList
        ListHeaderComponent={ListHeaderComponent ? ListHeaderComponent(headerProps) : null}
        data={list}
        renderItem={(props) => renderItem({ ...props, list, setList, refresh })}
        keyExtractor={keyExtractor}
        refreshing={page === INIT_PAGE && isRefreshing}
        onRefresh={() => _onRefresh()}
        onEndReached={() => _onEndReached()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => _renderFooter()}
        ListEmptyComponent={isRefreshing === false && renderEmpty()}
        // ref={ref}
        {...rest}
      />
    </View>
  )
}

// ----------------------------- styles -----------------------------
const styles = StyleSheet.create({
  container: { flex: 1 },
})// ----------------------------- exports -----------------------------
// export default forwardRef(List);
export default List;
