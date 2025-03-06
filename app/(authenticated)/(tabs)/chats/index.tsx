import { View, Text } from 'react-native'
import React from 'react'
import { ChatState } from '@/context/ChatProvider'
import UserType from '@/types/user'
import Chats from '@/component/Chats'

const index = () => {

  const [fetchAgain,setFetchAgain] = React.useState<boolean>(false)
  const {user} = ChatState() as {user:UserType}

  return (
    <View style={{flex:1}}>
      {user && <Chats fetchAgain={fetchAgain} />}
    </View>
  )
}

export default index