import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { ChatState } from "@/context/ChatProvider";
import axios from "axios";


export default function Layout() {

    return(
        <Tabs
            screenOptions={{
                tabBarActiveTintColor:"black",
                tabBarInactiveTintColor:"gray",
                tabBarLabelStyle:{
                    fontSize:13,
                },
                tabBarStyle:{
                    height:68,
                    paddingTop:6,
                },
            }}
        >
            <Tabs.Screen 
                name="chats" 
                options={{
                    title:"Chats",
                    tabBarIcon:({color}) => <Entypo name="chat" size={24} color={color} />,
                    headerShown:false
                }}
            />
            <Tabs.Screen 
                name="browse/index" 
                options={{
                    title:"Browse",
                    headerTitleAlign:"left",
                    headerTitle:() => <BrowseField />,
                    tabBarIcon:({color}) => <MaterialCommunityIcons name="web" size={24} color={color} />,
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title:"Profile",
                    tabBarIcon:({color}) => <AntDesign name="user" size={24} color={color} />,
                    headerShown:false
                }}
            />
        </Tabs>
    )
}

function BrowseField(){
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