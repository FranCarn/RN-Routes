import {useEffect, useState} from 'react';
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
    Geolocation.watchPosition(
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
    location,
    hasLocation,
    userLocation,
    getCurrentLocation,
    followUserLocation,
  };
};
