// components/Dashboard/Header/components/Header.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import Pin from '@/assets/icons/Pin';

const Header = () => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <ThemedView style={styles.header}>
      <View style={styles.topRow}>
        <ThemedText type="default" style={styles.name}>Clothilde</ThemedText>
        <ThemedText type="default" style={styles.time}>12:30h</ThemedText>
      </View>
      <View style={styles.bottomRow}>
        <Pin size={24} color={iconColor} style={styles.icon} />
        <ThemedText type="default" style={styles.city}>Paris, France</ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Ensure items are centered vertically
    height: 40, 
  },
  name: {
    fontSize: 32,
    lineHeight: 40, // Adjust the line height to ensure the text is fully visible
    fontFamily: 'TimesNewRoman-BoldItalic',
  },
  time: {
    fontSize: 18,
    lineHeight: 24, // Ensure consistent line height
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  city: {
    fontSize: 18,
    lineHeight: 24, // Ensure consistent line height
  },
});

export default Header;
