import { useContext } from "react"
import { GlobalContext } from "../context/gloabalContext";
import { Login } from "./Login";

export const PrivateComponent = ({ children }) => {
    const { isLogged } = useContext(GlobalContext);
    console.log("private component",isLogged);
    if (isLogged) {
        return (
        <>
            {children}
        </>
        );
    } else {
        return <Login />;
    }
}