import { createAction } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const login = createAction(LOGIN);

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = createAction(LOGIN_FAILURE);

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const loginRequested = createAction(LOGIN_REQUESTED);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = createAction(LOGIN_SUCCESS);

export const LOGOUT = 'LOGOUT';
export const logout = createAction(LOGOUT);

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const logoutFailure = createAction(LOGOUT_FAILURE);

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';
export const logoutRequested = createAction(LOGOUT_REQUESTED);

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const updateProfile = createAction(UPDATE_PROFILE);
