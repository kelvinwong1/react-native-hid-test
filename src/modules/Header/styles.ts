import { StyleSheet } from 'react-native';
import { colors, globalStyles } from '../../themes';
import { RFValue } from '../../helpers';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(10),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: RFValue(29),
    height: RFValue(32),
    marginHorizontal: RFValue(10),
  },
  logoText: {
    width: RFValue(80),
    height: RFValue(28),
    marginHorizontal: RFValue(7.5),
    marginTop: RFValue(-1),
  },
  text: {
    ...globalStyles.headerTitle,
    color: colors.white,
  },
});

export default styles;
