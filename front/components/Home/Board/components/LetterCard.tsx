import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import LetterIcon from '@/assets/icons/Letter';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');
const cardWidth = (width / 3) - 15;

const LetterCard: React.FC = () => {
  const cardBackground = useThemeColor({}, 'cardBackground'); // Fetching the card background color from the theme

  return (
    <TouchableOpacity>
      <ThemedView style={[styles.card, { backgroundColor: cardBackground }]}>
        <ThemedText style={styles.text}>Letters</ThemedText>
        <LetterIcon color="#C21E56" style={styles.icon} /> 
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 160,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-Italic',
    paddingBottom: 8
  },
});

export default LetterCard;
