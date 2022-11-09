import { StyleSheet, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { colors, globalStyles, metrics, fonts } from '../../themes';
import { RFValue, RFPercentage } from '../../helpers';

const styles = StyleSheet.create({
  appNameBold: {
    marginTop: RFValue(22),
    marginBottom: RFValue(2.5),
    fontFamily: fonts.latoBold,
    fontSize: 18,
    color: colors.gray,
    textAlign: 'center',
  },
  appNameRegular: {
    fontFamily: fonts.latoRegular,
    fontSize: 18,
    color: colors.gray,
    textAlign: 'center',
  },
  modal: {
    margin: 0,
    zIndex: 1,
    ...(Platform.OS === 'ios' && { marginTop: 20 }),
  },
  container: {
    ...globalStyles.container,
    flex: 1,
    height: metrics.screenHeight - 78,
    paddingHorizontal: 30,
  },
  containerModal: {
    backgroundColor: colors.graySmooth,
    marginHorizontal: 15,
    height: metrics.screenHeight / 1.5,
    borderRadius: 6,
  },
  modalCountryPicker: {
    backgroundColor: colors.white,
    width: metrics.screenWidth,
    height: metrics.screenHeight,
    margin: 0,
    ...(Platform.OS === 'ios' && { paddingTop: 10 }),
    justifyContent: 'flex-start',
  },
  content: {
    alignItems: 'center',
  },
  containerTerms: {
    marginLeft: -10,
    flexDirection: 'row',
  },
  illustration: {
    width: RFValue(120),
    height: RFValue(120),
    ...(isIphoneX() && { marginTop: 25 }),
  },
  desc: {
    fontFamily: fonts.montserratRegular,
    fontSize: 13,
    color: colors.gray,
    alignSelf: 'center',
  },
  textSpace: {
    marginVertical: 10,
  },
  termsText: {
    fontFamily: fonts.montserratRegular,
    fontSize: 12,
    color: colors.primaryLight,
  },
  learnMoreText: {
    ...globalStyles.descriptionBold,
    color: colors.gray,
    textAlign: 'center',
    paddingVertical: 15,
    textDecorationLine: 'underline',
  },
  btnCancel: {
    ...globalStyles.normal,
    color: colors.gray,
    marginTop: RFValue(30),
  },
  containerForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
    marginTop: 25,
    marginBottom: 45,
  },
  textInput: {
    width: '65%',
    height: '100%',
    marginHorizontal: 5,
    paddingBottom: 5,
    ...(Platform.OS === 'android' && { marginTop: -4.5 }),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLine,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: fonts.latoRegular,
  },
  phoneOnTyping: {
    fontFamily: fonts.latoRegular,
    fontSize: 14,
    color: colors.gray,
  },
  placeholder: {
    color: colors.placeholder,
    fontSize: 14,
    fontFamily: fonts.latoRegular,
  },
  btnContainer: {
    height: 35,
    width: 80,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  btnEnter: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  btnEnterDisabled: {
    backgroundColor: colors.disabled,
    justifyContent: 'center',
  },
  btnEnterText: {
    fontFamily: fonts.latoRegular,
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.white,
  },
  btnEnterTextDisabled: {
    fontFamily: fonts.latoRegular,
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.borderLine,
  },
  centerContent: {
    flexDirection: 'row',
    ...(Platform.OS === 'ios' && { width: metrics.screenWidth }),
    ...(Platform.OS === 'ios' && { paddingLeft: RFValue(20) }),
    marginTop: RFValue(50),
  },
  keyboardAvoid: {
    flex: 1,
  },
  iconFlag: {
    resizeMode: 'cover',
    width: 20,
    height: 14,
  },
  countryText: {
    fontFamily: fonts.latoRegular,
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  countryCodeText: {
    fontFamily: fonts.latoBold,
    fontSize: 14,
    color: colors.gray,
  },
  itemFlag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingVertical: 15,
  },
  separator: {
    height: 1,
    backgroundColor: colors.graySmooth,
  },
  placeholderCountryCode: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.gray,
    marginLeft: 5,
  },
  containerInputCountryCode: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.borderLine,
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    bottom: 0.2,
  },
  btnCancelCountryPicker: {
    textAlign: 'center',
    backgroundColor: colors.graySmooth,
    borderRadius: 6,
    paddingVertical: 15,
    marginHorizontal: 15,
    marginVertical: 25,
    ...globalStyles.title,
  },
  txInputCountrySearch: {
    flex: 1,
    backgroundColor: colors.graySmooth,
    borderRadius: 6,
    marginTop: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginHorizontal: 15,
    ...(Platform.OS === 'ios' && { height: 35 }),
    ...globalStyles.normal,
  },
  arrowDown: {
    alignSelf: 'center',
    width: 15,
    height: 15,
    marginLeft: 10,
  },
  containerIconAppName: {
    marginTop: RFValue(37),
    alignItems: 'center',
  },
  iconLock: {
    width: RFValue(20),
    height: RFValue(20),
    marginRight: 5,
    alignSelf: 'center',
  },
  iconInfo: {
    marginRight: 7.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  containerTermsText: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  textCountryNotFound: {
    ...globalStyles.description,
    marginTop: RFPercentage(5),
    alignSelf: 'center',
  },
  containertxInputSearchCountry: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  iconClose: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    alignSelf: 'center',
    marginTop: 7.5,
  },
});

export default styles;
