import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import api from '../../services/api';

import { signOut } from '../../store/modules/auth/actions';
import { showToast } from '../../store/modules/toast/actions';

import DeliveryCard from '../../components/DeliveryCard';
import {
  Container,
  Header,
  Avatar,
  HeaderMiddle,
  Label,
  Name,
  Title,
  ListHeader,
  TopLink,
  LinkText,
  DeliveryList,
} from './styles';

export default function Dashboard({ navigation }) {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [pendentesList, setPendentesList] = useState(true);
  const [data, setData] = useState([]);

  async function loadPendentes() {
    const response = await api.get(`/deliveryman/${profile.id}/deliveries`);
    setData(response.data);
  }

  async function loadEntregues() {
    const response = await api.get(
      `/deliveryman/${profile.id}/deliveries/entregue`
    );
    setData(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      if (pendentesList) {
        loadPendentes();
      } else {
        loadEntregues();
      }
    }
  }, [pendentesList, isFocused]);

  async function retirar(id) {
    try {
      await api.put(`/deliveryman/${profile.id}/deliveries/${id}`, {
        start_date: new Date(),
      });
      loadPendentes();
    } catch (err) {
      dispatch(
        showToast(
          'error',
          'retiradas só podem ser realizadas das 08:00 às 18:00'
        )
      );
    }
  }

  function renderItem(item) {
    return (
      <DeliveryCard
        item={item}
        navigation={navigation}
        retirar={() => retirar(item.id)}
      />
    );
  }

  return (
    <Container>
      <Header>
        <Avatar
          source={{
            uri: profile.avatar
              ? profile.avatar.url
              : `https://ui-avatars.com/api/?color=A28FD0&background=F4EFFC&bold=true&format=png&size=140&rounded=true&name=${profile.name}`,
          }}
        />
        <HeaderMiddle>
          <Label>Bem vindo de volta,</Label>
          <Name>{profile.name}</Name>
        </HeaderMiddle>
        <TouchableOpacity onPress={() => dispatch(signOut())}>
          <Icon name="exit-to-app" size={26} color="#e74040" />
        </TouchableOpacity>
      </Header>

      <ListHeader>
        <Title>Entregas</Title>
        <TopLink
          selected={pendentesList}
          onPress={() => setPendentesList(true)}
        >
          <LinkText selected={pendentesList}>Pendentes</LinkText>
        </TopLink>
        <TopLink
          selected={!pendentesList}
          onPress={() => setPendentesList(false)}
        >
          <LinkText selected={!pendentesList}>Entregues</LinkText>
        </TopLink>
      </ListHeader>
      <DeliveryList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => renderItem(item)}
        ListEmptyComponent={() => <Label>Nenhuma encomenda encontrada</Label>}
      />
    </Container>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape().isRequired,
};
