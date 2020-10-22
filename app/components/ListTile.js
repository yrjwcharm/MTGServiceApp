import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  List,
} from '@ant-design/react-native';
const { Item } = List;
const { Brief } = Item;
import moment from 'moment';

import { ThemeFlags } from '@styles/ThemeFactory';
import commonStyles from '@styles/common';
import { setSpText } from '@utils/AutoLayout';
import { Iconfont } from '@components';
import { parseCalendarDate } from '@utils/DateUtils';
import { Avatar, ConversationLable, Badge } from './ListMaterial';
import { ListItemStyles } from '@styles/resetStyles';

const hitSlop = { top: 10, right: 10, left: 10, bottom: 10 };

// 机构Item
export const OrgItem = ({ item, onPress, arrow = '' }) => {

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.item_wrapper}
      onPress={() => onPress(item)}
    >
      <Avatar name={item['orgName']} imgUrl={item['orgImagetbUrl']} style={styles.item_left} />
      <View style={styles.item_right}>
        <Text style={styles.item_title} numberOfLines={1}>{item['orgName']}</Text>
        <Text style={[commonStyles.color3_s]} numberOfLines={1}>地址：{item['address']}</Text>
        <Text style={[commonStyles.color3_s]} numberOfLines={1}>电话：{item['phone']}</Text>
      </View>
      {arrow === 'right' ? (
        <Iconfont name="Fill" style={styles.icon} size={12} color={ThemeFlags['text-tl-color']} />
      ) : null}
    </TouchableOpacity>
  )
}

// 医生Item
export const DoctorItem = ({ item, onPress, list, setList }) => {
  const _onFollow = () => {
    // TODO 这里调接口关注
    const listItem = list.find(v => v.id === item.id);
    listItem['isFollow'] = !listItem['isFollow'];
    setList([...list]);
  }

  return (
    <TouchableOpacity
      style={styles.item_wrapper}
      activeOpacity={0.7}
      onPress={() => onPress(item)}
    >
      <View style={styles.doctor_item_left}>
        <Avatar imgUrl={item['imageUrl']} name={item['orgName']} />
      </View>
      <View style={styles.item_right}>
        <View style={[styles.doctor_right_header]}>
          <Text style={{ ...commonStyles.color1_l, fontSize: 16 }} numberOfLines={1}>{item['drName']}</Text>
          <Text style={[commonStyles.color2_m, { fontSize: 14 }]}>{' ' + item['protitle']}</Text>
          {/* TODO 关注功能暂时不上 */}
          {/* <TouchableOpacity 
            style={styles.doctor_right_follow}
            onPress={_onFollow}
            activeOpacity={0.7}
            hitSlop={{top: 15, right: 15, left: 15, bottom: 15}}
          >
            <Text style={commonStyles.color3_s}>{item['isFollow'] ? '取消' : '关注'}</Text>
          </TouchableOpacity> */}
        </View>
        <Text style={[commonStyles.color3_s, { fontSize: 12 }]} numberOfLines={1}>{item['orgName']}</Text>
        <Text style={[commonStyles.color3_s, { fontSize: 12 }]} numberOfLines={1}>{item.orgTeamNameList.join(' ')}</Text>
      </View>
    </TouchableOpacity>
  )
}

// 消息列表Item
export const FriendsItem = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.friend_container}
    activeOpacity={0.7}
    onPress={() => onPress(item)}
  >
    <Avatar imgUrl={item['imageUrl']} name={item['name']} />
    <View style={styles.content}>
      <View style={styles.content_item}>
        <Text style={styles.content_title} numberOfLines={1}>{item['name']} | {item['type']}</Text>
        <ConversationLable text={item['label']} />
        <Text style={styles.content_time}>{parseCalendarDate(item['time'])}</Text>
      </View>
      <View style={[styles.content_item, { paddingBottom: 6 }]}>
        <Text style={styles.content_message} numberOfLines={1}>{item['message']}</Text>
        <Badge text={item['messageCount']} />
      </View>
    </View>
  </TouchableOpacity>
)

/* 用于展示静态List.Item */
export const ListTiles = ({ data, style }) => (
  <List style={style}>
    {data.map((item, index) => {
      const { children, brief, ...rest } = item;
      const res = brief ? (
        [children, <Brief key={brief} style={{ color: ThemeFlags['text-sl-color'] }}>{brief}</Brief>]
      ) : children
      return (
        <Item
          key={index}
          onPress={() => null}
          styles={ListItemStyles}
          {...rest}
        >
          {res}
        </Item>
      )
    })}
  </List>
)

export const SERVICE_HELPER = {
  serviceTypes: {
    "1": {label: '家医服务', title: '家庭医生签约服务', desc: '签约家庭医生，为您提供免费健康咨询和慢 病跟踪管理服务' },
    "2": {label: '图文问诊服务', },
  },
  status: {
    "0": { label: '待审核', color: '#FF9300' },
    "1": { label: '进行中', color: ThemeFlags['Green'] },
    "2": { label: '已驳回', color: '#FF4E00' },
    '3': { label: '已结束', color: '#999' },
  }
}
/* 我的服务，服务Item
item: {
  applyStatus: 1
  applyTime: 1588003200000
  endTime: 1588089600000 
  finishStatus: 0 // 是否已结束
  id: "175019842972286976" // 用于查询审核
  imageUrl: "http://youjk.sinocode.net:8060/hmp/images/shop/serve/jiayiqianyue.png"
  patientUserId: "170754209673773056"
  startTime: 1588003200000} param0 
  serviceType: 前端自己添加的，表示服务类型，如上serviceTypes
}
 */
