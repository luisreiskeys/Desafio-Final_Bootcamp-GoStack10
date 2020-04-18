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
  margin-top: -60px;
`;

export const Title = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

export const ProblemList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`;

export const ProblemItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 15px;
  padding: 20px;
  border-color: #eee;
  border-width: 1px;
`;

export const ProblemDescription = styled.Text`
  font-size: 16px;
  color: #999;
  flex: 1;
`;

export const ProblemDate = styled.Text`
  font-size: 12px;
  color: #999;
  margin-left: 20px;
`;

export const Empty = styled.Text`
  font-size: 16px;
  color: #999;
  margin-top: 60px;
  text-align: center;
`;
