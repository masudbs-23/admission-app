import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdvisorCard = ({ navigation }) => {
  return (
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
      <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat')}>
        <Text style={styles.chatButtonText}>Chat Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  advisorDetails: {},
  advisorName: { color: '#2B2A29', fontWeight: '600', fontSize: 16 },
  advisorSub: { color: '#2B2A29', opacity: 0.9, fontSize: 14 },
  chatButton: {
    backgroundColor: '#09BD71',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  chatButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});

export default AdvisorCard;


