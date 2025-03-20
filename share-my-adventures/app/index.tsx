import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Linking,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as Google from "expo-auth-session/providers/google";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const MockAuthenticateService = {
  authenticate: async (command: { email: string; password: string }) => {
    console.log("Authenticating:", command);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          command.email === "test@example.com" &&
          command.password === "password"
        ) {
          resolve({
            succeeded: true,
            data: {
              jwtToken: "mock-jwt-token",
              refreshToken: "mock-refresh-token",
              userId: "mock-user-id",
            },
          });
        } else {
          resolve({ succeeded: false, errors: ["Invalid credentials"] });
        }
      }, 500);
    });
  },
  register: async (command: {
    email: string;
    displayName: string;
    password: string;
    newsletter: boolean;
  }) => {
    console.log("Registering:", command);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (command.password.length < 6) {
          resolve({
            succeeded: false,
            errors: ["Password must be at least 6 characters"],
          });
        } else {
          resolve({ succeeded: true });
        }
      }, 500);
    });
  },
};

export default function LoginScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [displayNameFocused, setDisplayNameFocused] = useState(false);
  const [repeatPasswordFocused, setRepeatPasswordFocused] = useState(false);

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      iosClientId: "YOUR_GOOGLE_IOS_CLIENT_ID",
      androidClientId: "YOUR_GOOGLE_ANDROID_CLIENT_ID",
    });

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("jwtToken");
      if (token) {
        setIsAuthenticated(true);
        router.replace("/(tabs)");
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (googleResponse?.type === "success") {
      const { authentication } = googleResponse;
      console.log("Google Token:", authentication?.accessToken);
      AsyncStorage.setItem("jwtToken", "mock-google-jwt");
      setIsAuthenticated(true);
      router.replace("/(tabs)");
    }
  }, [googleResponse, router]);

  const handleAuth = async () => {
    if (isLoginMode) {
      setIsAuthenticated(true);
      router.replace("/(tabs)");
    } else {
      if (password !== repeatPassword) {
        alert("Passwords do not match");
        return;
      }
      // const response = await MockAuthenticateService.register({ email, displayName, password, newsletter });
      // if (response.succeeded) {
      //   alert('Registration successful! Please log in.');
      //   setIsLoginMode(true);
      //   setEmail('');
      //   setDisplayName('');
      //   setPassword('');
      //   setRepeatPassword('');
      //   setNewsletter  setNewsletter(true);
      // } else {
      //   alert('Registration failed: ' + (response.errors?.join(', ') || 'Unknown error'));
      // }
    }
  };

  const handleGoogleLogin = () => {
    googlePromptAsync();
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            isLoginMode ? styles.activeToggle : null,
          ]}
          onPress={() => setIsLoginMode(true)}
        >
          <Text
            style={[
              styles.toggleText,
              { color: isLoginMode ? primaryColor : textColor },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !isLoginMode ? styles.activeToggle : null,
          ]}
          onPress={() => setIsLoginMode(false)}
        >
          <Text
            style={[
              styles.toggleText,
              { color: !isLoginMode ? primaryColor : textColor },
            ]}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={[styles.title, { color: textColor }]}>
          {isLoginMode ? "Welcome" : "Create your Account!"}
        </Text>

        {isLoginMode ? (
          <>
            <View style={styles.formItem}>
              <Text style={[styles.label, { color: textColor }]}>
                Username or Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: textColor,
                    borderColor:
                      colorScheme === "light" ? "#d3d7df" : "#2a2e32",
                  },
                  emailFocused &&
                    colorScheme === "light" && {
                      borderColor: Colors.light.secondary,
                    },
                  emailFocused &&
                    colorScheme === "dark" && {
                      borderColor: Colors.dark.secondary,
                    },
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
            <View style={styles.formItem}>
              <Text style={[styles.label, { color: textColor }]}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: textColor,
                    borderColor:
                      colorScheme === "light" ? "#d3d7df" : "#2a2e32",
                  },
                  passwordFocused &&
                    colorScheme === "light" && {
                      borderColor: Colors.light.secondary,
                    },
                  passwordFocused &&
                    colorScheme === "dark" && {
                      borderColor: Colors.dark.secondary,
                    },
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
            <View style={styles.options}>
              <View style={styles.checkboxWrap}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: "#767577", true: primaryColor }}
                  thumbColor={rememberMe ? "#f4f3f4" : "#f4f3f4"}
                />
                <Text style={{ color: textColor, marginLeft: 10 }}>
                  Remember Me
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                <Text style={{ color: primaryColor }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.authButton, { backgroundColor: primaryColor }]}
              onPress={handleAuth}
            >
              <Text style={styles.authButtonText}>Login to your Account!</Text>
            </TouchableOpacity>
            <Text style={[styles.linedText, { color: textColor }]}>
              Login with your Social Account
            </Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#4285f4" }]}
                onPress={handleGoogleLogin}
                disabled={!googleRequest}
              >
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.formItem}>
              <Text style={[styles.label, { color: textColor }]}>
                Your Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: textColor,
                    borderColor:
                      colorScheme === "light" ? "#d3d7df" : "#2a2e32",
                  },
                  emailFocused &&
                    colorScheme === "light" && {
                      borderColor: Colors.light.secondary,
                    },
                  emailFocused &&
                    colorScheme === "dark" && {
                      borderColor: Colors.dark.secondary,
                    },
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
              <Text style={[styles.label, { color: textColor }]}>
                Display Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: textColor,
                    borderColor:
                      colorScheme === "light" ? "#d3d7df" : "#2a2e32",
                  },
                  displayNameFocused &&
                    colorScheme === "light" && {
                      borderColor: Colors.light.secondary,
                    },
                  displayNameFocused &&
                    colorScheme === "dark" && {
                      borderColor: Colors.dark.secondary,
                    },
                ]}
                placeholder="Enter Display Name"
                placeholderTextColor="#767577"
                value={displayName}
                onChangeText={setDisplayName}
                autoCapitalize="none"
                onFocus={() => setDisplayNameFocused(true)}
                onBlur={() => setDisplayNameFocused(false)}
              />
            </View>
            <View style={styles.formItem}>
              <Text style={[styles.label, { color: textColor }]}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: textColor,
                    borderColor:
                      colorScheme === "light" ? "#d3d7df" : "#2a2e32",
                  },
                  passwordFocused &&
                    colorScheme === "light" && {
                      borderColor: Colors.light.secondary,
                    },
                  passwordFocused &&
                    colorScheme === "dark" && {
                      borderColor: Colors.dark.secondary,
                    },
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
              <Text style={[styles.label, { color: textColor }]}>
                Repeat Password
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: textColor,
                    borderColor:
                      colorScheme === "light" ? "#d3d7df" : "#2a2e32",
                  },
                  repeatPasswordFocused &&
                    colorScheme === "light" && {
                      borderColor: Colors.light.secondary,
                    },
                  repeatPasswordFocused &&
                    colorScheme === "dark" && {
                      borderColor: Colors.dark.secondary,
                    },
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
                trackColor={{ false: "#767577", true: primaryColor }}
                thumbColor={newsletter ? "#f4f3f4" : "#f4f3f4"}
              />
              <Text style={{ color: textColor, marginLeft: 10 }}>
                Send me news and updates via email
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.authButton, { backgroundColor: primaryColor }]}
              onPress={handleAuth}
            >
              <Text style={styles.authButtonText}>Register Now!</Text>
            </TouchableOpacity>
            <Text style={[styles.formText, { color: textColor }]}>
              You'll receive a confirmation email in your inbox with a link to
              activate your account. If you have any problems,{" "}
              <Text
                style={{ color: primaryColor }}
                onPress={() => Linking.openURL("https://example.com/contact")}
              >
                contact us
              </Text>
              !
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeToggle: {
    borderBottomWidth: 2,
    borderBottomColor: "#40d04f",
  },
  toggleText: {
    fontSize: 18,
    fontWeight: "600",
  },
  form: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formItem: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  checkboxWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  authButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  authButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linedText: {
    marginVertical: 20,
    fontSize: 14,
  },
  socialLinks: {
    width: "100%",
    alignItems: "center",
  },
  socialButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  googleIcon: {
    marginRight: 10,
  },
  formText: {
    marginTop: 20,
    fontSize: 12,
    textAlign: "center",
  },
});
