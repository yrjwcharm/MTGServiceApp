import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import Iconfont  from '../../../../../../components/iconfont/Icon';
import moment from 'moment';

import { ThemeFlags } from "../../../../../../styles/ThemeFactory";

const ToolBar = (props) => {
  const { item, styles, flag } = props;
  return (
    <View style={styles.toolsBar} key={item.newsId}>
      <View style={styles.infoSource}>
        <Text style={styles.toolsBarText}>{item.newsSourceName}</Text>
      </View>
      {
        flag
          ? null
          : <View style={styles.viewNum}>
            <Iconfont
              style={{ marginRight: 3 }}
              name='liulan'
              color={ThemeFlags['Gray']}
            />
            <Text style={styles.toolsBarText}>{item.readSum}</Text>
          </View>
      }
      <View>
        {/* {
          flag
          ? <Text style={styles.toolsBarText}>{moment(item.typeReleaseTime).format("YYYY-MM-DD")}</Text>
          : <Text style={styles.toolsBarText}>{moment(item.releaseTime).format("YYYY-MM-DD")}</Text>
        } */}
        <Text style={styles.toolsBarText}>{moment(item.releaseTime).format("YYYY-MM-DD")}</Text>
      </View>
    </View>
  )
}

export default ToolBar
