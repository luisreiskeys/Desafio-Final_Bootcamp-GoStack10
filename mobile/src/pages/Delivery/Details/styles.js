import styled from 'styled-components/native';

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

export const Card = styled.View`
  border-color: #eee;
  border-width: 2px;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 15px;
  background: #fff;
`;
export const CardHeader = styled.View`
  flex-direction: row;
`;

export const CardTitle = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
`;

export const CardItemTitle = styled.Text`
  color: #999;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  margin-top: 12px;
`;

export const CardItemText = styled.Text`
  color: #666666;
  font-size: 14px;
  margin-top: 7px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ActionsCard = styled.View`
  border-color: #eee;
  border-width: 2px;
  border-radius: 4px;
  margin-bottom: 20px;
  flex-direction: row;
`;
export const ActionsItem = styled.TouchableOpacity`
  background: ${(props) => (props.disabled ? '#eee' : '#f8f9fd')};
  flex: 1;
  align-items: center;
  padding: 15px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-color: #eee;
`;

export const ActionsItemText = styled.Text`
  color: #666666;
  font-size: 14px;
  margin-top: 7px;
  text-align: center;
`;
