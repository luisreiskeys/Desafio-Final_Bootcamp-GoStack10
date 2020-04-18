import React from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import AvatarInput from './AvatarIpunt';

import history from '~/services/history';
import api from '~/services/api';
import { Container, TopHead, Content } from './styles';

export default function FormDeliveryman({ location }) {
  function handleSubmit(data) {
    if (data.name === '') {
      toast.error('O nome é obrigatório');
      return;
    }
    if (data.email === 0) {
      toast.error('E-mail é obrigatório');
      return;
    }

    if (location.state) {
      api
        .put(`deliveryman/${location.state.deliverymen.id}`, {
          name: data.name,
          email: data.email,
          avatar_id: data.avatar_id,
        })
        .then(() => {
          toast.success('Entregador editado com sucesso');
          history.push('/deliveryman');
        });
    } else {
      api
        .post('deliveryman', {
          name: data.name,
          email: data.email,
          avatar_id: data.avatar_id,
        })
        .then(() => {
          toast.success('Entregador cadastrado com sucesso');
          history.push('/deliveryman');
        });
    }
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        initialData={location.state && location.state.deliverymen}
      >
        <TopHead colors={{ cancel: '#ccc', save: '#7d40e7' }}>
          <strong>
            {location.state
              ? 'Edição de entregadores'
              : 'Cadastro de entregadores'}
          </strong>
          <div>
            <button type="button" onClick={() => history.push('/deliveryman')}>
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
          <AvatarInput
            name="avatar_id"
            userName={location.state && location.state.deliverymen.name}
          />
          <div style={{ marginTop: 20 }}>
            <strong>Nome</strong>
            <div style={{ marginTop: 10 }}>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Ex: Jhon Doe"
              />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <strong>Email</strong>
            <div style={{ marginTop: 10 }}>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Ex: example@example.com"
              />
            </div>
          </div>
        </Content>
      </Form>
    </Container>
  );
}

FormDeliveryman.propTypes = {
  location: PropTypes.shape(),
};

FormDeliveryman.defaultProps = {
  location: null,
};
