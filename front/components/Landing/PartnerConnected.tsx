// src/components/Landing/PartnerConnected.tsx
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ProfileInfo {
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
}

interface PartnerConnectedProps {
  yourProfile: ProfileInfo;
  partnerProfile: ProfileInfo;
}

const PartnerConnected: React.FC<PartnerConnectedProps> = ({ yourProfile, partnerProfile }) => {
  const navigation = useNavigation();
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleNavigateToTimeline = () => {
    navigation.navigate('(auth)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>🎉 Congratulations! 🎉</ThemedText>
      <ThemedText style={styles.subheader}>You've connected with your partner! ❤️</ThemedText>
      
      <View style={styles.profileCardContainer}>
        <ThemedView style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
          <Image source={{ uri: yourProfile.profilePictureUrl }} style={styles.profilePicture} />
          <ThemedText style={styles.nameText}>{yourProfile.firstName}</ThemedText>
          <ThemedText style={styles.surnameText}>{yourProfile.lastName}</ThemedText>
        </ThemedView>
        
        <ThemedView style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
          <Image source={{ uri: partnerProfile.profilePictureUrl }} style={styles.profilePicture} />
          <ThemedText style={styles.nameText}>{partnerProfile.firstName}</ThemedText>
          <ThemedText style={styles.surnameText}>{partnerProfile.lastName}</ThemedText>
        </ThemedView>
      </View>
      
      <TouchableOpacity style={[styles.button, { borderColor: tintColor }]} onPress={handleNavigateToTimeline}>
        <ThemedText style={[styles.buttonText, { color: tintColor }]}>Checkout Your Timeline</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 80,
  },
  header: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'TimesNewRoman-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 20,
    fontFamily: 'TimesNewRoman-Italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileCardContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  card: {
    width: '45%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-Bold',
    textAlign: 'center',
  },
  surnameText: {
    fontSize: 16,
    fontFamily: 'TimesNewRoman-Italic',
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-BoldItalic',
  },
});

export default PartnerConnected;
