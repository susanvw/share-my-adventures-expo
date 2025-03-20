import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ForgotPasswordScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);

  const handleResetPassword = () => {
    // Here you would typically call your .NET API to send a reset email
    console.log('Reset password requested for:', email);
    alert('If an account exists with this email, a password reset link will be sent.');
    //router.replace('index'); // Changed to replace instead of push
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.form}>
        <Text style={[styles.title, { color: textColor }]}>
          Lost Password
        </Text>
        <Text style={[styles.subtitle, { color: textColor }]}>
          Please enter your username or email address. You will receive a link to create a new password via email.
        </Text>
        
        <View style={styles.formItem}>
          <Text style={[styles.label, { color: textColor }]}>Username or Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: textColor,
                borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32',
              },
              emailFocused && colorScheme === 'light' && { borderColor: Colors.light.secondary },
              emailFocused && colorScheme === 'dark' && { borderColor: Colors.dark.secondary },
            ]}
            placeholder="Enter username or email"
            placeholderTextColor="#767577"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: primaryColor }]}
          onPress={handleResetPassword}
        >
          <Text style={styles.submitButtonText}>Get New Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: primaryColor }]}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  formItem: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  submitButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    fontSize: 14,
    marginTop: 10,
  },
});