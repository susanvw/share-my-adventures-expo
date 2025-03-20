import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Adventure } from '@/src/types/Adventure';

// Mock Adventure Data (Updated with location)
const fakeAdventures = {
  active: [
    { id: '1', name: 'Mountain Trek', type: 'Hiking', startDate: '2025-04-10', location: 'Rocky Peaks' },
    { id: '2', name: 'River Rafting', type: 'Water Sports', startDate: '2025-04-15', location: 'Whitewater River' },
  ],
  pending: [
    { id: '3', name: 'Beach Campout', type: 'Camping', startDate: '2025-05-01', location: 'Sunny Coast' },
    { id: '4', name: 'City Scramble', type: 'Urban Exploration', startDate: '2025-05-10', location: 'Downtown' },
  ],
  history: [
    { id: '5', name: 'Desert Safari', type: 'Off-Roading', startDate: '2025-03-01', location: 'Sahara Dunes' },
    { id: '6', name: 'Forest Hike', type: 'Hiking', startDate: '2025-02-15', location: 'Greenwood Forest' },
  ],
};

// Mock Participants Data
const mockParticipants = [
  {
    id: '1',
    name: 'Alex',
    adventure: 'Mountain Trek',
    avatar: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
  },
  {
    id: '2',
    name: 'Jamie',
    adventure: 'River Rafting',
    avatar: 'https://randomuser.me/api/portraits/thumb/women/3.jpg',
  },
  {
    id: '3',
    name: 'Taylor',
    adventure: 'Beach Campout',
    avatar: 'https://randomuser.me/api/portraits/thumb/men/4.jpg',
  },
  {
    id: '4',
    name: 'Sam',
    adventure: 'City Scramble',
    avatar: 'https://randomuser.me/api/portraits/thumb/women/5.jpg',
  },
];

// Mock Adventure Service
const MockAdventureService = {
  acceptInvite: async (id: string) => {
    console.log(`Accepting invite ${id}`);
    return { succeeded: true };
  },
  rejectInvite: async (id: string) => {
    console.log(`Rejecting invite ${id}`);
    return { succeeded: true };
  },
};

export default function AdventuresScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'history'>('active');
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const [participantsPopup, setParticipantsPopup] = useState<string | null>(null);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const colorScheme = useColorScheme();
  const router = useRouter();

  const adventures = fakeAdventures[activeTab];

  const renderTab = (tab: 'active' | 'pending' | 'history', label: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab ? { borderBottomColor: primaryColor } : {},
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text
        style={[
          styles.tabText,
          { color: activeTab === tab ? primaryColor : textColor },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const handleViewOnMap = (id: string) => {
    router.push('/(tabs)/map'); // Navigate to map screen
  };

  const handleAcceptInvite = async (id: string) => {
    const response = await MockAdventureService.acceptInvite(id);
    if (response.succeeded) {
      const invite = fakeAdventures.pending.find((a) => a.id === id);
      if (invite) {
        fakeAdventures.active.push(invite);
        fakeAdventures.pending = fakeAdventures.pending.filter((a) => a.id !== id);
        setActiveTab('active'); // Switch to active tab
      }
    }
  };

  const handleRejectInvite = async (id: string) => {
    const response = await MockAdventureService.rejectInvite(id);
    if (response.succeeded) {
      fakeAdventures.pending = fakeAdventures.pending.filter((a) => a.id !== id);
      setActiveTab('pending'); // Refresh pending tab
    }
  };

  const renderAdventureCard = ({ item }: { item: Adventure }) => {
    const isAcceptPressed = pressedButton === `accept-${item.id}`;
    const isRejectPressed = pressedButton === `reject-${item.id}`;

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: colorScheme === 'light' ? '#fff' : '#1c2022',
            borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32',
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: textColor }]}>{item.name}</Text>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardText, { color: textColor }]}>Type: {item.type}</Text>
          <Text style={[styles.cardText, { color: textColor }]}>Start: {item.startDate}</Text>
          <Text style={[styles.cardText, { color: textColor }]}>Location: {item.location}</Text>
        </View>
        <View style={styles.cardButtons}>
          {activeTab === 'active' && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: primaryColor }]}
              onPress={() => handleViewOnMap(item.id)}
            >
              <Text style={styles.buttonText}>View on Map</Text>
            </TouchableOpacity>
          )}
          {activeTab === 'pending' && (
            <View style={styles.inviteButtons}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: isAcceptPressed ? `${primaryColor}80` : primaryColor }, // Slight transparency on press
                ]}
                onPressIn={() => setPressedButton(`accept-${item.id}`)}
                onPressOut={() => setPressedButton(null)}
                onPress={() => handleAcceptInvite(item.id)}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: isRejectPressed ? '#ff000080' : '#767577' }, // Grey by default, red on press
                ]}
                onPressIn={() => setPressedButton(`reject-${item.id}`)}
                onPressOut={() => setPressedButton(null)}
                onPress={() => handleRejectInvite(item.id)}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: primaryColor }]}
            onPress={() => setParticipantsPopup(item.id)}
          >
            <Text style={styles.buttonText}>Participants</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Adventures</Text>
      <View style={styles.tabContainer}>
        {renderTab('active', 'Current')}
        {renderTab('pending', 'Invites')}
        {renderTab('history', 'Past')}
      </View>
      <FlatList
        data={adventures}
        renderItem={renderAdventureCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: textColor }]}>
            No {activeTab} adventures yet!
          </Text>
        }
      />

      {/* Participants Popup */}
      {participantsPopup && (
        <View style={[styles.popup, { backgroundColor: colorScheme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(28, 32, 34, 0.95)' }]}>
          <Text style={[styles.popupTitle, { color: textColor }]}>
            Participants ({mockParticipants.length})
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
            onPress={() => setParticipantsPopup(null)}
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
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardInfo: {
    marginBottom: 15,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  inviteButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80, // Ensure consistent button width
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  popup: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
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
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.7,
  },
});