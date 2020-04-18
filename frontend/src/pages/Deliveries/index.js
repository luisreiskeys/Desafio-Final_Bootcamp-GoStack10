/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo } from 'react';
import { MdSearch, MdAdd, MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaSpinner, FaEye } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';

import ActionsPopUp from '~/components/ActionsPopUp';
import Pagination from '~/components/Pagination';
import { Container, SearchInput, Status, Loading, Modal } from './styles';

const colors = ['A28FD0', 'CB946C', '83CEC9', 'CC7584', 'A8D080', 'CCCC8B'];
const bg = ['F4EFFC', 'FCF4EE', 'EBFBFA', 'FFEEF1', 'F4F9EF', 'FCFCEF'];

export default function Deliveries() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  async function loadList(pg, query) {
    setLoading(true);
    const response = await api.get('delivery', {
      params: {
        page: pg,
        q: query,
      },
    });
    setDeliveries(response.data.deliveries);
    setTotal(response.data.total);
    setLoading(false);
  }
  function showDeliveryDetails(delivery) {
    setModalVisible(true);
    setSelectedDelivery(delivery);
  }

  async function deleteDelivery(id) {
    const del = window.confirm(
      'Tem certeza de que deseja remover essa encomenda?'
    );
    if (del) {
      await api.delete(`/delivery/${id}`);
      loadList(page, q);
    }
  }

  const dateFormatted = useMemo(() => {
    const dates = {
      start_date: '-- / -- / --',
      end_date: '-- / -- / --',
      canceled_at: '',
    };
    if (selectedDelivery && selectedDelivery.start_date) {
      dates.start_date = format(
        parseISO(selectedDelivery.start_date),
        "d'/'M'/'yyyy H:m",
        {
          locale: pt,
        }
      );
    }

    if (selectedDelivery && selectedDelivery.end_date) {
      dates.end_date = format(
        parseISO(selectedDelivery.end_date),
        "d'/'M'/'yyyy H:m",
        {
          locale: pt,
        }
      );
    }

    if (selectedDelivery && selectedDelivery.canceled_at) {
      dates.canceled_at = format(
        parseISO(selectedDelivery.canceled_at),
        "d'/'M'/'yyyy H:m",
        {
          locale: pt,
        }
      );
    }

    return dates;
  }, [selectedDelivery]);

  const memoList = useMemo(
    () =>
      deliveries.map((delivery, index) => (
        <tr key={delivery.id}>
          <td>{`#${delivery.id}`}</td>
          <td>{delivery.recipient.name}</td>
          <td>
            <div
              style={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
              }}
            >
              <img
                alt={delivery.deliveryman.name}
                src={
                  delivery.deliveryman.avatar
                    ? delivery.deliveryman.avatar.url
                    : `https://ui-avatars.com/api/?color=${colors[index]}&background=${bg[index]}&bold=true&format=svg&size=34&rounded=true&name=${delivery.deliveryman.name}`
                }
                style={{ width: 34, height: 34, borderRadius: 17 }}
              />
              <span style={{ marginLeft: 7 }}>{delivery.deliveryman.name}</span>
            </div>
          </td>
          <td>{delivery.recipient.cidade}</td>
          <td>{delivery.recipient.estado}</td>
          <td>
            <Status status={delivery.status}>
              <span>{delivery.status}</span>
            </Status>
          </td>
          <td>
            <ActionsPopUp>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    showDeliveryDetails(delivery);
                  }}
                >
                  <FaEye color="#7d40e7" size={16} />
                  <span>Visualizar</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => history.push('/deliveries/form', { delivery })}
                >
                  <MdEdit color="#4D85EE" size={16} />
                  <span>Editar</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => deleteDelivery(delivery.id)}
                >
                  <MdDeleteForever color="#DE3B3B" size={16} />
                  <span>Excluir</span>
                </button>
              </div>
            </ActionsPopUp>
          </td>
        </tr>
      )),
    [deliveries]
  );

  useEffect(() => {
    loadList(page, q);
  }, [page, q]);

  return (
    <Container>
      <strong>Gerenciando encomendas</strong>
      <div className="topContent">
        <SearchInput>
          <input
            type="text"
            placeholder="buscar por encomendas"
            onChange={(e) => setQ(e.target.value)}
          />
          <MdSearch color="#999" size={16} />
        </SearchInput>

        <button type="button" onClick={() => history.push('/deliveries/form')}>
          <MdAdd color="#FFF" size={16} />
          Cadastrar
        </button>
      </div>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="empty">
              <td colSpan={7}>
                <Loading>
                  <FaSpinner color="#444" size={14} />
                </Loading>
              </td>
            </tr>
          ) : deliveries.length === 0 ? (
            <tr className="empty">
              <td colSpan={7}>Nenhuma encomenda encontrada</td>
            </tr>
          ) : (
            memoList
          )}
        </tbody>
      </table>
      <Pagination setPage={setPage} page={page} total={total} perPage={6} />
      <Modal
        visible={modalVisible}
        onClick={() => {
          setModalVisible(false);
          setSelectedDelivery(null);
        }}
      >
        {selectedDelivery && (
          <div>
            <strong>Informações da encomenda</strong>
            <span>{`${selectedDelivery.recipient.rua}, ${selectedDelivery.recipient.numero} `}</span>
            <span>{`${selectedDelivery.recipient.cidade} - ${selectedDelivery.recipient.estado} `}</span>
            <span>{selectedDelivery.recipient.cep}</span>
            <hr />
            <strong>Datas</strong>
            <span>
              <b>Retirada: </b>
              {dateFormatted.start_date}
            </span>
            <span>
              <b>Entrega: </b>
              {dateFormatted.end_date}
            </span>
            {dateFormatted.canceled_at !== '' && (
              <span>
                <b style={{ color: '#DE3B3B' }}>Cancelada em: </b>
                {dateFormatted.canceled_at}
              </span>
            )}
            {selectedDelivery.signature && (
              <>
                <hr />
                <strong>Assinatura do destinatário </strong>
                <img src={selectedDelivery.signature.url} alt="signature" />
              </>
            )}
          </div>
        )}
      </Modal>
    </Container>
  );
}
