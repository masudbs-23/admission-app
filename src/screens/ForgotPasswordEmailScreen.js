import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '../context/LanguageContext';

const ForgotPasswordEmailScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');


  const onSend = () => {
    if (!email) {
      Alert.alert(t('fpEnterEmailTitle'), t('fpEmailPlaceholder'));
      return;
    }
    // TODO: call API to send OTP
    Alert.alert(t('fpEnterEmailTitle'), t('fpCodeSent'));
    navigation.navigate('ForgotPasswordOTP', { email });
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
        {/* Logo from SignIn */}
        <View style={styles.logoContainer}>
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
        <Text style={styles.pageTitle}>{t('forgotPassword')}</Text>
        <Text style={styles.pageSubtitle}>{t('fpEmailSubtitle')}</Text>
        {/* <Text style={styles.label}>{t('fpEmailLabel')}</Text> */}
        <FloatingLabelInput
          label={t('fpEmailLabel')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.submitBtn} onPress={onSend}>
          <Text style={styles.submitText}>{t('fpSendCode')}</Text>
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
  pageTitle: { fontSize: 18, fontWeight: '500', color: '#2B2A29', textAlign: 'left', marginBottom: 12 },
  pageSubtitle: { fontSize: 13, color: '#727271', marginTop: -4, marginBottom: 10 },
  // Floating label styles are now inside component
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
  submitBtn: { marginTop: 16, backgroundColor: '#09BD71', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ForgotPasswordEmailScreen;


