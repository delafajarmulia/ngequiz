import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"

const PlayQuiz = () => {
    const {url, token} = useAuth()
    let { quizId } = useParams()
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
                const result = response.data.payload.datas.questions
                setQuestions(result)
                console.log(response.data.payload.datas.questions)
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
        <div>
            <h1>Soal {currentQuestionIndex + 1}</h1>
            <h3>{currentQuestion.question}</h3>
            {currentQuestion.choices.map(choice => (
                <div key={choice.id}>
                    <input 
                        type="radio" 
                        name={`question-${currentQuestion.id}`}
                        value={choice.id}
                        onChange={() => handleAnswerChange(choice.id)}
                        checked={selectedAnswer === choice.id}
                    />
                    <label>{choice.choice}</label>
                </div>
            ))}
            <button
                onClick={submitAnswer}
                disabled={isSubmitting || selectedAnswer === null}    
            >
                {isSubmitting ? 'Menyimpan' : 'Kirim Jawaban'}
            </button>
        </div>
    )
}

export default PlayQuiz