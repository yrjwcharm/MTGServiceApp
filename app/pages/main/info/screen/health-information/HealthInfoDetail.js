import React, {Component, Provider} from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import styles from '../../style/health-info-detail/style';
import styleOfComponent from '../../style/health-components/style';
// import ToolBar from './information-components/ToolBar';
// import DottedLineView from "@components/DottedLineView";
import Iconfont from '../../../../../components/iconfont/Icon';
import {ThemeFlags} from '../../../../../styles/ThemeFactory';
import CommentItems from './information-components/CommentItems';
import ShareModal from './information-components/ShareModal';
import CommentModal from './information-components/CommentModal';
import moment from 'moment';
import {fetchReadNews} from '../../store/api';

import {postThumbsUp, postComment, postThumbsUpComment} from '../../store/api';
import {scaleSizeH} from '../../../../../util/AutoLayout';
import Title from '../../../../../components/Title';

const hitSlop = {top: 10, left: 10, right: 10, bottom: 10};
const Loading = <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View>;
const PROGRESS_HEIGHT = 2.5;

class HealthInfoDetail extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: '资讯详情',
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            // false 显示正文  true 显示评论
            _visiable: false,
            // 分享modal
            shareVisiable: false,
            // 评论modal
            comVisiable: false,
            // 评论内容
            comValue: '',
            // 回复的评论的用户id
            targetUserId: '',
            // 回复的首级评论的id
            parentId: '',
            // 回复的评论的replyId
            parentReplyId: '',
        };
    }

    componentWillMount() {
        this.getBaseDetail();
    }

    componentWillUnmount() {
        this.props.clearInfoComments(); // 清除评论
    }

    // 点击切换评论
    handleChangeComment = () => {
        !this.state._visiable && this.getBaseComment(); // 点击切到评论才调用
        this.setState({
            _visiable: !this.state._visiable,
            targetUserId: '',
            parentId: '',
        });
    };

    // 关闭分享modal
    closeShareModal = () => {
        this.setState({
            shareVisiable: false,
        });
    };

    // 关闭评论modal
    closeComModal = () => {
        this.setState({
            comVisiable: false,
        });
    };

    // 评论输入框
    handleChangeTextarea = (value) => {
        this.setState({
            comValue: value,
        });
    };

    // 发表评论
    submitComment = () => {
        const {comValue, parentId, targetUserId, parentReplyId} = this.state;
        const {infoDetail, userId, navigation, fetchWorkCount} = this.props;
        const {item} = navigation.state.params || {};
        const temp = {
            'modularType': 2,
            'oneLevelId': infoDetail.newsId,
            'secondLevelId': '',
            'replyContent': comValue,
            'parentId': parentId,
            'targetUserId': targetUserId,
            // 'targetUserNick': '',
            'userId': userId,
            // 'userNick': userNick,
            'photoUrl': '',
            'typeId': item.typeId,
            'isNominate': item.isNominate,
            'parentReplyId': parentReplyId,
        };
        this.setState({
            comValue: '',
        });
        postComment(temp).then(res => {
            if (res.code === 200) {
                this.closeComModal();
                this.getBaseComment();
                fetchWorkCount({newsId: infoDetail.newsId, newsWorkType: 3});
            }
        });
    };

    // 点赞
    giveThumbsUp = (flag) => {
        const {navigation, dispatch, infoDetail} = this.props;
        const {item} = navigation.state.params || {};
        const {newsId, typeId} = item;

        const param = {
            likeSum: infoDetail.likeSum + (flag ? 1 : -1),
            userIsLike: flag ? 1 : 0,
        };
        dispatch({type: 'healthInfo/changeInfoDetail', param});
        postThumbsUp({newsId, typeId, flag}).catch(e => {
            dispatch({
                type: 'healthInfo/changeInfoDetail', param: {
                    likeSum: infoDetail.likeSum + (flag ? -1 : 1),
                    userIsLike: flag ? 0 : 1,
                },
            });
        });
    };

    // 评论点赞
    giveComThumbsUp = (item, temp) => {
        const {status} = temp;
        const {infoDetail, userId, navigation, changeCommentLikeNum} = this.props;
        const {item: _item} = navigation.state.params || {};
        let data = {
            'replyId': temp.replyId,
            'modularType': 2,
            'oneLevelId': infoDetail.newsId,
            'secondLevelId': '',
            'userId': userId,
            // "status": "点赞：1，取消赞 ：0",
            'typeId': _item.typeId,
            'isNominate': _item.isNominate,
        };
        if (status) {
            data['status'] = 0;
            changeCommentLikeNum({flag: false, tempReply: temp});
        } else {
            data['status'] = 1;
            changeCommentLikeNum({flag: true, tempReply: temp});
        }
        postThumbsUpComment(data).then(res => {
            if (res.code != 200) {
                if (status) {
                    changeCommentLikeNum({flag: true, tempReply: temp});
                } else {
                    changeCommentLikeNum({flag: false, tempReply: temp});
                }
            }
        }).catch(e => {
            console.log(e);
        });
    };

    // 删除评论
    deleteComment = (item) => {
        const {replyId} = item;
        const {fetchDeleteComment} = this.props;
        fetchDeleteComment({modularType: 2, replyId});
        this.getBaseComment();
    };

    // 获取资讯内容
    getBaseDetail = () => {
        const {fetchInfoDetail, navigation} = this.props;
        const {item} = navigation.state.params || {};
        const {newsId, typeId} = item;
        fetchInfoDetail({newsId, typeId});
    };

    // 获取评论
    getBaseComment = () => {
        const {fetchInfoComments, navigation, userId} = this.props;
        const {item} = navigation.state.params || {};
        const {newsId} = item;
        fetchInfoComments({userId, oneLevelId: newsId, modularType: 2});
    };

    // 转发
    handleRelay = (isRelay) => {
        if (!isRelay) {
            return;
        }
        this.setState({
            shareVisiable: true,
        });
    };

    // 回复评论
    showComment = (temp, item) => {
        this.setState({
            comVisiable: true,
            targetUserId: item.userId,
            parentId: temp.reply.replyId,
            parentReplyId: item.replyId,
        });
    };

    keyExtractor = (item, index) => {
        return 'index' + index;
    };

    // 真实html加载进度条，触发频率较低
    _onLoadProgress = ({nativeEvent}) => {
        const {progress} = nativeEvent;
        const setStyle = (style) => this.progress.setNativeProps && this.progress.setNativeProps(style);
        if (progress === 1) {
            setStyle({width: `100%`});
            setTimeout(() => {
                setStyle({height: 0});
            }, 100);
        } else {
            setStyle({width: `${nativeEvent.progress * 100}%`});
        }
    };

    getInjectedJS = () => {
        const {infoDetail} = this.props;
        return `(function() {
      try{
        const prevDiv = document.querySelector('.yjk-title');
        if (prevDiv) {
          prevDiv.parentElement.removeChild(prevDiv);
        }

        const div = document.createElement('div');
        div.className = 'yjk-title';
        div.style.cssText = 'border-bottom: 1px dashed #f3f3f3; padding-bottom: 10px';
        const h1 = document.createElement('h1');
        h1.innerText = ${'\'' + infoDetail.newsTitle + '\''};
        h1.style.cssText = 'font-size: 21px; font-weight: 400; line-height: 1.2';
        const span1 = document.createElement('span');
        span1.innerText = ${'\'' + infoDetail.newsSourceName + '\''};
        span1.style.cssText = 'color: #999; margin-right: 2em';
        const span2 = document.createElement('span');
        span2.innerText = ${'\'' + moment(infoDetail.releaseTime).format('YYYY-MM-DD') + '\''};
        span2.style.cssText = 'color: #999';
        div.appendChild(h1)
        div.appendChild(span1)
        div.appendChild(span2)
        document.body.insertBefore(div, document.body.firstChild);
      } catch(e) {
        alert(e)
      }
    })();`;
    };

    onWebViewScroll = (e) => {
        if (this.isRead) {
            return;
        }
        const {navigation} = this.props;
        const {item, list, setList} = navigation.state.params || {};
        const {typeId, newsId} = item;
        const {
            contentOffset: {y}, // 头部超出屏幕的offset
            contentSize: {height}, // 内容总高度
            layoutMeasurement: {height: screenHeight}, // 屏幕的高度
        } = e.nativeEvent;
        const THRESHOLD = 200; // 距离底部还有THRESHOLD就算看完了
        // y + screenHeight = height 相当于滑动到了底部
        if (y + screenHeight >= height - THRESHOLD) {
            // { newsId: 资讯id, typeId: 类型id }
            fetchReadNews({newsId, typeId});
            // 外侧列表同步+1
            // list.find(v => v.newsId === item.newsId).readSum += 1
            // setList([...list])
            this.isRead = true;
        }
    };

    render() {
        const {_visiable, shareVisiable, comVisiable, comValue} = this.state;
        const {infoDetail, isLoading, isComLoading, commentsData, fetchInfoComments} = this.props;
        if (isLoading) {
            return Loading;
        }
        return (
            <View style={styles.tabContainer}>
                <Title name={'资讯详情'} back onBack={() => this.props.navigation.goBack()}/>
                <View
                    ref={ref => this.progress = ref}
                    style={{
                        height: PROGRESS_HEIGHT,
                        width: 0,
                        backgroundColor: ThemeFlags.Green,
                        borderRadius: 5,
                    }}
                />
                <ShareModal visiable={shareVisiable} onClose={this.closeShareModal}/>
                    <CommentModal
                        visiable={comVisiable}
                        onClose={this.closeComModal}
                        textareaValue={comValue}
                        onChange={this.handleChangeTextarea}
                        onSubmit={this.submitComment}
                    />
                {/* <View style={styles.detailHeader}>
          <Text style={styles.detailTitle}>{infoDetail.newsTitle}</Text>
          <ToolBar item={infoDetail} styles={styleOfComponent} flag={true} />
        </View>
        <DashedLine style={{marginTop: 8}} borderColor="#f3f3f3"/> */}
                <View style={{flex: 1, display: _visiable ? 'flex' : 'none'}}>
                    <CommentItems
                        item={commentsData}
                        style={styleOfComponent}
                        keyExtractor={this.keyExtractor}
                        _refreshFn={fetchInfoComments}
                        isLoading={isComLoading}
                        showComment={this.showComment}
                        deleteComment={this.deleteComment}
                        giveComThumbsUp={this.giveComThumbsUp}
                    />
                </View>
                <View style={{flex: 1, paddingBottom: scaleSizeH(25), display: _visiable ? 'none' : 'flex'}}>
                    <WebView
                        source={{uri: infoDetail.newsUrl}}
                        onLoadProgress={this._onLoadProgress}
                        injectedJavaScript={this.getInjectedJS()}
                        onScroll={this.onWebViewScroll}
                    />
                </View>
                <View style={styles.detailFooter}>
                    <TouchableWithoutFeedback onPress={() => this.setState({comVisiable: true})} hitSlop={hitSlop}>
                        <View style={styles.contentBtn}>
                            <Iconfont
                                name='xiepinglun'
                                color={ThemeFlags['Gray']}
                                size={14}
                            />
                            <Text>评论一下...</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.toolsContainer}>
                        {
                            _visiable
                                ?
                                <TouchableWithoutFeedback onPress={() => this.handleChangeComment()} hitSlop={hitSlop}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Iconfont name='BAI-wenzhang' color={ThemeFlags['Green']}/>
                                        <Text style={[styles.numText, styles.marR]}>正文</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <TouchableWithoutFeedback onPress={() => this.handleChangeComment()} hitSlop={hitSlop}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Iconfont name="com" style={{marginTop: 0}}/>
                                        <Text style={[styles.numText, styles.marR]}>{infoDetail.repaySum}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                        }
                        <TouchableWithoutFeedback onPress={() => this.giveThumbsUp(!infoDetail.userIsLike)}
                                                  hitSlop={hitSlop}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                {/* <Icon
                  name={'home/thumbsUp'}
                  color={infoDetail.userIsLike ? ThemeFlags['Green'] : ThemeFlags['Gray']}
                /> */}
                                {
                                    infoDetail.userIsLike == 1
                                        ? <Iconfont
                                            size={16}
                                            name="yidianzan"
                                            style={{marginRight: 2}}
                                        />
                                        : <Iconfont
                                            size={16}
                                            name="dianzan"
                                            style={{marginRight: 2}}
                                        />
                                }
                                <Text style={[styles.numText, styles.marR]}>{infoDetail.likeSum}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {/* <TouchableWithoutFeedback onPress={() => this.handleRelay(infoDetail.isRelay)} hitSlop={hitSlop}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Iconfont
                  size={14}
                  name="fenxiang"
                  color={ThemeFlags['Gray']}
                  style={{ marginRight: 2 }}
                />
                <Text style={styles.numText}>{infoDetail.collectSum}</Text>
              </View>
            </TouchableWithoutFeedback> */}
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({
                             healthInfo: {
                                 infoDetail,
                                 commentsData,
                             },
                             loading,
                             whitelistdata: {
                                 userInfo: {
                                     userId,
                                 },
                             },
                         }) => ({
    userId,
    infoDetail,
    commentsData,
    isLoading: loading['healthInfo/fetchInfoDetail'],
    isComLoading: loading['healthInfo/fetchInfoComments'],
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchInfoDetail({typeId, newsId}) {
        dispatch({
            type: 'healthInfo/fetchInfoDetail',
            typeId,
            newsId,
        });
    },
    fetchInfoComments({modularType, secondLevelId = '', userId, oneLevelId}) {
        dispatch({
            type: 'healthInfo/fetchInfoComments',
            modularType,
            secondLevelId,
            userId,
            oneLevelId,
        });
    },
    clearInfoComments() {
        dispatch({
            type: 'healthInfo/changeInfoComments',
            param: {},
        });
    },
    fetchWorkCount({newsId, newsWorkType}) {
        dispatch({
            type: 'healthInfo/fetchWorkCount',
            newsId,
            newsWorkType,
        });
    },
    fetchDeleteComment({modularType, replyId}) {
        dispatch({
            type: 'healthInfo/fetchDeleteComment',
            modularType,
            replyId,
        });
    },
    changeCommentLikeNum({flag, tempReply}) {
        dispatch({
            type: 'healthInfo/changeCommentLikeNum',
            flag,
            tempReply,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HealthInfoDetail);
