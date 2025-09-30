import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value === '' ? 0 : 1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedIsFocused, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value === '') {
      Animated.timing(animatedIsFocused, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    }
  };

  const labelStyle = {
    position: 'absolute',
    left: animatedIsFocused.interpolate({ inputRange: [0, 1], outputRange: [16, 16] }),
    top: animatedIsFocused.interpolate({ inputRange: [0, 1], outputRange: [20, -8] }),
    fontSize: animatedIsFocused.interpolate({ inputRange: [0, 1], outputRange: [16, 12] }),
    color: animatedIsFocused.interpolate({ inputRange: [0, 1], outputRange: ['#999', '#666'] }),
    backgroundColor: animatedIsFocused.interpolate({ inputRange: [0, 1], outputRange: ['transparent', '#fff'] }),
    paddingHorizontal: animatedIsFocused.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }),
    zIndex: 1,
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, isFocused && styles.textInputFocused]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          blurOnSubmit={false}
        />
        {secureTextEntry && (
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon 
              name={isPasswordVisible ? 'eye-off' : 'eye'} 
              size={20} 
              color="#9CA3AF" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative', marginVertical: 8 },
  inputContainer: { position: 'relative', flexDirection: 'row', alignItems: 'center' },
  textInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E4E7E9',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  textInputFocused: { borderColor: '#2B2A29', backgroundColor: '#fff' },
  eyeIcon: { 
    position: 'absolute', 
    right: 10, 
    height: 56, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 28,
    padding: 4,
  },
});

export default FloatingLabelInput;
