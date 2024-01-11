import {createStackNavigator} from '@react-navigation/stack';
import {LoadingScreen, MapScreen, PermissionsScreen} from '../screens';
import {useContext} from 'react';
import {PermissionsContext} from '../context/PermissionsContext';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const {
    permissions: {locationStatus},
  } = useContext(PermissionsContext);

  if (locationStatus === 'unavailable') return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#2a2a2a',
        },
      }}>
      {locationStatus === 'granted' ? (
        <Stack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};
