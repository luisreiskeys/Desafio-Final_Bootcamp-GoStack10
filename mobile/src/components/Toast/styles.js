import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled(Animated.View)`
  display: ${(props) => props.dinamicStyle.display};
  position: absolute;
  background-color: ${(props) => props.dinamicStyle.bgByType};
  padding: 7px;
  border-radius: 4px;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
  margin-right: 40px;
`;

export const MessageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Message = styled.Text`
  color: #fff;
  margin-left: 7px;
  font-size: 18px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const ProgressBottomBar = styled(Animated.View)`
  background-color: #fff;
  height: 3px;
  flex: 1;
  position: absolute;
  align-self: stretch;
  right: 0;
  bottom: 0;
`;
