import React from 'react';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';
import { Container, TopHead, Content, Row } from './styles';

export default function FormRecipient({ location }) {
  function handleSubmit(data) {
    data.cep = data.cep.replace(/\D/g, '');
    console.tron.log(data);
    if (data.name === '') {
      toast.error('O nome é obrigatório');
      return;
    }
    if (data.rua === '') {
      toast.error('A rua é um campo obrigatório');
      return;
    }
    if (data.numero === '') {
      toast.error('O número é um campo é obrigatório');
      return;
    }
    if (data.cidade === '') {
      toast.error('A cidade é um campo é obrigatório');
      return;
    }
    if (data.estado === '') {
      toast.error('O estado é um campo é obrigatório');
      return;
    }
    if (data.cep.length !== 8) {
      toast.error('CEP inválido');
      return;
    }

    if (location.state) {
      api
        .put(`recipients/${location.state.recipient.id}`, {
          name: data.name,
          rua: data.rua,
          numero: data.numero,
          complemento: data.complemento,
          estado: data.estado,
          cidade: data.cidade,
          cep: data.cep,
        })
        .then(() => {
          toast.success('Destinatário editado com sucesso');
          history.push('/recipients');
        });
    } else {
      api
        .post('recipients', {
          name: data.name,
          rua: data.rua,
          numero: data.numero,
          complemento: data.complemento,
          estado: data.estado,
          cidade: data.cidade,
          cep: data.cep,
        })
        .then(() => {
          toast.success('Destinatário cadastrado com sucesso');
          history.push('/recipients');
        });
    }
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        initialData={location.state && location.state.recipient}
      >
        <TopHead colors={{ cancel: '#ccc', save: '#7d40e7' }}>
          <strong>
            {location.state
              ? 'Edição de destinatários'
              : 'Cadastro de destinatários'}
          </strong>
          <div>
            <button type="button" onClick={() => history.push('/recipients')}>
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
          <Row grid="2fr 1fr 1fr">
            <div>
              <strong>Rua</strong>
              <div style={{ marginTop: 10 }}>
                <Input
                  type="text"
                  id="rua"
                  name="rua"
                  placeholder="Ex: Av. Fulano de Tal"
                />
              </div>
            </div>
            <div>
              <strong>Numero</strong>
              <div style={{ marginTop: 10 }}>
                <Input
                  type="text"
                  id="numero"
                  name="numero"
                  placeholder="Ex: 26"
                />
              </div>
            </div>
            <div>
              <strong>Complemento</strong>
              <div style={{ marginTop: 10 }}>
                <Input
                  type="text"
                  id="complemento"
                  name="comlemento"
                  placeholder="Ex: sala 202"
                />
              </div>
            </div>
          </Row>
          <Row grid="1fr 1fr 1fr">
            <div>
              <strong>Cidade</strong>
              <div style={{ marginTop: 10 }}>
                <Input
                  type="text"
                  id="cidade"
                  name="cidade"
                  placeholder="Ex: São Paulo"
                />
              </div>
            </div>
            <div>
              <strong>Estado</strong>
              <div style={{ marginTop: 10 }}>
                <Input
                  type="text"
                  id="estado"
                  name="estado"
                  placeholder="Ex: SP"
                />
              </div>
            </div>
            <div>
              <strong>CEP</strong>
              <div style={{ marginTop: 10 }}>
                <Input
                  type="text"
                  id="cep"
                  name="cep"
                  placeholder="Ex: 00000-000"
                />
              </div>
            </div>
          </Row>
        </Content>
      </Form>
    </Container>
  );
}

FormRecipient.propTypes = {
  location: PropTypes.shape(),
};

FormRecipient.defaultProps = {
  location: null,
};
