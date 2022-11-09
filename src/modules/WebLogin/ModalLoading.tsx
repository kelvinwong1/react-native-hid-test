import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import type { ModalLoadingProps } from './WebLogin.interface';
import { colors } from '../../themes';
import styles from './styles';

function ModalLoading(props: ModalLoadingProps): JSX.Element {
  const { visible } = props;

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={0.5}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.containerModalLoading}>
        <ActivityIndicator size="large" color={colors.black} />
        <Text style={styles.textLoading}>Loading...</Text>
      </View>
    </Modal>
  );
}

export default ModalLoading;
