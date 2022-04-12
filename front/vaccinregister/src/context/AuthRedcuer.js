import { LOGIN } from "./actionTypes";

export const AuthReducer=(state,action)=>{
    switch(action.type){
        case LOGIN:
            return {...state,isLogged:action.payload}           
        default:
            return state;
    }
}