import { createContext, useContext, useReducer } from "react"
import { API_URL } from "../config";
import { ADD_VACCIN, DELETE_VACCIN, GET_VACCINS, UPDATE_VACCIN } from "./actionTypes";
import { GlobalContext } from "./gloabalContext";
import { vaccinReducer } from "./VaccinReducer";

const initialState = {
    vaccins: []
}

export const VaccinContext = createContext(initialState);


export const VaccinProivder = ({ children }) => {
    const [ state, dispatch ] = useReducer(vaccinReducer,initialState);
    const { token } = useContext(GlobalContext);

    const fetchVaccins = () => {
        fetch(API_URL + "api/vaccin", {
            headers: {
                "token": token
            }
        }).then(res => res.json())
            .then(jsonResult => {
                dispatch({
                    type: GET_VACCINS,
                    payload: jsonResult.data
                })
            })
    }
    /**
     * 
     * @param {{
     * date:Date,
     * hospital:string
     * }} newVaccin 
     */
    const addVaccin = (newVaccin)=>{
        fetch(API_URL + "api/vaccin", {
            headers: {
                "token": token,
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(newVaccin) 
        }
        ).then(response=>response.json())
            .then(jsonResult => {
                dispatch({
                    type: ADD_VACCIN,
                    payload: jsonResult.data
                })
            })
    }

     /**
     * 
     * @param {{
      * date:Date,
      * hospital:string,
      * _id:number
      * }} newVaccin 
      */
    const updateVaccin= (editedVaccin)=>{
        fetch(API_URL + "api/vaccin", {
            headers: {
                "token": token,
                "Content-Type":"application/json"
            },
            method:"PUT",
            body:JSON.stringify(editedVaccin) 
        }
        ).then(response=>response.json())
            .then(jsonResult => {
                dispatch({
                    type: UPDATE_VACCIN,
                    payload: jsonResult.data
                })
            })
    }
    const deleteVaccin=(id)=>{
        fetch(API_URL + "api/vaccin", {
            headers: {
                "token": token,
                "Content-Type":"application/json"
            },
            method:"DELETE",
            body:JSON.stringify({_id:id}) 
        }
        ).then(response=>response.json())
            .then(jsonResult => {
                dispatch({
                    type: DELETE_VACCIN,
                    payload: jsonResult.data
                })
            })
    }
    return <VaccinContext.Provider value={{
        fetchVaccins,
        addVaccin,
        updateVaccin,
        deleteVaccin,
        vaccins: state.vaccins
    }}>
        {children}
    </VaccinContext.Provider>
}