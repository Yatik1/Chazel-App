import { View, Text, StyleSheet, TextInput, TouchableOpacity, Touchable, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {

  const [email,setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [loading,setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  
  const router = useRouter()

  useEffect(() => {
    if(email && password) {
      setDisabled(false)
    }
  },[email,password])

  async function handleLogin() {

    if(!email || !password) {
      alert("Every fields must be filled")
      return
    }

    try {
      setLoading(true)
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }

      const {data} = await axios.post(
        "https://chat-app-9flg.onrender.com/api/user/login",
        {
          email,password
        },
        config
      )

      setLoading(false)
      router.replace("/(authenticated)/(tabs)/chats")
      await AsyncStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
      setLoading(false)
      console.log("Login error",error)
      throw new Error("Login error")

    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login to Chazel 🫡</Text>
      <View style={styles.signedBox}>
          <TextInput 
            style={styles.field}
            autoCapitalize='none'
            placeholder='Email'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          
          <View style={{display:"flex",gap:8}}>
            <TextInput 
              style={styles.field}
              autoCapitalize='none'
              placeholder='Password'
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end", paddingRight:10}} onPress={() => setShowPassword(!showPassword)}>
              <Image source={showPassword ? require('@/assets/eye.png') : require('@/assets/hidden.png')} style={{width:25,height:25}} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button, {backgroundColor:disabled ? "lightgray":"black",marginTop:30}]} onPress={handleLogin} disabled={disabled}>
            {loading ? <ActivityIndicator /> : <Text style={[styles.buttonText, {color:"white"}]}>Login</Text>}
          </TouchableOpacity>

      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    gap:30,
    paddingVertical:100,
    backgroundColor:"white"
  },
  header:{
    fontWeight:'800',
    fontSize:30
  },
  signedBox:{
    gap:10
  },
  field:{
      paddingVertical:15,
      paddingHorizontal:17,
      borderWidth:0.5,
      borderRadius:10,
      width:300,
      fontSize:17,
      borderColor:"gray"
  },
  button:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"center",
    paddingVertical:13,
    paddingHorizontal:40,
    borderRadius:10,
    gap:10,
  },
  buttonText:{
    fontSize:20,
    fontWeight:'500'
  }
})