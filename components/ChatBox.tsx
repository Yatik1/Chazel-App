import { View, Text } from 'react-native'
import React from 'react'
import { ChatState } from '@/context/ChatProvider'

const ChatBox = () => {

  const {selectedChat, user} = ChatState() as any
  console.log(selectedChat)

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
      <Text>Start your conversation</Text>
    </View>
  )
}

export default ChatBox