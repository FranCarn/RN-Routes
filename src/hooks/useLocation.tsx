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

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setLocation(coords);
        setHasLocation(true);
      },
      err => setHasLocation(false),
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  return {location, hasLocation};
};
