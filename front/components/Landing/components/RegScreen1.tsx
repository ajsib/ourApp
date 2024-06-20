// app/components/Landing/components/RegScreen1.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you are using React Navigation for navigation
import { ThemedText } from '@/components/ThemedText';
import { useRegContext } from '@/components/Landing/RegContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import CaretLeft from '@/assets/icons/CaretLeft'; // Import CaretLeft icon

const RegScreen1: React.FC = () => {
  const { email, setEmail, error, setError, setStep } = useRegContext();
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const navigation = useNavigation();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const nextStep = () => {
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    setError('');
    setStep(2);
  };

  const goToLandingPage = () => {
    navigation.navigate('Landing/index');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToLandingPage} style={styles.caret}>
          <CaretLeft size={24} color={textColor} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.subtitle}>Let's creates your account</ThemedText>
        </View>
      </View>
      <ThemedText style={styles.description}>
        Start with your email.
      </ThemedText>
      <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <TouchableOpacity onPress={nextStep} style={[styles.button, { backgroundColor: cardBackgroundColor }]}>
        <ThemedText style={[styles.buttonText, { color: tintColor }]}>Next</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 20,
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  caret: {
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'TimesNewRoman-Bold',
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default RegScreen1;
