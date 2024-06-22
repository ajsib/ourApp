// @/components/Landing/components/PartnerInfo.tsx

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface PartnerInfoProps {
  partnerInfo: {
    profilePictureUrl: string;
    firstName: string;
    lastName: string;
  };
}

const PartnerInfo: React.FC<PartnerInfoProps> = ({ partnerInfo }) => {
  return (
    <View style={styles.partnerInfoContainer}>
      <Image source={{ uri: partnerInfo.profilePictureUrl }} style={styles.profilePicture} />
      <View style={styles.partnerTextContainer}>
        <ThemedText style={styles.partnerText}>{partnerInfo.firstName}</ThemedText>
        <ThemedText style={styles.partnerText}>{partnerInfo.lastName}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  partnerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    padding: 20,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  partnerTextContainer: {
    justifyContent: 'center',
  },
  partnerText: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-Bold',
  },
});

export default PartnerInfo;
