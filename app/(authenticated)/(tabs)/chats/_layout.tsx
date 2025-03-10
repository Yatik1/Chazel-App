import ChatHeader from "@/component/ChatHeader";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {

    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerTitle:"Chats",
                header : () =>  <Header />
            }}/>
            <Stack.Screen 
                name="[chatId]"
                options={{
                    header:() => <ChatHeader />,
                }}
            />
        </Stack>
    )
}

function Header() {
    const {top} = useSafeAreaInsets()
    return (
        <View style={{backgroundColor:"white", display:"flex",justifyContent:"flex-end",alignItems:"flex-start",paddingTop:top+20}}>
            <Text style={{fontSize:40,fontWeight:"bold",padding:8}}>Chats</Text>
        </View>
    )
}