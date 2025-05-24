import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import Hello from "../../components/Hello"
import { TabLayout } from "../../components/TabLayout"
import axios from "axios"
import { useAuth } from "../../hooks/AuthContext"
import { unAuthUser } from "../../libs/redirect"
import { useNavigate } from "react-router-dom"

const Leaderboard = () => {
    const {url, token, name} = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [optionIndex, setOptionIndex] = useState(null)
    const [quizzes, setQuizzes] = useState([])
    const [isQuizUnavailabled, setIsQuizUnavailabled] = useState('')
    const [userPlays, setUserPlays] = useState([])
    const [quizNameIsLoading, setQuizNameIsLoading] = useState(true)
    const [fetchDataIsLoading, setFetchDataIsLoading] = useState(false)

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/user/me`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setUser(response.data.payload.datas)
            }).catch((error) => {
                console.log(error.response.status)
                const errorCode = error.response.status
                
                if(errorCode === 401){
                    unAuthUser(navigate)
                }
            })
        })()
    }, [token])

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/quiz/name`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setQuizNameIsLoading(false)
                setQuizzes(response.data.payload.datas)
            }).catch((err) => {
                const errorCode = err.response.status

                if(errorCode == 404){
                    setIsQuizUnavailabled('Belum ada yang buat Quiz nih. Buat dulu yuk!')
                }
            })
        })()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            setFetchDataIsLoading(true)
            if(optionIndex !== null){
                await axios.get(`${url}/result/quiz/${optionIndex}`, {
                    headers: {
                        'Authorization': 'bearer ' + token
                    }
                }).then((response) => {
                    setFetchDataIsLoading(false)
                    setUserPlays(response.data.payload.datas)
                }).catch((error) => {
                    fetchDataIsLoading(false)
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
            <p className="mt-5 font-semibold">Cek peringkat kamu</p>
            <p className="mt-2 font-medium text-sm">{isQuizUnavailabled ? isQuizUnavailabled : '' }</p>
            <select 
                value={optionIndex || ''}
                onChange={(e) => setOptionIndex(e.target.value)}
                className="w-full mt-2 p-2 border-2 border-border focus:border-border focus:outline-none rounded-md"
            >
                <option value="" disabled>Pilih Quiz</option>
                {
                    quizNameIsLoading ? 
                        <option>Mengambil Quiz...</option>
                    :
                        quizzes.map((quiz) => (
                            <option 
                                key={quiz.id} 
                                value={quiz.id}
                                onChange={() => setOptionIndex(quiz.id)}
                            >
                                {quiz.title}
                            </option>
                        ))
                }
            </select>

            <div className="mt-5 mb-16">
                {
                    fetchDataIsLoading ?
                        <p className="text-center">Mengambil data...</p>
                    :
                        userPlays.length < 1 ? 
                            <div className="text-center">Belum ada yang ngerjain nih</div>
                        :
                            userPlays.map((player, idx) => (
                                <div 
                                    key={player.id}
                                    className="w-full grid grid-cols-6 gap-3 my-2 cursor-pointer text-black font-semibold"
                                >
                                    <div className="border-2 border-primary rounded-lg p-3 text-center">
                                        <h1>#{idx + 1}</h1>
                                    </div>
                                    <div className="border-2 border-primary col-span-5 rounded-lg p-3 flex justify-between hover:bg-primary hover:text-white hover:border-2">
                                        <h1>{player.user.name}</h1>
                                        <h1>{player.score}</h1>
                                    </div>
                                </div>
                            ))
                }
            </div>
        </ContentLayout>
    )
}

export default Leaderboard