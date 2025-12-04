import React, { useState } from 'react';
import {
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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../shared';
import { CustomToast, FloatingLabelInput } from '../shared';
import { ROUTES } from '../config/routes';
import { useAuthMutations } from '../hooks/useAuthMutations';
import { useLanguage } from '../shared';

const SignInScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { loginMutation } = useAuthMutations();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const loading = loginMutation.isPending;
  const { t } = useLanguage();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignin = async () => {
    if (!formData.email || !formData.password) {
      setToastMessage('Please fill in all fields');
      setToastType('error');
      setToastVisible(true);
      return;
    }

    try {
      const result = await loginMutation.mutateAsync({ email: formData.email, password: formData.password });
      
      if (result.success) {
        navigation.replace('Main');
      } else {
        // Show backend error like "Invalid credentials"
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Spinner Overlay */}
      <Spinner
        visible={loading}
        textStyle={{ color: '#2B2A29' }}
        overlayColor="rgba(255,255,255,0.7)"
        customIndicator={<ActivityIndicator size="large" color="#2B2A29" />}
      />
      {/* Custom Toast */}
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        duration={2000}
        onHide={() => setToastVisible(false)}
      />
      {/* {loading && (
        <View style={styles.fullscreenOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" color="#2B2A29" />
        </View>
      )} */}

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
            source={require('../assets/logo.png')}
            style={styles.topLogo}
            resizeMode="cover"
          />

          {/* Logo Row */}
          

          {/* Title */}
          <Text style={styles.title}>{t('signInTitle')}</Text>

          {/* Email */}
          <FloatingLabelInput
            label={t('email')}
            value={formData.email}
            onChangeText={(v) => handleInputChange('email', v)}
            keyboardType="email-address"
          />

          {/* Password */}
          <FloatingLabelInput
            label={t('password')}
            value={formData.password}
            onChangeText={(v) => handleInputChange('password', v)}
            secureTextEntry={true}
          />

          {/* Forgot Password (above sign in, right aligned) */}
          <TouchableOpacity style={styles.forgotRow} onPress={() => navigation.navigate(ROUTES.AUTH.FORGOT_PASSWORD_EMAIL)}>
            <Text style={styles.forgotText}>{t('forgotPassword')}</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.signUpBtn, loading && { opacity: 0.7 }]}
            onPress={handleSignin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpText}>{t('signIn')}</Text>
          </TouchableOpacity>

          {/* Not a member */}
          <View style={styles.signInRow}>
            <Text style={styles.signInHint}>{t('dontHaveAccount')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.AUTH.SIGN_UP)}>
              <Text style={styles.signInLink}>{t('signUp')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 40,
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
    backgroundColor: '#1BB161',
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
  forgotRow: { alignItems: 'flex-end', width: '100%' },
  forgotText: { color: '#323232', fontSize: 14, fontWeight: '600' },
  signInHint: {
    color: '#6b7280',
    fontSize: 14,
  },
  signInLink: {
    color: '#323232',
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
