import { View, Text } from 'react-native';
import { HelloWave } from '@/components/hello-wave';
import SignOutButton from '@/components/social-auth-buttons/sign-out-button';
import { useAuthContext } from '@/hooks/use-auth-context';

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
