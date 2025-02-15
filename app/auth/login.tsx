import { View, Text, StyleSheet, TextInput, TouchableOpacity, Touchable } from 'react-native'
import React, { useState } from 'react'

const index = () => {

  const [email,setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)

  function handleLogin() {
    let data = {
      email,
      password
    }
    console.log(data)
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

            <TouchableOpacity style={{width:120, backgroundColor:"lightgray", borderWidth:0.5, padding:5, borderRadius:4, display:"flex",alignItems:"center",justifyContent:"center"}} onPress={() => setShowPassword(!showPassword)}>
              <Text>{showPassword ? "Hide" : "Show"} Password</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button, {backgroundColor:"black",marginTop:30}]} onPress={handleLogin}>
            <Text style={[styles.buttonText, {color:"white"}]}>Login</Text>
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
    fontSize:30,
    color:'purple'
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