import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {

    const router = useRouter()

    // const theme = useColorScheme() === 'light'  ? 'light' : 'dark'
    // const islight = theme === 'light' ? true : false

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
      isUser()
    } , [loading])

    async function isUser() {
      const user = JSON.parse(await AsyncStorage.getItem("userInfo") as string)
      if(user) {
        router.replace("/(authenticated)/(tabs)/chats")
      }
    }

    const onLogin = () => {
        router.push('/auth/login')
    }

    const onSignUp = () => {
        router.push('/auth/signup')
    }

    const onGuest = async () => {
      try {
        setLoading(true)

        let data = {
          email:"guest@example.com",
          password:"123456"
        }

        const config = {
          headers : {
            "Content-type":"application/json"
          }
        }

        await axios.post(
          "https://chat-app-9flg.onrender.com/api/user/login",
          data,
          config
        )

        setLoading(false)
        router.replace("/(authenticated)/(tabs)/chats")

      } catch (error) {
        setLoading(false)
        console.log("Guest user error", error)
        throw new Error("Guest user error")
      }
    }


  return (
    <View style={styles.container}>
        <Image source={require('@/assets/message.png') } style={{flex:1,objectFit:"contain",width:100,marginTop:100}} />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {backgroundColor:"black", borderColor:"gray",borderWidth:1}]} onPress={onLogin}>
                <Text style={[styles.buttonText,{color:"white"}]}>Login with email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor:"white",borderWidth:0.3, borderColor:"black"}]} onPress={onSignUp}>
                <Text style={[styles.buttonText , {color:"black"}]}>Create your account </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:"lightgray"}]} onPress={onGuest}>
                {loading ? <ActivityIndicator /> : <Text style={[styles.buttonText]}>Use Guest account</Text>}
            </TouchableOpacity>
        </View>
    </View>
  )
}



export default index

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    buttonContainer:{
        gap:10,
        flex:1,
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
      },
      description:{
        fontSize:12,
        textAlign:'center',
      },
      link:{
        fontSize:12,
        textAlign:'center',
        textDecorationLine:'underline'
      }
})