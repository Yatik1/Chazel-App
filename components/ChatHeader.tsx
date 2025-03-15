import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ChatState } from '@/context/ChatProvider'
import Avatar from './Avatar'
import { getSenderFull } from '@/config/ChatLogics'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router'

const ChatHeader = () => {

      const {top} = useSafeAreaInsets()
      const {user,selectedChat,setSelectedChat} = ChatState() as any

      const router = useRouter()

      const chatPerson = !selectedChat.isGroupChat ?getSenderFull(user,selectedChat.users) : selectedChat

      function clickBack() {
        router.back()
        setSelectedChat({})
      }
  return (
    <View style={{display:"flex",flexDirection:"row",backgroundColor:"white",paddingTop:top+5,paddingBottom:10,alignItems:"center"}}>
        <Ionicons name="chevron-back" size={24} color="black" style={{paddingLeft:10}} onPress={clickBack}/>
        <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:8,flex:1}}>
            <Avatar sender={chatPerson} />
            <Text style={styles.text}>{!selectedChat.isGroupChat ? chatPerson.name : selectedChat.chatName}</Text>
        </View>
    </View>
  )
}

export default ChatHeader

const styles = StyleSheet.create({
    text:{
        fontSize:16,
        fontWeight:"bold"
    }
})