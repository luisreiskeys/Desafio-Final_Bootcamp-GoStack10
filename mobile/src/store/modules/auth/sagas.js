/* eslint-disable camelcase */
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import { signInSuccess, signFailure } from './actions';
import { showToast } from '../toast/actions';

export function* signIn({ payload }) {
  try {
    const { deliveryman_id } = payload;

    const response = yield call(api.get, `deliveryman/${deliveryman_id}`);

    const deliveryman = response.data;

    if (!deliveryman.id) {
      showToast('error', 'Usuário não encontrado');
      yield put(signFailure());
      return;
    }

    yield put(signInSuccess(deliveryman));
  } catch (err) {
    yield put(
      showToast('error', 'erro ao fazer login, usuário não encontrado')
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
