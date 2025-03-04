import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const index = () => {

  const route = useRouter()

  async function logout() {
    await AsyncStorage.removeItem("userInfo")
    route.replace("/")
  }
  function confirmLogout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: logout
        }
      ],
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={confirmLogout}>
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
    backgroundColor:'white'
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