// app/(auth)/Connect.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Connect = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter a Code</Text>
      <Text style={styles.text}>or</Text>
      <Text style={styles.text}>Send a Code to your partner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Connect;
