import React, { useEffect } from "react"
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import { FlatList } from "react-native-gesture-handler";
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


const UserContactItem = (props) => {
    const { users } = props
   
    return (
        <PaperProvider theme={theme}>
            <View>
                <FlatList data={props.users} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => {
                    return (
                        <View style={{ marginVertical: 5, padding: 5,}}>
                            <Text style={{ fontSize: 16, fontWeight: "700" , backgroundColor: "#eeee" ,padding:2}}>{item.char}</Text>
                            <FlatList data={item.data} keyExtractor={(item, index) => index.toString()} renderItem={({item} ) => {
                                return (
                                    <TouchableOpacity onPress={()=>props.openChatHandler(item.uid, item.name, item.userPhoto,props.senderId,props.senderName)}>
                                        <View style={styles.item}>
                                            <Image style={styles.image} source={{ uri: item.userPhoto }} />

                                            <Text style={styles.text}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }} />
                        </View>
                    )
                }} />
            </View>
        </PaperProvider >

    )
}
const styles = StyleSheet.create({
    item: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 10,
        borderBottomColor: "rgba(0,0,0,.1)",
        borderBottomWidth: 1,
        backgroundColor:"white",
        marginBottom:2
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: "white",
        marginRight: 10

    },
    text: {
        fontSize: 18,
        fontWeight: "600",

    }
})
export default UserContactItem