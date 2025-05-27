import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useEffect, useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc"

const Registrasi = () => {
    const {Register, isResponseError, RegistWithGoogle, token, url} = useAuth()
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError, setIsError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [responseError, setResponseError] = useState('')

    useEffect(() => {
        if(token){
            (async(e) => {
                await axios.get(`${url}/user/me`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
                }).then((response) => {
                    navigate('/dashboard', { replace: true })
                }).catch((error) => {
                    const errorCode = error.response.status

                    if(errorCode === 401){
                        localStorage.removeItem('token')
                        setToken(null)
                        return 
                    } else if (errorCode !== 401){
                        navigate('/registrasi')
                    }
                })
            })()
        } else {
            navigate('/registrasi')
        }
    }, [])

    const handleSubmit = async({ name, email, password, confirmPassword }) => {
        setIsLoading(true)
        if(!name, !email, !password, !confirmPassword){
            setIsError('pastikan seluruh data terisi dengan benar')
            setIsLoading(false)
            return
        } else if (password.length < 8 || confirmPassword.length < 8) {
            setIsError('password dan confirm password minimal 8 karakter')
            setIsLoading(false)
            return
        } else if (password !== confirmPassword){
            setIsError('pastikan password dan confirm password sama')
            setIsLoading(false)
            return
        } else {
            try {
                setIsLoading(true)
                await Register({ name, email, password })
            } catch (err) {
                setResponseError(err.message)
                console.log(responseError)
                setIsLoading(false)
            }
        }
    }

    const handleRegistWithGoogle = useGoogleLogin({
        flow: 'implicit', // atau cukup hilangkan `flow`, default-nya implicit
        onSuccess: async (tokenResponse) => {
            try {
            const { access_token } = tokenResponse;

            // Ambil data user dari Google
            const { data: userInfo } = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                }
            );

            // console.log(userInfo); // ← email, name, picture, dsb.
            setIsLoading(true)
            RegistWithGoogle(userInfo.email, userInfo.name)
            } catch (err) {
                setIsLoading(false)
                console.error('Gagal ambil user info:', err);
            }
        },
        onError: (error) => {
            setIsLoading(false)
            console.log('Google login failed', error);
        },
    });

    return(
        <div className="w-full flex h-screen">
            {
                isLoading ? 
                    <div className="mt-5">
                        <p className="text-center">Loading...</p>
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
                            <p>Buat akun dulu, yuk!</p>
                            {(isError || isResponseError || responseError) && (
                                <p className="pt-2 text-sm text-red-500">
                                    {
                                        (isError || isResponseError || responseError)?.toString()
                                    }
                                </p>
                            )}
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit({name, email, password, confirmPassword})
                            }}>
                                <div className="my-3">
                                    <p>Nama</p>
                                    <input 
                                        type="text" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Jhon Doe"
                                        className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                                    />
                                </div>
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
                                <div className="my-3">
                                    <p>Ulangi Password</p>
                                    <input 
                                        type={showConfirmPassword ? 'text' : 'password'} 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Minimal 8 karakter"
                                        className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                                    />
                                    <div className="flex flex-cols mt-0.5">
                                        <input type="checkbox" onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> 
                                        <p className="text-sm pl-1">lihat password</p>                  
                                    </div>
                                </div>
                                <button
                                    className={`w-full pt-1.5 pb-2 bg-primary text-white font-semibold rounded-md mt-5 ${
                                        isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                    }`}
                                >
                                    {isLoading ? 'Memproses...' : 'Daftar'}
                                </button>
                            </form>
                            <p className="text-center">Sudah punya akun?
                                <Link
                                    className="text-primary underline pl-1 cursor-pointer"
                                    to={'/login'}
                                >
                                        Login disini
                                </Link>
                            </p>

                            <div className="mt-4">
                                <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                    <span>atau</span>
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                </div>
                                <button 
                                    onClick={handleRegistWithGoogle}
                                    disabled={isLoading}
                                    className="w-full py-2 hover:cursor-pointer border-2 border-border rounded-lg flex items-center justify-center gap-2"
                                >
                                    <FcGoogle className="text-lg"/> 
                                    { isLoading ? 'Loading...' : 'Daftar dengan Google'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>

    )
}

export default Registrasi