export const ServiceItem = ({ item, onPress }) => {
  const { serviceTypes, status } = SERVICE_HELPER;
  const [type, state] = [serviceTypes[item.serviceType], status[item.finishStatus ? '3' : item.applyStatus]];
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.service_wrapper}
    >
      <View style={[styles.service_tile, styles.service_header, styles.service_border]}>
        <Text style={[commonStyles.color1_s, { color: ThemeFlags['Green'] }]}>{type.label}</Text>
        <Text style={[commonStyles.color1_s, { color: state.color }]}>{state.label}</Text>
      </View>
      <View style={[styles.service_content, styles.service_border]}>
        <Avatar imgUrl={item['imageUrl']} size={80} name={type['title']} />
        <View style={[styles.service_article]}>
          <Text style={[commonStyles.color1_m]}>{type['title']}</Text>
          <Text numberOfLines={3} style={[commonStyles.color3_m]}>{type['desc'] + '\n'}</Text>
        </View>
      </View>
      <View style={[styles.service_tile, styles.service_footer]}>
        <Text style={[commonStyles.color3_s]}>
          {item.applyStatus === 1 ? `有效期至：${moment(item['endTime']).format('YYYY年MM月DD日')}` : ''}
        </Text>
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => onPress(item)}
          style={styles.text_button}
        >
          <Text style={[commonStyles.color1_s]}>{item.finishStatus === 1 || item.applyStatus !== 1 ? '服务详情' : '使用服务'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

/* 首页通知，通知列表的item 
item = { 
  id: "183878632828174336"
  imageUrl: ""
  message: "您已成功与王杨医生签约～"
  moduleType: "inquiry"
  readFlag: 0 // 0代表没读，1代表已读
  requestParam: ""
  sendTime: 1590155149000
}
*/
export const NoticeItem = ({ item, onPress }) => {
  const [Anim] = useState(new Animated.Value(0));
  const _onPress = (item) => {
    const duration = 400;
    Animated.timing(Anim, {
      toValue: 1,
      duration,
    }).start()
    setTimeout(() => onPress(item), duration - 100)
  }
  return (
    <Animated.View style={[styles.notice_wrapper, {
      transform: [{
        translateX: Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -500],
        }),
      }],
    }]}>
      <View style={styles.notice_header}>
        <Text style={styles.notice_header_text}>{item.title|| ''}</Text>
        <Text style={styles.notice_header_time}>{moment(item.sendTime).format('YYYY-MM-DD HH:mm')}</Text>
      </View>
      <View style={styles.notice_content}>
        <Text style={styles.notice_content_text}>{item.message+'\n'}</Text>
      </View>
      {!item.readFlag && <TouchableOpacity 
        style={styles.notice_footer} activeOpacity={0.7}
        onPress={() => _onPress(item)}
        hitSlop={hitSlop}
      >
        <Text style={styles.notice_footer_text}>知道了</Text>
      </TouchableOpacity>}
    </Animated.View>
  )
}

// ----------------------------- styles -----------------------------
const styles = StyleSheet.create({
  /* 首页通知，通知列表的item */
  notice_wrapper: { marginTop: 10, marginHorizontal: 10, padding: 8, backgroundColor: '#fff', borderRadius: 5 },
  notice_header: { marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' },
  notice_header_text: { color: ThemeFlags["Green"], fontSize: 15 },
  notice_header_time: { color: '#ccc', fontSize: 14 },
  notice_content: {},
  notice_content_text: { fontSize: 13, color: "#333" },
  notice_footer: {},
  notice_footer_text: { marginLeft: 'auto', color: ThemeFlags["Green"], fontSize: 13 },
  /* 首页通知，通知列表的item */
  /* 我的服务，服务Item */
  service_wrapper: { backgroundColor: '#fff', borderRadius: 5, marginVertical: 5, marginHorizontal: 10 },
  service_border: { borderBottomColor: ThemeFlags['border-color'], borderBottomWidth: ThemeFlags['border-width'], },
  service_tile: { paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' },
  service_header: { height: 25, },
  service_content: { padding: 10, flexDirection: 'row', },
  service_article: { marginLeft: 10, flex: 1 },
  service_footer: { height: 35, },
  text_button: { paddingVertical: 2, paddingHorizontal: 8, borderColor: ThemeFlags['border-color'], borderWidth: ThemeFlags['border-width'], borderRadius: 20 },
  /* 我的服务，服务Item */
  /* 医生Item */
  doctor_right_header: { flexDirection: 'row', alignItems: 'flex-end' },
  doctor_right_follow: { marginLeft: 'auto' },
  doctor_item_left: { marginRight: 10 },
  /* 医生Item */
  /* orgItem */
  item_wrapper: { flexDirection: 'row', padding: 10, marginHorizontal: ThemeFlags['content-margin-horizontal'], marginBottom: 10, backgroundColor: '#fff', borderRadius: 6, },
  item_title: { fontSize: setSpText(14), color: '#000', },
  item_left: { height: 60, width: 60, backgroundColor: ThemeFlags['Green'], borderRadius: 0, marginRight: 10, },
  item_right: { flex: 1, justifyContent: 'space-between', },
  /* orgItem */
  icon: { alignSelf: 'center' },
  friend_container: {
    height: 80,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomColor: ThemeFlags['border-color'],
    borderBottomWidth: ThemeFlags['border-width'],
  },
  content: {
    paddingLeft: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  content_item: {
    flexDirection: 'row',
    width: "100%",
    alignItems: 'center',
  },
  content_time: {
    marginLeft: 'auto',
    ...commonStyles['color2_s'],
  },
  content_title: {
    ...commonStyles['color1_m'],
    paddingRight: 110,
  },
  content_message: {
    ...commonStyles['color3_s'],
    paddingRight: 20,
    flex: 1,
  },
})
