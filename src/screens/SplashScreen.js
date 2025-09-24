import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centerWrap}>
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>Admission</Text>
          <View style={styles.dotWrapper}>
            <View style={[styles.dot, { backgroundColor: '#09BD71', top: 0, left: 0, transform: [{ rotate: '20deg' }] }]} />
            <View style={[styles.dot, { width: 10, height: 6, backgroundColor: '#fb923c', top: -2, left: 8, transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.dot, { width: 8, height: 6, backgroundColor: '#dc2626', top: -4, left: 14, transform: [{ rotate: '70deg' }] }]} />
          </View>
          <Text style={[styles.logoText, { marginLeft: 12 }]}>
            <Text style={{ color: '#09BD71' }}>.</Text>
            ac
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '400',
    color: '#1f2937',
  },
  dotWrapper: {
    position: 'relative',
    marginLeft: 4,
    marginTop: -4,
  },
  dot: {
    position: 'absolute',
    width: 12,
    height: 8,
    borderRadius: 50,
  },
});


