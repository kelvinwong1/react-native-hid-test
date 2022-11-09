import React, { useContext } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import Header from '../Header';
import styles from './styles';
import Description from './Description';
import Form from './Form';
import ModalLoading from './ModalLoading';
import { Context } from '../../core/Context';

function OTP(): JSX.Element {
  const { loginOTPVisible, setLoginOTPVisible, state } = useContext(Context);

  const hideSelf = () => {
    setLoginOTPVisible(false);
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={loginOTPVisible}
      backdropOpacity={0}
      animationIn={Platform.OS === 'ios' ? 'slideInRight' : 'slideInUp'}
      onBackdropPress={hideSelf}
      onBackButtonPress={hideSelf}
      swipeThreshold={200}
      swipeDirection={['right']}
      onSwipeComplete={hideSelf}
      coverScreen={true}
    >
      <ScrollView>
        <Header />
        <View style={styles.container}>
          <Description />
          <Form />
        </View>
        <ModalLoading visible={state.loginFetching} />
      </ScrollView>
    </Modal>
  );
}

export default OTP;
