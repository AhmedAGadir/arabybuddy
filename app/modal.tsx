import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function ModalScreen() {
  return (
    <View>
      <Text>This is a modal</Text>
      <Link href="/" dismissTo>
        <Text>Go to home screen</Text>
      </Link>
    </View>
  );
}
