import React, { useContext, useEffect, useRef, useState } from 'react';
import OTPInputView from './OTPInput';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Context } from '../../core/Context';
import { getDialCode, otpTimerFormat } from '../../helpers';
import { getDeviceId } from 'react-native-device-info';
import { EventRegister, ON_SUCCESS } from '../../core/eventManager';
import { colors } from '../../themes';

function Form(): JSX.Element {
  const {
    state,
    loginRequest,
    loginOTPRequest,
    phoneNumber,
    countryCode,
    clearState,
    resetReducer,
  } = useContext(Context);

  const otpRef = useRef<OTPInputView>(null);

  const timerRef = useRef<NodeJS.Timeout>();

  const [timer, setTimer] = useState(
    state.loginOTPPayload?.data?.config?.nextResendDelay ?? 60
  );

  const clearTimer = () => clearTimeout(timerRef.current!);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      return;
    }

    function countdown() {
      setTimer(timer - 1);
    }

    timerRef.current = setTimeout(countdown, 1000);

    return () => clearTimer();
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      setTimer(state.loginOTPPayload?.data?.config?.nextResendDelay ?? 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loginOTPPayload]);

  useEffect(() => {
    if (state.loginPayload?.success) {
      const { exchangeToken } = state.loginPayload.data;
      EventRegister.emitEvent(ON_SUCCESS, exchangeToken);
      clearState();
      resetReducer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loginPayload]);

  const handleOnCodeFilled = (code: string) => {
    loginRequest({
      phone: phoneNumber,
      countryCode: getDialCode(countryCode),
      verificationCode: code,
      deviceId: getDeviceId(),
    });
  };

  const handleResendCode = () => {
    loginOTPRequest({
      phone: phoneNumber,
      countryCode: getDialCode(countryCode),
    });
  };

  return (
    <View style={styles.formContainer}>
      <OTPInputView
        ref={otpRef}
        pinCount={4}
        style={styles.otpView}
        codeInputFieldStyle={styles.otpFieldStyle}
        codeInputHighlightStyle={styles.otpHighlightStyle}
        keyboardType="phone-pad"
        autoFocusOnLoad={true}
        onCodeFilled={handleOnCodeFilled}
        editable={!state.loginFetching}
      />
      {state.loginOTPFetching ? (
        <ActivityIndicator
          style={styles.resendActivity}
          size="small"
          color={colors.primary}
        />
      ) : (
        <Text
          style={styles.resendCode}
          onPress={timer === 0 ? handleResendCode : () => null}
        >
          {timer !== 0
            ? `Resend code in ${otpTimerFormat(timer)}`
            : 'Click here to resend code'}
        </Text>
      )}
    </View>
  );
}

export default Form;
