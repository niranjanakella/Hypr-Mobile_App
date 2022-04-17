import {ScaleFromCenterAndroid} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import {StyleSheet, Platform, Dimensions, StatusBar} from 'react-native';

import constants from '../../constants';
import Fonts from '../../constants/Fonts';
import {ScaledSheet} from 'react-native-size-matters';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height, width} = Dimensions.get('window');

export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

export const STATUSBAR_HEIGHT = Platform.select({
  ios: isIPhoneX() ? 34 : 0, //44 & 20
  android: 0, //StatusBar.currentHeight
  default: 0,
});

const iPhoneX = Dimensions.get('window').height >= 812;

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.Colors.white,
  },
  secondryContainer: {
    flex: 1,
    backgroundColor: constants.Colors.white,
  },
  dataContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: constants.vh(10),
  },
  loginText: {
    fontSize: '30@s',
    fontWeight: 'bold',
    marginTop: constants.vh(1),
    color: constants.Colors.blue_primary,
    fontFamily: Fonts.GothamBold,
  },
  inputContainer: {
    marginTop: constants.vh(20),
    width: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: constants.vh(20),
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginTop: constants.vh(30),
  },
  signupTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: constants.vh(10),
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    color: constants.Colors.linkText,
  },
  smallText: {
    fontSize: 14,
    fontWeight: '500',
    color: constants.Colors.placeholder,
  },
});
