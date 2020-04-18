import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../../../services/api';

import {
  Container,
  TopBg,
  BG,
  Content,
  TextArea,
  SubmitButton,
} from './styles';

import { showToast } from '../../../store/modules/toast/actions';

export default function AddProblem({ route, navigation }) {
  const dispatch = useDispatch();

  const [problem, setProblem] = useState('');
  const id = route.params?.id ?? null;

  async function handleSubmit() {
    try {
      await api.post(`/delivery/${id}/problems`, {
        description: problem,
      });
      dispatch(showToast('success', 'Problema informado com sucesso'));
      navigation.goBack();
    } catch (err) {
      dispatch(
        showToast(
          'error',
          'Erro ao informar problema, tente novamente mais tarde'
        )
      );
    }
  }
  return (
    <Container>
      <TopBg />
      <BG>
        <Content>
          <TextArea
            placeholder="Inclua aqui o problema que ocorreu na entrega"
            value={problem}
            onChangeText={setProblem}
          />
          <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
        </Content>
      </BG>
    </Container>
  );
}

AddProblem.propTypes = {
  route: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
};
