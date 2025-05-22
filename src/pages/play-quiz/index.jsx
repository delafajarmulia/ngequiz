import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"
import Navbar from "../../components/Navbar"

const PlayQuiz = () => {
    const {url, token} = useAuth()
    let { quizId } = useParams()
    const navigate = useNavigate()
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

    
    if(questions.length < 1){
        return <div>Loading...</div>
    }
    
    const getScore = async () => {
        try {
            const response = await axios.post(`${url}/result`, JSON.stringify({
                quiz_id: quizId
            }), {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
    
            const score = response.data.payload.datas.score;
            return score;
    
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const currentQuestion = questions[currentQuestionIndex]

    const submitAnswer = async () => {
        const data = {
            question_id: currentQuestion.id,
            choice_id: selectedAnswer
        };
    
        setIsSubmitting(true);
    
        try {
            const response = await axios.post(`${url}/answer/submit-answer`, data, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            });
    
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
            setIsSubmitting(false);
    
            // PENTING: currentQuestionIndex + 1 karena kamu baru saja menambahkannya ↑
            const nextIndex = currentQuestionIndex + 1;
    
            if (nextIndex >= questions.length) {
                const score = await getScore();
                return navigate('/success', { state: { score } });
            }
    
        } catch (error) {
            console.log(error);
            setIsSubmitting(false);
        }
    };    

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
                {
                    currentQuestion && (
                        <>
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
                                            className="hover:cursor-pointer"
                                        />
                                        <label className="px-2">
                                            {choice.choice}
                                        </label>
                                </div>
                            ))}
                        </>
                    )
                }

                <div className="fixed bottom-0 left-0 w-full bg-white py-3 border-t border-gray-200 flex justify-center">
                    <button
                        className={`text-white bg-primary w-full mx-3 lg:w-1/3 py-2 rounded-md hover:cursor-pointer ${
                                isSubmitting || !selectedAnswer ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        onClick={submitAnswer}
                        disabled={isSubmitting || selectedAnswer === null}
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Kirim Jawaban'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlayQuiz