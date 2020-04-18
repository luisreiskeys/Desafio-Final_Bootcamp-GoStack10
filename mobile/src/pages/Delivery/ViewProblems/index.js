import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import api from '../../../services/api';

import {
  Container,
  TopBg,
  Content,
  Title,
  ProblemList,
  ProblemItem,
  ProblemDescription,
  ProblemDate,
  Empty,
} from './styles';

export default function ViewProblems({ route }) {
  const [data, setData] = useState([]);
  const id = route.params?.id ?? null;

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`/delivery/${id}/problems`);
      setData(response.data);
    }
    loadProblems();
  }, []);

  function renderItem(item) {
    return (
      <ProblemItem>
        <ProblemDescription>{item.description}</ProblemDescription>
        <ProblemDate>
          {format(parseISO(item.created_at), "dd'/'MM'/'yyyy")}
        </ProblemDate>
      </ProblemItem>
    );
  }
  return (
    <Container>
      <TopBg />
      <Content>
        <Title>Encomenda {id}</Title>
        <ProblemList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => renderItem(item)}
          ListEmptyComponent={() => (
            <Empty>Nenhuma problema nessa encomenda</Empty>
          )}
        />
      </Content>
    </Container>
  );
}

ViewProblems.propTypes = {
  route: PropTypes.shape().isRequired,
};
