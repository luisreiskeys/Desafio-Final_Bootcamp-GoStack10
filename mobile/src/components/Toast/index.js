/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { resetToast } from '../../store/modules/toast/actions';

export default function Toast(props) {
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  const styles = (styleProps) =>
    StyleSheet.create({
      default: {
        display: styleProps.display,
        position: 'absolute',
        backgroundColor: styleProps.bgByType,
        padding: 7,
        borderRadius: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
      },
      msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      txt: {
        color: '#FFF',
        marginLeft: 7,
        fontSize: 18,
        marginHorizontal: 20,
      },
      border: {
        height: 3,
        backgroundColor: '#fff',
        flex: 1,
        position: 'absolute',
        alignSelf: 'stretch',
        right: 0,
        bottom: 0,
      },
    });

  const [pos] = useState(new Animated.Value(-350));
  const [leftBorder] = useState(new Animated.Value(0));
  const typesColors = {
    success: '#4caf50',
    warn: '#fd951f',
    error: '#e91e63',
    default: '#0090f2',
  };

  const [dinamicStyle, setDinamicStyle] = useState({
    display: 'none',
    type: props.type,
    bgByType: '#0090f2',
  });
  const [msg, setMsg] = useState('');

  function hide() {
    Animated.timing(pos, {
      toValue: -350,
      useNativeDriver: true,
      duration: 350,
      easing: Easing.elastic(),
    }).start(() => {
      Animated.timing(leftBorder, {
        toValue: 0,
        useNativeDriver: true,
        duration: 10,
        easing: Easing.ease,
      }).start();
      setDinamicStyle({
        display: 'none',
        type: props.type ? props.type : 'default',
        bgByType: typesColors.default,
      });
    });
  }

  function show(message, type = 'default') {
    setTimeout(() => hide(), props.duration);
    Animated.timing(pos, {
      toValue: 50,
      useNativeDriver: true,
      duration: 350,
      easing: Easing.elastic(),
    }).start();
    setMsg(message);
    setDinamicStyle({
      display: 'flex',
      type: props.type ? props.type : 'default',
      bgByType: typesColors[type],
    });

    Animated.timing(leftBorder, {
      toValue: Dimensions.get('window').width - 80,
      useNativeDriver: true,
      duration: props.duration,
      easing: Easing.ease,
    }).start();
    dispatch(resetToast());
  }

  useEffect(() => {
    if (toast.show) {
      show(toast.msg, toast.type);
    }
  }, [toast]);

  function zIndex(val) {
    return Platform.select({
      ios: { zIndex: val },
      android: { elevation: val },
    });
  }

  return (
    <View style={{ ...zIndex(100) }}>
      <Animated.View
        style={[
          styles(dinamicStyle)[dinamicStyle.type],
          { transform: [{ translateY: pos }] },
        ]}
      >
        <View style={styles(dinamicStyle).msgContainer}>
          <Text style={styles(dinamicStyle).txt}>{msg}</Text>
        </View>
        <Animated.View
          style={[styles(dinamicStyle).border, { left: leftBorder }]}
        />
      </Animated.View>
    </View>
  );
}

Toast.propTypes = {
  type: PropTypes.string,
  duration: PropTypes.number,
};

Toast.defaultProps = {
  type: 'default',
  duration: 4000,
};
