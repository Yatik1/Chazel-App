import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const index = () => {

  const [email,setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login to Chazel 🫡</Text>
      <View>
          <TextInput 
            style={styles.field}
            autoCapitalize='none'
            placeholder='Email'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            style={styles.field}
            autoCapitalize='none'
            placeholder='Password'
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text>{showPassword ? "Hide" : "Show"} Password</Text>
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
  },
  header:{
    fontWeight:'800',
    fontSize:25,
    color:'purple'
  },
  field:{
      paddingVertical:15,
      paddingHorizontal:20,
      borderWidth:0.5,
      borderRadius:10,
      width:300,
      fontSize:17,
      borderColor:"gray"
  }
})