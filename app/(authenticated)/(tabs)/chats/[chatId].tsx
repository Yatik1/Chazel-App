import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
  
  const {chatId} = useLocalSearchParams<{chatId:string}>()
  return (
    <View>
      <Text>chatId: {chatId}</Text>
    </View>
  )
}

export default Page