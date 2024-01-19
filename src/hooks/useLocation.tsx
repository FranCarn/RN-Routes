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

  useEffect(() => {
    getCurrentLocation()
      .then(res => {
        setLocation(res);
        setHasLocation(true);
      })
      .catch(() => setHasLocation(false));
  }, []);

  return {location, hasLocation, getCurrentLocation};
};
