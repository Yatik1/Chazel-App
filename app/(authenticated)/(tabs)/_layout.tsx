import { Tabs, usePathname } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import BrowseField from "@/component/BrowseField";
import { useNavigationState } from "@react-navigation/native";



export default function Layout() {

const path = usePathname()

let isValidPath = true
if(path !== "/chats" && path !== "/browse" && path !== "/profile") {
    isValidPath = !isValidPath
}


    return(
        <Tabs
            screenOptions={{
                tabBarActiveTintColor:"black",
                tabBarInactiveTintColor:"gray",
                tabBarLabelStyle:{
                    fontSize:13,
                },
                tabBarStyle: isValidPath ? {
                    height:68,
                    paddingTop:6,
                } : {
                    display:'none'
                },
            }}
        >
            <Tabs.Screen 
                name="chats" 
                options={{
                    title:"Chats",
                    tabBarIcon:({color}) => <Entypo name="chat" size={24} color={color} />,
                    headerShown:false
                }}
            />
            <Tabs.Screen 
                name="browse/index" 
                options={{
                    title:"Browse",
                    headerTitleAlign:"left",
                    headerTitle:() => <BrowseField />,
                    tabBarIcon:({color}) => <MaterialCommunityIcons name="web" size={24} color={color} />,
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title:"Profile",
                    tabBarIcon:({color}) => <AntDesign name="user" size={24} color={color} />,
                    headerShown:false
                }}
            />
        </Tabs>
    )
}
