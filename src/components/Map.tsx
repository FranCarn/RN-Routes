import React from 'react';
import {View} from 'react-native';
import MapView, {
  MapMarkerProps,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens';
import {FabIcon} from './FabIcon';

interface Props {
  markers?: MapMarkerProps[];
}

export const Map = ({markers}: Props) => {
  const {location, hasLocation} = useLocation();

  if (!hasLocation) return <LoadingScreen />;

  return (
    <>
      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markers?.map(item => (
          <Marker key={item.title} {...item} />
        ))}
      </MapView>
      <FabIcon
        iconName="star-outline"
        onPress={() => null}
        style={{position: 'absolute', bottom: 20, right: 20}}
      />
    </>
  );
};
