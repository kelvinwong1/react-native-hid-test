import { postWebLogin } from '../network';
import type { Action, WebLoginRequest } from './models.interface';
import type { Dispatch } from 'react';

export const WEB_LOGIN_REQUEST = 'WEB_LOGIN_REQUEST';
export const WEB_LOGIN_CALLBACK = 'WEB_LOGIN_CALLBACK';

export const webLoginAction = {
  webLoginRequest: async (
    dispatch: Dispatch<Action>,
    params: WebLoginRequest
  ) => {
    dispatch({ type: 'WEB_LOGIN_REQUEST' });

    const response = await postWebLogin(params);

    dispatch({
      type: 'WEB_LOGIN_CALLBACK',
      payload: response,
    });
  },
};
