import React from 'react';
import { TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  HeaderLeft,
  Title,
  Retirar,
  Steps,
  Step,
  Status,
  Line,
  Label,
  Footer,
  FooterItem,
  LabelFooterItem,
  FooterText,
  GoDetalhesLink,
} from './styles';

export default function DeliveryCard({ item, navigation, retirar }) {
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Icon name="local-shipping" size={20} color="#7d40e7" />
          <Title>Entrega {item.id}</Title>
        </HeaderLeft>
        {!item.start_date && (
          <Retirar onPress={retirar}>
            <Title>Retirar</Title>
          </Retirar>
        )}
      </Header>

      <Steps>
        <Line />
        <Step>
          <Status complete={item.created_at !== null} />
          <Label>Aguardando Retirada</Label>
        </Step>
        <Step>
          <Status complete={item.start_date !== null} />
          <Label>Retirada</Label>
        </Step>
        <Step>
          <Status complete={item.end_date !== null} />
          <Label>Entregue</Label>
        </Step>
      </Steps>
      <Footer>
        <FooterItem>
          <LabelFooterItem>Data</LabelFooterItem>
          <FooterText>
            {format(parseISO(item.created_at), "dd'/'MM'/'yyyy")}
          </FooterText>
        </FooterItem>
        <FooterItem>
          <LabelFooterItem>Cidade</LabelFooterItem>
          <FooterText>{item.recipient.cidade}</FooterText>
        </FooterItem>
        <FooterItem>
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { delivery: item })}
          >
            <GoDetalhesLink>Ver detalhes</GoDetalhesLink>
          </TouchableOpacity>
        </FooterItem>
      </Footer>
    </Container>
  );
}

DeliveryCard.propTypes = {
  item: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
  retirar: PropTypes.func.isRequired,
};
