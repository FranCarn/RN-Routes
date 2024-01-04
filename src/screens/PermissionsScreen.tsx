import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import {PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';

export const PermissionsScreen = () => {
  const checkLocationPermission = async () => {
    let permisionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permisionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permisionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    console.log(permisionStatus);
  };

  return (
    <View style={styles.container}>
      <Text>PermissionsScreen</Text>
      <Button title="Allow" onPress={checkLocationPermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
