import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const WhyChooseUs = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default WhyChooseUs;


