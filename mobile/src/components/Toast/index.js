/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Container,
  MessageContainer,
  Message,
  ProgressBottomBar,
} from './styles';

import { resetToast } from '../../store/modules/toast/actions';

export default function Toast(props) {
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();

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
    <Container
      style={{ ...zIndex(100), transform: [{ translateY: pos }] }}
      dinamicStyle={dinamicStyle}
      type={props.type}
    >
      <MessageContainer>
        <Message>{msg}</Message>
      </MessageContainer>
      <ProgressBottomBar style={{ left: leftBorder }} />
    </Container>
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
