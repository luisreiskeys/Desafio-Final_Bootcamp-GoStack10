import styled from 'styled-components/native';

export const Container = styled.View`
  border-color: #eee;
  border-width: 2px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 15px;
  justify-content: space-between;
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
`;

export const Retirar = styled.TouchableOpacity``;

export const Steps = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

export const Step = styled.View`
  width: 50px;
  align-items: center;
`;

export const Status = styled.View`
  height: 9px;
  width: 9px;
  border-radius: 4.5px;
  background: ${(props) => (props.complete ? '#7d40e7' : '#fff')};
  border-color: #7d40e7;
  border-width: 1px;
`;

export const Label = styled.Text`
  color: #999;
  font-size: 8px;
  text-align: center;
  margin-top: 7px;
`;

export const Line = styled.View`
  position: absolute;
  height: 1px;
  background: #7d40e7;
  top: 4.5px;
  left: 25px;
  right: 25px;
`;

export const Footer = styled.View`
  background: #f8f9fd;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const FooterItem = styled.View``;

export const LabelFooterItem = styled.Text`
  color: #999;
  font-size: 8px;
  margin-top: 7px;
`;

export const FooterText = styled.Text`
  font-size: 14px;
  color: #444;
  font-weight: bold;
`;
export const GoDetalhesLink = styled.Text`
  font-size: 12px;
  color: #7d40e7;
  font-weight: bold;
`;
