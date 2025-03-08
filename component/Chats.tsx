import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { ChatState, ContextType } from '@/context/ChatProvider'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getSender } from '@/config/ChatLogics'
import Avatar from './Avatar'


const Chats = () => {

    const [loggedUser, setLoggedUser] = React.useState()
    const {selectedChat,setSelectedChat,user,chats,setChats} = ChatState() as ContextType

    const fetchChats = async () => {
        setLoggedUser(JSON.parse(await AsyncStorage.getItem("userInfo") as string))

        try {
            const config = {
                headers: {
                    Authorization : `Bearer ${user?.token}`
                }
            }

            const {data} = await axios.get("https://chat-app-9flg.onrender.com/api/chat", config)
            setChats(data)
        } catch (error) {
            console.log("Error in fetching chats",error)
        }
    }

    useEffect(() => {
        fetchChats()
    }, [])

    const renderItem = ({item:chat}: {item: any}) => {
        let sender = !chat.isGroupChat ? getSender(loggedUser, chat.users) : chat

        return (
            (
                <TouchableOpacity
                    onPress={() => setSelectedChat(chat)}
                    style={[
                        styles.chatItem,
                        { backgroundColor: selectedChat === chat ? "black" : "#E8E8E8" }
                    ]}
                >
                    <Avatar sender={sender} /> 
                    <Text style={{ color: selectedChat === chat ? "white" : "black" , fontSize:17, fontWeight:"500"}}>
                        {!chat.isGroupChat ? sender.name : sender.chatName}
                    </Text>
                </TouchableOpacity>
        )
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={chats}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
}

export default Chats



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:8,
    },
    chatItem: {
        paddingHorizontal:6,
        paddingVertical: 10,
        borderRadius: 18,
        marginVertical: 4,
        height:49,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        gap:8
    },
})