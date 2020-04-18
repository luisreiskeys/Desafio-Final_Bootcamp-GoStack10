import styled from 'styled-components/native';
import Button from '../../../components/Button';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const TopBg = styled.View`
  background: #7d40e7;
  height: 155px;
`;

export const Content = styled.View`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -40px;
`;

export const TextArea = styled.TextInput.attrs({
  autoCorrect: true,
  underlineColorAndroid: 'transparent',
  placeholderTextColor: '#999',
  multiline: true,
})`
  height: 350px;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 15px;
  padding: 20px;
  color: #333;
  border-color: #eee;
  border-width: 1px;
`;
export const SubmitButton = styled(Button)`
  margin-top: 15px;
  background: #7d40e7;
`;
