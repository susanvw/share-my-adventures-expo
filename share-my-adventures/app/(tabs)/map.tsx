import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock Participant Data with Positions
const mockParticipants = [
  {
    id: '1',
    name: 'Alex',
    adventure: 'Mountain Trek',
    avatar: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
    position: { latitude: 37.78825, longitude: -122.4324 },
    trail: [
      { latitude: 37.78825, longitude: -122.4324 },
      { latitude: 37.78900, longitude: -122.4310 },
      { latitude: 37.79000, longitude: -122.4300 },
    ],
    trailColor: '#40d04f', // Green
  },
  {
    id: '2',
    name: 'Jamie',
    adventure: 'River Rafting',
    avatar: 'https://randomuser.me/api/portraits/thumb/women/3.jpg',
    position: { latitude: 37.78600, longitude: -122.4340 },
    trail: [
      { latitude: 37.78600, longitude: -122.4340 },
      { latitude: 37.78550, longitude: -122.4330 },
      { latitude: 37.78450, longitude: -122.4320 },
    ],
    trailColor: '#ff5733', // Orange
  },
  {
    id: '3',
    name: 'Taylor',
    adventure: 'Beach Campout',
    avatar: 'https://randomuser.me/api/portraits/thumb/men/4.jpg',
    position: { latitude: 37.79050, longitude: -122.4350 },
    trail: [
      { latitude: 37.79050, longitude: -122.4350 },
      { latitude: 37.79100, longitude: -122.4345 },
      { latitude: 37.79200, longitude: -122.4340 },
    ],
    trailColor: '#3498db', // Blue
  },
  {
    id: '4',
    name: 'Sam',
    adventure: 'City Exploration',
    avatar: 'https://randomuser.me/api/portraits/thumb/women/5.jpg',
    position: { latitude: 37.78700, longitude: -122.4300 },
    trail: [
      { latitude: 37.78700, longitude: -122.4300 },
      { latitude: 37.78650, longitude: -122.4290 },
      { latitude: 37.78550, longitude: -122.4280 },
    ],
    trailColor: '#9b59b6', // Purple
  },
];

export default function MapScreen() {
  const primaryColor = useThemeColor({}, 'primary'); // #40d04f
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const [isTracking, setIsTracking] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const profilePic = 'https://randomuser.me/api/portraits/thumb/men/1.jpg';

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {/* Your Marker */}
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="You">
          <View style={styles.markerContainer}>
            <Image
              source={{ uri: profilePic }}
              style={[
                styles.profilePic,
                {
                  borderColor: isTracking ? primaryColor : '#fd4350',
                  borderWidth: 2,
                },
              ]}
            />
          </View>
        </Marker>

        {/* Participants Markers and Trails */}
        {mockParticipants.map((participant) => (
          <React.Fragment key={participant.id}>
            <Marker coordinate={participant.position} title={participant.name}>
              <View style={styles.markerContainer}>
                <Image
                  source={{ uri: participant.avatar }}
                  style={[styles.profilePic, { borderColor: primaryColor, borderWidth: 2 }]}
                />
              </View>
            </Marker>
            <Polyline
              coordinates={participant.trail}
              strokeColor={participant.trailColor}
              strokeWidth={3}
            />
          </React.Fragment>
        ))}
      </MapView>

      {/* Side Menu Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setIsSideMenuOpen(!isSideMenuOpen)}
      >
        <Text style={{ color: textColor, fontSize: 24 }}>☰</Text>
      </TouchableOpacity>

      {/* Side Menu */}
      {isSideMenuOpen && (
        <View style={[styles.sideMenu, { backgroundColor }]}>
          <TouchableOpacity
            style={styles.sideMenuItem}
            onPress={() => {
              setIsParticipantsOpen(true);
              setIsSideMenuOpen(false);
            }}
          >
            <Text style={{ color: textColor }}>👥 Participants</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sideMenuItem}
            onPress={() => setIsTracking(!isTracking)}
          >
            <Text style={{ color: textColor }}>
              {isTracking ? '🟢 Stop Tracking' : '🔴 Start Tracking'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sideMenuItem}
            onPress={() => setIsSideMenuOpen(false)}
          >
            <Text style={{ color: textColor }}>✖️ Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Participants Popup */}
      {isParticipantsOpen && (
        <View style={[styles.popup, { backgroundColor }]}>
          <Text style={[styles.popupTitle, { color: textColor }]}>
            Adventure Participants ({mockParticipants.length})
          </Text>
          {mockParticipants.map((participant) => (
            <View key={participant.id} style={styles.participantItem}>
              <Image
                source={{ uri: participant.avatar }}
                style={[styles.participantAvatar, { borderColor: primaryColor }]}
              />
              <View style={styles.participantInfo}>
                <Text style={{ color: textColor, fontWeight: '600' }}>{participant.name}</Text>
                <Text style={{ color: textColor, opacity: 0.7 }}>{participant.adventure}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsParticipantsOpen(false)}
          >
            <Text style={{ color: primaryColor, fontWeight: '600' }}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
  sideMenu: {
    position: 'absolute',
    top: 80,
    left: 20,
    width: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sideMenuItem: {
    paddingVertical: 10,
  },
  popup: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    width: '100%',
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 10,
  },
  participantInfo: {
    flex: 1,
  },
  closeButton: {
    marginTop: 15,
  },
});