import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from 'expo-router'


const index = () => {

  const router = useRouter() 

  const [name, setName] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    if(name && email && password && confirmPassword) {
      setDisabled(false)
    }
  } , [name,email,password,confirmPassword])

  async function handleSignup() {

    if(!name || !email || !password) {
      alert("Every fields must be filled")
      return
    }

    if(password !== confirmPassword) {
      alert("Passwords doesn't matched")
      return;
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          "Content-type" : "application/json"
        }
      }

      const {data} = await axios.post(
        "https://chat-app-9flg.onrender.com/api/user",
        {
          name,
          email,
          password
        },
        config
      )

      alert("Registration successfull")
      setLoading(false)

      router.replace("/(authenticated)")
      
    } catch (error) {
        setLoading(false)
        console.log(error)
        throw new Error("Something must have happened")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account 👤</Text>
      <View style={styles.signedBox}>
          <TextInput 
            style={styles.field}
            autoCapitalize='words'
            placeholder='Name'
            keyboardType='default'
            value={name}
            onChangeText={setName}
          />

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

          <View style={{display:"flex",gap:8}}>
            <TextInput 
              style={styles.field}
              autoCapitalize='none'
              placeholder='Confirm Password'
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end", paddingRight:10}} onPress={() => setShowPassword(!showPassword)}>
              <Image source={showPassword ? require('@/assets/eye.png') : require('@/assets/hidden.png')} style={{width:25,height:25}} />
            </TouchableOpacity>
          </View>



          <TouchableOpacity style={[styles.button, {backgroundColor:disabled ? "lightgray":"black",marginTop:30}]} onPress={handleSignup} disabled={disabled}>
            {
              loading ? <ActivityIndicator color="white" /> : <Text style={[styles.buttonText, {color:"white"}]}> Signup</Text>
            }
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
    gap:35,
    paddingVertical:100,
    backgroundColor:"white"
  },
  header:{
    fontWeight:'800',
    fontSize:30,
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