import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useEffect, useState } from "react"
import axios from "axios"
import { useGoogleLogin } from "@react-oauth/google"
import { FcGoogle } from "react-icons/fc"

const Login = () => {
    const {Login, LoginWithGoogle, isResponseError, token, setToken, url} = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState('')
    const [isLoading, setIsLoading] = useState(true) // 1. Set isLoading menjadi true saat pertama kali dimuat
    const [showPassword, setShowPassword] = useState(false)
    const [responseError, setResponseError] = useState('')

    useEffect(() => {
        const checkAuth = async () => {
            if(token){
                try {
                    await axios.get(`${url}/user/me`, {
                        headers: {
                            'Authorization': 'bearer ' + token
                        }
                    })
                    navigate('/dashboard', { replace: true })
                } catch (error) {
                    const errorCode = error.response.status
                    if(errorCode === 401){
                        localStorage.removeItem('token')
                        setToken(null)
                    }
                    setIsLoading(false) // Hentikan loading jika ada error atau token tidak valid
                }
            } else {
                setIsLoading(false) // Hentikan loading jika tidak ada token
            }
        }
        checkAuth()
    }, [token, navigate, setToken, url])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsError('')
        setResponseError('')
        setIsLoading(true) // Mulai loading saat submit

        if(!email || !password){
            setIsError('Email dan Password harus diisi!')
            setIsLoading(false)
            return
        } else if (password.length < 8){
            setIsError('Password minimal 8 karakter')
            setIsLoading(false)
            return
        } 

        try {
            await Login({ email, password })
        } catch (err) {
            setResponseError(err.message)
            console.log(responseError)
        } finally {
            setIsLoading(false) // Selalu hentikan loading, baik sukses atau gagal
        }
    }

    const handleLoginWithGoogle = useGoogleLogin({
        flow: 'implicit',
        onSuccess: async (tokenResponse) => {
            setIsLoading(true) // Mulai loading untuk Google
            try {
                const { access_token } = tokenResponse
                const { data: userInfo } = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                LoginWithGoogle(userInfo.email, userInfo.name)
            } catch (err) {
                setIsLoading(false) // Hentikan loading jika gagal
                console.error('Gagal ambil user info:', err)
            }
        },
        onError: (error) => {
            setIsLoading(false)
            console.log('Google login failed', error)
        },
    })

    return(
        <div className="w-full h-screen flex">
            {
                isLoading ? 
                    <div className="w-full h-screen flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-center text-xl font-medium">Loading...</p>
                    </div>
                :
                <>
                    {/* KIRI: tampil hanya di desktop (sm ke atas) */}
                    <div className="hidden sm:flex bg-primary w-1/2 justify-center items-center">
                        <div className="flex text-white font-medium text-3xl">
                            <h1>Nge</h1>
                            <h1 className="bg-white text-primary px-1.5 pt-0.5 pb-1 font-bold rounded-md">Q</h1>
                            <h1>uiz</h1>
                        </div>
                    </div>

                    {/* KANAN: tampil di semua ukuran */}
                    <div className="w-full sm:w-1/2 bg-white flex justify-center items-center">
                        <div className="w-3/4 md:1/2">
                            <h2 className="font-semibold text-2xl">Halo! 👋🏻</h2>
                            <p>Senang bisa ketemu lagi. Yuk, login disini!</p>
                            {(isError || isResponseError || responseError) && (
                                <p className="pt-2 text-sm text-red-500">
                                    {(isError || isResponseError || responseError)?.toString()}
                                </p>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="my-3">
                                    <p>Email</p>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="jhon@example.com"
                                        className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                                    />
                                </div>
                                <div className="my-3">
                                    <p>Password</p>
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Minimal 8 karakter"
                                        className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                                    />
                                    <div className="flex flex-cols mt-0.5">
                                        <input type="checkbox" onClick={() => setShowPassword(!showPassword)} /> 
                                        <p className="text-sm pl-1">lihat password</p>                  
                                    </div>
                                </div>
                                <button
                                    className={`w-full pt-1.5 pb-2 bg-primary text-white font-semibold rounded-md cursor-pointer mt-5 ${
                                        isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Login...' : 'Login'}
                                </button>
                            </form>
                            <p className="text-center">Belum punya akun?
                                <Link
                                    className="text-primary underline pl-1 cursor-pointer"
                                    to={'/registrasi'}
                                >
                                        Buat disini
                                </Link>
                            </p>

                            <div className="mt-4">
                                <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                    <span>atau</span>
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                </div>
                                <button 
                                    onClick={handleLoginWithGoogle}
                                    disabled={isLoading}
                                    className="w-full py-2 hover:cursor-pointer border-2 border-border rounded-lg flex items-center justify-center gap-2"
                                >
                                    <FcGoogle className="text-lg"/> 
                                    { isLoading ? 'Loading...' : 'Login dengan Google'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>

    )
}

export default Login