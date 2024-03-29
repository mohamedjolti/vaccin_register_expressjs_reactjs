import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/gloabalContext';
import Alert from '@mui/material/Alert';

export const Login = () => {
    let { loginAction, message } = useContext(GlobalContext);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let alert = message ? <Alert severity="error">{message}</Alert> : (<></>);
    
    let changeValue = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case "email":
                setEmail(value);
                break
            case "password":
                setPassword(value)

        }
    }
    let login = () => {
        loginAction(email, password);
    }

    return <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
    >
        {alert}
        <TextField onChange={changeValue} id="email" label="Email" variant="outlined" />
        <TextField onChange={changeValue} id="password" label="Password" variant="filled" />
        <Button onClick={login}>Sign IN</Button>

    </Box>
}