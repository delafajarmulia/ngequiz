import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthContext"

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth()

    if(isLoading) return <div>loading...</div>

    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    return children
}

export default PrivateRoute