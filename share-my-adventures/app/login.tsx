import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { useUser } from '@/src/contexts/UserContext';
import AuthenticateService from '@/src/services/AuthenticateService';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from './LoginStyles';

export default function LoginScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const router = useRouter();
  const { setUser } = useUser();
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async () => {
    const response = await AuthenticateService.authenticate({ username: email, password });
    if (response.succeeded && response.data) {
      setUser(response.data);
      router.replace('/(tabs)');
    } else {
      alert('Login failed: ' + (response.errors?.join(', ') || 'Unknown error'));
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.form}>
        <Text style={[styles.title, { color: textColor }]}>Welcome</Text>
        <View style={styles.formItem}>
          <Text style={[styles.label, { color: textColor }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: textColor,
                borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32',
              },
              emailFocused && { borderColor: Colors[colorScheme ?? 'light'].secondary },
            ]}
            placeholder="Enter email"
            placeholderTextColor="#767577"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={[styles.label, { color: textColor }]}>Password</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: textColor,
                borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32',
              },
              passwordFocused && { borderColor: Colors[colorScheme ?? 'light'].secondary },
            ]}
            placeholder="Enter password"
            placeholderTextColor="#767577"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </View>
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => router.push('/forgot-password')}
        >
          <IconSymbol name="hand" size={16} color={primaryColor} />
          <Text style={[styles.linkText, { color: primaryColor, marginLeft: 5 }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.authButton, { backgroundColor: primaryColor }]}
          onPress={handleLogin}
        >
          <Text style={styles.authButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={() => router.push('/register')}>
          <IconSymbol name="hand" size={16} color={primaryColor} />
          <Text style={[styles.linkText, { color: primaryColor, marginLeft: 5 }]}>
            Need an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}