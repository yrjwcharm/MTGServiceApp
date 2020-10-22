import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import Spinner from 'react-native-spinkit';

/**
 * 透明遮照全局统一loading
 * isVisible: bool
 */
export default (props) => {
  const { isVisible, ...rest } = props;
  return isVisible ? (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Spinner
          type="Bounce"
          color="#ccc"
          isVisible={isVisible}
          {...rest}
        />
      </View>
    </View>
  ) : null
}

export const WaveLoading= (props) => {
  const { isVisible, ...rest } = props;
  return isVisible ? (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Spinner
          type="Wave"
          color="#ccc"
          isVisible={isVisible}
          {...rest}
        />
      </View>
    </View>
  ) : null
}

export const CircleLoading= (props) => {
  const { isVisible, ...rest } = props;
  return isVisible ? (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Spinner
          type="Circle"
          color="#ccc"
          isVisible={isVisible}
          {...rest}
        />
      </View>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
})
