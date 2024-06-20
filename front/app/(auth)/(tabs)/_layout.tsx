// app/(auth)/tabs/_layout.tsx
import { Tabs } from 'expo-router';
import HomeIcon from '@/assets/icons/Home';
import AddIcon from '@/assets/icons/Add';
import ChatIcon from '@/assets/icons/Chat';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/components/AuthContext';

export default function TabLayout() {
  const iconColorInactive = useThemeColor({}, 'tabIconDefault');
  const iconColorActive = useThemeColor({}, 'tabIconSelected');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: iconColorActive,
        tabBarInactiveTintColor: iconColorInactive,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AddIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChatIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
