import type { Action, LoginRequest } from './models.interface';
import type { Dispatch } from 'react';
import { postLogin } from '../network';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_CALLBACK = 'LOGIN_CALLBACK';

export const loginAction = {
  loginRequest: async (dispatch: Dispatch<Action>, params: LoginRequest) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    const response = await postLogin(params);

    dispatch({
      type: 'LOGIN_CALLBACK',
      payload: response,
    });
  },
};
