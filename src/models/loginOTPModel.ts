import { postLoginOTP } from '../network';
import type { Action, LoginOTPRequest } from './models.interface';
import type { Dispatch } from 'react';

export const LOGIN_OTP_REQUEST = 'LOGIN_OTP_REQUEST';
export const LOGIN_OTP_CALLBACK = 'LOGIN_OTP_CALLBACK';

export const loginOTPAction = {
  loginOTPRequest: async (
    dispatch: Dispatch<Action>,
    params: LoginOTPRequest
  ) => {
    dispatch({ type: 'LOGIN_OTP_REQUEST' });

    const response = await postLoginOTP(params);

    dispatch({
      type: 'LOGIN_OTP_CALLBACK',
      payload: response,
    });
  },
};
