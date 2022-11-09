/* eslint-disable prettier/prettier */
import React from 'react';
import type {UseGlobalState} from './core.interface';
import type {FlagType} from '../modules/Login/Login.interface';

function useGlobalState(): UseGlobalState {
  const [phoneNumber, handlePhoneNumber] = React.useState('');
  const [countryCode, handleCountryCode] = React.useState<FlagType>('us');
  const [loginVisible, handleLoginVisible] = React.useState(false);
  const [loginOTPVisible, handleLoginOTPVisible] = React.useState(false);
  const [webLoginModalVisible, handleWebLoginVisible] = React.useState(false);
  const [webLoginUrl, setWebLoginUrl] = React.useState('');

  const clearState = () => {
    setTimeout(() => {
      handleLoginVisible(false);
      handlePhoneNumber('');
      handleWebLoginVisible(false);
      setWebLoginUrl('');
      handleWebLoginVisible(false)
      setWebLoginUrl('')
    }, 0);

    setTimeout(() => {
      handleCountryCode('us');
      handleLoginOTPVisible(false);
    }, 500);
  };

  const setPhoneNumber = (number: string) => {
    handlePhoneNumber(number);
  };

  const setCountryCode = (country: FlagType) => {
    handleCountryCode(country);
  };

  const setLoginVisible = (visible: boolean) => {
    handleLoginVisible(visible);
  };

  const setLoginOTPVisible = (visible: boolean) => {
    handleLoginOTPVisible(visible);
  };

  const setWebLoginModalVisible = (visible: boolean) => {
    handleWebLoginVisible(visible);
  };

  const setWebLoginUrlToView = (url: string) => {
    setWebLoginUrl(url);
  };

  return {
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
  };
}

export default useGlobalState;
