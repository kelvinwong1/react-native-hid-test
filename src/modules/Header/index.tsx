import React from 'react';
import { View, Text, Image } from 'react-native';
import { images } from '../../themes';
import styles from './styles';

function Header(): JSX.Element {
  return (
    <View style={styles.header}>
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={images.logoWhite}
      />
      <Text style={styles.text}>Anonymous Login with</Text>
      <Image
        resizeMode="cover"
        style={styles.logoText}
        source={images.logoTextWhite}
      />
    </View>
  );
}

export default Header;
