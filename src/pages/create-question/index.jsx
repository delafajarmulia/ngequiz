import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

const CreateQuestion = () => {
    const { url, token } = useAuth()
    let { questionNumber } = useParams()
    const navigate = useNavigate()
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState([])
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null)
    const [quizId, setQuizId] = useState(0)

    questionNumber = parseInt(questionNumber)

    useEffect(() => {
        let id = localStorage.getItem('quiz-id-created')
        setQuizId(parseInt(id))
    }, [])

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

        const choices = options.map((opt, idx) => ({
            choice: opt.trim(),
            is_correct: idx === correctOptionIndex
        }))
        .filter(opt => opt.choice !== '')

        if(!choices.some(c => c.is_correct)){
            alert('opsi jawaban yg benar belum ditentukan!')
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
                confirmButtonText: "Iya",
                denyButtonText: 'Tidak',
                confirmButtonColor: '#42A5F5'
            }).then((result) => {
                if (result.isConfirmed) {
                  navigate(`/create-question/${questionNumber + 1}`)
                } else if (result.isDenied) {
                  navigate('/dashboard')
                }
            });
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="min-h-screen flex flex-col text-black bg-gray-100">
            {/* Kontainer konten utama */}
            <div className="w-full lg:w-1/3 mx-auto my-2 px-5 pb-28">
                <h1 className="text-center font-bold text-xl text-primary">Buat Pertanyaan</h1>

                <div className="my-3">
                    <p>Pertanyaan Nomor {questionNumber}</p>
                    <textarea
                        className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-none"
                        placeholder="Masukkan pertanyaan"
                        required
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
                                <button
                                    type="button"
                                    onClick={() => deleteOption(idx)}
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                    title="Hapus opsi"
                                >
                                    🗑️
                                </button>
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
                    className="text-white bg-primary w-full mx-3 lg:w-1/3 py-2 rounded-md"
                    onClick={createQuestion}
                >
                    Simpan
                </button>
            </div>
        </div>
    )
}

export default CreateQuestion