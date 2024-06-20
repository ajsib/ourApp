// app/(auth)/_layout.tsx
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/components/AuthContext';
import { useEffect } from 'react';
import { ActivityIndicator, Text, useColorScheme, View, StyleSheet } from 'react-native';

export default function AuthLayout() {
  const { session, isLoading } = useAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log('Auth state changed:', { session, isLoading });
  }, [session, isLoading]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }]}>
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? 'white' : 'black'} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/Landing" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
