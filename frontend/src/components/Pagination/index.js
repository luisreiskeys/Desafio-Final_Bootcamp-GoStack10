import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

import { Container } from './styles';

export default function Pagination({ total, perPage, page, setPage }) {
  return (
    <Container>
      <span>
        {`Página ${page} de ${
          Math.ceil(total / perPage) < 1 ? 1 : Math.ceil(total / perPage)
        }`}
        <span>{`${total} registros encontrados`}</span>
      </span>
      <div>
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <MdChevronLeft color="#fff" size={26} />
        </button>
        <button
          type="button"
          disabled={page === Math.ceil(total / perPage)}
          onClick={() => setPage(page + 1)}
        >
          <MdChevronRight color="#fff" size={26} />
        </button>
      </div>
    </Container>
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func,
};

Pagination.defaultProps = {
  setPage: null,
};
