import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import StartAppScreen from "../screens/StartAppScreen"
import GetStartedScreen from "../screens/GetStartedScreen"
import SignInScreen from "../screens/SignInScreen"
import SignUpScreen from "../screens/signUpScreen"
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen"
import VerificationCodeScreen from "../screens/VerificationCodeScreen"
import SettingScreen from "../screens/SettingScreen"
import ContactsScreen from "../screens/ContactsScreen"
import ChattingListScreen from "../screens/ChattingListScreen"
import ChattingScreen from "../screens/ChattingScreen"
import { Image, Text } from "react-native"
import ChangingPasswordScreen from "../screens/ChangingPasswordScreen"
import AccountScreen from "../screens/AccountScreen"
import DeactivateScreen from "../screens/DeactivateScreen"
import FileViewer from "../screens/FileViewer"

  

   
const Tab = createBottomTabNavigator()
const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "ChatStackNavigator") {
                    return <Image source={focused ? require("../assets/images/chat.png") : require("../assets/images/chat_.png")} />
                } else if (route.name === "ContactStackNavigator") {
                    return <Image source={focused ? require("../assets/images/contacts.png") : require("../assets/images/contacts_.png")} />

                } else {
                    return <Image source={focused ? require("../assets/images/settings.png") : require("../assets/images/settings_.png")} />

                }

            },
            tabBarLabel: ({ focused, color, size }) => {
                if (route.name === "ChatStackNavigator") {
                    return <Text style={{ color: focused ? "#278c73" : "rgba(0,0,0,.5)" }}  >Chats</Text>
                } else if (route.name === "ContactStackNavigator") {
                    return <Text style={{ color: focused ? "#278c73" : "rgba(0,0,0,.5)" }}  >Contacts</Text>

                } else {
                    return <Text style={{ color: focused ? "#278c73" : "rgba(0,0,0,.5)" }}  >Settinngs</Text>

                }

            },
        })}  >
            <Tab.Screen name="ChatStackNavigator" component={ChattingListScreen} />
            <Tab.Screen name="ContactStackNavigator" component={ContactsScreen} />
            <Tab.Screen name="SettingStackNavigator" component={SettingScreen} />

        </Tab.Navigator>
    )
}



const Stack = createStackNavigator()
const AuthenticationStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="StartAppScreen" component={StartAppScreen} />
            <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
            {/* <Stack.Screen name="VerificationCodeScreen" component={VerificationCodeScreen} /> */}
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="ChattingScreen" component={ChattingScreen} />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="ChangingPasswordScreen" component={ChangingPasswordScreen} /> 
            <Stack.Screen name="DeactivateScreen" component={DeactivateScreen} />
            <Stack.Screen name="FileViewer" component={FileViewer} options={{headerShown:true}} />




        </Stack.Navigator>
    )
}
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AuthenticationStack />
        </NavigationContainer>
    )
}
export default AppNavigator






























































/*import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import StartAppScreen from "../screens/StartAppScreen"
import GetStartedScreen from "../screens/GetStartedScreen"
import SignInScreen from "../screens/SignInScreen"
import SignUpScreen from "../screens/signUpScreen"
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen"
import VerificationCodeScreen from "../screens/VerificationCodeScreen"
import SettingScreen from "../screens/SettingScreen"
import ContactsScreen from "../screens/ContactsScreen"
import ChattingListScreen from "../screens/ChattingListScreen"
import ChattingScreen from "../screens/ChattingScreen"
import { Image, Text } from "react-native"
import ChangingPasswordScreen from "../screens/ChangingPasswordScreen"
import AccountScreen from "../screens/AccountScreen"
import DeactivateScreen from "../screens/DeactivateScreen"
import FileViewer from "../screens/FileViewer"

const ChatStack = createStackNavigator()
const ChatStackNavigator = () => {
    return (
        <ChatStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <ChatStack.Screen name="ChattingListScreen" component={ChattingListScreen} />
            <ChatStack.Screen name="ChattingScreen" component={ChattingScreen} />
<ChatStack.Screen name="FileViewer" component={FileViewer} />



        </ChatStack.Navigator>
    )
}
const ContactStack = createStackNavigator()
const ContactStackNavigator = () => {
    return (
        <ContactStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <ContactStack.Screen name="ContactsScreen" component={ContactsScreen} />
            <ContactStack.Screen name="ChattingScreen" component={ChattingScreen} />




        </ContactStack.Navigator>
    )
}
const SettingStack = createStackNavigator()
const SettingStackNavigator = () => {
    return (
        <SettingStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
            <SettingStack.Screen name="AccountScreen" component={AccountScreen} />
            <SettingStack.Screen name="ChangingPasswordScreen" component={ChangingPasswordScreen} /> 
            <SettingStack.Screen name="DeactivateScreen" component={DeactivateScreen} />

            


        </SettingStack.Navigator>
    )
}

const Tab = createBottomTabNavigator()
const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "ChatStackNavigator") {
                    return <Image source={focused ? require("../assets/images/chat.png") : require("../assets/images/chat_.png")} />
                } else if (route.name === "ContactStackNavigator") {
                    return <Image source={focused ? require("../assets/images/contacts.png") : require("../assets/images/contacts_.png")} />

                } else {
                    return <Image source={focused ? require("../assets/images/settings.png") : require("../assets/images/settings_.png")} />

                }

            },
            tabBarLabel: ({ focused, color, size }) => {
                if (route.name === "ChatStackNavigator") {
                    return <Text style={{ color: focused ? "#278c73" : "rgba(0,0,0,.5)" }}  >Chats</Text>
                } else if (route.name === "ContactStackNavigator") {
                    return <Text style={{ color: focused ? "#278c73" : "rgba(0,0,0,.5)" }}  >Contacts</Text>

                } else {
                    return <Text style={{ color: focused ? "#278c73" : "rgba(0,0,0,.5)" }}  >Settinngs</Text>

                }

            },
        })}  >
            <Tab.Screen name="ChatStackNavigator" component={ChatStackNavigator} />
            <Tab.Screen name="ContactStackNavigator" component={ContactStackNavigator} />
            <Tab.Screen name="SettingStackNavigator" component={SettingStackNavigator} />

        </Tab.Navigator>
    )
}



const Stack = createStackNavigator()
const AuthenticationStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="StartAppScreen" component={StartAppScreen} />
            <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
            <Stack.Screen name="VerificationCodeScreen" component={VerificationCodeScreen} /> 
            <Stack.Screen name="TabNavigator" component={TabNavigator} />



        </Stack.Navigator>
    )
}
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AuthenticationStack />
        </NavigationContainer>
    )
}
export default AppNavigator
 */