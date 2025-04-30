import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "../pages/landing"
import Login from "../pages/login"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router