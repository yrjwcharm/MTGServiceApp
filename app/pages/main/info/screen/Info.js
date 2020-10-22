import React, {useState} from 'react';
import {View,Text,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {TeaNavigator} from 'teaset'
import Title from '../../../../components/Title';
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import HealthTopic from './HealthTopic';
import LatestFrequent from './LatestFrequent';
import DiseaseControl from './DiseaseControl';
import LifeClass from './LifeClass';
import DietHealth from './DietHealth';
const Info=(props)=>{
    const [index,setIndex]=useState(0);
    const [routes,setRoutes]=useState([
        {key: 'first', title: '健康专题'},
        {key: 'second', title: '近期多发'},
        {key: 'third', title: '疾病防治'},
        {key: 'fourth', title: '生活课堂'},
        {key: 'fifth', title: '饮食保健'}]);
    return(
        <View style={{flex:1,backgroundColor:Color.f3f3f7}}>
            <Title name={'资讯'}/>
            <TabView
                navigationState={{index,routes}}
                renderScene={SceneMap({
                    first: () => <HealthTopic {...props}  />,
                    second: () => <LatestFrequent {...props} />,
                    third: () => <DiseaseControl {...props}  />,
                    fourth: () => <LifeClass {...props}/>,
                    fifth: () => <DietHealth {...props} />,
                })}
                onIndexChange={index => setIndex(index)}
                initialLayout={{width: Dimensions.get('window').width}}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        scrollEnabled={true}
                        style={{
                            backgroundColor: "#fff",
                        }}
                        getLabelText={({route}) => route.title}
                        labelStyle={{
                            fontSize:setSpText(14),
                        }}
                        tabStyle={{width:'auto',height:scaleSizeH(49.5)}}
                        indicatorStyle={{marginLeft:scaleSizeW(12), width:scaleSizeW(60), backgroundColor:'#368EE5',height:scaleSizeH(1)}}
                        activeColor={'#333'}
                        inactiveColor={'#666'}

                    />
                }
            />
        </View>
    )
}
export  default  Info
