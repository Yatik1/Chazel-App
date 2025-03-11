import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChatState } from '@/context/ChatProvider'
import axios from 'axios'
import Avatar from '@/component/Avatar'
import { useRouter } from 'expo-router'

const index = () => {
 
  const {user,chats,setChats,setSelectedChat} = ChatState() as any

  const [allUsers,setAllUsers] = useState<[]>([])
  const router = useRouter()

  const getAll = async () => {
    try {

      const config = {
        headers: {
          Authorization : `Bearer ${user.token}`
        }
      }

      const {data} = await axios.get(`https://chat-app-9flg.onrender.com/api/user`, config)
      setAllUsers(data)
    } catch (error) {
      console.log("Error occured",error)
    }
  }

  useEffect(() => {
    getAll()
  } , [])

  const accessChat = async (userId:string) => {
    try {
      const config = {
        headers: {
          'Content-type':'application/json',
          Authorization : `Bearer ${user.token}`
        }
      }


      const {data} = await axios.post("https://chat-app-9flg.onrender.com/api/chat" , {userId} , config)
      router.push(`/chats/${data._id}`)

      if(!chats.find((c:any) => c._id === data._id))  setChats([data,...chats]);
      setSelectedChat(data)

    } catch (error) {
      console.log("Error accessing chat", error)
    }
  }



  function renderItem({item:user} : {item:any}) {

   return (
      <TouchableOpacity style={styles.chatItem} onPress={() => accessChat(user._id)}>
        <Avatar sender={user}/>
        <Text style={{fontSize:16,fontWeight:'500'}}>{user.name}</Text>
      </TouchableOpacity>
   )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  )
}

export default index


const styles= StyleSheet.create({
  container: {
    flex: 1,
    padding:8,
    backgroundColor:"white"
},
  chatItem: {
    paddingHorizontal:8,
    paddingVertical: 10,
    borderRadius: 18,
    marginVertical: 4,
    height:49,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    gap:8,
    backgroundColor:"#E8E8E8"
},
})