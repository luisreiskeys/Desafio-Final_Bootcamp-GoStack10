import {combineReducers} from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import toast from './toast/reducer';

export default combineReducers({auth, user, toast});
