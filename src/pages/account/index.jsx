import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { unAuthUser } from "../../libs/redirect"

const Account = () => {
    const {url, token, setToken} = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${url}/user/me`, {
            headers:{
                'Authorization': 'bearer ' + token
            }
        }).then((response) => {
            setIsLoading(false)
            setUser(response.data.payload.datas)
        }).catch((error) => {
            const errorCode = error.response.status
            
            if(errorCode === 401){
                unAuthUser(navigate)
            }
        })
    }, [])

    const Logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        navigate('/login')
    }

    return(
        <ContentLayout>
            <div className=" bg-white ">
                <h1 className="text-center mt-3 text-black text-xl font-medium">Profile</h1>
                <div className="my-3">
                    <p>Email</p>
                    <input 
                        type='email'
                        value={isLoading ? 'Mengambil data...' : user.email}
                        readOnly
                        className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                    />
                </div>
                <div className="my-3">
                    <p>Nama</p>
                    <input 
                        type='text'
                        value={isLoading ? 'Mengambil data...' : user.name}
                        readOnly
                        className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                    />
                </div>
                <div className="my-3">
                    <button 
                        onClick={() => Logout()}
                        className="w-full py-1.5 mt-1 text-center bg-red-500 text-white rounded-md hover:cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </ContentLayout>
    )
}

export default Account