import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import Hello from "../../components/Hello"
import { TabLayout } from "../../components/TabLayout"
import axios from "axios"
import { useAuth } from "../../hooks/AuthContext"

const MyQuiz = () => {
    const {url, token} = useAuth()
    const [user, setUser] = useState({})
    const [optionIndex, setOptionIndex] = useState(null)
    const [quizzes, setQuizzes] = useState([])
    const [isQuizUnavailabled, setIsQuizUnavailabled] = useState('')
    const [userPlays, setUserPlays] = useState([])

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

    useEffect(() => {
        const fetchData = async() => {
            if(optionIndex !== null){
                await axios.get(`${url}/result/quiz/${optionIndex}`, {
                    headers: {
                        'Authorization': 'bearer ' + token
                    }
                }).then((response) => {
                    setUserPlays(response.data.payload.datas)
                }).catch((error) => {
                    setUserPlays([])
                    console.log(error)
                })
            }
        }
        
        fetchData()
    }, [optionIndex])

    return(
        <ContentLayout>
            <Hello name={user.name}/>
            <TabLayout />
            <p className="mt-5 font-semibold">Yang udah coba kuis kamu</p>
            <p className="mt-2 font-medium text-sm">{isQuizUnavailabled ? isQuizUnavailabled : '' }</p>
            <select 
                value={optionIndex || ''}
                onChange={(e) => setOptionIndex(e.target.value)}
                className="w-full mt-2 p-2 border-2 border-border focus:border-border focus:outline-none rounded-md"
            >
                <option value="" disabled>Pilih Quiz</option>
                {quizzes.map((quiz) => (
                    <option 
                        key={quiz.id} 
                        value={quiz.id}
                        onChange={() => setOptionIndex(quiz.id)}
                    >
                        {quiz.title}
                    </option>
                ))}
            </select>

            <div className="mt-5 mb-16">
                {
                    userPlays.length < 1 ? 
                        <div className="text-center">Belum ada yang ngerjain nih</div>
                    :
                        userPlays.map((player) => (
                            <div 
                                key={player.id}
                                className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85"
                            >
                                <h2 className="text-lg">{player.user.name}</h2>
                                <p className="text-xs">Score: {player.score}</p>
                                <p className="text-xs">Waktu Penyelesaian: {player.submitted_at}</p>
                            </div>
                        ))
                }
            </div>
        </ContentLayout>
    )
}

export default MyQuiz