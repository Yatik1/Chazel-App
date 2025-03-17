import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatBox from '@/components/ChatBox';
import { ChatState } from '@/context/ChatProvider';
import axios from 'axios';

const Page = () => {
  const [messages, setMessages] = useState<string[]>([])
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'space-between', backgroundColor:"white"}}>
      <ChatBox messages={messages} setMessages={setMessages}/>
      <Field messages={messages} setMessages={setMessages} />
    </View>
  )
}

export default Page



const Field = ({messages,setMessages} : {messages:string[],setMessages:React.Dispatch<React.SetStateAction<string[]>>}) => {

  const {bottom} = useSafeAreaInsets()
  const OS = Platform.OS;
  
  const {user,selectedChat} = ChatState() as any

  const [newMessage, setNewMessage] = useState<string>("")

  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": 'application/json',
          Authorization : `Bearer ${user.token}`
        }
      }

      setNewMessage("")

      const {data} = await axios.post("https://chat-app-9flg.onrender.com/api/message" , {
        content:newMessage,
        chatId: selectedChat._id
      },
      config
    )
    setMessages([...messages, data])

    } catch (error) {
      console.log("Error in sending Message", error)
    }
  }

  return (
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
      {newMessage.length > 0 && (
        <TouchableOpacity style={styles.outerCircle} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  )
}

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