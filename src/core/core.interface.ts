import type { FlagType } from '../modules/Login/Login.interface';

export interface UseGlobalState {
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  countryCode: FlagType;
  setCountryCode: (code: FlagType) => void;
  loginVisible: boolean;
  setLoginVisible: (visible: boolean) => void;
  loginOTPVisible: boolean;
  setLoginOTPVisible: (visible: boolean) => void;
  webLoginModalVisible: boolean;
  setWebLoginModalVisible: (visible: boolean) => void;
  webLoginUrl: string;
  setWebLoginUrlToView: (url: string) => void;
  clearState: () => void;
}

import type React from 'react';

export interface ConfigureParams {
  clientId: string;
  clientSecret: string;
}

export interface Options {
  clientId: string;
  clientSecret: string;
}

type onCancelCallback = () => void;

type onErrorCallback = () => void;

type onSuccessCallback = (exchangeToken: string) => void;

export interface MainComponentRef {
  logIn: () => void;
}

export interface MainComponentProps {
  ref: (ref: MainComponentRef) => void;
}

export type IMainComponent = React.ForwardRefRenderFunction<
  MainComponentRef,
  MainComponentProps
>;

export type IHumanIDProvider = React.FunctionComponent & {
  ref: MainComponentRef | null;
};

export type IConfigureHumanID = (options: ConfigureParams) => void;

export type ILogIn = () => void;

export type IOnCancel = (callback: onCancelCallback) => void;

export type IOnError = (callback: onErrorCallback) => void;

export type IOnSuccess = (callback: onSuccessCallback) => void;
