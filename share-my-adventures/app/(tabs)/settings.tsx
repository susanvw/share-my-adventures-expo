import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  ScrollView,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock Profile Data Type
interface Profile {
  userId: string;
  displayName: string;
  photo: string;
  trailColor: string;
  themePreference: 'light' | 'dark';
}

// Mock API Services
const MockProfileService = {
  getProfile: async (userId: string): Promise<{ succeeded: boolean; data?: Profile }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          succeeded: true,
          data: {
            userId,
            displayName: 'Susan',
            photo: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
            trailColor: '#40d04f',
            themePreference: 'light' as const,
          },
        });
      }, 500);
    });
  },
  updateProfile: async (profile: Partial<Profile>): Promise<{ succeeded: boolean; errors?: string[] }> => {
    console.log('Updating profile:', profile);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ succeeded: true });
      }, 500);
    });
  },
  uploadAvatar: async (data: { userId: string; photo: string }): Promise<{ succeeded: boolean }> => {
    console.log('Uploading avatar:', data.photo.substring(0, 50) + '...');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ succeeded: true });
      }, 500);
    });
  },
};

export default function SettingsScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [trailColor, setTrailColor] = useState('#40d04f');
  const [red, setRed] = useState(64); // Initial RGB for #40d04f
  const [green, setGreen] = useState(208);
  const [blue, setBlue] = useState(79);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [themePreference, setThemePreference] = useState<'light' | 'dark'>('light');

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const userId = await AsyncStorage.getItem('userId') || 'mock-user-id';
      const response = await MockProfileService.getProfile(userId);
      if (response.succeeded && response.data) {
        setProfile(response.data);
        setNewName(response.data.displayName);
        setTrailColor(response.data.trailColor);
        const [r, g, b] = hexToRgb(response.data.trailColor);
        setRed(r);
        setGreen(g);
        setBlue(b);
        setSelectedImage(response.data.photo);
        setThemePreference(response.data.themePreference);
      }
    };
    fetchProfile();
  }, []);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  // Update trail color from sliders
  useEffect(() => {
    if (isEditMode) {
      setTrailColor(rgbToHex(red, green, blue));
    }
  }, [red, green, blue, isEditMode]);

  // Handle image pick
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      const response = await fetch(uri);
      const blob = await response.blob();
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      if (typeof base64 === 'string') {
        const photo = base64.split(',')[1];
        const userId = await AsyncStorage.getItem('userId') || 'mock-user-id';
        await MockProfileService.uploadAvatar({ userId, photo });
      } else {
        console.error('Failed to convert image to base64');
      }
    }
  };

  // Handle save changes
  const handleSave = async () => {
    const userId = await AsyncStorage.getItem('userId') || 'mock-user-id';
    const updatedProfile: Partial<Profile> = {
      userId,
      displayName: newName,
      trailColor,
      themePreference,
    };
    const response = await MockProfileService.updateProfile(updatedProfile);
    if (response.succeeded) {
      setProfile((prev) => ({ ...prev!, ...updatedProfile }));
      setIsEditMode(false);
      alert('Profile updated successfully');
    } else {
      alert('Failed to update profile');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('userId');
    //router.push(''); // Redirect to login screen
  };

  if (!profile) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={{ color: textColor }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={isEditMode ? handleImagePick : undefined}>
          <Image
            source={{ uri: selectedImage || profile.photo }}
            style={[styles.avatar, { borderColor: primaryColor }]}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>
          {isEditMode ? 'Edit Profile' : 'Profile'}
        </Text>
      </View>

      <View
        style={[
          styles.formCard,
          {
            backgroundColor: colorScheme === 'light' ? '#fff' : '#1c2022',
            borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32',
          },
        ]}
      >
        <View style={styles.formItem}>
          <Text style={[styles.label, { color: textColor }]}>Display Name</Text>
          {isEditMode ? (
            <TextInput
              value={newName}
              onChangeText={setNewName}
              style={[
                styles.input,
                {
                  color: textColor,
                  borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32',
                },
              ]}
              placeholder="Enter display name"
              placeholderTextColor="#767577"
            />
          ) : (
            <Text style={[styles.value, { color: textColor }]}>{profile.displayName}</Text>
          )}
        </View>

        <View style={styles.formItem}>
          <Text style={[styles.label, { color: textColor }]}>Trail Color</Text>
          {isEditMode ? (
            <View>
              <Text style={[styles.sliderLabel, { color: textColor }]}>
                Red: {Math.round(red)}
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={255}
                value={red}
                onValueChange={setRed}
                minimumTrackTintColor="#ff0000"
                maximumTrackTintColor="#767577"
                thumbTintColor={primaryColor}
              />
              <Text style={[styles.sliderLabel, { color: textColor }]}>
                Green: {Math.round(green)}
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={255}
                value={green}
                onValueChange={setGreen}
                minimumTrackTintColor="#00ff00"
                maximumTrackTintColor="#767577"
                thumbTintColor={primaryColor}
              />
              <Text style={[styles.sliderLabel, { color: textColor }]}>
                Blue: {Math.round(blue)}
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={255}
                value={blue}
                onValueChange={setBlue}
                minimumTrackTintColor="#0000ff"
                maximumTrackTintColor="#767577"
                thumbTintColor={primaryColor}
              />
            </View>
          ) : (
            <View style={styles.colorPreview}>
              <View style={[styles.colorSquare, { backgroundColor: trailColor }]} />
            </View>
          )}
        </View>

        <View style={styles.formItem}>
          <Text style={[styles.label, { color: textColor }]}>Theme Preference</Text>
          <View style={styles.switchRow}>
            <Switch
              value={themePreference === 'dark'}
              onValueChange={(value) => setThemePreference(value ? 'dark' : 'light')}
              trackColor={{ false: '#767577', true: primaryColor }}
              thumbColor={themePreference === 'dark' ? '#f4f3f4' : '#f4f3f4'}
            />
            <Text style={[styles.value, { color: textColor, marginLeft: 10 }]}>
              {themePreference === 'dark' ? 'Dark' : 'Light'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: primaryColor }]}
          onPress={() => (isEditMode ? handleSave() : setIsEditMode(true))}
        >
          <Text style={styles.buttonText}>
            {isEditMode ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#767577' }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Matches other screens
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formCard: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formItem: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    width: '100%',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    opacity: 0.9,
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorSquare: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#767577',
  },
  sliderLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});