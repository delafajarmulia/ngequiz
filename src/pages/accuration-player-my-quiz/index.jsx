import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useEffect, useState } from "react"
import axios from "axios"
import { ContentLayout } from "../../components/ContentLayout"
// import { FiArrowLeft, FiArrowRight } from "react-icons/fi" // Dihapus karena navigasi tidak diperlukan
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
    // const [currentPage, setCurrentPage] = useState(0) 
    const [myResults, setMyResults] = useState(null) // Ubah menjadi null
    
    quizId = parseInt(quizId)
    resultId = parseInt(resultId)

    useEffect(() => {
        (async() => {
            await axios.get(`${url}/user/me`, {
                headers: {
                    "Authorization": 'bearer ' + token
                }
            }).then(() => {
                // return
            }). catch((error) => {
                const errorCode = error.response?.status 

                if(errorCode === 401) return unAuthUser(navigate)
            })
        })()
    }, [navigate, token, url])
    
    // ambil Data Kuis
    useEffect(() => {
        (async() => {
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
                // console.log("QUESTIONS:", result.questions)
            }).catch((error) => {
                const errorCode = error.response?.status
                
                if(errorCode === 401){
                    unAuthUser(navigate)
                }
                console.error(error)
            })
        })()
    }, [navigate, quizId, token, url])
    
    // Jawaban User
    useEffect(() => {
        (async() => {
            await axios.get(`${url}/answer/result/${resultId}`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setAnswers(response.data.payload.datas) 
                // console.log("ANSWERS:", response.data.payload.datas)
                // setIsLoading(false) 
            }).catch((error) => {
                console.error(error)
            })
        })()
    }, [resultId, token, url])
    
    // Skor dan Hasil
    useEffect(() => {
        (async() => {
            await axios.get(`${url}/result/${resultId}/score?include=user`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setScore(response.data.payload.datas.score)
                setMyResults(response.data.payload.datas) 
                setIsLoading(false) 
            }).catch((error) => {
                console.error(error)
                setIsLoading(false)
            })
        })()
    }, [resultId, token, url])

    // jawaban user berdasarkan ID Pertanyaan
    const getUserAnswer = (questionId) => {
        return answers.find(ans => ans.choice?.question_id === questionId);
    };


    return(
        <ContentLayout>
            <div className="mt-2 mb-16 ">
                <h1 className="text-center text-primary font-medium text-xl">{data.title}</h1>
                
                <div className="flex items-start justify-between p-2 mb-4 border-b border-gray-200">
                    <div>
                        <p>Jumlah Soal: {questions.length}</p>
                        <p className="text-gray-400 text-sm italic">
                            {myResults?.submitted_at && new Date(myResults.submitted_at).toLocaleString("id-ID", {
                                dateStyle: "long",
                                timeStyle: "short",
                            })}
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-blue-600 font-bold text-l">
                            Skor: {score}
                        </p>
                        <p className="text-gray-700 text-sm italic">
                            Oleh: {myResults?.user?.name}
                        </p>
                    </div>
                </div>
                
                {
                    isLoading ? 
                        <p className="text-center mt-10">Memuat hasil kuis...</p>
                    :
                    questions.length === 0 ?
                        <p className="text-center mt-10">Tidak ada pertanyaan ditemukan.</p>
                    :
                    questions.map((ques, idx) => {
                        const userAnswer = getUserAnswer(ques.id); 

                        return (
                            <div 
                                key={ques.id}
                                className="w-full border-2 border-border rounded-lg px-5 py-3 pb-6.5 my-5 shadow-sm"
                            >
                                <p className=" mb-3">
                                    {idx + 1}. {ques.question}
                                </p>
                                
                                {
                                    ques.choices.map((choice) => {
                                        const isUserAnswer = choice.id === userAnswer?.choice_id;
                                        const isActuallyCorrect = choice.is_correct;

                                        let className = 'bg-white border-border';
                                        if (isUserAnswer && isActuallyCorrect) {
                                            className = 'bg-green-100 border-green-200 '; // Jawaban Benar
                                        } else if (isUserAnswer && !isActuallyCorrect) {
                                            className = 'bg-red-100 border-red-200 '; // Jawaban Salah
                                        } else if (isActuallyCorrect) {
                                            className = 'bg-green-50 border-green-200'; // Jawaban Benar (tidak dipilih user)
                                        }

                                        return (
                                            <div 
                                                key={choice.id} 
                                                className={`w-full border-2 rounded-lg px-3 py-2 my-2 transition ${className}`}
                                            >
                                                {choice.choice}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </ContentLayout>
    )
}

export default AccurationPlayerMyQuiz