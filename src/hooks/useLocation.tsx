import {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
interface Location {
  latitude: number;
  longitude: number;
}
export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const watchId = useRef<number>();

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((res, rej) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          res(coords);
        },
        err => rej(err),
        {
          enableHighAccuracy: true,
        },
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => {
        setUserLocation({latitude, longitude});
      },
      err => console.log(err),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  };

  const stopFollowUserLocation = () => {
    if (watchId.current) Geolocation.clearWatch(watchId.current);
  };

  useEffect(() => {
    getCurrentLocation()
      .then(res => {
        setLocation(res);
        setUserLocation(res);
        setHasLocation(true);
      })
      .catch(() => setHasLocation(false));
  }, []);

  return {
    hasLocation,
    location,
    userLocation,
    followUserLocation,
    getCurrentLocation,
    stopFollowUserLocation,
  };
};
