import { createContext, useReducer } from "react"
import { API_URL } from "../config";
import { LOGIN } from "./actionTypes";
import { AuthReducer } from "./AuthRedcuer";
import { initialState } from "./initialState";


export const GlobalContext = createContext(initialState);


export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    const loginAction = async (email, password) => {

        let requestBody = { email, password };
        await fetch(API_URL+"api/client/login", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(requestBody)
        }).then(res => res.json())
            .then(data => {
                localStorage.setItem("isLogged", data.status);
                localStorage.setItem("token",data.token);
                dispatch({
                    type: LOGIN,
                    payload: data
                })

            }).catch(error => console.log(error));
    }
    return <GlobalContext.Provider value={{ 
        loginAction,
         isLogged: state.isLogged ,
         message:state.message  ,
         token: state.token
         }}>
        {children}
    </GlobalContext.Provider>
}
