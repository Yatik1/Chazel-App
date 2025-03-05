import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext({});

const ChatProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)
    const [chats,setChats] = useState([])

    async function getUserInfo()  {
        const userInfo = await AsyncStorage.getItem("userInfo")
        console.log(userInfo)
        setUser(JSON.parse(userInfo!))
    }

    useEffect(() => {
        getUserInfo()
    } , [])

    return(
        <ChatContext.Provider value={{user, setUser, selectedChat, setSelectedChat, chats, setChats}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider