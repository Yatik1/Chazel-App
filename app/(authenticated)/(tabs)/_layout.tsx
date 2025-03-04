import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, View } from "react-native";


export default function Layout() {

    return(
        <Tabs
            screenOptions={{
                tabBarActiveTintColor:"black",
                tabBarInactiveTintColor:"gray",
                tabBarLabelStyle:{
                    fontSize:13,
                },
                tabBarStyle:{
                    height:68,
                    paddingTop:6,
                },
            }}
        >
            <Tabs.Screen 
                name="chats/index" 
                options={{
                    title:"Chats",
                    tabBarIcon:({color}) => <Entypo name="chat" size={24} color={color} />,
                    headerStyle:{
                        height:100,
                    },
                    headerTitleStyle:{
                        fontSize:40,
                        fontWeight:"bold",
                        color:"#1E1E1E",
                    },
                    headerTitleAlign:"left"
                }}
            />
            <Tabs.Screen 
                name="browse/index" 
                options={{
                    title:"Browse",
                    headerTitleAlign:"left",
                    headerTitle:() => <SearchField />,
                    tabBarIcon:({color}) => <MaterialCommunityIcons name="web" size={24} color={color} />,
                }}
            />
            <Tabs.Screen 
                name="profile/index"
                options={{
                    title:"Profile",
                    tabBarIcon:({color}) => <AntDesign name="user" size={24} color={color} />,
                    headerShown:false,
                }}
            />
        </Tabs>
    )
}

function SearchField(){
    return(
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-around", gap:10,padding:3}}>
                <AntDesign name="search1" size={20} color="#1E1E1E" />
                <TextInput 
                    style={{
                        paddingVertical:5,
                        paddingHorizontal:10,
                        borderWidth:0.5,
                        borderRadius:5,
                        width:300,
                        fontSize:14,
                        borderColor:"lightgray"
                    }}
                    autoCapitalize='words'
                    placeholder='Browse...'
                    keyboardType='default'
                />
            </View>

    )
}