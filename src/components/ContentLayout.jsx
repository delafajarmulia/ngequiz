import { BottomNavbar } from "./BottomNavbar"
import Navbar from "./Navbar"

export const ContentLayout = ({ children }) => {
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