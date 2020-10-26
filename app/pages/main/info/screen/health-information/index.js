import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
// import { Loading, Iconfont, NoData } from '@components';
import Loading from '../../../../../components/Loading';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TaskTabBar from '../../../../../components/TaskTabBar';
import styles from '../../style/style';
import stylesOfComponents from '../../style/health-components/style';
import InfoList from './information-components/InfoList';
import { scaleSizeH, setSpText } from '../../../../../util/AutoLayout';
import { ThemeFlags } from '../../../../../styles/ThemeFactory';
import Title from '../../../../../components/Title';
import navigation from '../../../../../NavigationHelper';
// import { fetchInfoTypeList } from '../../store/healthInfo/api';

class HealthInformation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date_check_index: 0,
      item: {},
    }
  }

  componentWillMount() {
    const { fetchInfoTypeList } = this.props;
    fetchInfoTypeList();
  }

  componentWillUnmount() {

  }

  // 获取资讯列表
  getBaseInfoList = ({ typeId, size, page }) => {
    const { fetchInfoList } = this.props;
    fetchInfoList({ typeId, size, page });
  }

  // 获取资讯类别
  // getBaseInfoType = () => {
  //   const { fetchInfoTypeList } = this.props;
  //   fetchInfoTypeList();
  // }

  handleItemClick = () => {
    const { navigation } = this.props;
    navigation.navigate('HealthInfoDetail');
  }

  render() {
    const { isLoading, infoListData, infoTypeList } = this.props;
    if (isLoading || infoTypeList.length === 0) {
      return <Loading />
    }
    return (
        <View style={styles.container}>
          <Title name={'资讯'}/>
          <ScrollableTabView
              ref={(ref) => this.scrollRef = ref}
              renderTabBar={() => <TaskTabBar showLine={true} wrapperStyle={{ height: 35 }} style={{ paddingHorizontal: ThemeFlags['content-margin-horizontal'], fontSize: setSpText(16), borderBottomWidth: 0 }}/>}
              // renderTabBar={() => <OrderTabBar style={{ paddingHorizontal: scaleSizeW(10) }} />}
              // initialPage={this.pageIndex || this.pageIndex === 0 ? 0 : this.getInitialPage()}
          >
            {
              infoTypeList.map((item, index) => {
                return <InfoList
                    tabLabel={item.typeName}
                    key={item.typeId + index}
                    temp={item}
                    navigation={this.props.navigation}
                    styles={styles}
                    isDetailList={true}
                    stylesOfComponents={stylesOfComponents}
                    _handleItemClick={this.handleItemClick}
                />
              })
            }
          </ScrollableTabView>
        </View>
    )
  }
}

const mapStateToProps = ({
                           healthInfo: {
                             infoListData,
                             infoTypeList,
                           },
                           loading,
                         }) => ({
  infoListData,
  infoTypeList,
  isLoading: loading['healthInfo/fetchInfoTypeList'],
})

const mapDispatchToProps = disptach => ({
  fetchInfoList({ typeId, size, page }) {
    disptach({
      type: 'healthInfo/fetchInfoList',
      typeId,
      size,
      page,
    })
  },
  changeInfoTypeList(param) {
    disptach({
      type: 'healthInfo/changeInfoTypeList',
      param,
    })
  },
  fetchInfoTypeList() {
    disptach({
      type: 'healthInfo/fetchInfoTypeList',
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HealthInformation);
