import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import axios from "axios"
import { useAuth } from "../../hooks/AuthContext"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"

const MyQuizSetting = () => {
    const { url, token } = useAuth()
    const [quizzes, setQuizzes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [removeIsLoading, setRemoveIsLoading] = useState(false)

    const fetchQuizzes = async() => {
        await axios.get(`${url}/quiz/me`, {
            headers: {
                'Authorization': 'bearer ' + token
            }
        }).then((result) => {
            setIsLoading(false)
            setQuizzes(result.data.payload.datas)
        }).catch((error) => {
            setIsLoading(false)
            const errorCode = error.response.status
            
            if(errorCode === 401){
                unAuthUser(navigate)
            }
        })
    }

    useEffect(() => {
        fetchQuizzes()
    }, [])

    const trashHandle = async(quizId) => {
        Swal.fire({
            text: "Anda yakin ingin menghapus Quiz ini?",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#42A5F5",
            confirmButtonText: "Ya, hapus quiz ini!"
            }).then(async(result) => {
                if (result.isConfirmed) {
                    try {
                        setRemoveIsLoading(true)
                        await axios.delete(`${url}/quiz/${quizId}`, {
                            headers: {
                                'Authorization': 'bearer ' + token
                            }
                        })
                        Swal.fire({
                            title: "Berhasil!",
                            text: "Berhasil menghapus quiz.",
                            icon: "success"
                        });
                        setRemoveIsLoading(false)
                        fetchQuizzes()
                    } catch (err) {
                        setRemoveIsLoading(false)
                        Swal.fire({
                            title: "Gagal!",
                            text: "Terjadi kesalahan saat menghapus quiz.",
                            icon: "error"
                        })
                    }
                }
        });
    }

    return(
        <ContentLayout>
            <h1 className="text-center mt-3 text-black text-xl font-medium">Quizku</h1>
            <div className="mt-5 mb-16">
                {
                    removeIsLoading ? 
                        <p className="text-center mb-2">Menghapus Quiz...</p>
                    :
                        <p className="hidden"></p>
                }
                {
                    isLoading ?
                        <p className="text-center">Mengambil Quiz...</p>
                    :
                        quizzes.length < 1 ? 
                            <div className="text-center">Kamu belum pernah buat Quiz nih</div>
                        :
                            quizzes.map(quiz => (
                                <div
                                    key={quiz.id}
                                    aria-disabled={removeIsLoading}
                                    className={`w-full bg-white border border-gray-200 rounded-xl p-4 my-3 shadow-sm hover:shadow-md transition ${
                                        removeIsLoading ? 'hover:cursor-not-allowed opacity-60' : ''
                                    }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <h1 className="font-semibold text-black text-base">{quiz.title}</h1>
                                        <svg
                                            onClick={() => trashHandle(quiz.id)}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-5 text-gray-500 hover:text-red-500 transition cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 
                                                1.022.166m-1.022-.165L18.16 19.673a2.25 
                                                2.25 0 0 1-2.244 2.077H8.084a2.25 
                                                2.25 0 0 1-2.244-2.077L4.772 
                                                5.79m14.456 0a48.108 48.108 0 0 
                                                0-3.478-.397m-12 .562c.34-.059.68-.114 
                                                1.022-.165m0 0a48.11 48.11 0 0 
                                                1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 
                                                51.964 0 0 0-3.32 0c-1.18.037-2.09 
                                                1.022-2.09 2.201v.916m7.5 0a48.667 
                                                48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    </div>

                                    <div className="text-sm text-gray-600 mt-1">
                                        <p>{quiz.description}</p>
                                        <p>Jumlah soal: {quiz._count.questions}</p>
                                    </div>

                                    <div className="flex flex-col mt-3">
                                        <Link
                                            to={`/quiz-detail/${quiz.id}`}
                                            className="text-sm font-semibold text-primary inline-block"
                                        >
                                            Lihat detail →
                                        </Link>
                                        <Link
                                            to={`/play-my-quiz/${quiz.id}`}
                                            className="text-sm font-semibold text-primary inline-block"
                                        >
                                            Who play my quiz?
                                        </Link>
                                    </div>
                                </div>

                            ))
                }
            </div>
        </ContentLayout>
    )
}

export default MyQuizSetting