import React, { useContext, useState } from 'react';
import { View, Platform } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import ModalLoading from './ModalLoading';
import { Context } from '../../core/Context';
import WebView from 'react-native-webview';
import {
  EventRegister,
  ON_CANCEL,
  ON_ERROR,
  ON_SUCCESS,
} from '../../core/eventManager';

function WebLogin(): JSX.Element {
  const {
    webLoginModalVisible,
    setWebLoginModalVisible,
    clearState,
    resetReducer,
    webLoginUrl,
  } = useContext(Context);

  const handleOnCancel = () => {
    EventRegister.emitEvent(ON_CANCEL, true);
    resetReducer();
    clearState();
  };

  const [isLoading, setLoading] = useState(true);

  const handleEventFromWebLogin = (url: string) => {
    console.debug(url);
    if (url.includes('/error')) {
      EventRegister.emitEvent(ON_ERROR, 'Login Failed');
      setWebLoginModalVisible(false);
    }
    if (url.includes('/success')) {
      let exchangeToken = url.split('et=')[1];
      EventRegister.emitEvent(ON_SUCCESS, exchangeToken);
      setWebLoginModalVisible(false);
    }
    if (url.includes('code=500')) {
      EventRegister.emitEvent(ON_ERROR, url);
      setWebLoginModalVisible(false);
    }
  };

  return (
    <>
      <Modal
        style={styles.modal}
        isVisible={webLoginModalVisible}
        backdropOpacity={0}
        animationIn={Platform.OS === 'ios' ? 'slideInRight' : 'slideInUp'}
        onBackdropPress={handleOnCancel}
        onBackButtonPress={handleOnCancel}
        swipeThreshold={200}
        coverScreen={true}
      >
        <View style={styles.container}>
          <WebView
            source={{ uri: webLoginUrl }}
            onLoadStart={() => {
              setLoading(true);
            }}
            onLoadEnd={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              handleEventFromWebLogin(nativeEvent.url);
              setLoading(false);
            }}
          />
          <ModalLoading visible={isLoading} />
        </View>
      </Modal>
    </>
  );
}

export default WebLogin;
