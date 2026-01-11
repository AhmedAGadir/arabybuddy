import { View, Text } from 'react-native';
import { HelloWave } from '@/shared/components/HelloWave';
import { SignOutButton, useAuthContext } from '@/features/auth';

export default function HomeScreen() {
  const { profile } = useAuthContext();
  return (
    <View>
      <View>
        <Text>Welcome!</Text>
        <HelloWave />
      </View>

      <View>
        <Text>Username</Text>
        <Text>{profile?.username}</Text>
        <Text>Full name</Text>
        <Text>{profile?.full_name}</Text>
      </View>

      <SignOutButton />
    </View>
  );
}

