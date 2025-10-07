import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useEffect, useState } from "react"
import axios from "axios"
import { ContentLayout } from "../../components/ContentLayout"
import { FiArrowLeft, FiArrowRight  } from "react-icons/fi"
import { unAuthUser } from "../../libs/redirect"

const AccurationPlayerMyQuiz = () => {
    const { url, token } = useAuth()
    const navigate = useNavigate()
    let { quizId, resultId } = useParams()
    const [data, setData] = useState({})
    const [score, setScore] = useState(0)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0) // index soal aktif
    const [myResults, setMyResults] = useState([])
    
    quizId = parseInt(quizId)
    resultId = parseInt(resultId)

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/user/me`, {
                headers: {
                    "Authorization": 'bearer ' + token
                }
            }).then((response) => {
                return
            }). catch((error) => {
                const errorCode = error.response.status

                if(errorCode === 401) return unAuthUser(navigate)
            })
        })()
    }, [])
    
    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/quiz/${quizId}`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                const result = response.data.payload.datas
    
                setData({
                    title: result.title, 
                    description: result.description ?? null
                })
                setQuestions(result.questions)
            }).catch((error) => {
                const errorCode = error.response.status
                
                if(errorCode === 401){
                    unAuthUser(navigate)
                }
                
                console.log(error)
            })
        })()
    }, [])
    
    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/answer/result/${resultId}`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setAnswers(response.data.payload.datas)
                // console.log(response.data.payload.datas)
                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
            })
        })()
    }, [])
    
    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/result/${resultId}/score?include=user`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setScore(response.data.payload.datas.score)
                console.log(response.data.payload.datas)
                setMyResults(response.data.payload.datas) 
            }).catch((error) => {
                console.log(error)
            })
        })()
    }, [])

    return(
        <ContentLayout>
            <div className="mt-2 mb-16 ">
                <h1 className="text-center text-primary font-medium text-xl">{data.title}</h1>
                <div className="flex">
                    <div>
                        Soal: {currentPage + 1} / {questions.length}
                    </div>
                <div className="flex-1 flex justify-center items-center text-sm text-gray-500">
                    <p className="text-gray-400 mr-1" size={14}/>
                    {/* Pastikan myResults tidak kosong sebelum mengakses submitted_at */}
                    {myResults.length > 0 && new Date(myResults[0].submitted_at).toLocaleString("id-ID", {
                        dateStyle: "long",
                        timeStyle: "short",
                    })}
                </div>
                <div className="flex flex-col items-end gap-1 p-4 ">
                <p className="text-blue-600 font-semibold text-lg">
                    Skor: {score}
                </p>
                <p className="text-gray-700 text-sm italic">
                    {myResults.user?.name}
                </p>
                </div>

            </div>
                
                {
                    !isLoading && questions.length > 0 && (
                        <div className="mt-4">
                        {/* soal */}
                            <div className="w-full border-2 border-border rounded-lg px-5 py-3 pb-6.5 my-3">
                                <p>{questions[currentPage].question}</p>
                                
                                {questions[currentPage].choices.map(choice => {
                                    const answer = answers.find(ans => ans.choice.question.id === questions[currentPage].id)
                                    const isUserAnswer = choice.id === answer?.choice_id;
                                    const isActuallyCorrect = choice.is_correct;

                                    return (
                                        <div 
                                            key={choice.id} 
                                            className={`w-full border-2 rounded-lg px-3 py-2 my-2 ${
                                                isUserAnswer && isActuallyCorrect ? 'bg-green-200 border-green-300'
                                                : isUserAnswer && !isActuallyCorrect ? 'bg-red-200 border-red-300'
                                                : !isUserAnswer && isActuallyCorrect ? 'bg-green-200 border-green-300'
                                                : 'bg-white border-border'
                                            }`}
                                        >
                                            {choice.choice}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* tombol navigasi */}
                            {/* <div className="flex justify-between mt-8"> */}
                                {/* Tombol Sebelumnya */}
                                {/* <button
                                    disabled={currentPage === 0}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition 
                                    ${
                                        currentPage === 0
                                        ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                                        : "border-blue-400 text-blue-500 bg-white hover:bg-blue-50 cursor-pointer"
                                    }`}
                                >
                                    <FiArrowLeft size={18} />
                                    Sebelumnya
                                </button> */}
            
                                {/* Tombol Selanjutnya */}
                                {/* <button
                                    disabled={currentPage === questions.length - 1}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition 
                                    ${
                                        currentPage === questions.length - 1
                                        ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                                        : "border-blue-400 text-blue-500 bg-white hover:bg-blue-50 cursor-pointer"
                                    }`}
                                >
                                    Selanjutnya
                                    <FiArrowRight size={18} />
                                </button>
                            </div> */}
                        </div>
                        )
                    }
                    
                </div>
            </ContentLayout>
    )
}

export default AccurationPlayerMyQuiz