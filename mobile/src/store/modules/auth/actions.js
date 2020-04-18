/* eslint-disable camelcase */
export function signInRequest(deliveryman_id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { deliveryman_id },
  };
}

export function signInSuccess(deliveryman) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { deliveryman },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
