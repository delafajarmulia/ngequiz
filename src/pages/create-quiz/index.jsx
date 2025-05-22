import { useEffect, useState } from "react"
import { ContentLayout } from "../../components/ContentLayout"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/AuthContext"
import axios from "axios"

const CreateQuiz = () => {
    const navigate = useNavigate()
    const {url, token} = useAuth()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isOnce, setIsOnce] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const isQuizCreatedAvailabled = localStorage.getItem('quiz-id-created')

        if(isQuizCreatedAvailabled){
            navigate('/create-question/1')
        }
    }, [])

    const createQuiz = async(e) => {
        e.preventDefault()
        setIsLoading(true)

        const newQuiz = {
            title, 
            description,
            is_once : isOnce
        }

        await axios.post(`${url}/quiz`, newQuiz,
            {
                headers: {
                    'Authorization': 'bearer ' +token
                }
            }
        ).then((response) => {
            localStorage.setItem('quiz-id-created', response.data.payload.datas.id)
            navigate('/create-question/1')
        }).catch((err) => {
            console.log(err)
        })
    }

    return(
        <ContentLayout>
            <div>
                <h1 className="text-black text-xl font-medium text-center mt-3">Buat Quiz</h1>
                <form onSubmit={(e) => createQuiz(e)}>
                    <div className="my-3">
                        <p>Nama Quiz</p>
                        <input 
                            className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                            type="text" 
                            placeholder="Masukkan nama kuis"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="my-3">
                        <p>Deskripsi Quiz</p>
                        <textarea 
                            className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                            placeholder="Masukkan deskripsi (opsional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="my-3">
                        <p>Apakah Quiz Ini Hanya Boleh Dikerjakan Sekali Saja?</p>
                        <select 
                            name="" id=""
                            className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                            value={isOnce}
                            onChange={(e) => setIsOnce(e.target.value)}
                        >
                            <option value={true}>Iya</option>
                            <option value={false}>Tidak</option>
                        </select>
                    </div>
                    <button
                        className={`w-full pt-1.5 pb-2 bg-primary text-white font-semibold rounded-md mt-5
                            ${title.length < 3 || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                        disabled={title.length < 3 || isLoading}
                    >
                        { isLoading ? 'Membuat Quiz...' : 'Buat Quiz'}
                    </button>
                </form>
            </div>
        </ContentLayout>
    )
}

export default CreateQuiz