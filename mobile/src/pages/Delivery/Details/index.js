import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  TopBg,
  BG,
  Content,
  Card,
  CardHeader,
  CardTitle,
  CardItemTitle,
  CardItemText,
  Row,
  ActionsCard,
  ActionsItem,
  ActionsItemText,
} from './styles';

export default function Details({ route, navigation }) {
  const delivery = route.params?.delivery ?? null;

  return (
    <Container>
      <TopBg />
      <BG>
        <Content>
          <Card>
            <CardHeader>
              <Icon name="local-shipping" size={20} color="#7d40e7" />
              <CardTitle>Informações da entega</CardTitle>
            </CardHeader>
            <CardItemTitle>Destinatário</CardItemTitle>
            <CardItemText>{delivery.recipient.name}</CardItemText>
            <CardItemTitle>Endereço de entrega</CardItemTitle>
            <CardItemText>{`${delivery.recipient.rua}, ${delivery.recipient.numero}, ${delivery.recipient.cidade} - ${delivery.recipient.estado}, ${delivery.recipient.cep}`}</CardItemText>
            <CardItemTitle>Produto</CardItemTitle>
            <CardItemText>{delivery.product}</CardItemText>
          </Card>
          <Card>
            <CardHeader>
              <Icon name="event" size={20} color="#7d40e7" />
              <CardTitle>Situação da entrega</CardTitle>
            </CardHeader>
            <CardItemTitle>Status</CardItemTitle>
            <CardItemText>{delivery.status}</CardItemText>
            <Row>
              <View>
                <CardItemTitle>Data de retirada</CardItemTitle>
                <CardItemText>
                  {delivery.start_date
                    ? format(parseISO(delivery.start_date), "dd'/'MM'/'yyyy")
                    : '-- / -- / --'}
                </CardItemText>
              </View>
              <View>
                <CardItemTitle>Data de entregas</CardItemTitle>
                <CardItemText>
                  {delivery.end_date
                    ? format(parseISO(delivery.end_date), "dd'/'MM'/'yyyy")
                    : '-- / -- / --'}
                </CardItemText>
              </View>
            </Row>
          </Card>
          <ActionsCard>
            <ActionsItem
              disabled={delivery.end_date !== null}
              onPress={() =>
                navigation.navigate('AddProblem', { id: delivery.id })
              }
            >
              <Icon name="cancel" size={20} color="#E74040" />
              <ActionsItemText>Informar Problema</ActionsItemText>
            </ActionsItem>
            <ActionsItem
              onPress={() =>
                navigation.navigate('ViewProblems', { id: delivery.id })
              }
            >
              <Icon name="info" size={20} color="#E7BA40" />
              <ActionsItemText>Visualizar Problemas</ActionsItemText>
            </ActionsItem>
            <ActionsItem
              disabled={delivery.end_date !== null}
              onPress={() =>
                navigation.navigate('ConfirmDelivery', { id: delivery.id })
              }
            >
              <Icon name="check-circle" size={20} color="#7D40E7" />
              <ActionsItemText>Confirmar Entrega</ActionsItemText>
            </ActionsItem>
          </ActionsCard>
        </Content>
      </BG>
    </Container>
  );
}

Details.propTypes = {
  route: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
};
