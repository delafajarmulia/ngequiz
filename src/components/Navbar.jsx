import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="w-full h-14 fixed top-0 shadow-2xs shadow-border bg-white flex items-center px-5 z-50">
            <div className="w-full lg:w-1/3 mx-auto flex font-medium text-2xl">
            <Link to="/dashboard" className="flex items-center hover:opacity-80 transition">
                <h1>Nge</h1>
                <h1 className="bg-primary text-white px-1.5 font-bold rounded-md">Q</h1>
                <h1>uiz</h1>
                </Link>
            </div>
        </nav>
    )
}


export default Navbar