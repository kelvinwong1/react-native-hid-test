import React from 'react';
import { Text } from 'react-native';
import styles from '../styles';

function CountryPickerEmpty(): JSX.Element {
  return <Text style={styles.textCountryNotFound}>Country not found</Text>;
}

export default CountryPickerEmpty;
