import {createReducer, on} from '@ngrx/store';

import {updateUser, login, logout} from '../actions/auth.actions';
import {User} from '../shared/components/user/user.model';

export interface AuthState {
  user: User;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: null
};

const _authReducer = createReducer(initialState,
  on(updateUser, (state: AuthState, action: {user: User}) => {
    return {
      ...state,
      user: action.user
    };
  }),
  on(login, (state: AuthState, action: {token: string}) => {
    return {
      ...state,
      token: action.token
    };
  }),
  on(logout, () => {
    return {
      ...initialState
    };
  })
);

export function authReducer(state: AuthState, action) {
  return _authReducer(state, action);
}
