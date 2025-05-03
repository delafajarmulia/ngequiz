import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setTokenAction } from "../libs/auth-libs";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children, isProtected = false }) => {
    const url = "http://localhost:2007/api/v1";
    const [token, setToken] = useState(""); // Menyimpan token
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const Login = async (e) => {
        e.preventDefault()
    
        await axios.post(
            `${url}/user/auth/login`,
            {
                email,
                password
            }
        ).then((response) => {
            const tkn = response.data.payload.datas
            setToken(tkn)
            setTokenAction(token)

            if(token) navigate('/dashboard')
        }).catch((err) => {
            console.log(err.response.status + '' +password)
            return err.response
        })
    }

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                url,
                email,
                setEmail,
                password,
                setPassword,
                Login,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};