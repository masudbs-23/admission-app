import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const EventCard = ({ image, title, time, tag, mode }) => {
  return (
    <View style={[styles.card, { marginBottom: 16 }]}> 
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.topRow}>
        <View style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
        <View style={styles.pill}><Text style={styles.pillText}>{mode}</Text></View>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: 16, overflow: 'hidden', position: 'relative' },
  image: { width: '100%', height: width * 0.45 },
  topRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  tag: {
    backgroundColor: 'rgba(9,189,113,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  pill: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillText: { color: '#fff', fontWeight: '600', fontSize: 12 },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  title: { color: '#fff', fontSize: 16, fontWeight: '700' },
  time: { color: '#ddd', fontSize: 12, marginTop: 4 },
});

export default EventCard;


