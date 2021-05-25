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

const UserChatItem = (props) => {
    return (
        <PaperProvider theme={theme}>

            <TouchableOpacity onPress={props.openChatHandler}>
                <View style={{...styles.item,...{backgroundColor:props.number > 0 ? "rgba(26, 166, 154, .03)":"white"}}}>
                    <Image style={styles.image} source={{ uri: props.photo }} />
                   <View style={{height:50,flexDirection:"row",flexWrap:"wrap" ,width:"80%",padding:5}}>

                   <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={styles.text}>{props.name}</Text>
                        {props.date.length > 0 &&<Text style={{color:"rgba(0,0,0,.4)"}}>{props.date}</Text>}
                    </View>
                    <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
                    {props.message.length > 0 &&<Text style={{color:"rgba(0,0,0,.4)"}}>{props.message}</Text>}
                    {props.number > 0 &&<Text style={{backgroundColor: "#1aa69a",width:40,height:37,padding:5,borderRadius:20,fontSize:14,overflow:"hidden",textAlign:"center"}}>{props.number}</Text>}
                    </View>
                   </View>

                </View>
            </TouchableOpacity>
        </PaperProvider >

    )
}
const styles = StyleSheet.create({
    item: {
        width: "100%",
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        padding: 10,
        borderBottomColor: "rgba(0,0,0,.1)",
        borderBottomWidth: 1,
        flexWrap:"wrap"
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: "white",
        marginRight: 10

    },
    text: {
        fontSize: 18,
        fontWeight: "700",

    }
})
export default UserChatItem