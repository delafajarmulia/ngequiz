import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import Hello from "../../components/Hello"
import { TabLayout } from "../../components/TabLayout"
import axios from "axios"
import { useAuth } from "../../hooks/AuthContext"

const MyQuiz = () => {
    const {url, token} = useAuth()
    const [user, setUser] = useState({})
    const [quizzes, setQuizzes] = useState([])
    const [isQuizUnavailabled, setIsQuizUnavailabled] = useState('')

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
            await axios.get(`${url}/quiz/me`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setQuizzes(response.data.payload.datas)
            }).catch((err) => {
                if(err.response.status == 404){
                    setIsQuizUnavailabled('Kamu belum pernah buat Quiz nih. Buat dulu yuk!')
                }
            })
        })()
    }, [])

    return(
        <ContentLayout>
            <Hello name={user.name}/>
            <TabLayout />
            <p className="mt-5 font-semibold">Yang udah coba kuis kamu</p>
            <p className="mt-2 font-medium text-sm">{isQuizUnavailabled ? isQuizUnavailabled : '' }</p>
            <select 
                name="" 
                id=""
                className="w-full mt-2 p-2 border-2 border-border focus:border-border focus:outline-none rounded-md"
            >
                {quizzes.map((quiz) => (
                    <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
                ))}
            </select>
            <div className="mt-5 mb-16">
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
            </div>
        </ContentLayout>
    )
}

export default MyQuiz