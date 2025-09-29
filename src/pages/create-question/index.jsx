import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import Navbar from "../../components/Navbar"
import { unAuthUser } from "../../libs/redirect"

const CreateQuestion = () => {
    const { url, token } = useAuth()
    let { questionNumber } = useParams()
    const navigate = useNavigate()
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState([])
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null)
    const [quizId, setQuizId] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [quizName, setQuizName] = useState('')

    questionNumber = parseInt(questionNumber)

    useEffect(() => {
        (async(e) => {
            let id = parseInt(localStorage.getItem('quiz-id-created'))
    
            if(!id){
                navigate('/create-quiz')
            } else {
                setQuizId(id)
                await axios.get(`${url}/quiz/${id}/name`, {
                    headers: {
                        'Authorization': 'bearer ' + token
                    }
                }).then((response) => {
                    setQuizName(response.data.payload.datas.title)
                }).catch((error) => {
                    const errorCode = error.response.status
                    
                    if(errorCode === 401){
                        unAuthUser(navigate)
                    }
                })
            }
        })()
    }, [quizId])

    const addOption = () => {
        setOptions([...options, ''])
    }

    const deleteOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index)
        setOptions(newOptions)

        // Sesuaikan correctOptionIndex jika perlu
        if (correctOptionIndex === index) {
            setCorrectOptionIndex(null)
        } else if (correctOptionIndex > index) {
            setCorrectOptionIndex(correctOptionIndex - 1)
        }
    }

    const createQuestion = async(e) => {
        e.preventDefault()
        setIsSubmitting(true)

        if(question.length < 3){
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Pertanyaan terlalu pendek, minimal 3 huruf ya."
            })
            setIsSubmitting(false)
            return
        }

        const choices = options.map((opt, idx) => ({
            choice: opt.trim(),
            is_correct: idx === correctOptionIndex
        }))
        .filter(opt => opt.choice !== '')

        if(!choices.some(c => c.is_correct)){
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Pilih dulu jawaban yang benar sebelum lanjut, ya!"
            })
            setIsSubmitting(false)
            return
        }

        const payload = {
            question,
            quiz_id: quizId,
            choices
        }

        await axios.post(`${url}/question/choices`, payload, {
            headers: {
                'Authorization': 'bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            Swal.fire({
                title: "Ingin tambah soal lagi?",
                showDenyButton: true,
                denyButtonText: 'Tidak, sudah cukup',
                confirmButtonText: "Iya",
                confirmButtonColor: '#42A5F5'
            }).then((result) => {
                if (result.isConfirmed) {
                    setQuestion('')
                    setOptions([])
                    setCorrectOptionIndex(null)
                    setIsSubmitting(false)
                    navigate(`/create-question/${questionNumber + 1}`)
                } else if (result.isDenied) {
                    localStorage.removeItem('quiz-id-created')
                    navigate('/dashboard')
                }
            });
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="min-h-screen flex flex-col text-black bg-white">
            <Navbar />
            {/* Kontainer konten utama */}
            <div className="w-full mt-20 lg:w-1/3 mx-auto my-2 px-5 pb-28">
                <h1 className="text-center font-medium text-xl">Buat Pertanyaan</h1>
                <p className="text-center text-primary">{quizName}</p>

                <div className="my-3">
                    <p>Pertanyaan Nomor {questionNumber}</p>
                    <textarea
                        className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-none"
                        placeholder="Masukkan pertanyaan"
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>

                    <p className="mt-4">Opsi Jawaban</p>
                    <div className="w-full space-y-2" id="choices">
                        {options.map((opt, idx) => (
                            <div key={idx} className="flex items-center gap-2 mt-2">
                                <input
                                    type="radio"
                                    name="correctOption"
                                    checked={correctOptionIndex === idx}
                                    onChange={() => setCorrectOptionIndex(idx)}
                                />
                                <input
                                    name="choice"
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                        const newOptions = [...options]
                                        newOptions[idx] = e.target.value
                                        setOptions(newOptions)
                                    }}
                                    className="w-full px-2 py-1.5 border-2 border-border rounded-md focus:border-primary focus:outline-none"
                                    placeholder={`Opsi ${idx + 1}`}
                                />
                                <svg onClick={() => deleteOption(idx)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addOption}
                        className="text-primary mt-2 hover:underline"
                    >
                        Tambah opsi
                    </button>
                </div>
            </div>

            {/* Tombol Simpan di bawah, fixed */}
            <div className="fixed bottom-0 left-0 w-full bg-white py-3 border-t border-gray-200 flex justify-center">
                <button
                    type="button"
                    className={`text-white bg-primary w-full mx-3 lg:w-1/3 py-2 rounded-md ${
                            isSubmitting
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'
                    }`}
                    onClick={createQuestion}
                    disabled={isSubmitting}
                >
                    { isSubmitting ? 'Menyimpan...' : 'Simpan' }
                </button>
                {/* <button
                    type="button"
                    className={`text-white bg-primary w-full mx-3 lg:w-1/3 py-2 rounded-md ${
                        options.length < 2 || correctOptionIndex === null || isSubmitting
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'
                    }`}
                    onClick={createQuestion}
                    disabled={options.length < 2 || correctOptionIndex === null || isSubmitting}
                >
                    { isSubmitting ? 'Menyimpan...' : 'Simpan' }
                </button> */}
            </div>
        </div>
    )
}

export default CreateQuestion