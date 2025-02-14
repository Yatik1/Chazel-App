import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const index = () => {

    const router = useRouter()

    const onLogin = () => {
        router.push('/auth/login')
    }

    const onSignUp = () => {
        router.push('/auth/signup')
    }

  return (
    <View style={styles.container}>
        <Image source={require('@/assets/chazel_hero.jpg')} style={{flex:1,objectFit:"contain",width:700}} />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {backgroundColor:"black", borderColor:"gray",borderWidth:1}]} onPress={onLogin}>
                <Text style={[styles.buttonText,{color:"white"}]}>Login with email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor:"white"}]} onPress={onSignUp}>
                <Text style={[styles.buttonText]}>Sign up your account </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{borderColor:"black",borderWidth:1}]}>
                <Text style={[styles.buttonText,{color:"drakgray"}]}>Use guest account</Text>
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
        backgroundColor:"#C7ADED"
    },
    buttonContainer:{
        gap:20,
        flex:1,
        marginTop:36
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
        // color:Colors.lightText
      },
      link:{
        // color:Colors.lightText,
        fontSize:12,
        textAlign:'center',
        textDecorationLine:'underline'
      }
})