import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Context } from '../../core/Context';
import { formatPhoneInternational } from '../../helpers';

function Description(): JSX.Element {
  const { phoneNumber, countryCode } = useContext(Context);

  return (
    <View style={styles.containerDescription}>
      <Text style={[styles.title, styles.textSpace28]}>
        Verify Your Phone Number
      </Text>
      <Text style={styles.description}>Please enter the 4-digit code you</Text>
      <Text style={styles.description}>received as SMS to</Text>
      <Text style={[styles.phoneNumber, styles.textSpace21]}>
        {formatPhoneInternational({
          country_code: countryCode,
          national_number: phoneNumber,
        })}
      </Text>
      <Text style={styles.descriptionBottom}>
        After successful verification, your number will be
      </Text>
      <Text style={styles.descriptionBottom}>
        deleted permanently. Only a random identifier
      </Text>
      <Text style={[styles.descriptionBottom]}>will be stored.</Text>
    </View>
  );
}

export default Description;
