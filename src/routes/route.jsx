import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "../pages/landing"
import Login from "../pages/login"
import Registrasi from "../pages/registrasi"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/registrasi" element={<Registrasi />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router