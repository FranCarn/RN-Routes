import React from 'react';
import {View} from 'react-native';
import MapView, {
  MapMarkerProps,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

interface Props {
  markers?: MapMarkerProps[];
}

export const Map = ({markers}: Props) => {
  return (
    <>
      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markers?.map(item => (
          <Marker key={item.title} {...item} />
        ))}
      </MapView>
    </>
  );
};
