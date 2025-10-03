import { useParams } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { ContentLayout } from "../../components/ContentLayout"
import { FiMessageCircle, FiArrowLeft, FiArrowRight  } from "react-icons/fi"
import { GoogleGenAI } from "@google/genai"
import ReactMarkdown from "react-markdown"


const QuizResult = () => {
    const { url, token, geminiApiKey } = useAuth()
    let { quizId, resultId } = useParams()
    const [data, setData] = useState({})
    const [score, setScore] = useState(0)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0) // index soal aktif
    const [showModal, setShowModal] = useState(false); // state modal
    const [userQuestion, setUserQuestion] = useState(''); // state input pertanyaan user
    const [isThinking, setIsThinking] = useState(false)
    const [messages, setMessages] = useState([
        { sender: "ai", text: "Halo halo~ ada yang bisa aku jelasin? 📚" }
    ]); // state pesan chat bot
    const chatEndRef = useRef(null); // ref untuk scroll ke bawah
    const [myResults, setMyResults] = useState([])

    const ai = new GoogleGenAI({ apiKey: geminiApiKey })
    
    quizId = parseInt(quizId)
    resultId = parseInt(resultId)

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
            await axios.get(`${url}/result/${resultId}/score`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setScore(response.data.payload.datas.score)
                setMyResults(response.data.payload.datas) 
                console.log(response.data.payload.datas)
            }).catch((error) => {
                console.log(error)
            })
        })()
    }, [])

    const sendMessage = async() => {
        if(userQuestion.trim() === '') return;

        // Tambahkan pertanyaan user
        setMessages((prev) => [...prev, { sender: "user", text: userQuestion}])
        setUserQuestion('');

        // Balasan dari AI
        await AIReply(userQuestion)
    }

    const keywordChecker = (text) => {
        const keywords = ['tolong', 'bantu', 'jelaskan', 'terangkan', 'contoh', 'menurutmu', 'kasih', 'siapa', 'apa', 'mengapa', 'bagaimana', 'kenapa', 'dimana', 'kapan', 'jelas', 'terang', 'beri', 'berikan', 'paham']

        const containKeyword = keywords.some(key => 
            text.toLowerCase().includes(key)
        )

        return containKeyword
    }

    const AIReply = async(userQuestion) => {
        try {
            setIsThinking(true)

            let thisQuestion = questions[currentPage]?.question
            let responseAI;

            const containKeyword = keywordChecker(userQuestion)

            if(containKeyword){
                responseAI = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: userQuestion + 'context pertanyaannya adalah ' + thisQuestion
                })
            } else {
                responseAI = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: userQuestion 
                })
            }

            const replyText = (await responseAI).text

            setMessages((prev) => [
                ...prev,
                { sender: 'ai', text: replyText }
            ])
        } catch (error) {
            console.log(error)
        } finally {
            setIsThinking(false)
        }
    }

    // auto scroll ke bawah setiap ada pesan baru
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return(
        <ContentLayout>
            <div className="mt-2 mb-16 ">
                <h1 className="text-center text-primary font-medium text-xl">{data.title}</h1>
                {/* <p className="mt-3">{data.description ?? null}</p> */}
                <div className="flex">
                {/* <p className="flex-1">Jumlah soal: {questions.length} soal</p>
                 */}
                 <div>
                        Soal: {currentPage + 1} / {questions.length}
                    </div>
                <div className="flex-1 flex justify-center items-center text-sm text-gray-500">
                <p className="text-gray-400 mr-1" size={14}/>
                {" "}
                {/* Pastikan myResults tidak kosong sebelum mengakses submitted_at */}
                {myResults.length > 0 && new Date(myResults[0].submitted_at).toLocaleString("id-ID", {
                    dateStyle: "long",
                    timeStyle: "short",
                })}
            </div>
                <p className="text-right font-semibold text-lg text-blue-600">
                    Skor: {score}
                </p>
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
                            <div className="flex justify-between mt-8">
                    {/* Tombol Sebelumnya */}
                    <button
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
                    </button>

                    {/* Tombol Selanjutnya */}
                    <button
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
                    </div>
                    </div>
                    )
                }

                {/* Modal */}
                {showModal && (
                    <div className="fixed bottom-20 right-6 w-80 max-w-[90%] h-96 bg-white shadow-2xl rounded-xl border-border flex flex-col z-50">
                        {/* Header */}
                        <div className="bg-primary text-white p-3 rounded-t-xl flex justify-between items-center">
                            <span className="font-semibold">AI Assistant</span>
                            <button onClick={() => setShowModal(false)} className="text-white hover:cursor-pointer">×</button>
                        </div>

                        <div className="flex-1 p-3 overflow-y-auto space-y-3">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end': ''}`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                                            msg.sender === 'user'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                        }`}
                                    >
                                        <ReactMarkdown>
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}

                            {/* AI berpikir */}
                            {isThinking && (
                                <div className="flex">
                                    <div className="px-4 py-2 rounded-2xl max-w-xs text-sm bg-gray-200 text-gray-800">
                                        <span className="typing-dots">Bentar ya, aku lagi mikir 💭</span>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef}/>
                        </div>

                        {/* Input */}
                        <div className="p-2 border-t border-border flex gap-2">
                            <input
                                type="text"
                                placeholder="Ada pertanyaan?"
                                className="flex-1 border-border rounded-lg px-3 py-2 text-sm focus:outline-none"
                                value={userQuestion}
                                onChange={(e) => setUserQuestion(e.target.value)}
                            />
                            <button 
                                className="bg-primary text-white px-3 py-2 rounded-lg text-sm cursor-pointer"
                                onClick={sendMessage}
                            >
                                Kirim
                            </button>
                        </div>
                        
                    </div>
                    
                )}
                
            </div>

            {/* FAB di pojok kanan bawah kontainer */}
            {/* FAB Dekstop */}
            <div className="hidden md:flex fixed bottom-[80px] right-[35%] justify-end">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-primary hover:opacity-85 text-white p-4 cursor-pointer rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none"
                >
                    <FiMessageCircle size={24} />
                </button>
            </div>

            {/* FAB Mobile */}
            <div className="flex md:hidden fixed bottom-20 right-4 justify-end">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-primary hover:opacity-85 text-white p-4 cursor-pointer rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none"
                >
                    <FiMessageCircle size={24} />
                </button>
            </div>
            

        </ContentLayout>
    )
}

export default QuizResult