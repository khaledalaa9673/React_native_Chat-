import React, { useEffect, useState } from "react"
import { Button, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../store/authActions"
import firebase from "../firebase";
import { getUsers, setChannel } from "../store/messagesActions"
import ContactItem from "../components/ContactItem"
import { Searchbar } from 'react-native-paper';
import UserContactItem from "../components/UserContactItem"




const ContactsScreen = (props) => {
    const dispatch = useDispatch()
    const userid = useSelector(state => state.auth.user ? state.auth.user.uid : null)
    const [searchQuery, setSearchQuery] = useState('');
    const user = useSelector(state => state.auth.user)
    const users = useSelector(state => state.chat.users)
    const [loadedUsers, setLoadedUsers] = useState([])
    const [formatedUsers, setFormatedUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const getUserHandler = async () => {
        setLoading(true)
        if (userid !== null) {
            await dispatch(getUsers(userid))

        }
        setLoading(false)
    }

    useEffect(() => {
        getUserHandler()
    }, [])

    useEffect(() => {

        setLoadedUsers(users)
        handlingUsersFormat()
        console.log(getAvailableUsers(users), "fffffffffffffffffffffffffffffffffffffffffffff")
    }, [users,searchQuery])
    

    const addChannelHandler = (id) => {

        return id > userid ? dispatch(setChannel(`${id}/${userid}`)) : dispatch(setChannel(`${userid}/${id}`))
    }
    const handlingUsersFormat = () => {
        const users = getAvailableUsers(loadedUsers)
        const alphabit = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        const obj = {}
        const fun = () => {
            alphabit.forEach((element, index) => {
                const usersCollection = users.filter(user => {
                    return user.name && user.name[0].toLowerCase() === element.toLowerCase()
                })
                if (usersCollection.length > 0) {
                    obj[element] = usersCollection
                }

            })
            return obj
        }
        const newObj = fun()
        let newArray = []
        for (let key in newObj) {
            let element = newObj[key]

            newArray.push({ "char": key, data: element })


        }

        setFormatedUsers(newArray)
    }
    const openChatHandler = (uid, name, userPhoto, senderId, displayName) => {
        addChannelHandler(uid)
        props.navigation.navigate("ChattingScreen", {
            id: uid,
            name: name,
            userPhoto: userPhoto,
            sender: {
                id: senderId,
                name: displayName,
            }
        })
    }
    const  getAvailableUsers = (users) => {
        if (searchQuery.trim().length > 0) {
            return users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

        } else {
            return users
        }

    }


    return (
        <View style={styles.screen}>
            <Text style={{ fontSize: 26, fontWeight: "700" }}>Contacts</Text>
            <Searchbar
                style={{ backgroundColor: "#eeee", marginVertical: 10, borderRadius: 10 }}
                placeholder="Search"
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            />

            <UserContactItem
                users={formatedUsers}
                senderId={user&&user.uid}
                senderName={user&&user.displayName}
                openChatHandler={openChatHandler}

            />


        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 10,
        backgroundColor: "white"
    },


})
export default ContactsScreen

