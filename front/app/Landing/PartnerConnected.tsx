// src/components/Landing/PartnerConnected.tsx
import React from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface ProfileInfo {
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
}

interface PartnerConnectedProps {
  route: {
    params: {
      yourProfile: ProfileInfo;
      partnerProfile: ProfileInfo;
    };
  };
}

const PartnerConnected: React.FC<PartnerConnectedProps> = ({ route }) => {
  const { yourProfile, partnerProfile } = route.params;
  const navigation = useNavigation();

  const handleBackToConnect = () => {
    navigation.navigate('Connect');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.congratsText}>Congratulations! You've connected with your partner!</Text>
      <View style={styles.profileContainer}>
        <Image source={{ uri: yourProfile.profilePictureUrl }} style={styles.profilePicture} />
        <Text style={styles.profileText}>{yourProfile.firstName} {yourProfile.lastName}</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: partnerProfile.profilePictureUrl }} style={styles.profilePicture} />
        <Text style={styles.profileText}>{partnerProfile.firstName} {partnerProfile.lastName}</Text>
      </View>
      <Button title="Back to Connect" onPress={handleBackToConnect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  congratsText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default PartnerConnected;
