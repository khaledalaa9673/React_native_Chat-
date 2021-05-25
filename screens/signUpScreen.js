import React, { useEffect, useState } from "react"
import { Alert, TouchableWithoutFeedback, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View ,ActivityIndicator} from "react-native"
 import { DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
 import {signUp,login} from "../store/authActions"


 const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: "#1aa69a",
        accent: 'transparent',
    },
};
const SignUpScreen = (props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading,setLoading]=useState(false)
    const [firstNameFocus, setFirstNameFocus] = useState(false)
    const [lastNameFocus, setLastNameFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false)
 
 
const signUpHandler=async()=>{
    
    if(firstName.trim().length > 0 && lastName.trim().length > 0  && validate(email)&& password.trim().length > 6 &&password  ===confirmPassword  ){
      try {
        
        setLoading(true)
      setTimeout(async() => {
        await  signUp(firstName,lastName,email, password)
        setLoading(false)
      }, 2000);
      
      } catch (error) {
        Alert.alert("Something Went Wrong",`${error}`,[{text:"okay",style:"cancel"}])
        setLoading(false)
      }
    }else{
        setLoading(false)
        Alert.alert("Something Went Wrong","please enter a valid inputs",[{text:"okay",style:"cancel"}])
    }
}

const validate = (email) => {
    if(email.trim().length > 0){
        const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 return expression.test(String(email).toLowerCase())
    }
    return false
 
}

const checking=()=>{
    if(firstName.trim().length > 0 && lastName.trim().length > 0  && validate(email)&& password.trim().length > 6 && password  === confirmPassword  ){
       return true }
       else{
           return false
       }
}

    return (
        <PaperProvider theme={theme}>

          <ScrollView>
          <View style={styles.screen}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("GetStartedScreen") }}>
                    <View style={{ width: 70, flexDirection: "row", justifyContent: "space-between" }}>
                        <Image source={require("../assets/images/back.png")} />
                        <Text style={{ fontSize: 18 }} >Back</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 30, fontWeight: "700", marginTop: 30 }}>Sign up</Text>
                <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 10 }}>Create Your New Account Now </Text>
                <View style={{ width: "100%", marginTop: 30, flexDirection: "row", justifyContent: "space-between", }}>
                <TextInput
                            style={{ width: "45%", height: 55,  borderTopWidth: firstNameFocus ? 2 : 0, borderTopColor: firstNameFocus ? "#278c73" : "transparent", borderRightWidth: firstNameFocus ? 2 : 0, borderRightColor: firstNameFocus ? "#278c73" : "transparent", borderLeftWidth: firstNameFocus ? 2 : 0, borderLeftColor: firstNameFocus ? "#278c73" : "transparent" ,borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomRightRadius:9,borderBottomLeftRadius:9,overflow:"hidden"}}
                            label= "First Name"
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                            selectionColor="#1aa69a"
                            underlineColor="transparent"
                            onFocus={() => {
                                setFirstNameFocus(true)
                            }}
                            onBlur={()=>{
                                setFirstNameFocus(false)
                            }}


                        />

