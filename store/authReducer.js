import {AUTHENTICATE,CLEAR} from "./authActions"
const initialState={
    user:null
}

const authReducer=(state=initialState,action)=>{
    switch (action.type) {
        case AUTHENTICATE :
            
          return {user:action.user}  
          case CLEAR :
            return {user:null}    
        default:
          return  state
    }
}
export default authReducer