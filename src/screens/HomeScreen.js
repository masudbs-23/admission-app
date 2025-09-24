import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LanguageSwitch from '../component/LanguageSwitch';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [searchData, setSearchData] = useState({ query: '' });
  const insets = useSafeAreaInsets();

  // Fetch logged-in user profile (includes profileCompletion.percentage)
  const { data: me, isLoading: isMeLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get('https://admission-back.onrender.com/api/users/me');
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  const profileName = me?.name || me?.user?.name || 'User';
  const profilePct = typeof me?.profileCompletion?.percentage === 'number'
    ? me.profileCompletion.percentage
    : 0;

  const handleSearch = () => {
    alert(`Searching for: ${searchData.query}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Sticky Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.leftSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>Hi, {profileName}</Text>
            <Text style={styles.profileProgress}>
              {isMeLoading ? 'Loading…' : `${profilePct}% Profile Complete`}
            </Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => navigation.navigate('Notifications')}>
            <Icon name="bell" size={26} color="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.msgWithSwitch}>
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={() => navigation.navigate('Chat')}>
              <Icon name="message-circle" size={26} color="#fff" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>5</Text>
              </View>
            </TouchableOpacity>
            <LanguageSwitch />
          </View>
        </View>
      </View>

      {/* 🔹 Scrollable Content */}
      <ScrollView
        style={{ flex: 1, marginTop: 100 + insets.top }}
        contentContainerStyle={{ paddingBottom: 20 + insets.bottom }}>

        {/* Advisor Card */}
        <View style={styles.advisorCard}>
          <View style={styles.advisorInfo}>
            <View style={styles.advisorAvatar}>
              <Text style={styles.advisorAvatarText}>SM</Text>
            </View>
            <View style={styles.advisorDetails}>
              <Text style={styles.advisorName}>Consult your Advisor</Text>
              <Text style={styles.advisorSub}>Shipra Mehra</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => navigation.navigate('Chat')}>
            <Text style={styles.chatButtonText}>Chat Now</Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Why choose us */}
          <View style={{ marginTop: 22 }}>
            <Text style={styles.sectionLabel}>Why choose us</Text>
            <View style={styles.impactRow}>
              <View style={styles.impactCard}>
                <MaterialIcons name="verified" size={28} color="#09BD71" />
                <Text style={styles.impactTitle}>1,500+ programs</Text>
                <Text style={styles.impactSub}>Top global programs</Text>
              </View>
              <View style={styles.impactCard}>
                <MaterialIcons name="support-agent" size={28} color="#09BD71" />
                <Text style={styles.impactTitle}>Local advisors</Text>
                <Text style={styles.impactSub}>Visa & application help</Text>
              </View>
            </View>

            <View style={styles.impactRow}>
              <View style={styles.impactCard}>
                <MaterialIcons name="school" size={28} color="#09BD71" />
                <Text style={styles.impactTitle}>Scholarships</Text>
                <Text style={styles.impactSub}>Find funding options</Text>
              </View>
              <View style={styles.impactCard}>
                <MaterialIcons name="bolt" size={28} color="#09BD71" />
                <Text style={styles.impactTitle}>Fast matching</Text>
                <Text style={styles.impactSub}>Personalized results</Text>
              </View>
            </View>
          </View>

          {/* Institutions Section */}
          <View style={styles.sectionWrapper}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Institutions</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Institutions')}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.institutionCard}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqFNvw88bgjtDumEfGwwjO_tHs0hgpjMadmw&s',
                }}
                style={styles.institutionImage}
                resizeMode="cover"
              />
              <View style={styles.institutionOverlay}>
                <Text style={styles.institutionName}>Harvard University</Text>
                <Text style={styles.institutionDetail}>
                  Tuition Fees: $50,000
                </Text>
                <Text style={styles.institutionDetail}>Intake: Fall 2025</Text>
              </View>
            </View>
          </View>

        {/* Events Section */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Events</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {[
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
          ].map((ev) => (
            <View key={ev.id} style={[styles.eventCard, { marginBottom: 14 }]}>
              <Image
                source={{ uri: ev.image }}
                style={styles.eventImage}
                resizeMode="cover"
              />
              <View style={styles.eventOverlay}>
                <Text style={styles.eventTitle}>{ev.title}</Text>
                <Text style={styles.eventTime}>{ev.time}</Text>
              </View>
            </View>
          ))}
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 150,
    backgroundColor: '#09BD71',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
    borderWidth: 2,
    borderColor: '#ffd700',
    marginRight: 12,
  },
  greeting: { fontSize: 18, fontWeight: '600', color: '#fff' },
  profileProgress: {
    fontSize: 12,
    color: '#f0f0f0',
    marginTop: 2,
    fontWeight: '500',
  },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  msgWithSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    gap: 10,
  },
  iconWrapper: { marginLeft: 15, position: 'relative' },
  badge: {
    position: 'absolute',
    right: -8,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  searchSection: { padding: 16, backgroundColor: '#fff' },
  searchTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  searchContainer: { gap: 12 },
  singleInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 3,
  },
  inputIcon: { marginRight: 8 },
  singleInput: { flex: 1, fontSize: 16, color: '#333' },
  inlineSearchBtn: {
    backgroundColor: '#09BD71',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineSearchBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },

  body: { flex: 1, padding: 16 },
  sectionLabel: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '700',
    marginBottom: 10,
  },
  impactRow: { flexDirection: 'row', marginTop: 12 },
  impactCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  impactTitle: {
    marginTop: 8,
    fontWeight: '700',
    fontSize: 14,
    color: '#1E293B',
  },
  impactSub: {
    marginTop: 6,
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
  },

  advisorCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    margin: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  advisorInfo: { flexDirection: 'row', alignItems: 'center' },
  advisorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  advisorAvatarText: { color: '#2B2A29', fontWeight: '600', fontSize: 18 },
  advisorName: { color: '#2B2A29', fontWeight: '600', fontSize: 16 },
  advisorSub: { color: '#2B2A29', opacity: 0.9, fontSize: 14 },
  chatButton: {
    backgroundColor: '#09BD71',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  chatButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },

  sectionWrapper: { marginTop: 30 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  seeAll: { fontSize: 14, fontWeight: '600', color: '#4361EE' },

  institutionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  institutionImage: { width: '100%', height: width * 0.45 },
  institutionOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 8,
  },
  institutionName: { color: '#fff', fontSize: 16, fontWeight: '700' },
  institutionDetail: { color: '#fff', fontSize: 12, marginTop: 2 },

  eventCard: { borderRadius: 16, overflow: 'hidden', position: 'relative' },
  eventImage: { width: '100%', height: width * 0.45 },
  eventOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
  },
  eventTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  eventTime: { color: '#ddd', fontSize: 12, marginTop: 4 },
});

export default HomeScreen;
