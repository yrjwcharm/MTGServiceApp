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
import navigation from '../../../../../../NavigationHelper';


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
 const  _renderItem=({item,index})=>{
     const { stylesOfComponents,navigation, temp, styles, _handleItemClick,  isDetailList } = props;
     return(
          <InfoItems item={item} navigation={navigation}  temp={temp} isDetailList={isDetailList} stylesOfComponents={stylesOfComponents} styles={styles} onPress={_handleItemClick} />
      )
  }
  return (
    <View style={styleData}>
      <List
        requestMethod={(page) => _requestMethod(page, temp)}
        renderItem={_renderItem}
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
