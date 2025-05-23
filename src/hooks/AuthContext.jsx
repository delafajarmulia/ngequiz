import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setTokenAction, getTokenAction } from "../libs/auth-libs";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, isProtected = false }) => {
  // const url = "http://localhost:2007/api/v1";
  const url = import.meta.env.VITE_API_URL
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [isResponseError, setIsResponseError] = useState('')
  // const [name, setName] = ('')
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndSetToken = async () => {
      const storedToken = getTokenAction();
  
      if (!storedToken) {
        setIsLoading(false);
        return navigate("/", { replace: true });
      }
  
      try {
        const me = await axios.get(`${url}/user/me`, {
          headers: {
            Authorization: "bearer " + storedToken,
          },
        });
  
        // console.log('from auth' + me.data.payload.datas.name)
        // setName(me.data.payload.datas.name)
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setToken(null);
        return navigate("/", { replace: true });
      } finally {
        setIsLoading(false); // <- dijalankan di semua kondisi
      }
    };
  
    verifyAndSetToken();
  }, []); 
  
  const Register = async ({ name, email, password }) => {
    setIsLoading(true)
    await axios.post(`${url}/user/auth/register`, {
      name,
      email, 
      password
    }).then((response) => {
      Login({ email, password })
    }).catch((err) => {
      setIsResponseError(err.response.data.payload.message)
    })
  }

  const Login = async ({ email, password }) => {
    try {
      setIsLoading(true)
      const response = await axios.post(`${url}/user/auth/login`, {
        email,
        password,
      });

      const tkn = response.data.payload.datas;
      setToken(tkn);
      setTokenAction(tkn); // <- pastikan yang disimpan benar
      navigate('/dashboard')
      setIsLoading(false)
    } catch (err) {
      setIsResponseError(err.response.data.payload.message)
    }
  };

  const Logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        url,
        Register,
        Login,
        Logout,
        isResponseError,
        token,
        // name,
        isAuthenticated: !!token,
        isLoading
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};