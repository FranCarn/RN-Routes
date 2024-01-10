import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {PermissionsContext} from '../context/PermissionsContext';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermission, checkLocationPermission} =
    useContext(PermissionsContext);

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
