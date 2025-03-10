import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { ChatState } from '@/context/ChatProvider'
import UserType from '@/types/user'
import Avatar from '@/component/Avatar'

const index = () => {

  const route = useRouter()

  const {user} =  ChatState() as {user:UserType}

  async function logout() {
    await AsyncStorage.removeItem("userInfo")
    route.replace("/")
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems:'center',marginBottom:20}}>
        <View style={{display:"flex",backgroundColor:"#C7C7C7",flexDirection:"row-reverse",padding:10,gap:10,alignItems:"center",justifyContent:"center",borderRadius:10,borderWidth:0.5}}>
          <View style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center",gap:2}}>
            <Text style={{fontSize:20,fontWeight:"500"}}>{user.name}</Text>
            <Text style={{fontSize:11}}>{user.email}</Text>
          </View>
          <Avatar sender={user} />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout your account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  button:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"center",
    paddingVertical:13,
    paddingHorizontal:40,
    borderRadius:10,
    gap:10,
    backgroundColor:"black"
  },
  buttonText:{
    fontSize:20,
    fontWeight:'500',
    color:"white"
  }
})