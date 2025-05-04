import { ContentLayout } from "../../components/ContentLayout"
import { TabLayout } from "../../components/TabLayout";
import Hello from "../../components/Hello";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const {url, token} = useAuth()
    const [user, setUser] = useState({})
    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/user/me`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setUser(response.data.payload.datas)
            })
        })()
    }, [])

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/quiz`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setQuizzes(response.data.payload.datas)
            })
        })()
    }, [])

    return(
        <ContentLayout>
            <Hello name={user.name}/>

            <TabLayout />

            <div className="mt-5 mb-16">
                {quizzes.map(quiz => (
                    <div key={quiz.id} className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85">
                        <h2 className="text-lg">{quiz.title}</h2>
                        <p className="text-xs">Pembuat: {quiz.creator.name}</p>
                    </div>
                ))}
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