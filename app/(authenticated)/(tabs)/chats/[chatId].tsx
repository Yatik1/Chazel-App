import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatState } from '@/context/ChatProvider';
import axios from 'axios';
import { io, Socket } from "socket.io-client";
import animationData from '@/animations/typing.json'
import AllChats from '@/components/AllChats';

const ENDPOINT = "https://chat-app-9flg.onrender.com"; 
let socket: Socket;
let selectedChatCompare:any

const Page = () => {
  const {bottom} = useSafeAreaInsets()
  const OS = Platform.OS;

  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false)
  const [typing, setTyping] = useState<boolean>(false)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const {selectedChat, user} = ChatState() as any

  const fetchMessages = async () => {
    if(!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      setLoading(true)

      const {data} = await axios.get(
        `https://chat-app-9flg.onrender.com/api/message/${selectedChat._id}`,
        config
      )

      setMessages(data)
      setLoading(false)

      socket.emit("join chat", selectedChat._id)
      
    } catch (error) {
      console.error("Error fetching messages", error)
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage) return;
  
    socket.emit("stop typing", selectedChat._id)
    try {
      const config = {
        headers: {
          "Content-Type": 'application/json',
          Authorization : `Bearer ${user.token}`
        }
      }

      setNewMessage("")

      const {data} = await axios.post("https://chat-app-9flg.onrender.com/api/message", {
        content: newMessage,
        chatId: selectedChat._id
      }, config)

      socket.emit("new message", data)
      setMessages([...messages, data])

    } catch (error) {
      console.error("Error in sending Message", error)
      setNewMessage(newMessage)
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

  }, [])

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat])

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved:any) => {
    if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
      return;
    } else{
      setMessages([...messages, newMessageRecieved])
    }
    })
  })

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'space-between', backgroundColor:"white"}}>
          <View style={{flex:1,width:"100%", height:"100%"}}>
            <AllChats messages={messages} selectedChat={selectedChat}/>
          </View>

          <View style={[styles.wrapper, {paddingBottom:OS === "ios" ? bottom-8 : bottom+15}]}>
            <TextInput 
              style={styles.field}
              placeholder='Message....'
              keyboardType='default'
              value={newMessage}
              onChangeText={setNewMessage}
              autoCapitalize='none'
              autoCorrect={false}
              autoFocus={false}
            />
                <TouchableOpacity style={styles.outerCircle} onPress={sendMessage}>
                  <Ionicons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
          </View>
  )
}

export default Page


const styles = StyleSheet.create({
  wrapper:{
    display:"flex",
    flexDirection:"row",
    gap:8,
    alignItems:"center",
    justifyContent:"center",
    paddingTop:10,
    width:"100%",
    paddingHorizontal:10,
  },
  field:{
    padding:10,
    borderWidth:0.3,
    borderRadius:100,
    fontSize:15,
    borderColor:"gray",
    flex:1,
},
outerCircle:{
  backgroundColor:"black",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  padding:"auto",
  width:40,
  height:40,
  borderRadius:"100%"
}
})