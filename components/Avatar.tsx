import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import UserType, { ChatUserType, SenderProps } from '@/types/user'

function Avatar({sender, color}: {sender: SenderProps | ChatUserType | UserType, color?:string}) {

    function getInitials(sender:any) {
        if(sender.isGroupChat) {
            return sender.chatName[0] 
        } else {
            return sender.name[0]
        }
    }

    const creds = getInitials(sender)
    
    return (
            'pic' in sender && sender.pic ? 
                <Image source={{uri:sender.pic}} style={styles.avatar} /> 
                : 
                <View style={[styles.avatar, {backgroundColor:color}]}>
                    <Text style={styles.avatarText}>{creds}</Text>
                </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
        width: 35, 
        height: 35, 
        borderRadius:100,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        objectFit:"cover",
        overflow:"hidden",
    },
    avatarText:{
        color:"white", 
        fontSize:20, 
        fontWeight:"bold", 
        textTransform:'uppercase',
        textAlign:"center"
    }
})