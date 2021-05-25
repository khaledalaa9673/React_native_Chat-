import React,{ useEffect } from "react"
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux"
import firebase from "../firebase"
import {authenticate,clear} from "../store/authActions" 
import * as Notifications from 'expo-notifications';


const StartAppScreen = (props) => {
    const dispatch=useDispatch()
    useEffect(()=>{
        firebase.auth().onAuthStateChanged( async (user)=>{
            if(user){
                      dispatch(authenticate(user))
                      const pushToken=await Notifications.getExpoPushTokenAsync()
                      console.log(pushToken)
                      firebase.database().ref("users").child(user.uid).update({
                        pushToken:pushToken.data
                         
                    })
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'TabNavigator' }],
                      })

             }else{
                 dispatch(clear())
             props.navigation.replace("GetStartedScreen")

             }
        })
            },[])  
   
    return (
        <View style={styles.screen}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.background} > 
            <Image  source={require("../assets/images/Chatapp.png")} style={styles.image}    />
        </ImageBackground >
       
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
       width:"100%",
       height:'100%',
       justifyContent:"center",
       alignItems:"center"
       
    },
    background:{
        width: 400,
        height:580,
    resizeMode: 'cover', // or 'stretch'
     
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
    },
     
})
export default StartAppScreen