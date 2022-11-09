import type {
  IConfigureHumanID,
  ILogIn,
  IOnCancel,
  IOnError,
  IOnSuccess,
} from './core/core.interface';
import {
  EventRegister,
  ON_CANCEL,
  ON_ERROR,
  ON_SUCCESS,
} from './core/eventManager';
import options from './core/options';
import HumanIDProvider from './core/Provider';
import Toast from './modules/Toast';

const configureHumanID: IConfigureHumanID = (params) => {
  const { clientId, clientSecret } = params;

  options.clientId = clientId;
  options.clientSecret = clientSecret;
};

const logIn: ILogIn = () => {
  HumanIDProvider.ref?.logIn();
};

const onCancel: IOnCancel = (callback) => {
  EventRegister.addEventListener(ON_CANCEL, (cancel: boolean) => {
    if (cancel) {
      callback();
    }
  });
};

const onSuccess: IOnSuccess = (callback) => {
  EventRegister.addEventListener(ON_SUCCESS, (exchangeToken: string) => {
    if (exchangeToken) {
      setTimeout(() => {
        Toast.show(
          'You’ve successfully logged in. Your data has been securely erased.',
          6000
        );
      }, 500);
      callback(exchangeToken);
    }
  });
};

const onError: IOnError = (callback) => {
  EventRegister.addEventListener(ON_ERROR, (error: string) => {
    if (error) {
      setTimeout(() => {
        Toast.show(error, 4000);
      }, 500);
      callback();
    }
  });
};

export {
  configureHumanID,
  logIn,
  onError,
  onSuccess,
  onCancel,
  HumanIDProvider,
};
