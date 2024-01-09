import React, {useContext} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import {PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';
import {PermissionsContext} from '../context/PermissionsContext';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text>PermissionsScreen</Text>
      <Button title="Allow" onPress={askLocationPermission} />
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
