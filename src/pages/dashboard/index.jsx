import { ContentLayout } from "../../components/ContentLayout"
import { TabLayout } from "../../components/TabLayout";
import Hello from "../../components/Hello";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { unAuthUser } from "../../libs/redirect";
import { FiUser, FiSearch,FiShare2, FiClock } from "react-icons/fi";
import { LuLockKeyhole } from "react-icons/lu";
import Swal from 'sweetalert2';


const Dashboard = () => {
    const { url, token } = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [quizzes, setQuizzes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const urlProduction = import.meta.env.VITE_SHARE_URL_PRODUCTION

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/user/me`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setUser(response.data.payload.datas)
            }).catch((error) => {
                const errorCode = error.response.status

                if(errorCode === 401){
                    unAuthUser(navigate)
                }
            })
        })()
    }, [token])

    useEffect(() => {
        (async(e) => {
            await axios.get(`${url}/quiz`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then((response) => {
                setIsLoading(false)
                setQuizzes(response.data.payload.datas)
            }).catch((error) => {
                const errorCode = error.response.status

                if(errorCode === 401){
                    unAuthUser(navigate)
                }
            })
        })()
    }, [])

    const playQuiz = async(quizId) => {
        await axios.post(`${url}/result`, {quiz_id: quizId}, {
            headers: {
                'Authorization': 'bearer ' + token
            }
        }).then((response) => {
            const resultId = response.data.payload.datas.id
            
            localStorage.setItem('quiz-playing-id', quizId)
            localStorage.setItem('result-id', resultId)
            
            navigate(`/play-quiz/${quizId}/question/`)
        }).catch((error) => {
            console.log(error)
        })
    }

    const shareLink = (quizId) => {
        navigator.clipboard.writeText(`${urlProduction}/play-quiz/${quizId}/question/`);
        
        Swal.fire({
        toast: true, // alert pojok
        position: 'top-end', // Posisi di kanan atas
        icon: 'success', // Ikon sukses (centang hijau)
        title: 'Link Berhasil Disalin!', // Judul notifikasi
        text: 'Tautan kuis siap dibagikan.', // Teks di bawah judul
        showConfirmButton: false, // Tidak perlu tombol OK
        timer: 3000, // Notifikasi hilang setelah 3 detik
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    }

    const filteredQuizzes = quizzes.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return(
        <ContentLayout>
            <Hello name={user.name}/>

            <TabLayout />

            {/* Search Input */}
            <div className="relative my-4">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari quiz..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Quiz List */}
            <div className="mt-5 mb-16 space-y-3">
                {
                    isLoading ? 
                        <p className="text-center">Mengambil Quiz...</p>
                    :
                    filteredQuizzes.length > 0 ? (
                        filteredQuizzes.map(quiz => (
                            <div 
                                key={quiz.id} 
                                className="w-full bg-primary rounded-xl p-4 text-white font-semibold cursor-pointer hover:opacity-90 transition flex justify-between items-start"
                                onClick={() => playQuiz(quiz.id)}
                            >
                                <div className="flex flex-col flex-grow">
                                    <h2 className="text-l font-bold mb-1">{quiz.title}</h2>
                                    
                                    <div className="flex items-center gap-2 text-sm">
                                        <FiUser size={14} />
                                        <span className="text-sm">{quiz.creator.name}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm">
                                        <FiClock size={14} />
                                        <span>
                                            {new Date(quiz.created_at).toLocaleString("id-ID", {
                                                dateStyle: "long",
                                                timeStyle: "short"
                                            })}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm">
                                        <LuLockKeyhole size={14} />
                                        <span className="text-sm">
                                            {quiz.is_once ? '1x Percobaan' : '∞ Percobaan'}
                                        </span>
                                    </div>
                                </div>
                                
                                <button
                                    className="p-1 text-white hover:opacity-80 transition flex-shrink-0 ml-4"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Mencegah klik tombol share memicu playQuiz
                                        shareLink(quiz.id);
                                    }}
                                >
                                    <FiShare2 size={24} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Quiz tidak ditemukan</p>
                    )
                }
            </div>
        </ContentLayout>
    )
}

export default Dashboard