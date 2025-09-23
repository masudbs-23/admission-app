import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For back arrow
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OTPVerificationScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isResendActive, setIsResendActive] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 20 + insets.bottom }] }>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backBtn}>
            <Icon name="chevron-back-outline" size={24} color="#000000" />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>Admission</Text>
            <View style={styles.dotWrapper}>
              <View
                style={[styles.dot, { backgroundColor: '#f97316', top: 0, left: 0, transform: [{ rotate: '20deg' }] }]}
              />
              <View
                style={[styles.dot, { width: 10, height: 6, backgroundColor: '#fb923c', top: -2, left: 8, transform: [{ rotate: '45deg' }] }]}
              />
              <View
                style={[styles.dot, { width: 8, height: 6, backgroundColor: '#dc2626', top: -4, left: 14, transform: [{ rotate: '70deg' }] }]}
              />
            </View>
            <Text style={[styles.logoText, { marginLeft: 12 }]}>.ac</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.description}>
            Please enter the verification code shared to {'\n'}
            <Text style={{ fontWeight: '500', color: '#374151' }}> ***@gmail.com</Text>
          </Text>

          {/* OTP Input Fields */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                style={styles.otpInput}
                value={digit}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(val) => handleInputChange(index, val)}
                onKeyPress={(e) => handleKeyPress(index, e)}
              />
            ))}
          </View>

          {/* Resend OTP */}
          <Text style={styles.resendText}>
            Still not received OTP?{' '}
            <Text
              style={[styles.resendLink, isResendActive && { color: '#dc2626' }]}
              onPress={() => setIsResendActive(true)}
            >
              Resend OTP
            </Text>
          </Text>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitBtn,
              otp.every((digit) => digit !== '') && { backgroundColor: '#09BD71' },
            ]}
            disabled={!otp.every((digit) => digit !== '')}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between backBtn and logoRow
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    display:'none'
  },
  logoText: {
    fontSize: 25,
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E232C',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 32,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  otpInput: {
    width: 60,
    height: 60,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    borderWidth:1,
    borderColor:'#C0C0C0'
  },
  resendText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  resendLink: {
    color: '#ef4444',
    fontWeight: '500',
  },
  submitBtn: {
    height: 56,
    borderRadius: 24,
    backgroundColor: '#09BD71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
