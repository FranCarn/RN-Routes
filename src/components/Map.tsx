import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import MapView, {
  MapMarkerProps,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens';
import {FabIcon} from './FabIcon';

interface Props {
  markers?: MapMarkerProps[];
}

export const Map = ({markers}: Props) => {
  const {
    hasLocation,
    location,
    routeLines,
    userLocation,
    followUserLocation,
    getCurrentLocation,
    stopFollowUserLocation,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  const [showPolyline, setShowPolyline] = useState<boolean>(false);

  if (!hasLocation) return <LoadingScreen />;

  const centerPosition = async () => {
    const location = await getCurrentLocation();
    following.current = true;
    mapViewRef.current?.animateCamera({
      center: location,
    });
  };

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;
    mapViewRef.current?.animateCamera({
      center: userLocation,
    });
  }, [userLocation]);

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
        }}
        onTouchStart={() => (following.current = false)}>
        {markers?.map(item => (
          <Marker key={item.title} {...item} />
        ))}
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
      </MapView>
      <FabIcon
        iconName="compass-outline"
        onPress={centerPosition}
        style={{position: 'absolute', bottom: 20, right: 20}}
      />
      <FabIcon
        iconName="brush-outline"
        onPress={() => setShowPolyline(prev => !prev)}
        style={{position: 'absolute', bottom: 80, right: 20}}
      />
    </>
  );
};
