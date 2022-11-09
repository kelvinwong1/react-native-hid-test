import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { images } from '../../themes';

function Description(): JSX.Element {
  return (
    <View style={styles.centerContent}>
      <Image style={styles.iconLock} source={images.iconLock} />
      <Text style={styles.desc}>
        Your phone number is deleted after verification
      </Text>
    </View>
  );
}

export default Description;
