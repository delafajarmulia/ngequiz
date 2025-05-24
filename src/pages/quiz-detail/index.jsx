import { useParams } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import { useEffect, useState } from "react"
import axios from "axios"
import { ContentLayout } from "../../components/ContentLayout"

const QuizDetail = () => {
    const { url, token } = useAuth()
    let { quizId } = useParams()
    const [data, setData] = useState({})
    const [questions, setQuestions] = useState([])
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

                setIsLoading(false)
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

    return(
        <ContentLayout>
            <div className="mt-2 mb-16">
                <h1 className="text-center text-primary font-medium text-xl">{data.title}</h1>
                <p className="mt-2">{data.description ?? null}</p>
                <p className="">Jumlah soal: {questions.length} soal</p>

                {
                    isLoading ? 
                        <p className="text-center">Mengambil data...</p>
                    :
                        questions.map((ques, idx) => (
                            <div
                                key={idx}
                                className="w-full border-2 border-border rounded-lg px-5 py-3 pb-6.5 my-3"
                            >
                                <p>{ques.question}</p>
                                {
                                    ques.choices.map((choice) => (
                                        <div 
                                            key={choice.id}
                                            className={`w-full border-2 border-border rounded-lg px-3 py-2 my-2 ${
                                                choice.is_correct ? 'bg-green-200 border-green-300' : 'bg-white'
                                            }`}
                                        >
                                            {choice.choice}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                }
            </div>
        </ContentLayout>
        // <div className="min-h-screen flex flex-col text-black">
        //     <Navbar/>
        //     <div className="w-full lg:w-1/3 mx-auto my-2 px-5 mt-18">
        //     </div>
        // </div>
    )
}

export default QuizDetail