import { TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { ChatState } from "@/context/ChatProvider";
import axios from "axios";
import AntDesign from '@expo/vector-icons/AntDesign';


const BrowseField = () => {
    const [search,setSearch] = useState("")
    const {user,searchResult,setSearchResult} = ChatState() as any


    const searchedUser = async () => {
        if(!search || search === " ") {
            console.log("Nothing to be search for...")
            setSearchResult([])
            return;
        }

        try {
            
            const config = {
                headers : {
                    Authorization : `Bearer ${user.token}`
                }
            }

            const {data} = await axios.get(`https://chat-app-9flg.onrender.com/api/user?search=${search}` , config)
            setSearchResult(data)
        } catch (error) {
            console.log("Error in seaching", error)
        }
    }
    
    useEffect(() => {
        searchedUser()
    } , [search]) 

    return(
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-around", gap:10,padding:3}}>
                <AntDesign name="search1" size={20} color="#1E1E1E" />
                <TextInput 
                    style={{
                        paddingVertical:5,
                        paddingHorizontal:10,
                        borderWidth:0.5,
                        borderRadius:5,
                        width:300,
                        fontSize:14,
                        borderColor:"lightgray"
                    }}
                    autoCapitalize='words'
                    placeholder='Browse...'
                    keyboardType='default'
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

    )
}

export default BrowseField