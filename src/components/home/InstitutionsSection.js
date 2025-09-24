import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const InstitutionsSection = ({ navigation }) => {
  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Institutions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Institutions')}>
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
          <Text style={styles.institutionDetail}>Tuition Fees: $50,000</Text>
          <Text style={styles.institutionDetail}>Intake: Fall 2025</Text>
        </View>
      </View>
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
});

export default InstitutionsSection;


