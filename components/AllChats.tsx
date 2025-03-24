import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { ChatState } from '@/context/ChatProvider'
import { isSameSenderMargin, isSameUser } from '@/config/ChatLogics';

const AllChats = ({messages} : {messages:any[]}) => {

    const {user} = ChatState() as any;

    const chatItem = ({item : message, index} : {item:any, index:number}) => {
   
        //  console.log("Mees",message)
        return(

                <View
                    style={{
                        backgroundColor: `${
                            message.sender._id === user._id ? "lightgray" : "black"
                        }`,
                        marginLeft: message.sender._id == user._id ? "auto" : 0,
                        marginRight:message.sender._id !== user._id ? "auto" : 0,
                        marginTop: 9,
                        borderRadius : 20,
                        paddingVertical: 10,
                        paddingHorizontal:20,
                        maxWidth:"100%",
                        
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