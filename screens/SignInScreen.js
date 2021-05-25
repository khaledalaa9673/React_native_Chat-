import React, { useEffect, useState } from "react"
import { ActivityIndicator, Button, Dimensions, Image, Alert, ScrollView, StyleSheet, Text ,TouchableOpacity, View, Touchable, TouchableWithoutFeedback } from "react-native"
import { DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { login } from "../store/authActions"

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: "#1aa69a",
        accent: 'transparent',
    },
};
const SignInScreen = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)


    const loginHandler = async () => {

        if (validate(email) && password.trim().length > 0) {
            try {
                setLoading(true)
                await login(email, password)
                setLoading(false)
            } catch (error) {
                Alert.alert("Something Went Wrong", `${error}`, [{ text: "okay", style: "cancel" }])
                setLoading(false)
            }
        } else {
            Alert.alert("Something Went Wrong", "please enter a valid input", [{ text: "okay", style: "cancel" }])
        }
    }

    const validate = (email) => {
        if (email.trim().length > 0) {
            const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return expression.test(String(email).toLowerCase())
        }
        return false

    }


    return (
        <PaperProvider theme={theme}>
            <ScrollView>

                <View style={styles.screen}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate("GetStartedScreen")
                    }}>
                        <View style={{ width: 70, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                            <Image source={require("../assets/images/back.png")} />

                            <Text style={{ fontSize: 18 }} >Back</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 26, fontWeight: "700", marginTop: 30 }}>Let's Sign In</Text>

                    <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 10 }}>Welcome back</Text>
                    <View style={{ width: "100%", marginTop: 35 }}>
                        <TextInput
                            style={{ width: "100%", height: 55, marginTop: 20, borderTopWidth: emailFocus ? 2 : 0, borderTopColor: emailFocus ? "#278c73" : "transparent", borderRightWidth: emailFocus ? 2 : 0, borderRightColor: emailFocus ? "#278c73" : "transparent", borderLeftWidth: emailFocus ? 2 : 0, borderLeftColor: emailFocus ? "#278c73" : "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 9, borderBottomLeftRadius: 9, overflow: "hidden" }}
                            label="Email Address"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            selectionColor="#1aa69a"
                            underlineColor="transparent"
                            onFocus={() => {

                                setEmailFocus(true)
                            }}
                            onBlur={() => {

                                setEmailFocus(false)
                            }}


                        />

                        <TextInput
                            style={{ width: "100%", height: 55, marginTop: 20, borderTopWidth: passwordFocus ? 2 : 0, borderTopColor: passwordFocus ? "#278c73" : "transparent", borderRightWidth: passwordFocus ? 2 : 0, borderRightColor: passwordFocus ? "#278c73" : "transparent", borderLeftWidth: passwordFocus ? 2 : 0, borderLeftColor: passwordFocus ? "#278c73" : "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 9, borderBottomLeftRadius: 9, overflow: "hidden" }}
                            label="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            selectionColor="#1aa69a"
                            underlineColor="transparent"
                            onFocus={() => {
                                setPasswordFocus(true)
                            }}
                            onBlur={() => {
                                setPasswordFocus(false)
                            }}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity underlineColor={.99} onPress={() => {
                        props.navigation.navigate("ForgetPasswordScreen")
                    }}>
                        <Text style={{ color: "#1aa69a", alignSelf: "flex-end" }}>Forget Password ?</Text>
                    </TouchableOpacity  >
                    <TouchableOpacity onPress={loginHandler} >
                        <View style={{ width: "100%", height: 55, marginTop: 50, borderRadius: 10, overflow: "hidden", borderWidth: 1, borderColor: "#1aa69a", backgroundColor: "#1aa69a", justifyContent: "center", alignItems: "center" }} >
                            {loading ? <ActivityIndicator color="white" size="large" /> : <Text style={{ fontSize: 20, color: "white", fontWeight: "600" }}>Sign In</Text>}
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", justifyContent: "center", marginTop: Dimensions.get("window").height > 735 ? Dimensions.get("window").height * 0.35 : Dimensions.get("window").height * .28 }}>

                        <Text style={{ textAlign: "center", color: "black", fontSize: 16 }}>
                            Don`t have account <TouchableWithoutFeedback onPress={() => {
                                props.navigation.navigate("SignUpScreen")
                            }}>
                                <Text style={{ textAlign: "center", color: "#1aa69a", fontSize: 16 }}>Sign Up</Text>
                            </TouchableWithoutFeedback>
                        </Text>

                    </View>
                </View>
            </ScrollView>
        </PaperProvider>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 30,


    },


})
export default SignInScreen

