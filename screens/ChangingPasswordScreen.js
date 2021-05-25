import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image,Button, Alert } from "react-native"
import { DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import firebase from "../firebase"

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: "#278c73",
        accent: 'black',
    },
};



const ChangingPasswordScreen = (props) => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

 const changingPasswordHandler=()=>{
   if(currentPassword.trim().length >= 8 && newPassword.trim().length >= 8){
    reauthenticate(currentPassword).then(() => {
        var user = firebase.auth().currentUser
        user.updatePassword(newPassword).then(() => {
            props.navigation.navigate("SettingScreen")
        }).catch((error) => { console.log(error) })
      }).catch((error) => { Alert.alert("something went wrong","please enter the correct  current password",[{text:"Okay",style:"cancel"}]) })
    
   }else {
    Alert.alert("something went wrong","please enter the valid old and new password",[{text:"Okay",style:"cancel"}])
   }
 }
     return (
        <PaperProvider theme={theme}>

            <View style={styles.screen}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }}>
                    <View style={{ width: 70, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                        <Image source={require("../assets/images/back.png")} />

                        <Text style={{ fontSize: 18 }} >Back</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 26, fontWeight: "600", marginTop: 30 }}>Change Password</Text>
                <View style={{ width: "100%", marginTop: 20 }}>
                    <TextInput
                        style={{ width: "100%", height: 50, }}
                        label="Current Password"
                        value={currentPassword}
                        onChangeText={text => setCurrentPassword(text)}
                        selectionColor="#278c73"
                        underlineColor="#278c73"
                    />
                </View>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={{ fontSize: 16, color: "#278c73", alignSelf: "flex-end" }}>Forgot Password ?</Text>

                </TouchableOpacity>
                <View style={{ width: "100%", marginTop: 20 }}>
                    <TextInput
                        style={{ width: "100%", height: 50, }}
                        label="New Password"
                        value={newPassword}
                        onChangeText={text => setNewPassword(text)}
                        selectionColor="#278c73"
                        underlineColor="#278c73"
                    />
                </View>

                <View style={{ marginTop: 50, width: "100%", borderColor: "#278c73", borderWidth: 1, borderRadius: 10, overflow: "hidden" }} >
                    <Button title="Save" onPress={changingPasswordHandler} color="#278c73" style={{ width: "100%" }} />
                </View>

            </View>


        </PaperProvider >
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 30,


    }


})
export default ChangingPasswordScreen

