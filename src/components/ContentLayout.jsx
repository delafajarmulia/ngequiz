import { BottomNavbar } from "./BottomNavbar"
import Navbar from "./Navbar"
import { useLocation } from "react-router-dom"
import { FiPlus } from "react-icons/fi"
import { useState } from "react"

export const ContentLayout = ({ children }) => {
    const location = useLocation()
    const [showModal, setShowModal] = useState(false)
    const isResultPage = location.pathname.includes("/result")

    return(
        <div className="min-h-screen flex flex-col text-black">
            <Navbar/>
            <div className="w-full lg:w-1/3 mx-auto my-2 px-5 mt-16">
                {children}
                
            </div>
            <BottomNavbar />

        </div>
    )
}