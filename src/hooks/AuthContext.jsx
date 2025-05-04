import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setTokenAction, getTokenAction } from "../libs/auth-libs";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, isProtected = false }) => {
  const url = "http://localhost:2007/api/v1";
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("dela.fjr08@gmail.com");
  const [password, setPassword] = useState("fajar2278");
  const navigate = useNavigate();

  // Load token dari localStorage saat pertama kali mount
  // useEffect(() => {
  //   const storedToken = getTokenAction();
  //   if (storedToken) {
  //     setToken(storedToken);
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  // Auto-redirect ke /dashboard kalau token ter-update
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/user/auth/login`, {
        email,
        password,
      });

      const tkn = response.data.payload.datas;
      setToken(tkn);
      console.log(tkn)
      // setTokenAction(tkn); // <- pastikan yang disimpan benar
    } catch (err) {
      console.log(err?.response?.status + " " + password);
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
        email,
        setEmail,
        password,
        setPassword,
        Login,
        Logout,
        token,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};