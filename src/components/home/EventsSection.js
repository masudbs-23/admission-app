import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EventCard from './EventCard';
import { useLanguage } from '../../context/LanguageContext';

const EventsSection = ({ navigation }) => {
  const events = [
    {
      id: '1',
      title: 'Global Education Fair',
      time: '12th Oct, 2025 | 10:00 AM',
      image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1470&auto=format&fit=crop',
      mode: 'On-site',
      tag: 'Featured',
    },
    {
      id: '2',
      title: 'Scholarship Info Session',
      time: '15th Oct, 2025 | 2:00 PM',
      image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1470&auto=format&fit=crop',
      mode: 'Online',
      tag: 'Live',
    },
    {
      id: '3',
      title: 'University Meet & Greet',
      time: '22nd Oct, 2025 | 11:30 AM',
      image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=1470&auto=format&fit=crop',
      mode: 'On-site',
      tag: 'Popular',
    },
  ];

  const { t } = useLanguage();
  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('events')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Events')}>
          <Text style={styles.seeAll}>{t('seeAll')}</Text>
        </TouchableOpacity>
      </View>

      {events.map((ev) => (
        <EventCard key={ev.id} {...ev} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionWrapper: { marginTop: 30 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  seeAll: { fontSize: 14, fontWeight: '600', color: '#4361EE' },
});

export default EventsSection;


