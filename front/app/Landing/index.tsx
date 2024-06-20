// app/Landing/index.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Landing() {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>OurApp</ThemedText>
      <ThemedText style={styles.marketingText}>
        A private place for just the two of us – welcome to deeper connections.
      </ThemedText>
      <View style={styles.featuresRow}>
        <ThemedText style={styles.featureItem}>Timeline for photos and videos</ThemedText>
        <ThemedText style={styles.featureItem}>Shared Notes</ThemedText>
        <ThemedText style={styles.featureItem}>End to end encrypted chat</ThemedText>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing/LoginScreen')}>
          <ThemedText style={styles.primaryButton}>Sign In</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Landing/RegisterScreen')}>
          <ThemedText style={styles.secondaryButton}>Register</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 48,
    lineHeight: 60,
    fontFamily: 'TimesNewRoman-Bold',
    marginBottom: 20,
  },
  marketingText: {
    fontSize: 24,
    fontFamily: 'TimesNewRoman-Italic',
    textAlign: 'center',
    marginBottom: 40,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 60,
  },
  featureItem: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman',
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 60,
  },
  primaryButton: {
    fontSize: 20,
    fontFamily: 'TimesNewRoman-BoldItalic',
    marginHorizontal: 20,
  },
  secondaryButton: {
    fontSize: 20,
    fontFamily: 'TimesNewRoman-Italic',
    marginHorizontal: 20,
  },
});
