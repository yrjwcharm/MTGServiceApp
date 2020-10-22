import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import NoData from '../../../../../../components/NoData';

import { ThemeFlags } from "../../../../../../styles/ThemeFactory";
import ComContentItem from './ComContentItem';

const renderFooter = (props) => {
  const { item, isLoading } = props;
  const { more } = item;
  const listItem = item['comments'] || [];
  if (more === 0 && listItem.length) {
    return (
      <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
        <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
          没有更多数据了
        </Text>
      </View>
    )
  } else if (isLoading) {
    // TODO: 与refreshing冲突并且评论暂无分页，暂时去除。
    return null;
    return (
      <View style={{
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <ActivityIndicator />
        <Text>正在加载更多数据...</Text>
      </View>
    )
  } else {
    return (
      <View style={{
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      </View>
    );
  }
}

const CommentItems = (props) => {
  const { item, isLoading, _refreshFn, keyExtractor, showComment, giveComThumbsUp, deleteComment } = props;
  const { list, count } = item;
  return (
    <View style={{marginHorizontal: ThemeFlags['content-margin-horizontal'], flex: 1}}>
      <View style={{marginBottom: ThemeFlags['content-margin-horizontal']}}>
        <Text style={{fontSize: ThemeFlags['text-size-m'], color: ThemeFlags['text-fl-color']}}>全部评论（<Text>{count || 0}</Text>）</Text>
      </View>
      <FlatList
        refreshing={isLoading}
        keyExtractor={keyExtractor}
        onRefresh={() => _refreshFn}
        data={list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => renderFooter(props)}
        renderItem={(props) => <ComContentItem {...props} showComment={showComment} deleteComment={deleteComment} giveComThumbsUp={giveComThumbsUp} />}
        ListEmptyComponent={!isLoading && <NoData />}
      />
    </View>
  )
}

export default CommentItems
