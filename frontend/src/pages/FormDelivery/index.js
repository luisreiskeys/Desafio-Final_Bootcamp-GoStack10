import React, { useState, useEffect } from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import PropTypes from 'prop-types';
import Async from 'react-select/async';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';
import { Container, TopHead, Content, Row } from './styles';

export default function FormDelivery({ location }) {
  const [selectedDeliveryman, setSelectedDeliveryman] = useState(0);
  const [selectedRecipient, setSelectedRecipient] = useState(0);
  const [recipientValue, setRecipientValue] = useState(null);
  const [deliverymanValue, setDeliverymanValue] = useState(null);

  useEffect(() => {
    if (location.state) {
      setSelectedRecipient(location.state.delivery.recipient.id);
      setSelectedDeliveryman(location.state.delivery.deliveryman.id);
      setRecipientValue({
        name: location.state.delivery.recipient.name,
        id: location.state.delivery.recipient.id,
      });
      setDeliverymanValue({
        name: location.state.delivery.deliveryman.name,
        id: location.state.delivery.deliveryman.id,
      });
    }
  }, [location]);

  async function loadDeliveryman() {
    const deliveryman = await api.get('deliveryman');
    return deliveryman.data.deliveryman;
  }

  async function loadRecipients() {
    const recipients = await api.get('recipients');

    return recipients.data.recipients;
  }

  function handleSubmit(data) {
    if (selectedRecipient === 0) {
      toast.error('Selecione um Destinatário');
      return;
    }
    if (selectedDeliveryman === 0) {
      toast.error('Selecione um Entregador');
      return;
    }

    if (data.product === '') {
      toast.error('Preencha o campo nome do produto');
      return;
    }

    if (location.state) {
      api
        .put(`delivery/${location.state.delivery.id}`, {
          recipient_id: selectedRecipient,
          deliveryman_id: selectedDeliveryman,
          product: data.product.trim(),
        })
        .then(() => {
          toast.success('Encomenda editada com sucesso');
          history.push('/deliveries');
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } else {
      api
        .post('delivery', {
          recipient_id: selectedRecipient,
          deliveryman_id: selectedDeliveryman,
          product: data.product.trim(),
        })
        .then(() => {
          toast.success('Encomenda cadastrada com sucesso');
          history.push('/deliveries');
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        initialData={location.state && location.state.delivery}
      >
        <TopHead colors={{ cancel: '#ccc', save: '#7d40e7' }}>
          <strong>
            {location.state ? 'Edição de encomenda' : 'Cadastro de encomendas'}
          </strong>
          <div>
            <button type="button" onClick={() => history.push('/deliveries')}>
              <MdChevronLeft color="#FFF" size={22} />
              Voltar
            </button>
            <button type="submit" onClick={() => {}}>
              <MdCheck color="#FFF" size={22} />
              {location.state ? 'Salvar' : 'Cadastrar'}
            </button>
          </div>
        </TopHead>
        <Content>
          <div>
            <Row>
              <div>
                <strong>Destinatário</strong>
                <div style={{ marginTop: 10 }}>
                  <Async
                    defaultOptions
                    onSelectResetsInput
                    onBlurResetsInput={false}
                    value={recipientValue}
                    loadOptions={loadRecipients}
                    getOptionValue={(op) => op.id}
                    getOptionLabel={(op) => op.name}
                    isSearchable={false}
                    onChange={(value) => {
                      setSelectedRecipient(value.id);
                      setRecipientValue({
                        name: value.name,
                        id: value.id,
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <strong>Entregador</strong>
                <div style={{ marginTop: 10 }}>
                  <Async
                    defaultOptions
                    loadOptions={loadDeliveryman}
                    value={deliverymanValue}
                    getOptionValue={(op) => op.id}
                    getOptionLabel={(op) => op.name}
                    isSearchable={false}
                    onChange={(value) => {
                      setSelectedDeliveryman(value.id);
                      setDeliverymanValue({
                        name: value.name,
                        id: value.id,
                      });
                    }}
                  />
                </div>
              </div>
            </Row>
            <div style={{ marginTop: 20 }}>
              <strong>Nome do produto</strong>
              <div style={{ marginTop: 10 }}>
                <Input
                  type="text"
                  id="product"
                  name="product"
                  placeholder="Ex: Smartphone Samsung Galaxy"
                />
              </div>
            </div>
          </div>
        </Content>
      </Form>
    </Container>
  );
}

FormDelivery.propTypes = {
  location: PropTypes.shape(),
};

FormDelivery.defaultProps = {
  location: null,
};
