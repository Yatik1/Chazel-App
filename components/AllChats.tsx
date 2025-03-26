import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { ChatState } from '@/context/ChatProvider'
import Avatar from './Avatar';
import { getRandomHexColor } from '@/config/ChatLogics';

const AllChats = ({messages,selectedChat} : {messages:any[], selectedChat:any}) => {

    const {user} = ChatState() as any;


    const chatItem = ({item : message} : {item:any}) => {

        return(

            <View 
                style={{    
                    flex:1, 
                    display:"flex",
                    flexDirection:message.sender._id === user._id ? "row-reverse" : "row", 
                    justifyContent:"center",
                    alignItems:"center",
                    padding:10,
                    paddingTop:7,
                    gap:8,
                }}
            >
            {selectedChat.isGroupChat && <Avatar sender={message.sender} color={getRandomHexColor()} />}
            <View
                    style={{
                        backgroundColor: `${
                            message.sender._id === user._id ? "lightgray" : "black"
                        }`,
                        marginLeft: message.sender._id == user._id ? "auto" : 0,
                        marginRight:message.sender._id !== user._id ? "auto" : 0,
                        marginTop:messages[messages.length-1].sender._id === message.sender._id ?0:1,
                        borderRadius : 20,
                        paddingVertical: 10,
                        paddingHorizontal:20,
                        maxWidth:"100%",
                        width:"auto"
                    }}
                >
                    <Text style={{
                        color:`${
                            message.sender._id === user._id ? "black" : "white"
                        }`,
                        fontSize:17,
                        textAlign:"center"
                    }}>{message.content}</Text>
                </View>
            </View>
                
        )
    }


  return (
    messages && 
    <FlatList 
        data={messages}
        renderItem={chatItem}
    />

  )
}

export default AllChats