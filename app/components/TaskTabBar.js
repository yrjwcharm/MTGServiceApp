import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {scaleSizeH, scaleSizeW, setSpText} from "../util/AutoLayout";
import {ThemeFlags} from '../styles/ThemeFactory';

export default (props) => {
  const { showLine = true, wrapperStyle = {} } = props;
  return (
    <View style={[styles.tabs, wrapperStyle]}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {props.tabs.map((tab, i) => {
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => props.goToPage(i)}
            style={[styles.tab, props.style]}
          >
            <View style={[props.activeTab === i && showLine ? styles.activeText_wrap : {}]}>
              <Text
                style={[styles.text, props.activeTab === i ? styles.activeText : {}]}
              >
                {tab}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    height: scaleSizeH(40),
    alignItems: 'center',
  },
  text: {
    fontSize: setSpText(14),
    color: "#333333",
  },
  activeText: {
    fontSize: setSpText(14),
    color: ThemeFlags['Green'],
  },
  activeText_wrap: {
    borderBottomWidth: 1.5,
    borderBottomColor: ThemeFlags['Green'],
  },
});
