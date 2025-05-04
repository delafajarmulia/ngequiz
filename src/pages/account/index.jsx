import { useEffect, useState } from "react"
import { BottomNavbar } from "../../components/BottomNavbar"
import { ContentLayout } from "../../components/ContentLayout"
import Navbar from "../../components/Navbar"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"

const Account = () => {
    const {url, token} = useAuth()
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`${url}/user/me`, {
            headers:{
                'Authorization': 'bearer ' + token
            }
        }).then((response) => {
            setUser(response.data.payload.datas)
        })
    }, [])

    const Logout = () => {
        console.log('logout dipencet')
    }

    return(
        <ContentLayout>
            <Navbar />
            <div className=" bg-white ">
                <div className="my-3">
                    <p>Email</p>
                    <input 
                        type='email'
                        value={user.email}
                        readOnly
                        className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                    />
                </div>
                <div className="my-3">
                    <p>Nama</p>
                    <input 
                        type='text'
                        value={user.name}
                        readOnly
                        className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                    />
                </div>
                <div className="my-3">
                    <button 
                        onClick={() => Logout()}
                        className="w-full py-1.5 mt-1 text-center bg-red-500 text-white rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <BottomNavbar />
        </ContentLayout>
    )
}

export default Account