import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const FabIcon = ({style = {}, onPress, iconName}: Props) => {
  return (
    <View style={{...(style as any)}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.blackButton}>
        <Icon name={iconName} color="white" size={35} style={{left: 1}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 100,
    height: 50,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    width: 50,
    zIndex: 999,
    elevation: 6,
  },
});
