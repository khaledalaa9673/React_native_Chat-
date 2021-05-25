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



const DeactivateScreen = (props) => {
    const [currentPassword, setCurrentPassword] = useState("")
 
  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  const DeleteMethod =()=>{
    var user = firebase.auth().currentUser;
    reauthenticate(currentPassword).then(()=>{ user.delete().then(function() {
        var ref = firebase.database().ref(`users/${user.uid}`)
        ref.remove()
     })}) 

}

 const deleteAccount=()=>{
    Alert.alert("Deleteing Account","Are You Sure You Want To Delete Your Account",[{text:"Cancel",style:"cancel"},{text:"Delete",style:"cancel",onPress:()=>{DeleteMethod()}}])

 
     
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
                <Text style={{ fontSize: 26, fontWeight: "600", marginTop: 30 }}>Deactivate Screen</Text>
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
             

                <View style={{ marginTop: 50, width: "100%", borderColor: "#278c73", borderWidth: 1, borderRadius: 10, overflow: "hidden" }} >
                    <Button title="Delete" onPress={deleteAccount} color="#278c73" style={{ width: "100%" }} />
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
export default DeactivateScreen

