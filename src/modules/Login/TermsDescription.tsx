import React from 'react';
import { Text, View, Linking, Image } from 'react-native';
import styles from './styles';
import { images } from '../../themes';

function TermDescription(): JSX.Element {
  const openWeb = () => {
    Linking.openURL('https://human-id.org/#how-we-protect');
  };

  return (
    <View style={styles.containerTerms}>
      <Image
        source={images.iconInfo}
        style={styles.iconInfo}
        resizeMode="contain"
      />
      <View style={styles.containerTermsText}>
        <Text style={styles.termsText} onPress={openWeb}>
          Learn more about our
        </Text>
        <Text style={styles.termsText} onPress={openWeb}>
          mission to restore privacy
        </Text>
      </View>
    </View>
  );
}

export default TermDescription;
