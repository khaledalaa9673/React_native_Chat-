import React, { useEffect } from "react"
import { StyleSheet, Text, View ,LogBox} from 'react-native'
import AppNavigator from "./navigations/AppNavigator"
import { createStore, combineReducers ,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import authReducer from "./store/authReducer"
import messagesReducer from "./store/messagesReducer"
LogBox.ignoreAllLogs();//Ignore all log notifications
const rootReducer = combineReducers({
    auth: authReducer,
    chat:messagesReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
     
   
     
    return (

        <View style={styles.container}>
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
/*
import React, { useEffect, useRef, useState } from "react"
import { Image, ImageBackground, StyleSheet, Text, View, Touchable, TouchableOpacity } from "react-native"
import { DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';


const SignInScreen = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [blur, setBlur] = useState(false)
    const textInputReference = useRef(null)

    const onFocusHandler = () => {
        console.log(textInputReference.current.isFocused())
        setBlur(textInputReference.current.isFocused())
    }
    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: blur ? "#278c73" : "rgba(0,0,0,.4)",
            accent: 'black',
        },
    };
    return (
        <PaperProvider theme={theme}>
            <View style={styles.screen}>
                <TouchableOpacity onPress={() => {
                    textInputReference.current.blur()
                    setBlur(false)
                }}>
                    <View style={{ width: 70, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Image source={require("../assets/images/back.png")} />
                        <Text style={{ fontSize: 18 }} >Back</Text>
                    </View>
                    <Text style={{ fontSize: 26, fontWeight: "600", marginTop: 30 }}>Let's Sign In</Text>

                    <Text style={{ fontSize: 20, fontWeight: "500", marginTop: 10 }}>Welcome back</Text>
                    <View style={{ width: "100%", marginTop: 50 }}>
                        <View  >
                            <View style={{ borderRadius: 5, height: 51, overflow: "hidden" }}>
                                <TextInput
                                    ref={textInputReference}
                                    style={{ width: "100%", height: 50, borderColor: "#278c73", borderTopWidth: blur ? 2 : 0, borderLeftWidth: blur ? 2 : 0, borderRightWidth: blur ? 2 : 0, borderRadius: 5 }}
                                    label="Email Address"
                                    value={email}
                                    onChangeText={text => setEmail(text)}

                                    onFocus={onFocusHandler}





                                />
                            </View>
                        </View>
                        <View style={{ borderRadius: 5, height: 51, overflow: "hidden",marginTop:25 }}>
                                <TextInput
                                    ref={textInputReference}
                                    style={{ width: "100%", height: 50, borderColor: "#278c73", borderTopWidth: blur ? 2 : 0, borderLeftWidth: blur ? 2 : 0, borderRightWidth: blur ? 2 : 0, borderRadius: 5 }}
                                    label="Password"
                                    value={password}
                                    onChangeText={text => setPassword(text)}

                                    onFocus={onFocusHandler}





                                />
                            </View>
                    </View>
                </TouchableOpacity>

            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 30

    },


})
export default SignInScreen


*/