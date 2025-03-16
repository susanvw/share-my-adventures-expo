import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

const dummyAdventures = [
  { name: 'Mountain Hike', type: 'Hiking', startDate: '2025-04-01' },
  { name: 'Beach Camping', type: 'Camping', startDate: '2025-05-15' },
  { name: 'City Tour', type: 'Urban', startDate: '2025-03-20' },
];

export default function AdventuresScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Adventures</Text>
      {dummyAdventures.map((adventure, index) => (
        <View key={index} style={styles.adventureItem}>
          <Text style={{ color: primaryColor, fontWeight: 'bold' }}>{adventure.name}</Text>
          <Text style={{ color: textColor }}>Type: {adventure.type}</Text>
          <Text style={{ color: textColor }}>Start: {adventure.startDate}</Text>
        </View>
      ))}
      <Text style={{ color: textColor, marginTop: 20 }}>
        Tabs for Active, Invitations, Past coming soon!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  adventureItem: {
    marginBottom: 15,
    alignItems: 'center',
  },
});