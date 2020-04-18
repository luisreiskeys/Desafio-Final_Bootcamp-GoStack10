import {Platform} from 'react-native';
import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.View`
  background: #7d40e7;
  flex: 1;
`;

export const Content = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 80%;
`;

export const Form = styled.View`
  margin-top: 50px;
  align-self: stretch;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  font-size: 15px;
  padding: 0 15px;
  background: #fff;
  border-radius: 4px;
  height: 46px;
  color: #444;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
  background: #82bf18;
`;
