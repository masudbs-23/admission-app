import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useLanguage } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');

const HomeHeader = ({ insets, navigation, profileName, onMenuPress }) => {
  const { t } = useLanguage();
  return (
    <View style={[styles.header, { paddingTop: insets.top }]}> 
      <View style={styles.row}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.roundIconBtn} onPress={onMenuPress}>
            <Icon name="menu" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Hi, {profileName}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.roundIconBtn}
            onPress={() => navigation.navigate('Notifications')}>
            <Icon name="bell" size={18} color="#ffffff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roundIconBtn, { marginLeft: 10 }]}
            onPress={() => navigation.navigate('Chat')}>
            <Icon name="message-circle" size={18} color="#ffffff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingBottom: 24,
    height: 140,
    backgroundColor: '#2B2A29',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' },
  leftSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  roundIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  greeting: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  profileProgress: {
    fontSize: 12,
    color: '#f0f0f0',
    marginTop: 2,
    fontWeight: '500',
  },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: { 
    color: '#fff', 
    fontSize: 11, 
    fontWeight: '800',
    textAlign: 'center',
  },
});

export default HomeHeader;


