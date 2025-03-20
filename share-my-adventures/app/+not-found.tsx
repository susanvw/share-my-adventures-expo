import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <>
      <Stack.Screen options={{ title: '404 - Not Found' }} />
      <ThemedView style={[styles.container, { backgroundColor }]}>
        {/* Optional Rocket Decoration - Uncomment and add your image asset */}
        {/* <Image
          source={require('../assets/images/rocket.png')}
          style={styles.rocket}
        /> */}
        <ThemedText style={[styles.errorCode, { color: primaryColor }]}>
          404
        </ThemedText>
        <ThemedText style={[styles.title, { color: textColor }]}>
          Page Not Found
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: textColor }]}>
          The page you are looking for doesn’t exist or has been moved.
        </ThemedText>
        <Link href="/(tabs)" asChild>
          <TouchableOpacity style={[styles.button, { backgroundColor: primaryColor }]}>
            <ThemedText style={styles.buttonText}>Back to Home</ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  rocket: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 50,
    resizeMode: 'contain',
  },
  errorCode: {
    fontSize: 120,
    fontWeight: 'bold',
    lineHeight: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    opacity: 0.8,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // White text on primary button
  },
});