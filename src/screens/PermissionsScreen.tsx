import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PermissionsContext} from '../context/PermissionsContext';
import {BlackButton} from '../components/BlackButton';

export const PermissionsScreen = () => {
  const {askLocationPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        The use of GPS is necessary to use this application
      </Text>
      <BlackButton title="Allow" onPress={askLocationPermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
