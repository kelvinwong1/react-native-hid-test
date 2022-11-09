import React from 'react';
import rootState from '../models/rootState';
import type {
  LoginOTPRequest,
  LoginRequest,
  State,
  WebLoginRequest,
} from '../models/models.interface';
import type { UseGlobalState } from './core.interface';

interface Context extends UseGlobalState {
  state: State;
  webLoginRequest: (params: WebLoginRequest) => void;
  loginRequest: (params: LoginRequest) => void;
  loginOTPRequest: (params: LoginOTPRequest) => void;
  resetReducer: () => void;
}

const Context = React.createContext<Context>({
  state: rootState,
  webLoginRequest: () => {},
  loginRequest: () => {},
  loginOTPRequest: () => {},
  phoneNumber: '',
  setPhoneNumber: () => {},
  countryCode: 'us',
  setCountryCode: () => {},
  loginVisible: false,
  setLoginVisible: () => {},
  loginOTPVisible: false,
  setLoginOTPVisible: () => {},
  webLoginModalVisible: false,
  setWebLoginModalVisible: () => {},
  webLoginUrl: '',
  setWebLoginUrlToView: () => {},
  clearState: () => {},
  resetReducer: () => {},
});

export { Context };
