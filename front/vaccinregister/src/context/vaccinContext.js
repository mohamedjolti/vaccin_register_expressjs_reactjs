import { createContext, useContext, useReducer } from "react"
import { API_URL } from "../config";
import { GET_VACCINS } from "./actionTypes";
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
    return <VaccinContext.Provider value={{
        fetchVaccins,
        vaccins: state.vaccins
    }}>
        {children}
    </VaccinContext.Provider>
}