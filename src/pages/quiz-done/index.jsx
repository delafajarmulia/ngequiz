import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"
import { Link } from "react-router-dom"

const QuizDone = () => {
    const { url, token } = useAuth()
    const [myResults, setMyResults] = useState([])

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/result/me`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                const datas = response.data.payload.datas
                setMyResults(datas)
            }).catch((error) => {
                return
            })
        })()
    }, [])

    return(
        <ContentLayout>
            <h1 className="text-center mt-3 text-black text-xl font-medium">Riwayat Quiz-ku</h1>
            <div className="mt-5 mb-16">
                {
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
                            <div 
                                key={myResult.id}
                                className="w-full my-2 px-5 py-3.5 border-2 border-border rounded-md hover:cursor-pointer"
                            >
                                    <p className="font-medium">{myResult.quiz.title}</p>
                                    <p className="text-sm">Score: {myResult.score}</p>
                                    <p className="text-sm">Waktu Penyelesaian: {myResult.submitted_at}</p>
                            </div>
                        ))
                }
                
            </div>
        </ContentLayout>
    )
}

export default QuizDone