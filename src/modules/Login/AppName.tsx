import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

function AppName(): JSX.Element {
  return (
    <>
      <Text style={styles.appNameBold} textBreakStrategy="balanced">
        HumanId will not receive any
      </Text>
      <Text style={styles.appNameRegular} textBreakStrategy="balanced">
        of your personal information.
      </Text>
    </>
  );
}

export default AppName;
