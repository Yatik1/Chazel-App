import { View, Text, FlatList } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { ChatState } from '@/context/ChatProvider'
import Avatar from './Avatar';
import { getRandomHexColor, isSameUser } from '@/config/ChatLogics';

const AllChats = ({ messages, selectedChat }: { messages: any[], selectedChat: any }) => {
    const { user } = ChatState() as any;
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const chatItem = ({ item: message, index }: { item: any, index: any }) => {
        return (
            <View
                key={index}
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: message.sender._id === user._id ? "row-reverse" : "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    paddingTop: 7,
                    gap: 8,
                }}
            >
                {selectedChat.isGroupChat && <Avatar sender={message.sender} color={getRandomHexColor()} />}
                <View
                    style={{
                        backgroundColor: `${
                            message.sender._id === user._id ? "lightgray" : "#565656"
                        }`,
                        marginLeft: message.sender._id === user._id ? "auto" : 0,
                        marginRight: message.sender._id !== user._id ? "auto" : 0,
                        marginTop: isSameUser(messages, message, index) ? -7 : "auto",
                        borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        maxWidth: "100%",
                        width: "auto",
                    }}
                >
                    <Text
                        style={{
                            color: `${
                                message.sender._id === user._id ? "black" : "white"
                            }`,
                            fontSize: 17,
                            textAlign: "center",
                        }}
                    >
                        {message.content}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        messages && (
            <FlatList
                ref={flatListRef} 
                data={messages}
                renderItem={chatItem}
                keyExtractor={(item, index) => index.toString()}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })} 
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })} 
            />
        )
    );
};

export default AllChats;