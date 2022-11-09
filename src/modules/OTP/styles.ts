import { StyleSheet, Platform } from 'react-native';
import { colors, globalStyles, metrics, fonts } from '../../themes';
import { RFPercentage, RFValue } from '../../helpers';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    ...(Platform.OS === 'ios' && { marginTop: 20 }),
  },
  container: {
    width: metrics.screenWidth,
    backgroundColor: colors.white,
    height: metrics.screenHeight - 78,
  },
  title: {
    fontFamily: fonts.latoBold,
    fontSize: 18,
    textAlign: 'center',
    color: colors.gray,
  },
  description: {
    fontFamily: fonts.montserratRegular,
    fontSize: 14,
    textAlign: 'center',
    color: colors.gray,
    paddingHorizontal: 25,
  },
  descriptionBottom: {
    fontFamily: fonts.montserratRegular,
    fontSize: 14,
    textAlign: 'center',
    color: colors.gray,
  },
  phoneNumber: {
    fontFamily: fonts.montserratMedium,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 1.5,
  },
  textSpace28: {
    marginBottom: 28,
  },
  textSpace21: {
    marginBottom: 21,
  },
  resendCode: {
    fontFamily: fonts.montserratRegular,
    fontSize: 14,
    marginTop: RFValue(27.5),
    color: colors.primary,
    alignSelf: 'flex-start',
    paddingLeft: RFValue(25),
  },
  resendActivity: {
    marginTop: RFValue(27.5),
    alignSelf: 'center',
  },
  containerDescription: {
    marginTop: RFValue(85),
  },
  formContainer: {
    alignItems: 'center',
    marginTop: 44,
    marginBottom: 25,
  },
  otpView: {
    width: RFPercentage(45),
    height: 50,
    paddingHorizontal: RFValue(15),
  },
  otpFieldStyle: {
    width: RFValue(65),
    height: 50,
    ...globalStyles.otpText,
    color: colors.black,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLine,
    paddingBottom: -20,
  },
  otpHighlightStyle: {
    width: RFValue(65),
    height: 50,
    ...globalStyles.otpText,
    color: colors.black,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.primary,
    paddingBottom: -20,
  },
  containerModalLoading: {
    flexDirection: 'row',
    paddingVertical: 25,
    marginHorizontal: 40,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  textLoading: {
    ...globalStyles.normal,
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default styles;
