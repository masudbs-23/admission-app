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
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Icon name="menu" size={26} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.greeting}>Hi, {profileName}</Text>
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
  );
};

const styles = StyleSheet.create({
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
  menuButton: { marginRight: 4 },
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
});

export default HomeHeader;


