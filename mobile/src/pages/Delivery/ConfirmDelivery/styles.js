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
  border-radius: 10px;
  flex: 1;
`;

export const SubmitButton = styled(Button)`
  margin: 20px;
  background: #7d40e7;
`;

export const Preview = styled.Image`
  flex: 1;
`;
