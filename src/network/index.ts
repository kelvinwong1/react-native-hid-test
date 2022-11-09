/* eslint-disable prettier/prettier */
import type {
  LoginOTPRequest,
  LoginResponse,
  LoginRequest,
  LoginOTPResponse,
  WebLoginRequest, WebLoginResponse
} from '../models/models.interface';
import type {NetworkResponse} from './network.interface';
import xhr from './xhr';
import {EventRegister, ON_ERROR} from '../core/eventManager';

const defaultError = (e: string): NetworkResponse => ({
  success: false,
  code: 'FAILURE',
  message: `Something wrong while requesting network ${e}`,
  data: null
});

const catchErrorMessage = (e: any) => {
  return e?.message || e;
};

const catchErrorMessageRequestOTP = (e: any) => {
  if (e?.code !== '401') return 'Unable to request otp at this time. Please try again later';

  return e?.message || e;
};

export async function postLoginOTP(
  params: LoginOTPRequest
): Promise<NetworkResponse<LoginOTPResponse>> {
  try {
    const response = await xhr<LoginOTPRequest, LoginOTPResponse>(
      '/users/login/request-otp',
      params
    );

    return {...response};
  } catch (e) {
    EventRegister.emitEvent(ON_ERROR, catchErrorMessageRequestOTP(e));
    return defaultError(catchErrorMessageRequestOTP(e));
  }
}

export async function postLogin(
  params: LoginRequest
): Promise<NetworkResponse<LoginResponse>> {
  try {
    const response = await xhr<LoginRequest, LoginResponse>(
      '/users/login',
      params
    );

    return {...response};
  } catch (e) {
    EventRegister.emitEvent(ON_ERROR, catchErrorMessage(e));
    return defaultError((catchErrorMessage(e)));
  }
}


export async function postWebLogin(
    params: WebLoginRequest,
): Promise<NetworkResponse<WebLoginResponse>> {
  try {
    const response = await xhr<WebLoginRequest, WebLoginResponse>(
        '/users/web-login',
        params,
    );

    return {...response};
  } catch (e) {
    EventRegister.emitEvent(ON_ERROR, catchErrorMessage(e));
    return defaultError(catchErrorMessage(e));
  }
}

