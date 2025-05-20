import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useState } from "react"

const Login = () => {
    const {Login} = useAuth()
    const [email, setEmail] = useState('user1@gmail.com')
    const [password, setPassword] = useState('12345678')

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
                    <p>Senang bisa ketemu lagi. Yuk, login disini!</p>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        Login({ email, password })
                    }}>
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
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Minimal 8 karakter"
                                className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                            />
                        </div>
                        <button
                            className="w-full pt-1.5 pb-2 bg-primary text-white font-semibold rounded-md cursor-pointer mt-5">
                            Login
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
                </div>
            </div>
        </div>

    )
}

export default Login