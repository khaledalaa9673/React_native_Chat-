import firebase from "../firebase"

export const GET_USERS="GET_USERS"
export const SET_CHANNEL="SET_CHANNEL"

export const  getUsers=(currentUserId)=>{
    return async(dispatch)=>{
    const loadedUsers=[]
    firebase.database().ref("users").on("child_added",snap=>{
         if(currentUserId !== snap.key){
            let user=snap.val()
            user["uid"]=snap.key
            user["number"]=0,
            user["message"]="",
            user["date"]="",
            loadedUsers.push(user)
 
        dispatch({
            type:GET_USERS,
            users:loadedUsers
        })
        }


    })
}
}
export const setChannel=(channel)=>{
     return dispatch=>{
        dispatch({
            type:SET_CHANNEL,
            channel:channel
        })
    }

} 
