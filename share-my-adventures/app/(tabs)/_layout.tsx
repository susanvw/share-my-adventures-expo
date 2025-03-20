import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        //tabBarButton: HapticTab, // Should now type-check
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          position: Platform.select({
            ios: 'absolute',
            default: 'relative',
          }),
          borderTopColor: Colors[colorScheme ?? 'light'].icon,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <IconSymbol size={28} name="house" color={color} /> }} />
      <Tabs.Screen name="adventures" options={{ title: 'Adventures', tabBarIcon: ({ color }) => <IconSymbol size={28} name="location" color={color} /> }} />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <IconSymbol size={36} name="map" color={color} style={styles.mapIcon} />,
        }}
      />
      <Tabs.Screen name="friends" options={{ title: 'Friends', tabBarIcon: ({ color }) => <IconSymbol size={28} name="person" color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  mapIcon: {
    borderRadius: 18,
    padding: 4,
  },
});