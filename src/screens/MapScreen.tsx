import React from 'react';
import {View} from 'react-native';
import {Map} from '../components/Map';

export const MapScreen = () => {
  return (
    <View
      style={{
        backgroundColor: '#2a2a2a',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Map />
    </View>
  );
};
