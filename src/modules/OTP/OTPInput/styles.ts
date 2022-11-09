import { StyleSheet } from 'react-native';
import { colors } from '../../../themes';

const styles = StyleSheet.create({
  defaultTextFieldStyle: {
    width: 45,
    height: 45,
    borderColor: 'rgba(226, 226, 226, 1)',
    borderWidth: 0.5,
    borderRadius: 2,
    textAlign: 'center',
    color: colors.borderLine,
  },
  containerTextField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
