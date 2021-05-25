import React, { useEffect, useState } from "react"
import { Alert, Button, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import {resetPassword} from "../store/authActions"

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: "#1aa69a",
        accent: 'transparent',
    },
};
const ForgetPasswordScreen = (props) => {
    const [email, setEmail] = useState("")
    const [emailFocus, setEmailFocus] = useState(false)


 const passwordRestHandler=()=>{
    if ( validate(email)){
     try {
        resetPassword(email)
        Alert.alert("Done","Check Your Email",[{text:"okay",style:"cancel"}])
        props.navigation.replace("SignInScreen")
     } catch (error) {
        Alert.alert("Something Went Wrong",`${error}`,[{text:"okay",style:"cancel"}])

     }
         }else{
             Alert.alert("Something Went Wrong","please enter a vaild email",[{text:"okay",style:"cancel"}])
         }
     }
     
     const validate = (email) => {
         if(email.trim().length > 0){
             const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     
      return expression.test(String(email).toLowerCase())
         }
         return false
      
     }

    return (
        <PaperProvider theme={theme}>


            <View style={styles.screen}>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate("SignInScreen")
                }}>
                    <View style={styles.backBtn}>

                        <Image source={require("../assets/images/back.png")} />

                        <Text style={styles.font   } >Back</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 28, fontWeight: "600", marginTop: 30 }}>Forget Password ?</Text>

                <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 10, color: "rgba(0,0,0,.2)" }}>Please Enter our Email Adrress To Sent You a Verification Code </Text>
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




                <View style={{ width: "100%", marginTop: 70, borderRadius: 10, overflow: "hidden", borderWidth: 1, borderColor: "#278c73" }} >
                    <Button title="Continue" onPress={passwordRestHandler} color="#278c73" style={{ width: "100%" }} />
                </View>
            </View>

        </PaperProvider>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 30,


    },
    backBtn:{
         width: 70,
          flexDirection: "row",
           justifyContent: "space-between",
            alignItems: "center"
         }


})
export default ForgetPasswordScreen

