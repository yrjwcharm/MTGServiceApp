/**
 *实现上拉加载的Flatlist
 */
import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    RefreshControl,
    TouchableWithoutFeedback,
    Modal,
    StatusBar,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types'
import {scaleSizeW, scaleSizeH, setSpText} from '../util/AutoLayout'

class MyModal extends Component {
    // 定义属性
    static propTypes = {
        title: PropTypes.string,
        btn_left: PropTypes.string,
        btn_right: PropTypes.string,
        btn_type: PropTypes.string,
        content: PropTypes.object,
        onClickLeft: PropTypes.func,
        onClickRight: PropTypes.func,
        visible: PropTypes.bool,
        onRequestClose: PropTypes.func,
    }

    // 初始值
    static defaultProps = {
        filters: { // 查询条件
        },

    }

    constructor(props) {
        super(props);
        this.state = {
            filters: this.props.filters,
        };
    }


    render() {
        const _props = this.props
        return (
            <Modal
                onRequestClose={_props.onRequestClose}
                visible={_props.visible}
                transparent={true}
                animationType="fade"
            >

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#00000060',

                }}>
                    <StatusBar
                      backgroundColor="#00000060"
                      barStyle="light-content"
                    />
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FFFFFF',
                        marginLeft: scaleSizeW(25),
                        marginRight: scaleSizeW(25),
                        borderRadius: scaleSizeW(12),
                        alignSelf: 'center',
                    }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: scaleSizeW(24),
                            marginRight: scaleSizeW(24),
                        }}>
                            <Text style={{
                                color: '#333333',
                                fontSize: setSpText(16),
                                marginTop: scaleSizeH(13),
                                marginBottom:scaleSizeH(15)
                            }}>{_props.title}</Text>
                            {_props.content}
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <TouchableWithoutFeedback
                                onPress={
                                    _props.onClickLeft
                                }>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // backgroundColor: '#FFFFFF',
                                    backgroundColor: _props.btn_type?'#FFFFFF':'#04B48D',
                                    height: scaleSizeH(40),
                                    marginTop: scaleSizeH(20),
                                    borderBottomLeftRadius: scaleSizeW(12),
                                    borderBottomRightRadius: _props.btn_right?0:scaleSizeW(12),
                                    borderTopWidth: 1,
                                    borderTopColor: '#F3F3F3'
                                }}>
                                    <Text style={{
                                        fontSize: setSpText(14),
                                        // color: '#00B28B',
                                        color: _props.btn_type?'#04B48D':'#FFFFFF'
                                    }}>{_props.btn_left}</Text>

                                </View>

                            </TouchableWithoutFeedback>

                            {_props.btn_right ?
                                <TouchableWithoutFeedback
                                    onPress={
                                        _props.onClickRight
                                    }>
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // backgroundColor: '#04B48D',
                                        backgroundColor: _props.btn_type?'#04B48D':'#FFFFFF',
                                        height: scaleSizeH(40),
                                        marginTop: scaleSizeH(20),
                                        borderBottomRightRadius: scaleSizeW(12),
                                        borderTopWidth: 1,
                                        borderTopColor: '#F3F3F3'
                                    }}>
                                        <Text style={{
                                            fontSize: setSpText(14),
                                            // color: '#FFFFFF'
                                            color: _props.btn_type?'#FFFFFF':'#04B48D'
                                        }}>{_props.btn_right}</Text>

                                    </View>

                                </TouchableWithoutFeedback>
                                :
                                null}
                        </View>
                    </View>
                </View>
            </Modal>

        );
    }

}


export default MyModal
