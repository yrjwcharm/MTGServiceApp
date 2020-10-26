import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
} from 'react-native';
import  Iconfont  from '../../../../../../components/iconfont/Icon';
import DottedLineView from "../../../../../../components/DottedLineView";
import { ThemeFlags } from "../../../../../../styles/ThemeFactory";
import ToolBar from './ToolBar';
import styles from '../../../style/style'

const InfoItems = (props) => {
  let { item, navigation, stylesOfComponents, temp, length, index, list = [], setList, isDetailList } = props;
  if(!length) {
    length = list.length;
  }
  item['typeId'] = temp.typeId;
  if (temp.typeName === "热点资讯") {
    item['isNominate'] = 1;
  } else {
    item['isNominate'] = 0;
  }
  return (
      <View style={{
        flex: 1,
        marginHorizontal: ThemeFlags['content-margin-horizontal'],
        marginTop: index === 0 ? 10 : 0,
        marginBottom: length === index + 1 ? 10 : 0,
      }}>
        {
          //1缩略图在左 2缩略图在右 3多图 4大图 5
          item['newMode'] == 1
              ? <TouchableWithoutFeedback onPress={() => navigation.navigate('HealthInfoDetail', { item: item, list, setList })}>
                <View>
                  <View
                      style={styles.rightHasImgContainer}
                  >
                    <View style={styles.leftImg}>
                      <Image
                          style={styles.littleImg}
                          source={{ uri: item.imageUrl }}
                      />
                    </View>
                    <View style={styles.twoColumnContainerLeft}>
                      <Text style={styles.infoTitleText}>{item.newsTitle}</Text>
                      <ToolBar styles={stylesOfComponents} item={item} />
                    </View>
                  </View>
                  {
                    length && length > index + 1
                        ? <DottedLineView />
                        : null
                  }
                </View>
              </TouchableWithoutFeedback>
              : (
                  item['newMode'] === 2
                      ? <TouchableWithoutFeedback onPress={() => navigation.navigate('HealthInfoDetail', { item: item, list, setList })}>
                        <View>
                          <View
                              style={styles.rightHasImgContainer}
                          >
                            <View style={styles.twoColumnContainer}>
                              <Text style={styles.infoTitleText}>{item.newsTitle}</Text>
                              <ToolBar styles={stylesOfComponents} item={item} />
                            </View>
                            <View style={styles.rightImg}>
                              <Image
                                  style={styles.littleImg}
                                  source={{ uri: item.imageUrl }}
                              />
                            </View>
                          </View>
                          {
                            length && length > index + 1
                                ? <DottedLineView />
                                : null
                          }
                        </View>
                      </TouchableWithoutFeedback>
                      : (
                          item['newMode'] === 4
                              ? <TouchableWithoutFeedback onPress={() => navigation.navigate('HealthInfoDetail', { item: item, list, setList })}>
                                <View>
                                  <View style={index == 0 ? styles.typeFourCon : (index + 1 === length ? styles.typeThreeCon : styles.typeTwoCon)}>
                                    <View style={styles.infoTitle}>
                                      <Text style={styles.infoTitleText}>{item.newsTitle}</Text>
                                    </View>
                                    <View>
                                      <Image
                                          style={styles.infoImgBig}
                                          source={{ uri: item.imageUrl }}
                                      />
                                    </View>
                                    <ToolBar styles={stylesOfComponents} item={item} />
                                  </View>
                                  {
                                    length && length > index + 1
                                        ? <DottedLineView />
                                        : null
                                  }
                                </View>
                              </TouchableWithoutFeedback>
                              : (
                                  item['newMode'] === 3
                                      ? <TouchableWithoutFeedback onPress={() => navigation.navigate('HealthInfoDetail', { item: item, list, setList })}>
                                        <View>
                                          <View style={index == 0 ? styles.typeFourCon : (index + 1 === length ? styles.typeThreeCon : styles.typeTwoCon)}>
                                            <View style={styles.infoTitle}>
                                              <Text style={styles.infoTitleText}>{item.newsTitle}</Text>
                                            </View>
                                            <View style={styles.manyImgs}>
                                              <Image
                                                  style={styles.infoImgLittle}
                                                  source={{ uri: item.imagetbUrl1 }}
                                              />
                                              <Image
                                                  style={styles.infoImgLittle}
                                                  source={{ uri: item.imagetbUrl2 }}
                                              />
                                              <Image
                                                  style={styles.infoImgLittle}
                                                  source={{ uri: item.imagetbUrl3 }}
                                              />
                                            </View>
                                            <ToolBar styles={stylesOfComponents} item={item} />
                                          </View>
                                          {
                                            length && length > index + 1
                                                ? <DottedLineView />
                                                : null
                                          }
                                        </View>
                                      </TouchableWithoutFeedback>
                                      : null
                              )
                      )
              )
        }
      </View>
  )
}

export default InfoItems
