import React, {createContext, useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {
  PERMISSIONS,
  PermissionStatus,
  check,
  request,
  openSettings,
} from 'react-native-permissions';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [permissions, setPermissions] =
    useState<PermissionsState>(permissionInitState);

  const askLocationPermission = async () => {
    let permisionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permisionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permisionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    if (permisionStatus === 'blocked') {
      openSettings();
    }
    setPermissions(prev => ({...prev, locationStatus: permisionStatus}));
  };

  const checkLocationPermission = async () => {
    let permisionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permisionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permisionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    setPermissions(prev => ({...prev, locationStatus: permisionStatus}));
  };

  useEffect(() => {
    checkLocationPermission();
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;
      checkLocationPermission();
    });
  }, []);

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
