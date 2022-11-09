import type { State } from './models.interface';

const rootState: State = {
  loginFetching: false,
  loginPayload: null,
  loginOTPFetching: false,
  loginOTPPayload: null,
  webLoginFetching: false,
  webLoginPayload: null,
};

export default rootState;
