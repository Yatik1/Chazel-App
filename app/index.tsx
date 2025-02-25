import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

const index = () => {

    const router = useRouter()


    const onLogin = () => {
        router.push('/auth/login')
    }

    const onSignUp = () => {
        router.push('/auth/signup')
    }

    const onGuest = async () => {
      try {
        let data = {
          email:"guest@example.com",
          password:"123456"
        }
        console.log("Guest data",data)
      } catch (error) {
        console.log("Guest user error", error)
        throw new Error("Guest user error")
      }
    }


  return (
    <View style={styles.container}>
        <Image source={require('@/assets/message.png')} style={{flex:1,objectFit:"contain",width:100,marginTop:100}} />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {backgroundColor:"black", borderColor:"gray",borderWidth:1}]} onPress={onLogin}>
                <Text style={[styles.buttonText,{color:"white"}]}>Login with email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor:"white",borderWidth:0.3}]} onPress={onSignUp}>
                <Text style={[styles.buttonText]}>Create your account </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{borderColor:"black",backgroundColor:"lightgray"}]} onPress={onGuest}>
                <Text style={[styles.buttonText,{color:"drakgray"}]}>Use Guest account</Text>
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
        backgroundColor:'white',
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