import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <Text>Map Screen</Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}>
        <Icon name="heart-outline" color="red" size={100} />
      </View>
    </View>
  );
};
