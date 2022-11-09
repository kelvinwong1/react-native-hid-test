import React, { useReducer, useState } from 'react';
import { Context } from '../core/Context';
import { checkClient } from '../helpers';
import useGlobalState from '../core/useGlobalState';
import rootReducer from '../models/rootReducer';
import rootState from '../models/rootState';
import type {
  LoginOTPRequest,
  LoginRequest,
  WebLoginRequest,
} from '../models/models.interface';
import { loginAction } from '../models/loginModel';
import { loginOTPAction } from '../models/loginOTPModel';
import type { IMainComponent } from '../core/core.interface';
import { webLoginAction } from '../models/webLoginModel';
import ModalLoading from './WebLogin/ModalLoading';
import WebLogin from './WebLogin';
import { EventRegister, ON_ERROR } from '../core/eventManager';
import options from '../core/options';

const MainComponent: IMainComponent = (_props, ref): React.ReactElement => {
  checkClient();

  const [state, dispatch] = useReducer(rootReducer, rootState);
  const [isLoading, setLoading] = useState(false);
  const {
    phoneNumber,
    setPhoneNumber,
    countryCode,
    setCountryCode,
    loginVisible,
    setLoginVisible,
    loginOTPVisible,
    setLoginOTPVisible,
    webLoginUrl,
    setWebLoginUrlToView,
    webLoginModalVisible,
    setWebLoginModalVisible,
    clearState,
  } = useGlobalState();

  const loginRequest = async (params: LoginRequest) => {
    await loginAction.loginRequest(dispatch, params);
  };

  const loginOTPRequest = async (params: LoginOTPRequest) => {
    await loginOTPAction.loginOTPRequest(dispatch, params);
  };

  const webLoginRequest = async (params: WebLoginRequest) => {
    await webLoginAction.webLoginRequest(dispatch, params);
  };

  const getWebLogin = async (params: WebLoginRequest) => {
    try {
      let baseUrl = 'https://api.human-id.org/v1/';
      let endPointUrl = 'mobile/users/web-login';
      setLoading(true);
      const response = await fetch(baseUrl + endPointUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'client-secret': options.clientSecret,
          'client-id': options.clientId,
        },
        body: JSON.stringify(params),
      });
      const json = await response.json();
      setLoading(false);
      if (json.data != null) {
        setWebLoginUrlToView(json.data.webLoginUrl);
        setWebLoginModalVisible(true);
      } else {
        setWebLoginModalVisible(false);
        console.error(json.message);
        EventRegister.emitEvent(ON_ERROR, json.message);
      }
    } catch (error) {
      setLoading(false);
      setWebLoginModalVisible(false);
      EventRegister.emitEvent(ON_ERROR, 'Login Failed');
    }
  };

  const resetReducer = () => {
    dispatch({
      type: 'RESET',
    });
  };

  React.useImperativeHandle(ref, () => ({
    logIn: () =>
      getWebLogin({
        lang: 'en',
      }),
  }));

  return (
    <Context.Provider
      value={{
        state,
        loginRequest,
        loginOTPRequest,
        webLoginRequest,
        resetReducer,
        phoneNumber,
        setPhoneNumber,
        countryCode,
        setCountryCode,
        loginVisible,
        setLoginVisible,
        loginOTPVisible,
        setLoginOTPVisible,
        webLoginModalVisible,
        setWebLoginModalVisible,
        webLoginUrl,
        setWebLoginUrlToView,
        clearState,
      }}
    >
      <ModalLoading visible={isLoading} />
      <WebLogin />
    </Context.Provider>
  );
};

export default React.forwardRef(MainComponent);
