import { useState } from "react"
import { useAuth } from "../../hooks/AuthContext"

const CreateQuestion = () => {
    const {url, token} = useAuth()
    const [questionNumber, setQuestionNumber] = useState(1)
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState([])
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null)
    let quizId = 1

    const addOption = () => {
        setOptions([...options, ''])
    }

    const createQuestion = (e) => {
        e.preventDefault()

        const payload = {
            question,
            quiz_id: quizId,
            choices: options.map((opt, idx) => ({
                choice:opt,
                is_correct: idx === correctOptionIndex
            }))
        }

        console.log(payload)
    }

    return(
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
                    {/* Nanti diisi dengan beberapa opsi input */}
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
                                key={idx}
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[idx] = e.target.value;
                                setOptions(newOptions);
                                }}
                                className="w-full px-2 py-1.5 border-2 border-border rounded-md focus:border-primary focus:outline-none"
                                placeholder={`Opsi ${idx + 1}`}
                            />
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
                    onClick={(e) =>createQuestion(e)}
                >
                    Simpan
                </button>
            </div>
        </div>
    )
}

export default CreateQuestion