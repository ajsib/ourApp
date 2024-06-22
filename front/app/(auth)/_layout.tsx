// app/(auth)/_layout.tsx
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/components/AuthContext';
import { ActivityIndicator, useColorScheme, View, StyleSheet } from 'react-native';

export default function AuthLayout() {
  const { session, isLoading, partnerInfo } = useAuth();
  console.log(partnerInfo)
  const colorScheme = useColorScheme();

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

  if (session && !partnerInfo) {
    return <Redirect href="Landing/Connect" />;
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
