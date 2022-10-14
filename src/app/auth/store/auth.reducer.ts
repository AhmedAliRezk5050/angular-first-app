import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import User from '../user.model';
import {
  loginStart,
  authSuccess,
  authFail,
  signUpStart,
  clearError,
  logout,
} from './auth.actions';

export const authFeatureKey = 'auth';

export type AuthFeatureState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

export const authInitialState: AuthFeatureState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  authInitialState,
  immerOn(loginStart, (state) => {
    state.user = null;
    state.loading = true;
    state.error = null;
  }),
  immerOn(signUpStart, (state) => {
    state.user = null;
    state.loading = true;
    state.error = null;
  }),
  immerOn(authSuccess, (state, { user }) => {
    state.user = user;
    state.loading = false;
    state.error = null;
  }),
  immerOn(authFail, (state, { error }) => {
    state.user = null;
    state.loading = false;
    state.error = error;
  }),
  immerOn(clearError, (state) => {
    state.user = null;
    state.loading = false;
    state.error = null;
  }),
  immerOn(logout, (state) => {
    state.user = null;
    state.loading = false;
    state.error = null;
  }),
);
