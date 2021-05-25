import { SectionList } from "react-native"
import {GET_USERS,SET_CHANNEL} from "./messagesActions"
const initialState={
    users:[],
    currentChannel:null
}

const messagesReducer=(state=initialState,action)=>{
    switch (action.type) {
        case  GET_USERS:
            return{
                ...state,
                users:action.users
            }
        case SET_CHANNEL:
            return{
            ...state,
            currentChannel:action.channel
        }  
        default:
          return  state
    }
}
export default messagesReducer