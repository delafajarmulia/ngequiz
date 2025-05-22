import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import axios from "axios"
import { useAuth } from "../../hooks/AuthContext"
import Swal from "sweetalert2"

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
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
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
            <h1 className="text-center mt-3 text-black text-xl font-medium">Quiz-ku</h1>
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
                                    className="w-full bg-white border-2 border-border p-3 my-2 rounded-lg hover:cursor-pointer hover:shadow-lg"
                                >
                                    <div className="flex justify-between"> 
                                        <h1 className="font-semibold text-black text-lg">{quiz.title}</h1>
                                        <svg onClick={() => trashHandle(quiz.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </div>
                                    <div className="text-xs">
                                        <p>
                                            {quiz.description}
                                        </p>
                                        <p>
                                            Jumlah soal: {quiz._count.questions}
                                        </p>
                                    </div>
                                </div>
                            ))
                }
            </div>
        </ContentLayout>
    )
}

export default MyQuizSetting