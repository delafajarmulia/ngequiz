import { useState } from "react"
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

    const createQuiz = async(e) => {
        e.preventDefault()

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
            console.log(response.data)
            localStorage.setItem('quiz-id-created', response.data.payload.datas.id)
            navigate('/create-question')
        }).catch((err) => {
            console.log(err)
        })
    }
    return(
        <ContentLayout>
            <div>
                <h1 className="text-black text-xl font-bold text-center mt-3">Buat Kuis</h1>
                <form onSubmit={(e) => createQuiz(e)}>
                    <div className="my-3">
                        <p>Nama Kuis</p>
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
                        <p>Deskripsi Kuis</p>
                        <textarea 
                            className="w-full px-2 py-1.5 mt-1 border-2 border-border rounded-md focus:border-primary focus:outline-hidden"
                            placeholder="Masukkan deskripsi (opsional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="my-3">
                        <p>Apakah Kuis Ini Hanya Boleh Dikerjakan Sekali Saja?</p>
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
                        className="w-full pt-1.5 pb-2 bg-primary text-white font-semibold rounded-md cursor-pointer mt-5">
                        Buat Kuis
                    </button>
                </form>
            </div>
        </ContentLayout>
    )
}

export default CreateQuiz