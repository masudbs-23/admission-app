import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import CustomToast from '../components/CustomToast';
import { useAuthMutations } from '../hooks/useAuthMutations';
import { useLanguage } from '../context/LanguageContext';

const SignUpScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { registerMutation } = useAuthMutations();
  const insets = useSafeAreaInsets();
  const { register } = useAuth();
  const loading = registerMutation.isPending;
  const { t } = useLanguage();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    if (!formData.email || !formData.password) {
      setToastMessage('Please fill in all fields');
      setToastType('error');
      setToastVisible(true);
      return;
    }

    if (formData.password.length < 6) {
      setToastMessage('Password must be at least 6 characters long');
      setToastType('error');
      setToastVisible(true);
      return;
    }

    try {
      const result = await registerMutation.mutateAsync({ email: formData.email, password: formData.password });
      
      if (result.success) {
        // Navigate to OTP verification with email
        navigation.navigate('OTPVerification', { email: formData.email });
      } else {
        // Show backend error like "User already exists"
        setToastMessage(result.error || 'Something went wrong');
        setToastType('error');
        setToastVisible(true);
      }
    } catch (error) {
      setToastMessage('Network error. Please try again.');
      setToastType('error');
      setToastVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Spinner Overlay */}
      <Spinner
        visible={loading}
        textStyle={{ color: '#2B2A29' }}
        overlayColor="rgba(255,255,255,0.7)"
        customIndicator={<ActivityIndicator size="large" color="#2B2A29" />}
      />
      {loading && (
        <View style={styles.fullscreenOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" color="#2B2A29" />
        </View>
      )}
      {/* Custom Toast */}
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        duration={2000}
        onHide={() => setToastVisible(false)}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={insets.top}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: 40 + insets.bottom, paddingTop: insets.top }]}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="always"
          showsVerticalScrollIndicator={false}>

          {/* Top Logo Image */}
          <Image
            source={{
              uri: 'https://i.ibb.co.com/KzhXCxTr/Chat-GPT-Image-Sep-9-2025-05-36-43-PM.png',
            }}
            style={styles.topLogo}
            resizeMode="cover"
          />

          {/* Logo Row */}
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>Admission</Text>
            <View style={styles.dotWrapper}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: '#2B2A29',
                    top: 0,
                    left: 0,
                    transform: [{ rotate: '20deg' }],
                  },
                ]}
              />
              <View
                style={[
                  styles.dot,
                  {
                    width: 10,
                    height: 6,
                    backgroundColor: '#fb923c',
                    top: -2,
                    left: 8,
                    transform: [{ rotate: '45deg' }],
                  },
                ]}
              />
              <View
                style={[
                  styles.dot,
                  {
                    width: 8,
                    height: 6,
                    backgroundColor: '#dc2626',
                    top: -4,
                    left: 14,
                    transform: [{ rotate: '70deg' }],
                  },
                ]}
              />
            </View>

            {/* .ac with green dot */}
            <Text style={[styles.logoText, { marginLeft: 12 }]}>
              <Text style={{ color: '#2B2A29' }}>.</Text>
              ac
            </Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{t('signUp')}</Text>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder={t('email')}
              placeholderTextColor="#9ca3af"
              value={formData.email}
              onChangeText={(v) => handleInputChange('email', v)}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder={t('password')}
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(v) => handleInputChange('password', v)}
            />
            <TouchableOpacity
              style={styles.inputIcon}
              onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.signUpBtn, loading && { opacity: 0.7 }]}
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpText}>{t('signUp')}</Text>
          </TouchableOpacity>

          {/* Already Member */}
          <View style={styles.signInRow}>
            <Text style={styles.signInHint}>{t('alreadyMember')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInLink}>{t('signIn')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  topLogo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'left',
    marginBottom: 32,
    lineHeight: 28,
    width: '100%',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 48,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  signUpBtn: {
    width: '100%',
    height: 56,
    borderRadius: 24,
    backgroundColor: '#2B2A29',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signUpText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  signInHint: {
    color: '#6b7280',
    fontSize: 14,
  },
  signInLink: {
    color: '#000080',
    fontSize: 14,
    fontWeight: '600',
  },
  fullscreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});
