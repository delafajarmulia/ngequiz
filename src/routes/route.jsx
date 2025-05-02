import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "../pages/landing"
import Login from "../pages/login"
import Registrasi from "../pages/registrasi"
import Dashboard from "../pages/dashboard"
import MyQuiz from "../pages/dashboard/MyQuiz"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/registrasi" element={<Registrasi />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-quiz" element={<MyQuiz />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router