import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const Avatar = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
`;
export const Info = styled.View`
  margin-top: 30px;
  text-align: left;
  width: 100%;
`;

export const Label = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: #666666;
`;

export const BigText = styled.Text`
  margin-top: 4px;
  font-size: 22px;
  font-weight: bold;
  color: #444444;
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  align-self: stretch;
  margin-top: 20px;
  background: #e74040;
`;
