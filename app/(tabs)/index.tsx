import { Image } from 'expo-image'
import { View } from 'react-native'

import { HelloWave } from '@/components/hello-wave'
import ParallaxScrollView from '@/components/parallax-scroll-view'
import SignOutButton from '@/components/social-auth-buttons/sign-out-button'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useAuthContext } from '@/hooks/use-auth-context'

export default function HomeScreen() {
  const { profile } = useAuthContext()
  return (
    <ParallaxScrollView
    // TODO: fix this to use the theme colors
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      // headerBackgroundColor={{ light: 'hsl(var(--secondary))', dark: 'hsl(var(--secondary))' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          // TODO: fix this to use the theme colors
          // className="h-[178px] w-[290px] absolute bottom-0 left-0"
          style={{
            height: 178,
            width: 290,
            bottom: 0,
            left: 0,
            position: 'absolute',
          }}
        />
      }
    >
      <View className="flex-row items-center gap-2">
        <Text className="text-3xl font-bold">Welcome!</Text>
        <HelloWave />
      </View>

      <Button 
        variant="default"
        onPress={() => {
          console.log('toggle theme');
        }}
        size="lg"
        className="mt-4"
      >
        <Text>Toggle theme</Text>
      </Button>

      <View className="gap-2 mb-2">
        <Text className="text-xl font-medium">Username</Text>
        <Text>{profile?.username}</Text>
        <Text className="text-xl font-medium">Full name</Text>
        <Text>{profile?.full_name}</Text>
      </View>

      <SignOutButton />
    </ParallaxScrollView>
  )
}
