import React, { useEffect, useState } from "react"
import {  StyleSheet, Text, View,Image ,TouchableOpacity} from "react-native"
import { useSelector } from "react-redux"
import { DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
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
 

 
const AccountScreen = (props) => {
  const user=useSelector(state=>state.auth.user)
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
 



  const gettingPermision= async() => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }

    const pickImage = async () => {
        gettingPermision()
        let result =await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      }; 
     
 useEffect(()=>{
 setImage(user.photoURL)
 setFirstName(user.displayName.split(' ')[0])
 setLastName(user.displayName.split(' ')[1])
  },[])
  
 
 const  updateHandler=()=>{
     user.updateProfile({
        displayName: `${firstName} ${lastName}`, 
        photoURL:  image
         
 }) 
    firebase.database().ref("users").child(user.uid).update({
        name:`${firstName} ${lastName}`,
        userPhoto:image
    })
 
   
  props.navigation.goBack()
 
    

}

    return (
        <PaperProvider theme={theme}>

            <View style={styles.screen}>
            
            <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",marginTop:30}}>
            
            <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                    <View style={{ width: 70, flexDirection: "row", justifyContent: "space-between" }}>
                        <Image source={require("../assets/images/back.png")} />
                        <Text style={{ fontSize: 18 }} >Back</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 20,fontWeight:"700" }} >My Account</Text>
<TouchableOpacity onPress={updateHandler}>
<Text style={{ fontSize: 16 ,color:"#278c73"}} >Done</Text>

    </TouchableOpacity>                
             </View>
             <View style={{width:"100%",alignItems:"center",marginTop:30}} >
             <View style={{width:"100%",alignItems:"center"}}>
             <Image style={{width:100,height:100,borderRadius:50,borderColor:"white",borderWidth:2,padding:2}}
             
              source={{ uri: image ? image: ""  }}
              />
             <TouchableOpacity color={.9} onPress={pickImage} >
             <Text style={{ fontSize: 18 ,color:"#278c73"}} >Change Photo</Text>
             </TouchableOpacity>

             </View>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",margin:15}}>
            <TextInput
                        style={{ width: "45%", height: 50,backgroundColor:"white",borderWidth:.5,borderColor:"rgba(0,0,0,.2)" }}
                        label="First Name"
                        value={firstName}
                         selectionColor="#278c73"
                        underlineColor="#278c73"
                        onChangeText={(text)=>setFirstName(text)}


                    />
                       <TextInput
                        style={{ width: "45%", height: 50,backgroundColor:"white",borderWidth:1,borderColor:"rgba(0,0,0,.2)" }}
                        label="First Name"
                        value={lastName}
                        onChangeText={(text)=>setLastName(text)}

                         selectionColor="#278c73"
                        underlineColor="#278c73"


                    />
            </View>
                       <TextInput
                        style={{ width: "100%", height: 50,backgroundColor:"white",borderWidth:1,borderColor:"rgba(0,0,0,.2)" }}
                        label="First Name"
                        value={user&&user.email}
                         disabled
                         selectionColor="#278c73"
                        underlineColor="#278c73"


                    />
 

                 
                 </View>
  
 
            </View>
            </PaperProvider >

 

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems:"center",
        backgroundColor:"white",
        padding:20


    }


})
export default AccountScreen

