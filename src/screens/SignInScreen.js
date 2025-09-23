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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignInScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // এখানে Signin successful হলে Main tab এ যাবে
      navigation.replace('Main');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Spinner Overlay */}
      <Spinner
        visible={loading}
        textStyle={{ color: '#09BD71' }}
        overlayColor="rgba(255,255,255,0.7)"
        customIndicator={<ActivityIndicator size="large" color="#09BD71" />}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: 40 + insets.bottom }]}
          keyboardShouldPersistTaps="handled"
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
                    backgroundColor: '#09BD71',
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

            <Text style={[styles.logoText, { marginLeft: 12 }]}>
              <Text style={{ color: '#09BD71' }}>.</Text>
              ac
            </Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Sign in to your account</Text>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              value={formData.email}
              onChangeText={(v) => handleInputChange('email', v)}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password"
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

          {/* Sign In Button */}
          <TouchableOpacity style={styles.signUpBtn} onPress={handleSignin}>
            <Text style={styles.signUpText}>Sign in</Text>
          </TouchableOpacity>

          {/* Not a member */}
          <View style={styles.signInRow}>
            <Text style={styles.signInHint}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signInLink}>Sign up</Text>
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
    backgroundColor: '#09BD71',
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
});
