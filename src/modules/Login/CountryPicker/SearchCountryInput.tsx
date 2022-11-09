import React from 'react';
import { TextInput, View, Image, TouchableWithoutFeedback } from 'react-native';
import { images, colors } from '../../../themes';
import styles from '../styles';
import type { SearchCountryInputProps } from '../Login.interface';

function SearchCountryInput(props: SearchCountryInputProps): JSX.Element {
  const { onChangeText, onCancel } = props;

  return (
    <View style={styles.containertxInputSearchCountry}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <Image source={images.iconClose} style={styles.iconClose} />
      </TouchableWithoutFeedback>
      <TextInput
        placeholder="Search Country"
        style={styles.txInputCountrySearch}
        onChangeText={onChangeText}
        placeholderTextColor={colors.placeholder}
      />
    </View>
  );
}

export default SearchCountryInput;
