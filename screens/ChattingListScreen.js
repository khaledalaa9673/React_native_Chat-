import React, { useEffect, useState ,useRef } from "react"
import { Alert, Button, FlatList, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../store/authActions"
import firebase from "../firebase"
import { getUsers, setChannel } from "../store/messagesActions"
import UserChatItem from "../components/UserChatItem"
import { Searchbar } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import moment from 'moment';

 

const ChattingListScreen = (props) => {
    const dispatch = useDispatch()
    const userid = useSelector(state => state.auth.user ? state.auth.user.uid : null)
    const user = useSelector(state => state.auth.user)
    const [searchQuery, setSearchQuery] = useState('');
    const notificationListener = useRef()
    const users = useSelector(state => state.chat.users)
    const [loadedUsers, setLoadedUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalVisible,setModalVisible]=useState(false)
    const [availableUsers, setAvailableUsers] = useState([])

    

    const getUserHandler = async () => {
        setLoading(true)
        if (userid !== null) {
            await dispatch(getUsers(userid))

        }
        setLoading(false)
    }

    useEffect(() => {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(statusObj=>{
            if(statusObj.status != "granted"){
               Alert.alert("Notification Messege","you will not recived any notification",[{text:"Okay",style:"cancel"}])
            }
         })
        getUserHandler()
      
    }, [])




    useEffect(() => {

         setLoadedUsers(users)
    }, [users])
   
    
    
    const addChannelHandler = (id) => {

        return id > userid ? dispatch(setChannel(`${id}/${userid}`)) : dispatch(setChannel(`${userid}/${id}`))
    }


useEffect(()=>{
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      })
      notificationListener.current =Notifications.addNotificationReceivedListener( async (response)=>{
       
        setLoadedUsers(loadedUsers=>loadedUsers.filter((user)=>{
            if(user.uid===response.request.content.data.recievedUser){
                 
               user.message =response.request.content.data.message
               user.date=moment(response.request.content.data.date).format('DD MMM h:mm A')
                user.number +=1
                 return user
            }
        
            return user
       
        }))
       const num=await  firebase.database().ref("users").child(user.uid).once("value",snap=>{
            return console.log(snap.val().number)
        })
    
        firebase.database().ref("users").child(user.uid).update({
            message: response.request.content.data.message,
             number:  num.val().number+1,
            date:moment(response.request.content.data.date).format('DD MMM h:mm A')
             
        })
       
    
      })
     return ()=>{
        Notifications.removeNotificationSubscription(notificationListener);
     }
},[])

const clearNotafication=(id,date,message)=>{
    console.log(date+"      "+id+"   "+message)
    firebase.database().ref("users").child(id).update({
        date:date,
        number:0,
        message:message
      
         
    })
    setLoadedUsers(loadedUsers=>loadedUsers.filter((user)=>{
        if(user.uid=== id){
        
           user.number =0 
             return user
        }
    
        return user
   
    }))

}
 

 
useEffect(()=>{
    setLoadedUsers(users)
    console.log(searchQuery)
    if(searchQuery.trim().length === 0){
        return  
    } 
    setLoadedUsers(users=>users.filter(user=>{
        if (user.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())){
            return user
        } 
        
    }))
    console.log(loadedUsers.length)
   },[searchQuery])

    return (
        <View style={styles.screen}>
            <Text style={{ fontSize: 26, fontWeight: "700" }}>Chats</Text>
            <Searchbar
                value={searchQuery}
               style={{backgroundColor:"#eeee",marginVertical:10,borderRadius:10}}
                placeholder="Search"
                onChangeText={(text)=>setSearchQuery(text)}
                // onFocus={()=>setModalVisible(true)}
            />
              
            <FlatList showsVerticalScrollIndicator={false} data={loadedUsers} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => {
                return (
                    <UserChatItem name={item.name}  clearNotafication={()=> clearNotafication(item.uid)} photo={item.userPhoto}  date={item.date} number={item.number} message={item.message} openChatHandler={() => {
                        addChannelHandler(item.uid)
                       
                        props.navigation.navigate("ChattingScreen", {
                            id: item.uid,
                            name: item.name,
                            userPhoto: item.userPhoto,
                            sender: {
                                id: user.uid,
                                name: user.displayName,
                            },
                            pushToken:item.pushToken,
                     
                            clearNotafication:()=>clearNotafication(item.uid,item.date,item.message)
                            
                        })
                    }} />

                )
            }} onRefresh={getUserHandler} refreshing={loading} />
            {/* <Modal visible={modalVisible} onRequestClose={()=>setModalVisible(false)}> 
             <View style={{marginTop:10}}>
             <Searchbar
               style={{backgroundColor:"#eeee",marginVertical:10,borderRadius:10}}
                placeholder="Search"
                onChangeText={(text)=>setSearchQuery(text)}
                value={searchQuery}
                onFocus={()=>setModalVisible(true)}
                
            />
             </View>
             <FlatList showsVerticalScrollIndicator={false} data={availableUsers} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => {
                return (
                    <UserChatItem name={item.name} photo={item.userPhoto}  date={item.date} number={item.number} message={item.message} openChatHandler={() => {
                        addChannelHandler(item.uid)
                        clearNotafication(item.uid)
                        props.navigation.navigate("ChattingScreen", {
                            id: item.uid,
                            name: item.name,
                            userPhoto: item.userPhoto,
                            sender: {
                                id: user.uid,
                                name: user.displayName,
                            },
                            pushToken:item.pushToken,
                            
                        })
                    }} />

                )
            }}   />
            
            </Modal> */}

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        paddingTop: 30,
        paddingHorizontal:10,
        backgroundColor:"white"
    },


})
export default ChattingListScreen