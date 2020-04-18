/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo } from 'react';
import { MdSearch, MdAdd, MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import ActionsPopUp from '~/components/ActionsPopUp';
import Pagination from '~/components/Pagination';
import { Container, SearchInput, Loading } from './styles';

export default function Recipients() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);

  async function loadList(pg, query) {
    setLoading(true);
    const response = await api.get('recipients', {
      params: {
        page: pg,
        q: query,
      },
    });
    setRecipients(response.data.recipients);
    setTotal(response.data.total);
    setLoading(false);
  }

  async function deleteRecipients(id) {
    const del = window.confirm(
      'Tem certeza de que deseja remover esse detinatário?'
    );
    if (del) {
      try {
        await api.delete(`/recipients/${id}`);
        toast.success('Entregador removido com sucesso');
        loadList(page, q);
      } catch (e) {
        toast.error(
          'Não foi possível deletar esse destinatário. Verifique se há encomendas para ele'
        );
      }
    }
  }

  const memoList = useMemo(
    () =>
      recipients.map((recipient) => (
        <tr key={recipient.id}>
          <td>{`#${recipient.id}`}</td>
          <td>{recipient.name}</td>
          <td>{`${recipient.rua}, ${recipient.numero}, ${recipient.cidade} - ${recipient.estado}`}</td>
          <td>
            <ActionsPopUp>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    history.push('/recipients/form', { recipient })
                  }
                >
                  <MdEdit color="#4D85EE" size={16} />
                  <span>Editar</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => deleteRecipients(recipient.id)}
                >
                  <MdDeleteForever color="#DE3B3B" size={16} />
                  <span>Excluir</span>
                </button>
              </div>
            </ActionsPopUp>
          </td>
        </tr>
      )),
    [recipients]
  );

  useEffect(() => {
    loadList(page, q);
  }, [page, q]);

  return (
    <Container>
      <strong>Gerenciando destinatários</strong>
      <div className="topContent">
        <SearchInput>
          <input
            type="text"
            placeholder="Buscar por destinatários"
            onChange={(e) => setQ(e.target.value)}
          />
          <MdSearch color="#999" size={16} />
        </SearchInput>

        <button type="button" onClick={() => history.push('/recipients/form')}>
          <MdAdd color="#FFF" size={16} />
          Cadastrar
        </button>
      </div>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="empty">
              <td colSpan={4}>
                <Loading>
                  <FaSpinner color="#444" size={14} />
                </Loading>
              </td>
            </tr>
          ) : recipients.length === 0 ? (
            <tr className="empty">
              <td colSpan={4}>Nenhum destinatário encontrado</td>
            </tr>
          ) : (
            memoList
          )}
        </tbody>
      </table>
      <Pagination setPage={setPage} page={page} total={total} perPage={6} />
    </Container>
  );
}
