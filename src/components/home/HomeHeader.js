import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LanguageSwitch from '../../component/LanguageSwitch';
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

          <View style={{ marginLeft: 10 }}>
            <LanguageSwitch />
          </View>
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
    paddingHorizontal: 16,
    height: 120,
    backgroundColor: '#09BD71',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' },
  leftSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  roundIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  greeting: { fontSize: 18, fontWeight: '700', color: '#fff' },
  profileProgress: {
    fontSize: 12,
    color: '#f0f0f0',
    marginTop: 2,
    fontWeight: '500',
  },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 0,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});

export default HomeHeader;


