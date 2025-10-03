import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"
import Navbar from "../../components/Navbar"
import { unAuthUser } from "../../libs/redirect"

// Total skor final yang disepakati
const MAX_QUIZ_SCORE = 100; 

const PlayQuiz = () => {
    const {url, token} = useAuth()
    let { quizId } = useParams()
    const navigate = useNavigate()
    const [quizName, setQuizName] = useState('')
    const [questions, setQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const resultId = parseInt(localStorage.getItem('result-id'))
    const [showAlert, setShowAlert] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [currentScore, setCurrentScore] = useState(0); 
    const [lastEarnedPoints, setLastEarnedPoints] = useState(0); 
    
    // State baru untuk menyimpan nilai poin per pertanyaan yang dihitung
    const [pointsPerQuestion, setPointsPerQuestion] = useState(0); 

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
                
                const loadedQuestions = result.questions;
                setQuestions(loadedQuestions);
                
                // PERHITUNGAN POIN PER SOAL 
                if (loadedQuestions.length > 0) {
                    // poin per soal: 100 / jumlah soal
                    const calculatedPoints = MAX_QUIZ_SCORE / loadedQuestions.length;
                    setPointsPerQuestion(calculatedPoints);
                    // console.log(`Poin per soal dihitung: 100 / ${loadedQuestions.length} = ${calculatedPoints}`);
                }
                // ----------------------------------------
                
                // console.log("Data Quiz Loaded:", result) 
            }).catch(error => {
                const errorCode = error.response.status
                    
                if(errorCode === 401){
                    unAuthUser(navigate)
                }
                console.error("Error fetching quiz data:", error)
            })
        })()
    }, [quizId])

    const handleAnswerChange = (answerId) => {
        setSelectedAnswer(answerId)
    }

    const currentQuestion = questions[currentQuestionIndex]

    const submitAnswer = async () => {

        if (!selectedAnswer || isSubmitting || !currentQuestion) return;
        
        const data = {
            question_id: currentQuestion.id,
            choice_id: selectedAnswer,
            result_id: resultId,
            is_last: false
        };
    
        const nextIndex = currentQuestionIndex + 1;
        // is_last = true jika ini pertanyaan terakhir
        if(nextIndex === questions.length){
             data.is_last = true
        } else {
             data.is_last = false
        }

        setIsSubmitting(true);
    
        try {
            const response = await axios.post(`${url}/answer/submit-answer`, data, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            });
    
            const isAnswerCorrect = response.data.payload.datas.is_correct; 

            // **LOGIKA PERHITUNGAN POIN MENGGUNAKAN BOBOT DINAMIS**
            let pointsGained = 0;
            if (isAnswerCorrect) {
                // Gunakan poin per soal yang sudah dihitung (misalnya 100/3 = 33.333)
                pointsGained = pointsPerQuestion;
                
                // Gunakan toFixed(2) untuk membulatkan skor akhir di frontend
                setCurrentScore(prevScore => prevScore + pointsGained);

                // LOG untuk debugging
                // console.log(`Jawaban Benar! Poin didapat: ${pointsGained}. Skor Baru: ${currentScore + pointsGained}`);
            } else {
                 // LOG untuk debugging
                // console.log(`Jawaban Salah. Poin didapat: 0. Skor Tetap: ${currentScore}`);
            }
            // Simpan poin yang didapat untuk ditampilkan di alert
            setLastEarnedPoints(pointsGained);
            // -----------------------------------------------------


            const showCustomAlert = (correct) => {
                setIsCorrect(correct);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 1500); 
            };
            
            showCustomAlert(isAnswerCorrect); 

            await new Promise(resolve => setTimeout(resolve, 1500)); 

            // Cek jika pertanyaan sudah habis
            if(nextIndex > questions.length - 1){
                const score = response.data.payload.datas.score
                
                // NAVIGASI ke halaman sukses
                navigate('/success', {state: { score, quizId, resultId }}); 
                
                localStorage.removeItem('quiz-playing-id')
                localStorage.removeItem('result-id')
                return
            }
            
            // Lanjut ke pertanyaan berikutnya
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
            setIsSubmitting(false);

        } catch (error) {
            console.error("Error submitting answer:", error);
            setIsSubmitting(false);
        }
    };    

    return(
        <div className="min-h-screen flex flex-col text-black">
            <Navbar/>
            <div className="w-full lg:w-1/3 mx-auto my-2 px-5 mt-20">
          

            {/* alert */}
            {showAlert && ( 
            <div className="fixed inset-0 flex items-center justify-center z-50">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>

                <div className={`relative flex flex-col items-center gap-3 
                                    transform transition-all duration-300 ease-out scale-95 animate-fade-in`}>
                
                {/* Icon Grafik */}
                {isCorrect ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" 
                        fill="none" stroke="#22c55e" strokeWidth="6" 
                        strokeLinecap="round" strokeLinejoin="round"
                        className="w-24 h-24">
                    <polyline points="4,44 20,28 36,36 60,12" />
                    <polyline points="44,12 60,12 60,28" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" 
                        fill="none" stroke="#ef4444" strokeWidth="6" 
                        strokeLinecap="round" strokeLinejoin="round"
                        className="w-24 h-24">
                    <polyline points="4,20 20,36 36,28 60,52" />
                    <polyline points="44,52 60,52 60,36" />
                    </svg>
                )}

                {/* Detail poin yang baru saja didapat */}
                {isCorrect ? (
                    <p className="text-green-600 font-semibold text-lg">
                    +{lastEarnedPoints.toFixed(2)} Point
                    </p>
                ) : (
                    <p className="text-red-500 font-medium text-lg">
                    0 Point
                    </p>
                )}
                
                {/* Tampilkan total skor sementara (dibulatkan 2 angka di belakang koma) */}
                <p className="text-gray-500 font-medium text-sm mt-1">
                    Total Skor: {currentScore.toFixed(2)}
                </p>

                </div>
            </div>
            )}


                <div className="w-full flex place-content-between text-black font-semibold">
                    <h1 className="text-xl">
                        {quizName}
                    </h1>
                    <div>
                        {currentQuestionIndex + 1} / {questions.length}
                    </div>
                </div>
                {
                    questions.length < 1 ?
                        <p className="text-center">Mengambil pertanyaan...</p>
                    :
                        currentQuestion && (
                            <>
                                <h3 className="my-2">
                                    {currentQuestion.question}
                                </h3>
                                {currentQuestion.choices.map(choice => (
                                    <div 
                                        key={choice.id}
                                        className={`border rounded-md p-3 my-2 transition-colors duration-200 
                                            ${selectedAnswer === choice.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`
                                        }
                                        onClick={() => handleAnswerChange(choice.id)}
                                    >
                                        <input 
                                            type="radio" 
                                            name={`question-${currentQuestion.id}`}
                                            value={choice.id}
                                            onChange={() => handleAnswerChange(choice.id)}
                                            checked={selectedAnswer === choice.id}
                                            className="hover:cursor-pointer mr-2 accent-blue-500"
                                        />
                                        <label className="px-2 hover:cursor-pointer">
                                            {choice.choice}
                                        </label>
                                    </div>
                                ))}
                            </>
                        )
                }

                <div className="fixed bottom-0 left-0 w-full bg-white py-3 border-t border-gray-200 flex justify-center">
                    <button
                        className={`text-white bg-primary w-full mx-3 lg:w-1/3 py-2 rounded-md transition duration-200 ${
                                isSubmitting || !selectedAnswer ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
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