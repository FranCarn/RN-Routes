import React, {useRef} from 'react';
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
  const {location, hasLocation, getCurrentLocation} = useLocation();
  const mapViewRef = useRef<MapView>();
  if (!hasLocation) return <LoadingScreen />;

  const centerPosition = async () => {
    const location = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: location,
    });
  };

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
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
        iconName="compass-outline"
        onPress={centerPosition}
        style={{position: 'absolute', bottom: 20, right: 20}}
      />
    </>
  );
};
