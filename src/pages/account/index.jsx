import { useEffect, useState } from "react" 
import { ContentLayout } from "../../components/ContentLayout"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { unAuthUser } from "../../libs/redirect"
import defaultAvatar from "../../assets/avatar.jpg"

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

    // Fungsi greeting sesuai waktu
    const getGreeting = () => {
        const hour = new Date().getHours()
        if(hour < 12) return "Selamat pagi"
        if(hour < 18) return "Selamat siang"
        return "Selamat malam"
    }

    return(
<ContentLayout>
  <div className="max-w-sm mx-auto mt-5 mb-20 rounded-2xl shadow-2xl overflow-hidden bg-white">
    
    {/* Bagian atas (header card) */}
    <div className="relative bg-primary h-56 flex flex-col items-center justify-center">
  <img
    src={user.avatarUrl || defaultAvatar}
    alt="User Avatar"
    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg relative z-10"
  />
  <h2 className="mt-3 text-lg font-semibold text-white relative z-10">
    {getGreeting()}, {isLoading ? "..." : user.name} 👋
  </h2>
  <p className="text-sm text-blue-100 relative z-10">Semoga harimu menyenangkan!</p>

  {/* Wave transisi ke putih */}
  <svg
    className="absolute bottom-0 left-0 w-full z-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="#ffffff"   
      fillOpacity="1"
      transform="scale(1,-1) translate(0,-450)"
      d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,192C672,213,768,235,864,213.3C960,192,1056,128,1152,128C1248,128,1344,192,1392,224L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    ></path>
  </svg>
</div>


    {/* Konten profil */}
    <div className="p-6">
      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={isLoading ? "Mengambil data..." : user.email}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Nama */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Nama</label>
        <input
          type="text"
          value={isLoading ? "Mengambil data..." : user.name}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Tombol Logout */}
      <button
        onClick={Logout}
        className="w-full py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  </div>
</ContentLayout>

    )
}

export default Account
