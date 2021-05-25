import React, { useState,useEffect } from "react"
import { View, Text,TouchableOpacity } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';


const AudioPlayer = (props) => {
   
    const [playing, setPlaying] = useState(false)

    const [sound, setSound] = useState();

    async function playSound(file) {
        const { sound } = await Audio.Sound.createAsync({ uri: file })

      if(!props.recoredingStatus){
      if(props.canPlayaudio){
        props.changePlayAudio()
        setPlaying(true)
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync({ uri: file })
        setSound(sound);
  
    
        console.log('Playing Sound');
        await sound.playAsync(); 
      
        sound.setOnPlaybackStatusUpdate(status => {
          if (status.didJustFinish) {
              setPlaying(false)
              props.changePlayAudio()
          }
      })
      }

}else{
   if(sound){
       await sound.stopAsync()
   }else{
    setSound(null)
   }
    
}
    }

const {recoredingStatus}=props
  useEffect(()=>{
  console.log(recoredingStatus)
  },[recoredingStatus])  
  
    React.useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);
  


 
 
 
    return (
        <TouchableOpacity onPress={() => playSound(props.file)}  >
            {playing ? <View style={{ width: "80%", borderRadius: 10, backgroundColor: props.sender.id === props.id ? "#278c73" : "#eeee", padding: 10 }} >
                <Text><FontAwesome name="stop" size={20} color="white" /><Text style={{ margin: 10 }}>audio</Text></Text>
            </View>
                : <View style={{ width: "80%", borderRadius: 10, backgroundColor: props.sender.id === props.id ? "#278c73" : "#eeee", padding: 10 }} >
                    <Text><FontAwesome name="play" size={20} color="white" /><Text style={{ margin: 10 }}>audio</Text></Text>
                </View>}

        </TouchableOpacity>
    )
}

export default AudioPlayer