// app/Landing/LoginScreen.tsx
import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import CaretLeft from '@/assets/icons/CaretLeft';
import { LoginProvider, useLoginContext } from '@/components/Landing/LoginContext';

const LoginScreenContent: React.FC = () => {
  const { email, setEmail, password, setPassword, error, login } = useLoginContext();
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const navigation = useNavigation();

  const goToLandingPage = () => {
    navigation.navigate('Landing/index');
  };

  const goToRegisterPage = () => {
    navigation.navigate('Landing/RegisterScreen');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToLandingPage} style={styles.caret}>
            <CaretLeft size={24} color={textColor} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.subtitle}>Welcome Back</ThemedText>
          </View>
        </View>
        <ThemedText style={styles.description}>
          To sign in to your account, enter your email and password below:
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
        </View>
        <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
          <TextInput
            style={[styles.input, { color: textColor }]}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <TouchableOpacity onPress={login} style={[styles.button, { backgroundColor: cardBackgroundColor }]}>
          <ThemedText style={[styles.buttonText, { color: tintColor }]}>Sign In</ThemedText>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.signUpContainer}>
        <ThemedText style={styles.signUpText}>
          Don't have an account? <Text style={[styles.signUpLink, { color: tintColor }]} onPress={goToRegisterPage}>Sign up here</Text>
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default function LoginScreen() {
  return (
    <LoginProvider>
      <LoginScreenContent />
    </LoginProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 20, 
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
  signUpContainer: {
    marginTop: 20, 
    marginBottom: 40, 
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    fontFamily: 'TimesNewRoman-Italic',
    color: '#999',
    textAlign: 'center',
  },
  signUpLink: {
    fontFamily: 'TimesNewRoman-BoldItalic',
  },
});
