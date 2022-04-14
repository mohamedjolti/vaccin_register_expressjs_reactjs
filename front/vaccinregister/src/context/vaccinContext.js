import { createContext, useContext, useReducer } from "react"
import { API_URL } from "../config";
import { ADD_VACCIN, GET_VACCINS } from "./actionTypes";
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
    return <VaccinContext.Provider value={{
        fetchVaccins,
        addVaccin,
        vaccins: state.vaccins
    }}>
        {children}
    </VaccinContext.Provider>
}