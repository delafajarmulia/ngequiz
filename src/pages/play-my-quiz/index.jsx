import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import axios from "axios"
import { useAuth } from "../../hooks/AuthContext"
import { Link, useNavigate, useParams } from "react-router-dom"
import { unAuthUser } from "../../libs/redirect"
import { FiClock } from "react-icons/fi"

const PlayMyQuiz = () => {
    const { url, token } = useAuth()
    const { quizId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [played, setPlayed] = useState([])

    // console.log(quizId)

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/result/my-quiz/${quizId}`,{
                headers: {
                    "Authorization": 'bearer ' + token
                },
            }).then((response) => {
                console.log(response.data.payload.datas)
                setPlayed(response.data.payload.datas)
                setIsLoading(false)
            }).catch(err => {
                const errorCode = err.response.status
                
                if(errorCode === 401){
                    unAuthUser(navigate)
                }
            })
        })()
    }, [quizId])

    return(
        <ContentLayout>
            <div className="p-4">
            {/* Mengganti judul dan deskripsi default */}
            <h1 className="text-center mt-3 text-black text-xl font-medium">Akurasi Pemain</h1>
            <div className="mt-5 mb-16">
                
                {isLoading ?
                    <p className="text-center">Mengambil data...</p>
                    :
                    played.length < 1 ? 
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
                        <div>
                            {played.map((player) => (
                                <div
                                    key={player.id}
                                    className="w-full my-3 px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition"
                                >
                                    <div className="flex justify-between items-start">
                                        
                                        {/* Nama Pengguna / Judul Kuis */}
                                        <div>
                                            <p className="font-semibold text-gray-800 text-base">
                                                {/* Menggunakan player.user.name (asumsi player.quiz.title tidak tersedia di data awal) */}
                                                {player.user.name} 
                                            </p>
                                            
                                            {/* Waktu Selesai */}
                                            <p className="flex items-center text-sm text-gray-500 mt-2">
                                                <FiClock className="text-gray-400 mr-1" size={14} />
                                                {new Date(player.submitted_at).toLocaleString("id-ID", {
                                                    dateStyle: "long",
                                                    timeStyle: "short"
                                                })}
                                            </p>
                                        </div>
                                        
                                        {/* Score Badge */}
                                        <p className="mt-1 text-sm flex-shrink-0 ml-4">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold
                                                ${player.score >= 80 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                Score: {player.score}
                                            </span>
                                        </p>

                                    </div>
                                    
                                    <Link
                                        to={`/accuration-player-my-quiz/${player.quiz.id}/result/${player.id}`}
                                        className="block text-sm font-semibold text-primary mt-3 hover:underline cursor-pointer"
                                    >
                                        Lihat akurasi jawaban →
                                    </Link>
                                </div>
                            ))}
                        </div>
                }
            </div>
        </div>
        </ContentLayout>
    )
}

export default PlayMyQuiz