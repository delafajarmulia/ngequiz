import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import axios from "axios"
import { useAuth } from "../../hooks/AuthContext"
import { Link, useNavigate, useParams } from "react-router-dom"
import { unAuthUser } from "../../libs/redirect"

const PlayMyQuiz = () => {
    const { url, token } = useAuth()
    const { quizId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [played, setPlayed] = useState([])

    console.log(quizId)

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/result/my-quiz/${quizId}`,{
                headers: {
                    "Authorization": 'bearer ' + token
                },
            }).then((response) => {
                console.log(response.data.payload.datas)
                setPlayed(response.data.payload.datas)
                setIsLoading(false)
            }).catch(err => {
                const errorCode = err.response.status
                
                if(errorCode === 401){
                    unAuthUser(navigate)
                }
            })
        })()
    }, [quizId])

    return(
        <ContentLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Play My Quiz</h1>
                <p className="mt-2 text-gray-600">This is the Play My Quiz page.</p>

                {isLoading ?
                    'masih loading'
                    :
                    <div>
                        {played.map((player) => (
                            <div
                                key={player.id}
                                className="p-4 border border-border"
                            >
                                <p className="font-semibold">
                                    {player.user.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Score: {player.score}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Completed at: {new Date(player.submitted_at).toLocaleString("id-ID", {
                                        dateStyle: "long",
                                        timeStyle: "short"
                                    })}
                                </p>
                                <Link
                                    to={`/accuration-player-my-quiz/${player.quiz.id}/result/${player.id}`}
                                >
                                    Lihat akurasi jawaban → 
                                </Link>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </ContentLayout>
    )
}

export default PlayMyQuiz