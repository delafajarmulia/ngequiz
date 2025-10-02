import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"
import { Link } from "react-router-dom"
import { formatDate } from "../../helper/format-date"

const QuizDone = () => {
    const { url, token } = useAuth()
    const [myResults, setMyResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // const submittedDate = formatDate(, true)

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/result/me`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setIsLoading(false)
                const datas = response.data.payload.datas
                setMyResults(datas)
            }).catch((error) => {
                setIsLoading(false)
                const errorCode = error.response.status
                            
                if(errorCode === 401){
                    unAuthUser(navigate)
                }
            })
        })()
    }, [])

    return(
        <ContentLayout>
            <h1 className="text-center mt-3 text-black text-xl font-medium">Riwayat Quiz</h1>
            <div className="mt-5 mb-16">
                {
                    isLoading ? 
                        <p className="text-center">Mengambil data...</p>
                    :
                        myResults.length < 1 ? 
                            <div className="text-center">
                                <p>
                                    Kamu belum pernah ngerjain kuis nih. Coba dulu yuk!
                                </p>
                                <Link
                                    to={'/dashboard'}
                                    className="hover:underline text-primary text-sm"
                                >
                                    Ayo Coba!
                                </Link>
                            </div>
                            : 
                            myResults.map(myResult => (
                                <Link
                                    to={`/quiz/${myResult.quiz_id}/result/${myResult.id}`}
                                    key={myResult.id}
                                >
                                    <div 
                                        key={myResult.id}
                                        className="w-full my-2 px-5 py-3.5 border-2 border-border rounded-md hover:cursor-pointer hover:shadow-lg"
                                    >
                                            <p className="font-medium">{myResult.quiz.title}</p>
                                            <p className="text-sm">Score: {myResult.score}</p>
                                            <p className="text-sm">Waktu Pengerjaan: {myResult.submitted_at}</p>
                                            <p
                                                className="text-xs font-semibold text-primary mt-3"
                                            >
                                                Lihat jawaban
                                            </p>
                                    </div>
                                </Link>
                            ))
                }
                
            </div>
        </ContentLayout>
    )
}

export default QuizDone