import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.png';
import {
  Container,
  Content,
  Logo,
  Form,
  FormInput,
  SubmitButton,
} from './styles';

import { signInRequest } from '../../store/modules/auth/actions';
import { showToast } from '../../store/modules/toast/actions';

export default function SignIn() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  const [idCad, setIdCad] = useState('');

  function handleSubmit() {
    if (idCad === '') {
      dispatch(
        showToast('error', 'Preencha o Id de cadastro para acessar a aplicação')
      );
      return;
    }
    dispatch(signInRequest(idCad));
  }

  return (
    <Container>
      <Content>
        <Logo source={logo} />
        <Form>
          <FormInput
            placeholder="Informe seu ID de cadastro"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="send"
            value={idCad}
            onChangeText={setIdCad}
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sitema
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
}
