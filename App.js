import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect, Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { LogBox } from 'react-native';

import AuthStack from './src/navigation/auth';
import SplashStack from './src/navigation/splash';
import AppStack from './src/navigation/AppStack';
import store from './src/store';
import { navigationRef } from './src/navigation/NavigationService';
import { switchRoute } from './src/actions/auth';

LogBox.ignoreAllLogs();
export function App(props) {
  useEffect(() => {
    setTimeout(() => {
      props.dispatch(switchRoute())
    }, 2000);
  }, [])
  return (
    <NavigationContainer ref={navigationRef}>
      {/* <SplashStack /> */}
      {
        props.auth.isAppLoading ?
          <SplashStack />
          :
          // <AuthStack />
          (
            props.auth.accessToken ?
              <AppStack />
              :
              <AuthStack />
          )
      }
    </NavigationContainer>
  );
};

function mapStateToProps(state) {
  const { auth } = state
  return {
    auth
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}
const Switching = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default function Root() {
  return (
    <Provider store={store}>
      <Switching />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  )
}
