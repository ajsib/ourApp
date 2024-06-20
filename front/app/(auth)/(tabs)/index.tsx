import React from 'react';
import { StyleSheet, ScrollView, StatusBar, Platform, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Home/Header';
import Board from '@/components/Home/Board';
import Timeline from '@/components/Home/Timeline'; // Import Timeline

export default function IndexPage() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.statusBarPadding} />
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Board />
        <Timeline />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  statusBarPadding: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
});