<TextInput
                            style={{ width: "45%", height: 55, borderTopWidth: lastNameFocus ? 2 : 0, borderTopColor: lastNameFocus ? "#278c73" : "transparent", borderRightWidth: lastNameFocus ? 2 : 0, borderRightColor: lastNameFocus ? "#278c73" : "transparent", borderLeftWidth: lastNameFocus ? 2 : 0, borderLeftColor: lastNameFocus ? "#278c73" : "transparent" ,borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomRightRadius:9,borderBottomLeftRadius:9,overflow:"hidden"}}
                            label= "Last Name"
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                            selectionColor="#1aa69a"
                            underlineColor="transparent"
                            onFocus={() => {
                                setLastNameFocus(true)
                            }}
                            onBlur={()=>{
                                setLastNameFocus(false)
                            }}


                        />
                </View>
                <View style={{ width: "100%", marginTop: 15 }}>
                <TextInput
                            style={{ width: "100%", height: 55,  borderTopWidth: emailFocus ? 2 : 0, borderTopColor: emailFocus ? "#278c73" : "transparent", borderRightWidth: emailFocus ? 2 : 0, borderRightColor: emailFocus ? "#278c73" : "transparent", borderLeftWidth: emailFocus ? 2 : 0, borderLeftColor: emailFocus ? "#278c73" : "transparent" ,borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomRightRadius:9,borderBottomLeftRadius:9,overflow:"hidden"}}
                            label="Email Address"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            selectionColor="#1aa69a"
                            underlineColor="transparent"
                            onFocus={() => {
                           
                                setEmailFocus(true)
                            }}
                            onBlur={()=>{
                               
                                setEmailFocus(false)
                            }}


                        />
                </View>
                <View style={{ width: "100%", marginTop: 15 }}>
                <TextInput
                            style={{ width: "100%", height: 55 , borderTopWidth: passwordFocus ? 2 : 0, borderTopColor: passwordFocus ? "#278c73" : "transparent", borderRightWidth: passwordFocus ? 2 : 0, borderRightColor: passwordFocus ? "#278c73" : "transparent", borderLeftWidth: passwordFocus ? 2 : 0, borderLeftColor: passwordFocus ? "#278c73" : "transparent" ,borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomRightRadius:9,borderBottomLeftRadius:9,overflow:"hidden"}}
                            label= "Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            selectionColor="#1aa69a"
                            underlineColor="transparent"
                            secureTextEntry={true}
                            onFocus={() => {
                           
                                setPasswordFocus(true)
                            }}
                            onBlur={()=>{
                                setPasswordFocus(false)
                            }}


                        />
                </View>
                <View style={{ width: "100%", marginVertical: 15 }}>
                <TextInput
                            style={{ width: "100%", height: 55, borderTopWidth: passwordConfirmFocus ? 2 : 0, borderTopColor: passwordConfirmFocus ? "#278c73" : "transparent", borderRightWidth: passwordConfirmFocus ? 2 : 0, borderRightColor: passwordConfirmFocus ? "#278c73" : "transparent", borderLeftWidth: passwordConfirmFocus ? 2 : 0, borderLeftColor: passwordConfirmFocus ? "#278c73" : "transparent" ,borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomRightRadius:9,borderBottomLeftRadius:9,overflow:"hidden"}}
                            label= "Confirm Password"
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
                            selectionColor="#1aa69a"
                            underlineColor="transparent"
                            secureTextEntry={true}
                            onFocus={() => {
                           
                                setPasswordConfirmFocus(true)
                            }}
                            onBlur={()=>{
                                setPasswordConfirmFocus(false)
                            }}


                        />
                </View>

                <View style={{ justifyContent:"center",alignItems:"center",marginTop: 20, width: "100%",height:50, borderColor: "#1aa69a",backgroundColor:"#1aa69a", borderWidth: 1, borderRadius: 10, overflow: "hidden" ,opacity:checking() ? 1: 0.5 }} >
                   {loading ? <ActivityIndicator color="white"  size="large"  /> :  <TouchableOpacity onPress={signUpHandler} ><View style={{width:"100%",height:50,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:20,color:"white",fontWeight:"600"}}>Create</Text></View></TouchableOpacity>}
                </View>

                <View style={{ marginTop:  Dimensions.get("window").height > 735 ? Dimensions.get("window").height * 0.35 : Dimensions.get("window").height * .18,alignSelf:"center" }}>
                    <Text style={{ color: "black", fontSize: 16 }}>Already have account? <TouchableWithoutFeedback onPress={()=>{
                        props.navigation.navigate("SignInScreen")
                    }}>
                        <Text style={{ color:"#1aa69a", fontWeight: "700", fontSize: 14 }}>Sign In</Text>
                    </TouchableWithoutFeedback></Text>
                </View>
            </View>
          </ScrollView>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "flex-start",
        paddingTop: 40,
        paddingHorizontal: 15
    },


})
export default SignUpScreen