import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { fetchInfoList } from '../../../store/api';
import List from '../../../../../../components/List';
import InfoItems from './InfoItems';
import { scaleSizeH } from '../../../../../../util/AutoLayout';
import { ThemeFlags } from '../../../../../../styles/ThemeFactory';


const _requestMethod = (page, item) => {
  const { typeId } = item;
  return fetchInfoList({ page, typeId });
}

const InfoList = (props) => {
  const { stylesOfComponents, temp, styles, _handleItemClick, index, isDetailList } = props;
  let styleData = isDetailList
    ? {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      marginHorizontal: 10,
      marginBottom: ThemeFlags['content-margin-horizontal'],
    }
    : { flex: 1, };
  return (
    <View style={styleData}>
      <List
        requestMethod={(page) => _requestMethod(page, temp)}
        renderItem={(props) => <InfoItems {...props} temp={temp} isDetailList={isDetailList} stylesOfComponents={stylesOfComponents} styles={styles} onPress={_handleItemClick} />}
        keyExtractor={item => item['newsId'] + "" + index}
        getList={source => source.records}
        getPage={source => source.current}
        showsVerticalScrollIndicator={false}
        getMore={source => source.pages > source.current}
      />
    </View>
  )
}

const mapStateToProps = ({

}) => ({

})

export default connect(mapStateToProps)(InfoList);
