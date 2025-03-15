import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatBox from '@/components/ChatBox';

const Page = () => {
  
  const {chatId} = useLocalSearchParams<{chatId:string}>()

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'space-between', backgroundColor:"white"}}>
      <ChatBox />
      <Field />
    </View>
  )
}

export default Page



const Field = () => {

  const {bottom} = useSafeAreaInsets()
  const OS = Platform.OS;
  
  const [message, setMessage] = useState<string>("")
  const isMessage = message.length > 0;

  return (
    <View style={[styles.wrapper, {paddingBottom:OS === "ios" ? bottom-8 : bottom+15}]}>
      <TextInput 
        style={styles.field}
        placeholder='Message....'
        keyboardType='default'
        value={message}
        onChangeText={setMessage}
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus={false}
      />
      {isMessage && (
        <TouchableOpacity style={styles.outerCircle} onPress={() => console.log(message)}>
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