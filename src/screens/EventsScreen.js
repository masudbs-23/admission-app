import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EVENTS = [
  {
    id: '1',
    title: 'Global Education Fair',
    time: '12th Oct, 2025 | 10:00 AM',
    image: 'https://image.taiwantoday.tw/images/content/img20250624140916737_800.jpg',
  },
  {
    id: '2',
    title: 'Scholarship Info Session',
    time: '15th Oct, 2025 | 2:00 PM',
    image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'University Meet & Greet',
    time: '22nd Oct, 2025 | 11:30 AM',
    image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Visa Guidance Webinar',
    time: '28th Oct, 2025 | 4:00 PM',
    image: 'https://images.unsplash.com/photo-1514511547117-f9c3d2df0f36?q=80&w=1470&auto=format&fit=crop',
  },
];

const EventsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {EVENTS.map((ev) => (
          <View key={ev.id} style={styles.card}>
            <Image source={{ uri: ev.image }} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay}>
              <Text style={styles.title}>{ev.title}</Text>
              <Text style={styles.time}>{ev.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  list: { padding: 16, paddingBottom: 24 },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  image: { width: '100%', height: 190 },
  overlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    // backgroundColor: 'rgba(0,0,0,0.0)',
    padding: 10,
    borderRadius: 8,
  },
  title: { color: '#fff', fontSize: 16, fontWeight: '700' },
  time: { color: '#ddd', fontSize: 12, marginTop: 4 },
});

export default EventsScreen;


