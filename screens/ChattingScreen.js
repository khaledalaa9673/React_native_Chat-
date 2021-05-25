import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, FlatList, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import firebase from "../firebase"
import * as Notifications from 'expo-notifications'
import * as DocumentPicker from 'expo-document-picker'
 import * as mime from 'react-native-mime-types'
 import { ProgressBar } from "react-native-paper"
import { Audio } from 'expo-av';
import md5 from "md5"
import AudioPlayer from "../components/AudioPlayer" 
 
const ChattingScreen = (props) => {
    const userid = useSelector(state => state.auth.user ? state.auth.user.uid : null)
    const pushToken = useSelector(state => state.auth.pushToken)
    const [file, setFile] = useState(0)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [startMessaging, setStartMessaging] = useState(false)
    const [progress, setProgress] = useState(0)
    const typesList = ["application/pdf"]
    const [sound, setSound] = useState();
    const [canPlayaudio, setCanPlayAudio] = useState(true);
    const [recoredingStatus,setRecoredingStatus]=useState(false)
     const [recording, setRecording] = useState();

   const  { route, navigation }=props
const changePlayAudio=()=>{
    setCanPlayAudio(c=>!c)
}

    async function startRecording() {
        setRecoredingStatus(true)
         
       
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            console.log('Recording started');

           recording.setOnRecordingStatusUpdate(status=>{
                if(!status.canRecord){
                    setRecoredingStatus(false)
         
                }
            
            })

        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setSound(uri)
    }
    
 

    const channel = useSelector(state => state.chat.currentChannel)
    useEffect(() => {
        const loadedMessages = []
        firebase.database().ref(`messages/${channel}`).on("child_added", snap => {

            let message = snap.val()
            message["id"] = snap.key
            loadedMessages.push(message)

            setMessages(loadedMessages)
        })

        setMessage("")
        return () => {
            route.params.clearNotafication()
            firebase.database().ref(`messages/${channel}`).off()
        }
    }, [])
    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        })


    }, [])


    const sendMessageHandler = (file, type, fileName) => {
        if (type === "text") {
            firebase.database().ref(`messages/${channel}`).push({
                message: message,
                sender: {
                    id: route.params.sender.id,
                    name: route.params.sender.name
                },
                type: "text"
            })
            try {
                fetch("https://exp.host/--/api/v2/push/send", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Accept-Encoding": "gzip,deflate",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        to: route.params.pushToken,
                        data: {
                            sender: route.params.sender.name,
                            recievedUser: route.params.sender.id,
                            value: 1,
                            message: message,
                          

                        },
                        title: `New Message From  ${route.params.sender.name}`,
                        body: message
                    })
                })


            } catch (error) {
                console.log("push notafication error")
            }
            setMessage("")
        } else if (type === "file") {
            firebase.database().ref(`messages/${channel}`).push({
                file: file,
                sender: {
                    id: route.params.sender.id,
                    name: route.params.sender.name
                },
                type: "file",
                fileName: fileName

            })
            try {
                fetch("https://exp.host/--/api/v2/push/send", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Accept-Encoding": "gzip,deflate",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        to: route.params.pushToken,
                        data: {
                            sender: route.params.sender.name,
                            recievedUser: route.params.sender.id,
                            value: 1,
                            message: `${fileName}`,
                            body: fileName,
 
                        },
                        title: `New Message From  ${route.params.sender.name}`,
                        body: `${fileName}`
                    })
                })


            } catch (error) {
                console.log("push notafication error")
            }
            setMessage("")
        } else {
            firebase.database().ref(`messages/${channel}`).push({
                file: file,
                sender: {
                    id: route.params.sender.id,
                    name: route.params.sender.name
                },
                type: "audio",
                fileName: fileName

            })
            try {
                fetch("https://exp.host/--/api/v2/push/send", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Accept-Encoding": "gzip,deflate",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        to: route.params.pushToken,
                        data: {
                            sender: route.params.sender.name,
                            recievedUser: route.params.sender.id,
                            value: "1",
                            message: "audio",
                            fileName: fileName,
 
                        },
                        title: `New Message From  ${route.params.sender.name}`,
                        body: `${fileName}`
                    })
                })


            } catch (error) {
                console.log("push notafication error")
            }
            setMessage("")
        }
    }
    const sendfileHandler = async () => {

        const fileSource = await DocumentPicker.getDocumentAsync()
        setFile(fileSource)
        console.log(file)// name size uri  type  (success if accept)

        if (typesList.includes(mime.lookup(file.name))) {

            const filePath = `chat/${file.name}`
            const metadata = { contentType: mime.lookup(file.name) }

            const response = await fetch(file.uri);
            const blob = await response.blob();



            let uploadTask = firebase.storage().ref().child(filePath).put(blob, metadata)

            uploadTask.on('state_changed',
                (snapshot) => {

                    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)


                }, (error) => {
                    console.log(error + "                              error                         ");
                },
                () => {

                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        sendMessageHandler(downloadURL, "file", file.name)
                    });
                }
            );
            setFile(null)
        } else {
            Alert.alert("something went wrong ", "please enter only  pdf file", [{ text: "okay", style: "cancel" }])
            return
        }
    }
    const sendAudioHandler = async () => {

        // name size uri  type  (success if accept)

        console.log(mime.lookup(sound))
        const filePath = `chat/${md5(sound)}.mp4`
        const metadata = { contentType: mime.lookup(sound) }

        const response = await fetch(sound);
        const blob = await response.blob();



        let uploadTask = firebase.storage().ref().child(filePath).put(blob, metadata)

        uploadTask.on('state_changed',
            (snapshot) => {

                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)


            }, (error) => {
                console.log(error + "                              error                         ");
            },
            () => {

                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    sendMessageHandler(downloadURL, "audio", "audio")
                });
            }
        );
        setSound(null)

    }



    return (
        <View style={styles.screen}>
            <View style={{ flexDirection: 'row', width: "80%", justifyContent: 'space-around', alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <View style={{ width: 70, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                        <Image source={require("../assets/images/back.png")} />

                        <Text style={{ fontSize: 18 }} >Back</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 35, }} source={{ uri: route.params.userPhoto }} />
                    <Text>{route.params.name}</Text>

                </View>
            </View>
            <FlatList   showsVerticalScrollIndicator={false}
            
            
            contentContainerStyle={{ padding: 5, width: 360, }} data={messages} keyExtractor={(item, index) => item.id} renderItem={({ item }) => {
                return (
                    <View style={{ width: "100%", marginVertical: 5, alignItems: item.sender.id === userid ? "flex-end" : "flex-start",paddingHorizontal:20 }}>
                        {item.type === "file" && <View style={{ maxWidth: "80%", borderRadius: 10, backgroundColor: item.sender.id === userid ? "#278c73" : "#eeee" }} >
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("FileViewer", {
                                    file: item.file
                                })
                            }}>
                                <Text style={{ textAlign: item.sender.id === userid ? "left" : "right", padding: 10 }}>{item.fileName}</Text>


                            </TouchableOpacity>
                        </View>}
 

                        {item.type === "text" && <View style={{ maxWidth: "80%", borderRadius: 10, backgroundColor: item.sender.id === userid ? "#278c73" : "#eeee" }} ><Text style={{ textAlign: item.sender.id === userid ? "left" : "right", padding: 10 }}>{item.message}</Text></View>}
                        {item.type === "audio" && <AudioPlayer sender={item.sender} changePlayAudio={changePlayAudio} canPlayaudio={canPlayaudio} recoredingStatus={recoredingStatus} file={item.file} id={userid} /> }
                    </View>
                )
            }} />
            {progress > 0 && progress < 100 && <ProgressBar progress={progress} color="red" />}
            <View style={{ width: 360, height: 50, marginVertical: 10, flexDirection: "row", justifyContent: "space-around", alignItems: "center", }}>


                {!startMessaging && <View style={{ width: 60, height: 30, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                    <TouchableOpacity onPress={sendfileHandler} ><Image style={{ width: 30, height: 30 }} source={require("../assets/images/add.png")} /></TouchableOpacity>

                    {!sound ? <TouchableOpacity onPress={recording ? stopRecording : startRecording} >{recording ? <Text>stop</Text> : <Image style={{ width: 30, height: 30 }} source={require("../assets/images/record.png")} />}</TouchableOpacity>
                        : <TouchableOpacity onPress={sendAudioHandler}>
                            <Image style={{ width: 25, height: 25 }} source={require("../assets/images/send-audio.png")} />
                        </TouchableOpacity>}
                </View>}
                <View style={{ width: startMessaging ? "100%" : "80%", height: 40, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#eeee", padding: 10, borderRadius: 10, overflow: "hidden" }}>
                    <TextInput value={message} onChangeText={(text) => {
                        setMessage(text)
                    }} style={{ width: "80%", height: 40, backgroundColor: "#eeee" }} onFocus={() => setStartMessaging(true)} onBlur={() => setStartMessaging(false)} placeholder="Type Message Here" />
                    {startMessaging && <TouchableOpacity onPress={() => sendMessageHandler(message, "text")} >
                        <Image style={{ width: 25, height: 25 }} source={require("../assets/images/send.png")} />
                    </TouchableOpacity>}
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 25,
        paddingHorizontal: 20,


    }


})
export default ChattingScreen

