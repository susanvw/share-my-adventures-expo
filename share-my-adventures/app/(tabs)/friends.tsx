import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Mock Friend Data Type
interface Friend {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  isRequest?: boolean;
}

// Mock Friends Service
const MockFriendsService = {
  getFriends: async (): Promise<Friend[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'Alice Johnson', avatar: 'https://randomuser.me/api/portraits/thumb/women/2.jpg', mutualFriends: 5 },
          { id: '2', name: 'Bob Smith', avatar: 'https://randomuser.me/api/portraits/thumb/men/3.jpg', mutualFriends: 3 },
          { id: '3', name: 'Charlie Brown', avatar: 'https://randomuser.me/api/portraits/thumb/men/4.jpg', mutualFriends: 7 },
        ]);
      }, 500);
    });
  },
  getFriendRequests: async (): Promise<Friend[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '4', name: 'Diana Prince', avatar: 'https://randomuser.me/api/portraits/thumb/women/5.jpg', mutualFriends: 2, isRequest: true },
          { id: '5', name: 'Evan Davis', avatar: 'https://randomuser.me/api/portraits/thumb/men/6.jpg', mutualFriends: 4, isRequest: true },
        ]);
      }, 500);
    });
  },
  removeFriend: async (id: string) => {
    console.log(`Removing friend with id: ${id}`);
    return { succeeded: true };
  },
  acceptFriendRequest: async (id: string) => {
    console.log(`Accepting friend request with id: ${id}`);
    return { succeeded: true };
  },
  declineFriendRequest: async (id: string) => {
    console.log(`Declining friend request with id: ${id}`);
    return { succeeded: true };
  },
};

export default function FriendsScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const colorScheme = useColorScheme();

  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [pressedButton, setPressedButton] = useState<string | null>(null); // Track pressed button

  // Fetch friends and requests on mount
  useEffect(() => {
    const fetchData = async () => {
      const friendsData = await MockFriendsService.getFriends();
      const requestsData = await MockFriendsService.getFriendRequests();
      setFriends(friendsData);
      setRequests(requestsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Handle friend removal
  const handleRemoveFriend = async (id: string) => {
    const response = await MockFriendsService.removeFriend(id);
    if (response.succeeded) {
      setFriends(friends.filter(friend => friend.id !== id));
    }
  };

  // Handle friend request actions
  const handleAcceptRequest = async (id: string) => {
    const response = await MockFriendsService.acceptFriendRequest(id);
    if (response.succeeded) {
      const accepted = requests.find(req => req.id === id);
      if (accepted) {
        setFriends([...friends, { ...accepted, isRequest: false }]);
        setRequests(requests.filter(req => req.id !== id));
      }
    }
  };

  const handleDeclineRequest = async (id: string) => {
    const response = await MockFriendsService.declineFriendRequest(id);
    if (response.succeeded) {
      setRequests(requests.filter(req => req.id !== id));
    }
  };

  const renderFriendItem = ({ item }: { item: Friend }) => {
    const isAcceptPressed = pressedButton === `accept-${item.id}`;
    const isRemovePressed = pressedButton === `remove-${item.id}`;
    const isDeclinePressed = pressedButton === `decline-${item.id}`;

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
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={[styles.name, { color: textColor }]}>{item.name}</Text>
          <Text style={[styles.mutual, { color: textColor, opacity: 0.7 }]}>
            {item.mutualFriends} mutual friends
          </Text>
        </View>
        {item.isRequest ? (
          <View style={styles.requestButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: isAcceptPressed ? `${primaryColor}80` : primaryColor },
              ]}
              onPressIn={() => setPressedButton(`accept-${item.id}`)}
              onPressOut={() => setPressedButton(null)}
              onPress={() => handleAcceptRequest(item.id)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: isDeclinePressed ? '#ff000080' : '#767577' },
              ]}
              onPressIn={() => setPressedButton(`decline-${item.id}`)}
              onPressOut={() => setPressedButton(null)}
              onPress={() => handleDeclineRequest(item.id)}
            >
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: isRemovePressed ? '#ff000080' : '#767577' },
            ]}
            onPressIn={() => setPressedButton(`remove-${item.id}`)}
            onPressOut={() => setPressedButton(null)}
            onPress={() => handleRemoveFriend(item.id)}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={{ color: textColor }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Friends</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' ? styles.activeTab : null]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'friends' ? primaryColor : textColor }]}>
            Friends ({friends.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' ? styles.activeTab : null]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'requests' ? primaryColor : textColor }]}>
            Requests ({requests.length})
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={activeTab === 'friends' ? friends : requests}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: textColor }]}>
            {activeTab === 'friends' ? 'No friends yet!' : 'No friend requests.'}
          </Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Matches Home and Adventures
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#40d04f', // Matches primaryColor
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  mutual: {
    fontSize: 14,
    marginTop: 5,
  },
  requestButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.7,
  },
});