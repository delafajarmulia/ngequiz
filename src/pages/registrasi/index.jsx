import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useEffect, useState } from "react";
import axios from "axios";
import { unAuthUser } from "../../libs/redirect";
import { GoogleLogin } from "@react-oauth/google";

const Registrasi = () => {
    const {Register, isResponseError, token, url} = useAuth()
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError, setIsError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
                        unAuthUser(navigate)
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
        } else if (password.length < 8 || confirmPassword.length < 8) {
            setIsError('password dan confirm password minimal 8 karakter')
        } else if (password !== confirmPassword){
            setIsError('pastikan password dan confirm password sama')
        } else {
            setIsLoading(true)
            await Register({ name, email, password })
        }
    }

    return(
        <div className="w-full flex h-screen">
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
                    <p className="pt-2 text-sm text-red-500">
                        {
                            isError || isResponseError
                        }
                    </p>
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
                    {/* <GoogleLogin 
                        buttonText="Registrasi dengan Google"
                    /> */}
                </div>
            </div>
        </div>

    )
}

export default Registrasi