import { ContentLayout } from "../../components/ContentLayout"
import { TabLayout } from "../../components/TabLayout";
import Hello from "../../components/Hello";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { unAuthUser } from "../../libs/redirect";
import { FiUser, FiSearch,FiShare2, FiClock } from "react-icons/fi";
import { LuLockKeyhole } from "react-icons/lu";


const Dashboard = () => {
    const { url, token } = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [quizzes, setQuizzes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/user/me`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setUser(response.data.payload.datas)
            }).catch((error) => {
                const errorCode = error.response.status

                if(errorCode === 401){
                    unAuthUser(navigate)
                }
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

    const playQuiz = async(quizId) => {
        await axios.post(`${url}/result`, {quiz_id: quizId}, {
            headers: {
                'Authorization': 'bearer ' + token
            }
        }).then((response) => {
            const resultId = response.data.payload.datas.id
            
            localStorage.setItem('quiz-playing-id', quizId)
            localStorage.setItem('result-id', resultId)
            
            navigate(`/play-quiz/${quizId}/question/`)
        }).catch((error) => {
            console.log(error)
        })
    }

    const shareLink = (quizId) => {
        navigator.clipboard.writeText(`https://ngequiz.netlify.app/play-quiz/${quizId}/question/`);
        alert("Link quiz telah disalin ke clipboard!");
    }

    const filteredQuizzes = quizzes.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return(
        <ContentLayout>
            <Hello name={user.name}/>

            <TabLayout />

            <div className="relative my-4">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari quiz..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div className="mt-5 mb-16">
                {
                    isLoading ? 
                        <p className="text-center">Mengambil Quiz...</p>
                    :
                        filteredQuizzes.length > 0 ? (
                            filteredQuizzes.map(quiz => (
                                <div 
                                    key={quiz.id} 
                                    onClick={() => playQuiz(quiz.id)}
                                    className="w-full bg-primary rounded-lg p-5 pb-6.5 text-white font-semibold my-2 cursor-pointer hover:opacity-85 flex justify-between"
                                >
                                    <div>
                                        <h2 className="text-lg">{quiz.title}</h2>
                                        <div className="flex items-center gap-2 text-xs text-white">
                                            <FiUser className="text-white" size={14} />
                                            <span>{quiz.creator.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-white">
                                            <FiClock className="text-white" size={14} />
                                            <span>
                                                {new Date(quiz.created_at).toLocaleString("id-ID", {
                                                    dateStyle: "long",
                                                    timeStyle: "short"
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-white">
                                            <LuLockKeyhole className="text-white" size={14} />
                                            <span>
                                                {/* 1x Percobaan &infin; */}
                                                {quiz.is_once ? '1x Percobaan' : '∞ Percobaan'}
                                            </span>
                                        </div>

                                    </div>
                                    <button
                                        className="ml-auto flex justify-between items-center gap-1 px-2 py-1 text-white font-medium rounded-md text-sm hover:cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // biar gak trigger onClick parent
                                            shareLink(quiz.id);
                                        }}
                                    >
                                        <FiShare2 size={24} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Quiz tidak ditemukan</p>
                        )
                }
            </div>
        </ContentLayout>
    )
}

export default Dashboard