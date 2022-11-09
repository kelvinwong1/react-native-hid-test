import { Platform, StatusBar, Dimensions } from 'react-native';
import options from './core/options';
import type { Countries, FlagType } from './modules/Login/Login.interface';
import { isIphoneX } from 'react-native-iphone-x-helper';

const countries: Countries = require('../assets/json/countries.json');

export function checkClient() {
  if (
    options.clientId === null ||
    !options.clientId?.length ||
    options.clientSecret === null ||
    !options.clientSecret?.length
  ) {
    throw new Error(
      'ClientId and ClientSecret must filled! get the appId and appSecret by dropping us an email developers@human-id.org.'
    );
  }
}

export function getDialCode(countryCode: FlagType) {
  return countries[countryCode]?.dialCode;
}

export function getCountry(countryCode: FlagType) {
  return countries[countryCode];
}

export function formatPhoneInternational(numberProto: {
  country_code: string;
  national_number: string;
}): string | null {
  if (!numberProto?.country_code || !numberProto?.national_number) return null;

  const { country_code, national_number } = numberProto;

  const PNF = require('google-libphonenumber').PhoneNumberFormat;
  const phoneNumberLib = require('google-libphonenumber');
  const phoneUtil = phoneNumberLib.PhoneNumberUtil.getInstance();

  const number = phoneUtil.parseAndKeepRawInput(national_number, country_code);

  /**
   * E164: 0,
   * INTERNATIONAL: 1,
   * NATIONAL: 2,
   * RFC3966: 3
   */
  return phoneUtil.format(number, PNF.INTERNATIONAL).replace(/-/g, ' ');
}

const { height, width } = Dimensions.get('window');
const standardLength = width > height ? width : height;

const offset =
  width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

const deviceHeight =
  Platform.OS === 'android' || isIphoneX()
    ? standardLength - offset!
    : standardLength;

export function RFPercentage(percent: number) {
  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
}

// guideline height for standard 5" device screen is 680
export function RFValue(fontSize: number, standardScreenHeight = 720) {
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

export function otpTimerFormat(duration: number) {
  // Hours, minutes and seconds
  let hrs = duration / 3600;
  let mins = (duration % 3600) / 60;
  let secs = duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;

  return ret;
}
