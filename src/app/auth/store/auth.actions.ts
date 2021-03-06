import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '../dto/login.request';
import { SignupRequest } from '../dto/signup.request';
import { User } from './auth.models';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ loginRequest: LoginRequest }>()
);

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{ signupRequest: SignupRequest }>()
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{ user: User; redirect: boolean }>()
);

export const authFail = createAction(
  '[Auth] Auth Fail',
  props<{ errors: string[] }>()
);

export const autoLogin = createAction('[Auth] Auto Login');
export const logout = createAction('[Auth] Logout');
export const clearErrors = createAction('[Auth] Clear Errors');
