// app/Landing/RegisterScreen.tsx
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RegProvider, useRegContext } from '@/components/Landing/RegContext';
import RegScreen1 from '@/components/Landing/components/RegScreen1';
import RegScreen2 from '@/components/Landing/components/RegScreen2';
import RegScreen3 from '@/components/Landing/components/RegScreen3';
import { useThemeColor } from '@/hooks/useThemeColor';

const RegisterScreenContent: React.FC = () => {
  const { step } = useRegContext();
  const tintColor = useThemeColor({}, 'tint');
  const navigation = useNavigation();

  const goToLoginPage = () => {
    navigation.navigate('Landing/LoginScreen');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <RegScreen1 />;
      case 2:
        return <RegScreen2 />;
      case 3:
        return <RegScreen3 />;
      default:
        return (
          <>
            <ThemedText style={styles.subtitle}>All Done!</ThemedText>
            <ThemedText style={styles.description}>You have successfully registered.</ThemedText>
          </>
        );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderStepContent()}
      </ScrollView>
      {step === 1 && (
        <View style={styles.loginContainer}>
          <ThemedText style={styles.loginText}>
            Already have an account?{' '}
            <Text style={[styles.loginLink, { color: tintColor }]} onPress={goToLoginPage}>
              Log in here
            </Text>
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
};

export default function RegisterScreen() {
  return (
    <RegProvider>
      <RegisterScreenContent />
    </RegProvider>
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
    paddingBottom: 40, 
  },
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
  loginContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'TimesNewRoman-Italic',
    color: '#999',
    textAlign: 'center',
  },
  loginLink: {
    fontFamily: 'TimesNewRoman-BoldItalic',
  },
});
