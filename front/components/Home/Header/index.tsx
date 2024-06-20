// components/Dashboard/Header/index.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Header from './components/Header';

const HeaderContainer = () => {
  return (
    <ThemedView style={styles.container}>
      <Header/>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
});

export default HeaderContainer;
