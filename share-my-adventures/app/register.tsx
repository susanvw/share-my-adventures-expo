import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import AccountService from '@/src/services/AccountService';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RegisterScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [displayNameFocused, setDisplayNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [repeatPasswordFocused, setRepeatPasswordFocused] = useState(false);

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }
    const response = await AccountService.registerAccount({ username: email, password });
    if (response.succeeded) {
      alert('Registration successful! Please log in.');
      router.replace('/login');
    } else {
      alert('Registration failed: ' + (response.errors?.join(', ') || 'Unknown error'));
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.form}>
        <Text style={[styles.title, { color: textColor }]}>Create Your Account</Text>
        <View style={styles.formItem}>
          <Text style={[styles.label, { color: textColor }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { color: textColor, borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32' },
              emailFocused && { borderColor: Colors[colorScheme].secondary },
            ]}
            placeholder="Enter your email"
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
          <Text style={[styles.label, { color: textColor }]}>Display Name</Text>
          <TextInput
            style={[
              styles.input,
              { color: textColor, borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32' },
              displayNameFocused && { borderColor: Colors[colorScheme].secondary },
            ]}
            placeholder="Enter display name"
            placeholderTextColor="#767577"
            value={displayName}
            onChangeText={setDisplayName}
            onFocus={() => setDisplayNameFocused(true)}
            onBlur={() => setDisplayNameFocused(false)}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={[styles.label, { color: textColor }]}>Password</Text>
          <TextInput
            style={[
              styles.input,
              { color: textColor, borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32' },
              passwordFocused && { borderColor: Colors[colorScheme].secondary },
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
        <View style={styles.formItem}>
          <Text style={[styles.label, { color: textColor }]}>Repeat Password</Text>
          <TextInput
            style={[
              styles.input,
              { color: textColor, borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32' },
              repeatPasswordFocused && { borderColor: Colors[colorScheme].secondary },
            ]}
            placeholder="Repeat password"
            placeholderTextColor="#767577"
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            secureTextEntry
            onFocus={() => setRepeatPasswordFocused(true)}
            onBlur={() => setRepeatPasswordFocused(false)}
          />
        </View>
        <View style={styles.checkboxWrap}>
          <Switch
            value={newsletter}
            onValueChange={setNewsletter}
            trackColor={{ false: '#767577', true: primaryColor }}
            thumbColor={newsletter ? '#f4f3f4' : '#f4f3f4'}
          />
          <Text style={{ color: textColor, marginLeft: 10 }}>Subscribe to newsletter</Text>
        </View>
        <TouchableOpacity
          style={[styles.authButton, { backgroundColor: primaryColor }]}
          onPress={handleRegister}
        >
          <Text style={styles.authButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={{ color: primaryColor }}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  form: { alignItems: 'center', width: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  formItem: { width: '100%', marginBottom: 15 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 5 },
  input: { width: '100%', borderWidth: 1, padding: 15, borderRadius: 10 },
  checkboxWrap: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  authButton: { width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 20 },
  authButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});