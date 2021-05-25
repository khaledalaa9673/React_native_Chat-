import firebase from "../firebase"
import md5 from "md5"
 
export const AUTHENTICATE="AUTHENTICATE"
export const CLEAR="CLEAR"
 
 


export const authenticate=(user)=>{
    return {
        type:AUTHENTICATE,
        user:user
    }
} 
export const clear=()=>{
    return {
        type:CLEAR
         
    }
} 
export const signUp = (firstName, lastName, email, password) => {
    
        firebase.auth().createUserWithEmailAndPassword(email,password).then((createdUser) => {

            createdUser.user.updateProfile({
                displayName: `${firstName} ${lastName}`, 
                photoURL: `http://gravatar.com/avatar/${md5(
                    createdUser.user.email
                )}?d=identicon`
            }).then(()=>{
                 firebase.database().ref("users").child(createdUser.user.uid).set({
                     name:createdUser.user.displayName,
                     userPhoto: createdUser.user.photoURL,
                     date:"",
                     message:"",
                     number:0
                      
                 })
              
            }).catch((error)=>{
                throw error
            })


        }).catch((error)=>{
            throw error
       })
    }
 

export const  login=async(email,password)=>{
        try {
          const response= await  firebase.auth().signInWithEmailAndPassword(email,password) 
          console.log(response.user)
        } catch (error) {
            console.log(error)
            throw error

        }
    }

 export const signOut=()=>{
    try {
        console.log("111")
        firebase.auth().signOut() 
    } catch (error) {
        throw new Error("something went wromg")
    }
 }   

export const resetPassword= async(email)=>{
     try {
      await firebase.auth().sendPasswordResetEmail(email) 
    
     } catch (error) {
        throw new Error("something went wromg")
     }
      
} 