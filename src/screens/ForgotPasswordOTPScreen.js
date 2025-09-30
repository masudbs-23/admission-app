import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '../shared';
import { ROUTES } from '../config/routes';

const ForgotPasswordOTPScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const { email } = route.params || {};
  const [digits, setDigits] = useState(['', '', '', '']);
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onVerify = () => {
    const code = digits.join('');
    if (!code || code.length < 4) {
      Alert.alert(t('fpOtpTitle'), t('fpOtpSubtitle'));
      return;
    }
    // TODO: verify OTP via API
    navigation.navigate(ROUTES.AUTH.FORGOT_PASSWORD_RESET, { email });
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
        <Text style={styles.pageTitle}>{t('fpOtpTitle')}</Text>
        <Text style={styles.description}>
          {t('fpOtpSubtitle')}{'\n'}
          <Text style={{ fontWeight: '500', color: '#374151' }}>{email ? ` ${email}` : ''}</Text>
        </Text>
        <View style={styles.otpRow}>
          {digits.map((d, idx) => (
            <TextInput
              key={idx}
              ref={refs[idx]}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digits[idx]}
              onChangeText={(val) => {
                const v = val.replace(/\D/g, '').slice(0,1);
                const next = [...digits];
                next[idx] = v;
                setDigits(next);
                if (v && idx < 3) refs[idx+1].current?.focus();
              }}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !digits[idx] && idx > 0) {
                  refs[idx-1].current?.focus();
                }
              }}
            />
          ))}
        </View>
        {/* Resend OTP */}
        <Text style={styles.resendText}>
          Still not received OTP?{' '}
          <Text style={styles.resendLink} onPress={onVerify}>{t('fpVerify')}</Text>
        </Text>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={onVerify}>
          <Text style={styles.submitText}>{t('fpVerify')}</Text>
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
  pageTitle: { fontSize: 18, fontWeight: '700', color: '#1f2937', textAlign: 'left', marginBottom: 6 },
  logoContainer: { alignItems: 'center', marginBottom: 12 },
  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  logoText: { fontSize: 28, fontWeight: '400', color: '#1f2937' },
  dotWrapper: { position: 'relative', marginLeft: 4, marginTop: -4 },
  dot: { position: 'absolute', width: 12, height: 8, borderRadius: 50 },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 8 },
  otpInput: {
    width: 60, height: 56, backgroundColor: '#F9FAFB', borderRadius: 10,
    borderWidth: 1, borderColor: '#E5E7EB', color: '#111827', fontSize: 20,
    textAlign: 'center',
  },
  resendText: { fontSize: 14, color: '#6b7280', marginBottom: 10, textAlign: 'center',marginTop:10 },
  resendLink: { color: '#ef4444', fontWeight: '500' },
  submitBtn: { marginTop: 6, backgroundColor: '#2B2A29', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ForgotPasswordOTPScreen;


