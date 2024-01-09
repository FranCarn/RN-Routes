import React, {createContext, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';

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

    setPermissions(prev => ({...prev, locationStatus: permisionStatus}));
  };

  const checkLocationPermission = () => {};

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
