/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  type: null,
  msg: null,
  show: false,
};

export default function toast(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@toast/SHOW': {
        draft.type = action.payload.type;
        draft.msg = action.payload.msg;
        draft.show = true;
        break;
      }
      case '@toast/RESET': {
        draft.type = null;
        draft.msg = null;
        draft.show = false;
        break;
      }
      default:
    }
  });
}
