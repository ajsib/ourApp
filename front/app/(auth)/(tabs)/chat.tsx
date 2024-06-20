// app/(auth)/tabs/chat.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/components/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function ChatPage() {
  const { signOut } = useAuth();
  const linkColor = useThemeColor({}, 'tint');

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title">Chat Page</ThemedText>
      </View>
      <TouchableOpacity onPress={signOut} style={styles.signOutContainer}>
        <Text style={[styles.signOutText]}>
          Sign out <Text style={[styles.signOutLink, { color: linkColor }]}>here</Text>
        </Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutContainer: {
    marginBottom: 20, // Adjust as needed for bottom spacing
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'TimesNewRoman-Italic',
    textAlign: 'center',
  },
  signOutLink: {
    fontFamily: 'TimesNewRoman-BoldItalic',
  },
});
