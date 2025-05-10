import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"
import Navbar from "../../components/Navbar"

const PlayQuiz = () => {
    const {url, token} = useAuth()
    let { quizId } = useParams()
    const [quizName, setQuizName] = useState('')
    const [questions, setQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    quizId = parseInt(quizId)

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/quiz/${quizId}`, {
                headers: {
                    'Authorization': 'bearer '+ token
                }
            }).then((response) => {
                const result = response.data.payload.datas
                setQuizName(result.title)
                setQuestions(result.questions)
            }).catch(error => {
                console.log(error)
            })
        })()
    }, [quizId])

    const handleAnswerChange = (answerId) => {
        setSelectedAnswer(answerId)
    }

    const submitAnswer = () => {
        setIsSubmitting(true)
        setCurrentQuestionIndex(prevIndex => prevIndex + 1)
        setSelectedAnswer(null)
        setIsSubmitting(false)
    }

    if(questions.length < 1){
        return <div>Loading...</div>
    }

    if(currentQuestionIndex >= questions.length){
        return <div>kuis selesai</div>
    }

    const currentQuestion = questions[currentQuestionIndex]

    return(
        <div className="min-h-screen flex flex-col text-black">
            <Navbar/>
            <div className="w-full lg:w-1/3 mx-auto my-2 px-5 mt-20">
                <div className="w-full flex place-content-between text-black font-semibold">
                    <h1 className="text-xl">
                        {quizName}
                    </h1>
                    <div className="border-border border-2 py-1 px-3 rounded-[50%]">
                        {currentQuestionIndex + 1}
                    </div>
                </div>
                <h3 className="my-2">
                    {currentQuestion.question}
                </h3>
                {currentQuestion.choices.map(choice => (
                    <div 
                        key={choice.id}
                        className="border-border rounded-md border-1 p-3 my-2"
                    >
                            <input 
                                type="radio" 
                                name={`question-${currentQuestion.id}`}
                                value={choice.id}
                                onChange={() => handleAnswerChange(choice.id)}
                                checked={selectedAnswer === choice.id}
                            />
                            <label className="px-2">
                                {choice.choice}
                            </label>
                    </div>
                ))}
                <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 ">
                    <div className=" w-full lg:w-1/3 h-full mx-auto">
                        <button
                            onClick={submitAnswer}
                            disabled={isSubmitting || selectedAnswer === null} 
                            className="w-full bg-primary text-white  my-2 rounded-md py-2"   
                        >
                            {isSubmitting ? 'Menyimpan' : 'Kirim Jawaban'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayQuiz