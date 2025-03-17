import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { ChatState } from '@/context/ChatProvider'
import axios from 'axios'
import AllChats from './AllChats'

const ChatBox = ({messages,setMessages} : {messages:string[],setMessages:React.Dispatch<React.SetStateAction<string[]>>}) => {

  const {selectedChat, user} = ChatState() as any
  // console.log(selectedChat)

  const fetchChats = async () => {
    if(!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const {data} = await axios.get(
        `https://chat-app-9flg.onrender.com/api/message/${selectedChat._id}`,
        config
      )

      setMessages(data)
      
    } catch (error) {
      console.log("Error fetching chats", error)
    }
  }

  useEffect(() => {
    fetchChats()
  },[selectedChat])

  return (
    <View style={{flex:1,width:"100%", height:"100%"}}>
        <View style={{flex:1,flexDirection:"column", justifyContent:"flex-end", alignItems:"flex-end",padding:10}}>
          <AllChats messages={messages} />
        </View>
    </View>
  )
}

export default ChatBox