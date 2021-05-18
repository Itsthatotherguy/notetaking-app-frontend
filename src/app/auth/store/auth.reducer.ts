import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './auth.models';

export const authFeatureKey = 'auth';

export interface State {
  user: User;
  isAuthenticating: boolean;
  authErrors: string[];
}

export const initialState: State = {
  user: null,
  isAuthenticating: false,
  authErrors: null,
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.loginStart, (state) => {
    return {
      ...state,
      isAuthenticating: true,
      authErrors: null,
    };
  }),

  on(AuthActions.authSuccess, (state, { user }) => {
    return {
      ...state,
      isAuthenticating: false,
      user,
    };
  }),

  on(AuthActions.authFail, (state, { errors }) => {
    return {
      ...state,
      user: null,
      isAuthenticating: false,
      authErrors: errors,
    };
  }),

  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),

  on(AuthActions.signupStart, (state) => {
    return {
      ...state,
      isAuthenticating: true,
      authErrors: null,
    };
  }),

  on(AuthActions.clearErrors, (state) => {
    return {
      ...state,
      authErrors: null,
    };
  })
);
