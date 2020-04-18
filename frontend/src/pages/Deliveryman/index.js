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

const colors = ['A28FD0', 'CB946C', '83CEC9', 'CC7584', 'A8D080', 'CCCC8B'];
const bg = ['F4EFFC', 'FCF4EE', 'EBFBFA', 'FFEEF1', 'F4F9EF', 'FCFCEF'];

export default function Deliveryman() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [deliveryman, setDeliveryman] = useState([]);

  async function loadList(pg, query) {
    setLoading(true);
    const response = await api.get('deliveryman', {
      params: {
        page: pg,
        q: query,
      },
    });
    setDeliveryman(response.data.deliveryman);
    setTotal(response.data.total);
    setLoading(false);
  }

  async function deleteDeliveryman(id) {
    const del = window.confirm(
      'Tem certeza de que deseja remover esse entregador?'
    );
    if (del) {
      try {
        await api.delete(`/deliveryman/${id}`);
        toast.success('Entregador removido com sucesso');
        loadList(page, q);
      } catch (e) {
        toast.error(
          'Não foi possível deletar esse entregador. Verifique se há encomendas para ele'
        );
      }
    }
  }

  const memoList = useMemo(
    () =>
      deliveryman.map((deliverymen, index) => (
        <tr key={deliverymen.id}>
          <td>{`#${deliverymen.id}`}</td>
          <td>
            <img
              alt={deliverymen.name}
              src={
                deliverymen.avatar
                  ? deliverymen.avatar.url
                  : `https://ui-avatars.com/api/?color=${colors[index]}&background=${bg[index]}&bold=true&format=svg&size=34&rounded=true&name=${deliverymen.name}`
              }
              style={{ width: 34, height: 34, borderRadius: 17 }}
            />
          </td>
          <td>{deliverymen.name}</td>
          <td>{deliverymen.email}</td>
          <td>
            <ActionsPopUp>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    history.push('/deliveryman/form', { deliverymen })
                  }
                >
                  <MdEdit color="#4D85EE" size={16} />
                  <span>Editar</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => deleteDeliveryman(deliverymen.id)}
                >
                  <MdDeleteForever color="#DE3B3B" size={16} />
                  <span>Excluir</span>
                </button>
              </div>
            </ActionsPopUp>
          </td>
        </tr>
      )),
    [deliveryman]
  );

  useEffect(() => {
    loadList(page, q);
  }, [page, q]);

  return (
    <Container>
      <strong>Gerenciando entregadores</strong>
      <div className="topContent">
        <SearchInput>
          <input
            type="text"
            placeholder="Buscar por entrgadores"
            onChange={(e) => setQ(e.target.value)}
          />
          <MdSearch color="#999" size={16} />
        </SearchInput>

        <button type="button" onClick={() => history.push('/deliveryman/form')}>
          <MdAdd color="#FFF" size={16} />
          Cadastrar
        </button>
      </div>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="empty">
              <td colSpan={5}>
                <Loading>
                  <FaSpinner color="#444" size={14} />
                </Loading>
              </td>
            </tr>
          ) : deliveryman.length === 0 ? (
            <tr className="empty">
              <td colSpan={5}>Nenhum entregador encontrado</td>
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
