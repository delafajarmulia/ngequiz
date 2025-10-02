import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"
import { Link } from "react-router-dom"
import { FiClock } from "react-icons/fi";
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
                                        className="w-full my-3 px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition"
                                    >
                                         <div className="flex justify-between items-center">
                                            <p className="font-semibold text-gray-800 text-base">
                                                {myResult.quiz.title}
                                            </p>
                                            <p className="mt-1 text-sm">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                                                ${myResult.score >= 80 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                Score: {myResult.score}
                                                </span>
                                            </p>
                                            </div>
                                            <p className="flex items-center text-sm text-gray-500 mt-2">
                                                <FiClock className="text-gray-400 mr-1" size={14} />
                                                {" "}
                                                {new Date(myResult.submitted_at).toLocaleString("id-ID", {
                                                dateStyle: "long",
                                                timeStyle: "short",
                                                })}
                                            </p>
                                             <p className="text-sm font-semibold text-primary mt-3 hover:underline cursor-pointer">
                                                Lihat jawaban →
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