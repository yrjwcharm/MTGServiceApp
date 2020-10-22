/**
* @author: liy_lmn
* @date: 2019-12-16
* @description: 虚线分割线
*/
import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
const mywidth = Dimensions.get('window').width / 4;
const dottes = [];
for (let i = 0; i < mywidth; i++) {
    dottes.push(i);
}
const DottedLineView = () => {
    return (
        <View style={{
            flexDirection: 'row'
        }}>
            {
                dottes.map(item => {
                    return <Text key={item} style={styles.text}>- </Text>;
                })
            }
        </View>  );
};

const styles=StyleSheet.create({
    text:{
        color: '#F3F3F3',
        fontSize: 16
    }
})

export default DottedLineView
