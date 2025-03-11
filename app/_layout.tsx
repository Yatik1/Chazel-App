
import ChatProvider from '@/context/ChatProvider';
import { Stack } from 'expo-router';


export default function RootLayout() {


  return (
    <ChatProvider>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' />

        <Stack.Screen 
          name='auth/login' 
          options={{
            presentation:"modal",
          }} 
        />

        <Stack.Screen 
          name='auth/signup'
          options={{
            presentation:"modal"
          }} 
        />

        <Stack.Screen 
          name='(authenticated)'
        />
      </Stack>
    </ChatProvider>
  );
}
