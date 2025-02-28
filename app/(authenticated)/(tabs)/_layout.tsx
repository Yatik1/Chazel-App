import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {

    const {bottom} = useSafeAreaInsets()

    return(
        <Tabs
            screenOptions={{
                tabBarActiveTintColor:"black",
                tabBarInactiveTintColor:"gray",
                tabBarLabelStyle:{
                    fontSize:12,
                },
                tabBarStyle:{
                    height:68,
                    paddingTop:6,
                }
            }}
        >
            <Tabs.Screen 
                name="chats/index" 
                options={{
                    title:"Chats",
                    tabBarIcon:({color}) => <Entypo name="chat" size={24} color={color} />,
                }}
            />
            <Tabs.Screen 
                name="browse/index" 
                options={{
                    title:"Browse",
                    tabBarIcon:({color}) => <MaterialCommunityIcons name="web" size={24} color={color} />
                }}
            />
            <Tabs.Screen 
                name="profile/index"
                options={{
                    title:"Profile",
                    tabBarIcon:({color}) => <AntDesign name="user" size={24} color={color} />
                }}
            />
        </Tabs>
    )
}