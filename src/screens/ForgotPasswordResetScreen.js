import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '../context/LanguageContext';

const ForgotPasswordResetScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const { email } = route.params || {};
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');

  const onUpdate = () => {
    if (!p1 || !p2 || p1 !== p2) {
      Alert.alert(t('fpResetTitle'), t('fpPasswordsMismatch'));
      return;
    }
    // TODO: call API to update password
    Alert.alert(t('fpResetTitle'), t('passwordUpdated'));
    navigation.navigate('SignIn');
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.body}>
        {/* Logo Row */}
        <View style={styles.logoContainer}>
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>Admission</Text>
            <View style={styles.dotWrapper}>
              <View style={[styles.dot, { backgroundColor: '#2B2A29', top: 0, left: 0, transform: [{ rotate: '20deg' }] }]} />
              <View style={[styles.dot, { width: 10, height: 6, backgroundColor: '#fb923c', top: -2, left: 8, transform: [{ rotate: '45deg' }] }]} />
              <View style={[styles.dot, { width: 8, height: 6, backgroundColor: '#dc2626', top: -4, left: 14, transform: [{ rotate: '70deg' }] }]} />
            </View>
            <Text style={[styles.logoText, { marginLeft: 12 }]}>
              <Text style={{ color: '#2B2A29' }}>.</Text>
              ac
            </Text>
          </View>
        </View>
        <Text style={styles.pageTitle}>{t('fpResetTitle')}</Text>
        <FloatingLabelInput
          label={t('fpNewPassword')}
          value={p1}
          onChangeText={setP1}
          secureTextEntry
        />
        <FloatingLabelInput
          label={t('fpConfirmNewPassword')}
          value={p2}
          onChangeText={setP2}
          secureTextEntry
        />
        <TouchableOpacity style={styles.submitBtn} onPress={onUpdate}>
          <Text style={styles.submitText}>{t('fpUpdatePassword')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  headerBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  headerSpacer: { width: 32 },
  body: { padding: 16 },
  pageTitle: { fontSize: 18, fontWeight: '700', color: '#1f2937', textAlign: 'left', marginBottom: 12 },
  logoContainer: { alignItems: 'center', marginBottom: 12 },
  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  logoText: { fontSize: 28, fontWeight: '400', color: '#1f2937' },
  dotWrapper: { position: 'relative', marginLeft: 4, marginTop: -4 },
  dot: { position: 'absolute', width: 12, height: 8, borderRadius: 50 },
  label: { fontSize: 13, color: '#374151', fontWeight: '600', marginBottom: 6 },
  input: {
    width: '100%', height: 50, backgroundColor: '#F9FAFB', borderRadius: 10,
    paddingHorizontal: 14, borderWidth: 1, borderColor: '#E5E7EB', color: '#111827', fontSize: 15,
  },
  // Floating styles live in component
  submitBtn: { marginTop: 16, backgroundColor: '#2B2A29', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ForgotPasswordResetScreen;


