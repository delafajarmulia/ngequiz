import { useParams } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useEffect, useState } from "react"
import axios from "axios"
import { ContentLayout } from "../../components/ContentLayout"

const QuizResult = () => {
    const { url, token } = useAuth()
    let { quizId } = useParams()
    const [data, setData] = useState({})
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    quizId = parseInt(quizId)

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/quiz/${quizId}`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                const result = response.data.payload.datas

                // setIsLoading(false)
                setData({
                    title: result.title, 
                    description: result.description ?? null
                })
                console.log(result)
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
            // logic ini perlu diganti di be juga
            await axios.get(`${url}/answer/quiz/${quizId}`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setAnswers(response.data.payload.datas)
                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
            })
        })()
    }, [])

    return(
        <ContentLayout>
            <div className="mt-2 mb-16">
                <h1 className="text-center text-primary font-medium text-xl">{data.title}</h1>
                <p className="mt-3">{data.description ?? null}</p>
                <p className="">Jumlah soal: {questions.length} soal</p>

                {
                    isLoading ? 
                        <p className="text-center">Mengambil data...</p>
                    :
                        questions.map((ques, idx) => {
                            const answer = answers.find(ans => ans.question_id === ques.id); // cari jawaban user untuk soal ini

                            return (
                                <div
                                    key={idx}
                                    className="w-full border-2 border-border rounded-lg px-5 py-3 pb-6.5 my-3"
                                >
                                    <p>{ques.question}</p>

                                    {ques.choices.map((choice) => {
                                        const isUserAnswer = choice.id === answer?.choice_id;
                                        const isActuallyCorrect = choice.is_correct

                                        let bgClass = ''
                                        let borderClass = ''

                                        if(isUserAnswer && isActuallyCorrect){
                                            // jawaban user bener
                                            bgClass = 'bg-green-200'
                                            borderClass = 'border-green-300'
                                        } else if (isUserAnswer && !isActuallyCorrect){
                                            // jawaban user salah
                                            bgClass = 'bg-red-200'
                                            borderClass = 'border-red-300'
                                        } else if (isActuallyCorrect){
                                            // jawabn bener, tp gak di pilih
                                            bgClass = 'bg-green-200'
                                            borderClass = 'border-green-300'
                                        } else {
                                            // gak bener, tapi gak dijawab
                                            bgClass = 'bg-white'
                                            borderClass = 'border-border'
                                        }

                                        return (
                                        <div
                                            key={choice.id}
                                            className={`w-full border-2 rounded-lg px-3 py-2 my-2 ${bgClass} ${borderClass}`}
                                        >
                                            {choice.choice}
                                        </div>
                                        );
                                    })}
                                </div>
                            );
                        })
                }
            </div>
        </ContentLayout>
    )
}

export default QuizResult