import React, { useContext } from 'react';
import { View, ScrollView, Platform, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import OTP from '../OTP';
import Header from '../Header';
import Logo from './Logo';
import Description from './Description';
import TermsDescription from './TermsDescription';
import styles from './styles';
import { colors } from '../../themes';
import Form from './Form';
import { Context } from '../../core/Context';
import { EventRegister, ON_CANCEL } from '../../core/eventManager';

function Login(): JSX.Element {
  const { loginVisible, clearState, resetReducer } = useContext(Context);

  const handleOnCancel = () => {
    EventRegister.emitEvent(ON_CANCEL, true);
    resetReducer();
    clearState();
  };

  return (
    <>
      <Modal
        animationInTiming={200}
        animationOutTiming={200}
        animationOut="fadeOut"
        animationIn={Platform.OS === 'ios' ? 'slideInRight' : 'slideInUp'}
        propagateSwipe={true}
        swipeThreshold={200}
        swipeDirection={['right']}
        onSwipeComplete={handleOnCancel}
        isVisible={loginVisible}
        onBackButtonPress={handleOnCancel}
        backdropOpacity={1}
        backdropColor={colors.white}
        style={styles.modal}
        coverScreen={true}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBar barStyle="dark-content" />
          <Header />
          <View style={styles.container}>
            <Logo />
            <View style={styles.content}>
              <Description />
              <Form />
              <TermsDescription />
            </View>
          </View>
        </ScrollView>
        <OTP />
      </Modal>
    </>
  );
}

export default Login;
