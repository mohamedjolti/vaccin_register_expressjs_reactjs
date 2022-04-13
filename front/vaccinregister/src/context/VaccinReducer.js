import { ADD_VACCIN, GET_VACCINS } from "./actionTypes";

export const vaccinReducer=(state,action)=>{
    switch(action.type){
        case GET_VACCINS:
            action.payload.forEach(element => {
                element["id"]=element._id;
            });
            console.log(action.payload);
            return {...state,vaccins:action.payload}  
        default:
            return state;
    }
}