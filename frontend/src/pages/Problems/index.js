/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '~/services/api';

import ActionsPopUp from '~/components/ActionsPopUp';
import Pagination from '~/components/Pagination';
import { Container, Loading, Modal } from './styles';

export default function Problems() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  async function loadList(pg) {
    setLoading(true);
    const response = await api.get('problems', {
      params: {
        page: pg,
      },
    });
    console.tron.log(response);
    setProblems(response.data.problems);
    setTotal(response.data.total);
    setLoading(false);
  }

  function showProblemDetail(problem) {
    setModalVisible(true);
    setSelectedProblem(problem);
  }

  async function cancelDelivery(id) {
    const del = window.confirm(
      'Tem certeza de que deseja cancelar essa encomenda?'
    );
    if (del) {
      try {
        await api.put(`/delivery/${id}`, { canceled_at: new Date() });
        toast.success('Encomenda cancelada com sucesso');
        loadList(page);
      } catch (e) {
        toast.error('Não foi possível cancelar a encomenda');
      }
    }
  }

  const memoList = useMemo(
    () =>
      problems.map((problem) => (
        <tr key={problem.id}>
          <td>{`#${problem.delivery_id}`}</td>
          <td>
            {problem.description.length > 80
              ? `${problem.description.substr(0, 80)}...`
              : problem.description}
          </td>
          <td>
            <ActionsPopUp>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    showProblemDetail(problem);
                  }}
                >
                  <MdEdit color="#4D85EE" size={16} />
                  <span>visualizar</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => cancelDelivery(problem.delivery_id)}
                >
                  <MdDeleteForever color="#DE3B3B" size={16} />
                  <span>Cancelar encomenda</span>
                </button>
              </div>
            </ActionsPopUp>
          </td>
        </tr>
      )),
    [problems]
  );

  useEffect(() => {
    loadList(page);
  }, [page]);

  return (
    <Container>
      <strong>Problemas na entrega</strong>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="empty">
              <td colSpan={3}>
                <Loading>
                  <FaSpinner color="#444" size={14} />
                </Loading>
              </td>
            </tr>
          ) : problems.length === 0 ? (
            <tr className="empty">
              <td colSpan={3}>Nenhum problema encontrado</td>
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
          setSelectedProblem(null);
        }}
      >
        {selectedProblem && (
          <div>
            <strong>Visualizar Problema</strong>
            <p>{selectedProblem.description}</p>
          </div>
        )}
      </Modal>
    </Container>
  );
}
