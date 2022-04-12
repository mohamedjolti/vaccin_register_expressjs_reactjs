import { createContext, useReducer } from "react"
import { LOGIN } from "./actionTypes";
import { AuthReducer } from "./AuthRedcuer";
import { initialState } from "./initialState";


export const GlobalContext = createContext(initialState);


export const GlobalProvider =  ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    const loginAction =async (email, password) => {

        let requestBody = { email, password };
     await   fetch("http://localhost:7000/api/client/login", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(requestBody)
        }).then(res => res.json())
            .then(data => {
                dispatch({
                    type: LOGIN,
                    payload: data.status
                })

            }).catch(error => console.log(error));
    }
    return <GlobalContext.Provider value={{ loginAction, isLogged: state.isLogged }}>
        {children}
    </GlobalContext.Provider>
}