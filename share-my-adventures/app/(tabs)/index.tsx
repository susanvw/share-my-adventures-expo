import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';

// Mock data for the news feed
const mockNewsFeed = [
  {
    type: 'friendInvite',
    id: 1,
    from: 'Alex Johnson',
    startDate: '2025-03-19T10:00:00Z',
    endDate: '2025-03-19T10:00:00Z',
  },
  {
    type: 'adventure',
    id: 2,
    friend: 'Sarah Lee',
    activity: 'Mountain Bike Ride',
    startDate: '2025-03-20T09:00:00Z',
    endDate: '2025-03-20T12:00:00Z',
    location: 'Rocky Hills Trail',
  },
  {
    type: 'friendInvite',
    id: 3,
    from: 'Mike Torres',
    startDate: '2025-03-18T15:30:00Z',
    endDate: '2025-03-18T15:30:00Z',
  },
  {
    type: 'adventure',
    id: 4,
    friend: 'Emily Chen',
    activity: 'Trail Run',
    startDate: '2025-03-21T07:00:00Z',
    endDate: '2025-03-21T09:00:00Z',
    location: 'Forest Park',
  },
];

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const colorScheme = useColorScheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>News Feed</Text>
      
      {mockNewsFeed.map((item) => (
        <View
          key={item.id}
          style={[
            styles.feedItem,
            {
              borderColor: colorScheme === 'light' ? '#d3d7df' : '#2a2e32',
              backgroundColor: colorScheme === 'light' ? '#fff' : '#1c2022',
            },
          ]}
        >
          {item.type === 'friendInvite' ? (
            <>
              <Text style={[styles.feedText, { color: textColor }]}>
                <Text style={{ fontWeight: 'bold' }}>{item.from}</Text> sent you a friend invite!
              </Text>
              <Text style={[styles.timestamp, { color: '#767577' }]}>
                {formatDate(item.startDate)}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: primaryColor }]}
                  onPress={() => console.log(`Accepted invite from ${item.from}`)}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#767577' }]}
                  onPress={() => console.log(`Declined invite from ${item.from}`)}
                >
                  <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={[styles.feedText, { color: textColor }]}>
                <Text style={{ fontWeight: 'bold' }}>{item.friend}</Text> is going on a{' '}
                <Text style={{ color: primaryColor }}>{item.activity}</Text>
              </Text>
              <Text style={[styles.feedDetails, { color: textColor }]}>
                When: {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </Text>
              <Text style={[styles.feedDetails, { color: textColor }]}>
                Where: {item.location}
              </Text>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: primaryColor }]}
                onPress={() => console.log(`Join ${item.friend} on ${item.activity}`)}
              >
                <Text style={styles.buttonText}>Join</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60, // Increased top padding to push content below status bar
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  feedItem: {
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
  feedText: {
    fontSize: 16,
    marginBottom: 5,
  },
  feedDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});