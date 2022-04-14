import { ADD_VACCIN, DELETE_VACCIN, GET_VACCINS, UPDATE_VACCIN } from "./actionTypes";

export const vaccinReducer=(state,action)=>{
    switch(action.type){
        case GET_VACCINS:
            action.payload.forEach(element => {
                element["id"]=element._id;
            });
            console.log(action.payload);
            return {...state,vaccins:action.payload}  
        case ADD_VACCIN :
            action.payload.id=action.payload._id;
            return {...state, vaccins:[...state.vaccins,action.payload]}
        case UPDATE_VACCIN:
           let updatedVaccins= state.vaccins.map(vaccin=>{
                if(vaccin._id== action.payload._id){
                    action.payload.id=action.payload._id;
                    return action.payload;
                }else{
                    return vaccin;
                }
            });
            console.log(updatedVaccins);
            return {...state,vaccins:updatedVaccins}
        case DELETE_VACCIN:
            
            return {...state ,
            vaccins:state.vaccins.filter(vaccin=>vaccin._id!==action.payload._id)
            }
        default:
            return state;
    }
}