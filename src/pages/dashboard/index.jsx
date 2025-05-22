import { ContentLayout } from "../../components/ContentLayout"
import { TabLayout } from "../../components/TabLayout";
import Hello from "../../components/Hello";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const {url, token, name} = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [quizzes, setQuizzes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
    }, [token])

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/quiz`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setIsLoading(false)
                setQuizzes(response.data.payload.datas)
            })
        })()
    }, [])

    const playQuiz = (quizId) => {
        navigate(`/play-quiz/${quizId}/question/`)
    }

    return(
        <ContentLayout>
            <Hello name={user.name}/>

            <TabLayout />

            <div className="mt-5 mb-16">
                {
                    isLoading ? 
                        <p className="text-center">Mengambil Quiz...</p>
                    :
                        quizzes.map(quiz => (
                            <div 
                                key={quiz.id} 
                                onClick={() => playQuiz(quiz.id)}
                                className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85"
                            >
                                <h2 className="text-lg">{quiz.title}</h2>
                                <p className="text-xs">Pembuat: {quiz.creator.name}</p>
                            </div>
                ))}
            </div>
        </ContentLayout>
    )
}

export default Dashboard