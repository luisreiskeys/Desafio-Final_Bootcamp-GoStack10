import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background: #fff;
`;

export const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;
export const Header = styled.View`
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  text-align: left;
  flex-direction: row;
  align-items: center;
`;
export const ListHeader = Header;

export const HeaderMiddle = styled.View`
  margin-left: 20px;
  flex: 1;
`;

export const Label = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: #666666;
`;

export const Name = styled.Text`
  margin-top: 4px;
  font-size: 22px;
  font-weight: bold;
  color: #444444;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  margin-top: 4px;
  font-size: 22px;
  font-weight: bold;
  color: #444444;
  margin-bottom: 10px;
  flex: 1;
`;

export const TopLink = styled.TouchableOpacity`
  margin-left: 10px;
  border-bottom-width: ${(props) => (props.selected ? '1px' : '0')};
  padding-bottom: 2px;
  border-color: #7d40e7;
`;

export const LinkText = styled.Text`
  font-size: 12px;
  color: ${(props) => (props.selected ? '#7d40e7' : '#999')};
  font-weight: bold;
`;

export const DeliveryList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  width: 100%;
`;
