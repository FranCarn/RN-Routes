import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/navigator/Navigator';
import {PermissionsProvider} from './src/context/PermissionsContext';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppState>
        <MainNavigator />
      </AppState>
    </NavigationContainer>
  );
}
