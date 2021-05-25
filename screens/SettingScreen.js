import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View,Alert } from "react-native"
import {signOut} from "../store/authActions"
import firebase from "../firebase"



const SettingScreen = (props) => {
  
    return (
        <View style={styles.screen}>
            <Text style={{ fontSize: 24, fontWeight: "700", color: "black", marginVertical: 40 }} > Settings</Text>
            <View style={{ width: "100%", height: 170, backgroundColor: "#eeee", paddingVertical: 10 }}>
                <TouchableOpacity activeOpacity={.9} onPress={()=>{
                    props.navigation.navigate("AccountScreen")
                }} >
                    <View style={{ width: "100%", height: 50, backgroundColor: "white", flexDirection: "row", justifyContent:"space-between", paddingHorizontal: 20, alignItems: "center" }}>
                        <View style={{flexDirection: "row"}}>
                            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../assets/images/account.png")} />
                            <Text style={{ fontSize: 18, fontWeight: "600" }}>My Account</Text>
                        </View>
                        <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../assets/images/arrow.png")} />
                 </View>

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.9} onPress={()=>{
                    props.navigation.navigate("ChangingPasswordScreen")
                }} >
                    <View style={{ width: "100%", height: 40, backgroundColor: "white", flexDirection: "row", justifyContent:"space-between", paddingHorizontal: 20, alignItems: "center",marginVertical:10 }}>
                        <View style={{flexDirection: "row"}}>
                            <Image style={{ width: 20, height: 27, marginRight: 10 }} source={require("../assets/images/password.png")} />
                            <Text style={{ fontSize: 18, fontWeight: "600" }}>Change Password</Text>
                        </View>
                        <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../assets/images/arrow.png")} />
                 </View>

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.9} onPress={()=>{
                                         props.navigation.navigate("DeactivateScreen")
                                        
                 }} >
                    <View style={{ width: "100%", height: 40, backgroundColor: "white", flexDirection: "row", justifyContent:"space-between", paddingHorizontal: 20, alignItems: "center",marginBottom:5 }}>
                        <View style={{flexDirection: "row"}}>
                            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../assets/images/deactivate.png")} />
                            <Text style={{ fontSize: 18, fontWeight: "600" }}>Deactivate Account</Text>
                        </View>
                        <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require("../assets/images/arrow.png")} />
                 </View>

                </TouchableOpacity>

            </View>
           <TouchableOpacity  activeOpacity={.9} onPress={()=>{signOut()}}>
           <Text style={{ fontSize: 20, fontWeight: "600",color:"red",margin:20 }}>Logout</Text>

           </TouchableOpacity>

        </View>



    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white"


    }


})
export default SettingScreen

