import React, { useEffect, useState } from "react"
import { Button, Dimensions, Image, TextInput, StyleSheet, Text, TouchableOpacity, View } from "react-native"


const VerificationCodeScreen = (props) => {
    const [num1, setNum1] = useState("")
    const [num2, setNum2] = useState("")
    const [num3, setNum3] = useState("")
    const [num4, setNum4] = useState("")



    return (

        <View style={styles.screen}>
            <TouchableOpacity onPress={() => { props.navigation.navigate("ForgetPasswordScreen") }}>
                <View style={styles.backBtn}>
                    <Image source={require("../assets/images/back.png")} />
                    <Text style={styles.font} >Back</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.title}>Verification Code</Text>
            <Text style={styles.description}>Email with code has been sent to  your email</Text>
            <View style={{ marginTop: 50, flexDirection: "row", justifyContent: "space-around" }}>
                <View style={styles.inputBox} >
                    <TextInput style={styles.input} maxLength={1} keyboardType="number-pad" />
                </View>
                <View style={styles.inputBox} >
                    <TextInput style={styles.input} maxLength={1} keyboardType="number-pad" />
                </View>
                <View style={styles.inputBox} >
                    <TextInput style={styles.input} maxLength={1} keyboardType="number-pad" />
                </View>
                <View style={styles.inputBox} >
                    <TextInput style={styles.input} maxLength={1} keyboardType="number-pad" />
                </View>
            
            </View>
            <View style={styles.buttonBox} >
                <Button title="Continue" onPress={() => { }} color="#278c73" style={styles.btn} />
            </View>
        </View>



    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 30,


    },
    backBtn: {
        width: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
        marginTop: 30
    },
     description: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 10,
        color: "rgba(0,0,0,.2)"
    },
    inputBox: {
        width: 50,
        height: 50,
        borderColor: "rgba(0,0,0,.5)",
        borderRadius: 2,
        borderWidth: 1
    },
    input: {
        width: "100%",
        height: 48,
        fontSize: 30,
        textAlign: "center"
    },
    font: {
        fontSize: 18
    },
     buttonBox: {
        width: "100%",
        marginTop: 70,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#278c73"
    },
    btn:{
         width: "100%" 
    }

})
export default VerificationCodeScreen

