import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Iconfont  from '../../../../../../components/iconfont/Icon';
import moment from 'moment';

import DottedLineView from "../../../../../../components/DottedLineView";
import styles from '../../../style/health-components/style';

const ComContentItem = (props) => {
  const { item, showComment, giveComThumbsUp, deleteComment } = props;
  const { list, reply } = item;
  return (
    <View style={styles.tabContainer}>
      <View style={styles.rowContainer}>
        <View>
          <Image style={styles.userPhoto} source={{ uri: reply['photoUrl'] }} />
        </View>
        <View style={styles.colContainer}>
          <View style={styles.nameAndZan}>
            <Text style={styles.nameText}>{reply.userNick ? reply.userNick : '匿名用户'}</Text>
            {
              reply['isOwn']
                ? <TouchableWithoutFeedback onPress={() => deleteComment(reply)}>
                  <Text style={styles.littleTextC}>删除</Text>
                </TouchableWithoutFeedback>
                : <TouchableWithoutFeedback onPress={() => giveComThumbsUp(props.item, reply)}>
                  <View style={styles.rowContainer}>
                    {
                      reply.status == 1
                        ? <Iconfont
                          size={15}
                          name="yidianzan"
                          style={{ marginTop: 1, marginRight: 2 }}
                        />
                        : <Iconfont
                          size={15}
                          name="dianzan"
                          style={{ marginTop: 1, marginRight: 2 }}
                        />
                    }
                    <Text style={styles.numText}>{reply.likeNum || 0}</Text>
                  </View>
                </TouchableWithoutFeedback>
            }
          </View>
          <View style={styles.comTextContainer}>
            <Text style={styles.comContentText}>{reply.replyContent}</Text>
          </View>
          <View style={styles.rowContainer}>
            {
              reply.position
                ? <Text style={styles.littleText}>{reply.position}</Text>
                : null
            }
            <Text style={styles.littleText}>{moment(reply.ctstamp).fromNow()}</Text>
            {
              reply['isOwn']
                ? null
                : <TouchableWithoutFeedback onPress={() => showComment(props.item, reply)} >
                  <Text style={styles.remarkText}>回复</Text>
                </TouchableWithoutFeedback>
            }
          </View>
          {
            list.length
              ?
              list.map(item => {
                return <View style={[styles.rowContainer, styles.marT]} key={item.replyId}>
                  <View>
                    <Image style={styles.littleUserPhoto} source={{ uri: item['photoUrl'] }} />
                  </View>
                  <View style={styles.colContainer}>
                    <View style={styles.nameAndZan}>
                      <Text style={styles.nameTextC}>{item.userNick}<Text style={styles.littleTextC}> 回复 </Text>{item.targetUserNick?item.targetUserNick:'匿名用户'}</Text>
                      {
                        item['isOwn']
                          ? <TouchableWithoutFeedback onPress={() => deleteComment(item)}>
                            <Text style={styles.littleTextC}>删除</Text>
                          </TouchableWithoutFeedback>
                          : <TouchableWithoutFeedback onPress={() => showComment(props.item, item)}>
                            <Text style={styles.littleTextC}>回复</Text>
                          </TouchableWithoutFeedback>
                      }
                    </View>
                    <View style={styles.comTextContainerC}>
                      <Text style={[styles.littleTextC, { color: '#666'}]}>{item.replyContent}</Text>
                    </View>
                  </View>
                </View>
              })

              : null
          }
        </View>
      </View>
      <DottedLineView />
    </View>
  )
}

export default ComContentItem
