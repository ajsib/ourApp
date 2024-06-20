// app/components/Landing/components/RegScreen2.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRegContext } from '@/components/Landing/RegContext';
import { useThemeColor } from '@/hooks/useThemeColor';

const RegScreen2: React.FC = () => {
  const { password, setPassword, confirmPassword, setConfirmPassword, error, setError, setStep } = useRegContext();
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const validatePassword = (password: string) => {
    const capitalLetterRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return capitalLetterRegex.test(password) && specialCharRegex.test(password);
  };

  const nextStep = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must contain at least one capital letter and one special character');
      return;
    }
    setError('');
    setStep(3);
  };

  return (
    <>
      <ThemedText style={styles.subtitle}>Secure your account</ThemedText>
      <ThemedText style={styles.description}>
        Let's get a password. This is how you will log in. Ensure it contains at least one capital letter and one special character.
      </ThemedText>
      <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={() => setStep(1)} style={[styles.button, { backgroundColor: cardBackgroundColor }]}>
          <ThemedText style={[styles.buttonText, { color: tintColor }]}>Back</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextStep} style={[styles.button, { backgroundColor: cardBackgroundColor }]}>
          <ThemedText style={[styles.buttonText, { color: tintColor }]}>Next</ThemedText>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'TimesNewRoman-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    fontFamily: 'TimesNewRoman-Italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  input: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman',
    padding: 10,
  },
  button: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-BoldItalic',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default RegScreen2;
