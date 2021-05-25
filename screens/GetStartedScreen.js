import React ,{useEffect} from "react"
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"



const GetStartedScreen = (props) => {
 
    
    return (
        <View style={styles.screen}>
            <Image source={require("../assets/images/vector.png")} style={styles.image} />
            <View style={styles.description}>
                <Text style={styles.desTitle}>Chat Together</Text>
                <Text style={styles.desParagraph}>Lorem Ipsum copy in various charsets and languages for layouts Lorem Ipsum .</Text>
            </View>
            <View style={styles.buttonBox}>
                <TouchableOpacity     onPress={()=>{
                props.navigation.navigate("SignUpScreen")
            }}><Text style={{fontSize:18,fontWeight:"700",color:"white"}}   >Get Started</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>{
                props.navigation.navigate("SignInScreen") 
            }}>
            <Text style={styles.signText}>Sign In</Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    image: {
        width: "80%",
        height: 325,
        marginTop: 40

    },
    description: {
        marginHorizontal: "10%",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 20
    },
    desTitle: {
        fontSize: 24,
        fontWeight: "700"
    },
    desParagraph: {
        fontSize: 14,
        marginTop: 15,
        color: "rgba(0,0,0,.2)",
        textAlign:"center"
    },
    buttonBox: {
        borderWidth: 1,
        justifyContent:"center",
        alignItems:"center",
        borderColor: "#1aa69a",
        borderRadius: 10,
        backgroundColor:"#1aa69a",
        overflow: "hidden",
        width: "94%",
        height:60,
        marginTop: 40,

    },
  
    signText: {
        fontSize: 16,
        color:"#1aa69a",
        marginTop: 15,
        fontWeight: "700"
    }

})
export default GetStartedScreen