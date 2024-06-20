import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function FromDevice({ style }: { style?: ViewStyle }) {
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBackgroundColor }, style]}>
      <ThemedText style={styles.text}>Add from Device Module</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  text: {
    fontSize: 16,
  },
});
