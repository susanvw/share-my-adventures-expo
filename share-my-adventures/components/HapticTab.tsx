import React from 'react';
import { TouchableOpacity, Vibration } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export const HapticTab = ({ children, onPress, ...rest }: BottomTabBarButtonProps) => {
  // const handlePress = (e: React.PointerEvent<HTMLButtonElement>) => {
  //   Vibration.vibrate(10); // Haptic feedback
  //   if (onPress) onPress(e);
  // };

  return (
    <TouchableOpacity {...rest}>
      {children}
    </TouchableOpacity>
  );
};