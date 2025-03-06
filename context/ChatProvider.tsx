import UserType from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface ContextType {
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType>>,
    selectedChat: any,
    setSelectedChat: React.Dispatch<React.SetStateAction<any>>,
    chats: any,
    setChats: React.Dispatch<React.SetStateAction<any>>
}

const ChatContext = createContext<ContextType | {}>({});

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
        <ChatContext.Provider 
            value={{user, setUser, selectedChat, setSelectedChat, chats, setChats}}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider