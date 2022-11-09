import type { NetworkResponse } from '../network/network.interface';

export interface State {
  loginPayload: NetworkResponse<LoginResponse> | null;
  loginFetching: boolean;
  loginOTPPayload: NetworkResponse<LoginOTPResponse> | null;
  loginOTPFetching: boolean;
  webLoginPayload: NetworkResponse<WebLoginResponse> | null;
  webLoginFetching: boolean;
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type LoginActionType = {
  LOGIN_REQUEST: undefined;
  LOGIN_CALLBACK: NetworkResponse<LoginResponse>;
};

export type LoginAction =
  ActionMap<LoginActionType>[keyof ActionMap<LoginActionType>];

export type LoginOTPActionType = {
  LOGIN_OTP_REQUEST: undefined;
  LOGIN_OTP_CALLBACK: NetworkResponse<LoginOTPResponse>;
};

export type LoginOTPAction =
  ActionMap<LoginOTPActionType>[keyof ActionMap<LoginOTPActionType>];

export type ResetActionType = {
  RESET: undefined;
};

export type ResetAction =
  ActionMap<ResetActionType>[keyof ActionMap<ResetActionType>];

export interface LoginRequest {
  countryCode: string;
  phone: string;
  deviceId: string;
  verificationCode: string;
  notifId?: 'NONE';
}

export interface LoginOTPRequest {
  countryCode: string;
  phone: string;
}

export interface LoginResponse {
  exchangeToken: string;
}

export interface LoginOTPResponse {
  requestId: string;
  nextResendAt: number;
  failAttemptCount: number;
  otpCount: number;
  config: {
    otpSessionLifetime: number;
    otpCountLimit: number;
    failAttemptLimit: number;
    nextResendDelay: number;
    otpCodeLength: number;
  };
}

export type WebLoginActionType = {
  WEB_LOGIN_REQUEST: undefined;
  WEB_LOGIN_CALLBACK: NetworkResponse<WebLoginResponse>;
};

export type WebLoginAction =
  ActionMap<WebLoginActionType>[keyof ActionMap<WebLoginActionType>];

export interface WebLoginRequest {
  lang: string;
}

export interface WebLoginResponse {
  webLoginURL: string;
}

export type Action =
  | LoginOTPAction
  | LoginAction
  | ResetAction
  | WebLoginAction;
