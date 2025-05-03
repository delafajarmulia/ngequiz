import { ContentLayout } from "../../components/ContentLayout"
import { TabLayout } from "../../components/TabLayout";
import Hello from "../../components/Hello";
import { useAuth } from "../../hooks/AuthContext";
// import hello from '../../assets/hello.svg'
// import Navbar from "../../components/Navbar"

const Dashboard = () => {
    const {url, token} = useAuth()
    return(
        <ContentLayout>
            <Hello />

            <TabLayout />

            <div className="mt-5 mb-16">
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
                <div className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Pembuat: Dela Fajar Mulia</p>
                </div>
            </div>
        </ContentLayout>
    )
}

export default Dashboard