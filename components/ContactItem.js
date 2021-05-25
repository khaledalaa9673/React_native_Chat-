import React from "react"
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
 
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: "#278c73",
        accent: 'black',
    },
};

const ContactItem = (props) => {
    return (
        <PaperProvider theme={theme}>
 
        <TouchableOpacity onPress={props.openChatHandler}>
            <View style={styles.item}>
                <Image style={styles.image} source={{ uri: props.photo }} />

                <Text style={styles.text}>{props.name}</Text>
            </View>
        </TouchableOpacity>
        </PaperProvider >

    )
}
const styles = StyleSheet.create({
    item: {
        width:"100%",
        height:50,
        flexDirection:"row",
        justifyContent:"flex-start",
        padding:10,
        borderBottomColor:"rgba(0,0,0,.1)",
        borderBottomWidth:1
    },
    image: {
        width:30,
        height:30,
        borderRadius:35,
        borderWidth:2,
        borderColor:"white",
        marginRight:10
  
    },
    text:{
        fontSize:18,
        fontWeight:"600",
        
    }
})
export default ContactItem